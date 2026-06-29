using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AtelierPascaleWebsite.Models;
using AtelierPascaleWebsite.Data;

[Route("api/[controller]")]
[ApiController]
public class ProductImagesController : ControllerBase
{
    private readonly DatabaseContext _context;
    public ProductImagesController(DatabaseContext context)
    {
        _context = context;
    }

    // GET: api/ProductImage
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductImage>>> GetProductImage()
    {
        return await _context.ProductImages.ToListAsync();
    }

    // GET: api/ProductImage/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductImage>> GetProductImage(int id)
    {
        var productimage = await _context.ProductImages.FindAsync(id);

        if (productimage == null)
        {
            return NotFound();
        }

        return productimage;
    }

    // PUT: api/ProductImage/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutProductImage(int? id, ProductImage productimage)
    {
        if (id != productimage.Id)
        {
            return BadRequest();
        }

        _context.Entry(productimage).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ProductImageExists(id))
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

    // POST: api/ProductImage
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<ProductImage>> PostProductImage(ProductImage productimage)
    {
        _context.ProductImages.Add(productimage);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetProductImage", new { id = productimage.Id }, productimage);
    }

    // DELETE: api/ProductImage/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProductImage(int? id)
    {
        var productimage = await _context.ProductImages.FindAsync(id);
        if (productimage == null)
        {
            return NotFound();
        }

        _context.ProductImages.Remove(productimage);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ProductImageExists(int? id)
    {
        return _context.ProductImages.Any(e => e.Id == id);
    }
}
