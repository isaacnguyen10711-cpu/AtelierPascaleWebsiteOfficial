using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using AtelierPascaleWebsite.Models;
using AtelierPascaleWebsite.Data;
using AtelierPascaleWebsite.Models.DTOs;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly DatabaseContext _context;
    public ProductsController(DatabaseContext context)
    {
        _context = context;
    }

    // GET: api/Product
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDTO>>> GetProduct()
    {
        return await _context.Products
            .Include(p => p.Images)
            .Select(p => new ProductDTO
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                CategoryId = p.CategoryId,
                Images = p.Images.Select(i => new ProductImageDTO
                {
                    Id = i.Id,
                    ImageUrl = i.ImageUrl
                }).ToList()
            })
            .ToListAsync();
    }

    // GET: api/Product/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDTO>> GetProduct(int id)
    {
        var product = await _context.Products
            .Include(p => p.Images)
            .Where(p => p.Id == id)
            // Create a new ProductDTO object to return to prevent exposing the entity directly and to avoid circular references
            .Select(p => new ProductDTO
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                CategoryId = p.CategoryId,
                Images = p.Images.Select(i => new ProductImageDTO
                {
                    Id = i.Id,
                    ImageUrl = i.ImageUrl
                }).ToList()
            })
            .FirstOrDefaultAsync();

        if (product == null)
        {
            return NotFound();
        }

        return product;
    }

    // Filter products by category name
    [HttpGet("category/{categoryName}")] 
    public async Task<ActionResult<IEnumerable<ProductDTO>>> GetProductsByCategory(string categoryName)
    {
        // Compare the category name by converting it to lowercase and replace hyphens with spaces
        var formattedCategoryName = categoryName.Replace("-", " ").Trim().ToLower();

        var products = await _context.Products
            .Include(p => p.Images)
            .Where(p => p.Category.Name.ToLower() == formattedCategoryName)
            .Select(p => new ProductDTO
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                CategoryId = p.CategoryId,
                Images = p.Images.Select(i => new ProductImageDTO
                {
                    Id = i.Id,
                    ImageUrl = i.ImageUrl
                }).ToList()
            })
            .ToListAsync();
        if (!products.Any())
        {
            return NotFound();
        }
        return products;
    }

    // PUT: api/Product/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> PutProduct(int? id, ProductUpdateDTO product)
    {
        if (id != product.Id)
        {
            return BadRequest();
        }

        var existingProduct = _context.Products.FirstOrDefault(p => p.Id == id);

        // Update the properties of the existing product with the values from the DTO
        existingProduct?.Name = product.Name;
        existingProduct?.Description = product.Description;
        existingProduct?.Price = product.Price;
        existingProduct?.CategoryId = product.categoryId;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ProductExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // POST: api/Product
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<ProductDTO>> PostProduct(ProductCreateDTO product)
    {
        var categoryExists = await _context.Categories.AnyAsync(c => c.Id == product.CategoryId);
        if (!categoryExists)
        {
            return BadRequest("Invalid category ID.");
        }

        var newProduct = new Product
        {
            Name = product.Name,
            Description = product.Description,
            Price = product.Price,
            CategoryId = product.CategoryId
        };

        _context.Products.Add(newProduct);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetProduct", new { id = newProduct.Id }, new ProductDTO
        {
            Id = newProduct.Id,
            Name = newProduct.Name,
            Description = newProduct.Description,
            Price = newProduct.Price,
            CategoryId = newProduct.CategoryId,
            Images = new List<ProductImageDTO>()
        });
    }

    // DELETE: api/Product/5
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int? id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
        {
            return NotFound();
        }

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ProductExists(int? id)
    {
        return _context.Products.Any(e => e.Id == id);
    }
}






