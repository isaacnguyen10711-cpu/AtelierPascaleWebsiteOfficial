using AtelierPascaleWebsite.Data;
using AtelierPascaleWebsite.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using AtelierPascaleWebsite.Models.DTOs;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ItemsInCartController : ControllerBase
{
    private readonly DatabaseContext _context;
    public ItemsInCartController(DatabaseContext context)
    {
        _context = context;
    }

    // GET: api/ItemsInCart
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ItemsInCartDTO>>> GetItemsInCart()
    {
        var userId = GetCurrentUserId();
        var itemsInCart = await _context.ItemsInCarts
            .Where(i => i.ShoppingCart != null && i.ShoppingCart.UserId == userId)
            // Include the related Product and its Images
            .Select(p => new ItemsInCartDTO
            {
                Id = p.Id,
                ProductId = p.Product!.Id,
                ProductName = p.Product.Name,
                Price = p.Product.Price,
                Quantity = p.Quantity,
                ProductImageUrl = p.Product.Images
                .Select(i => i.ImageUrl)
                .FirstOrDefault() ?? string.Empty,
            })
            .ToListAsync();

        return itemsInCart;
    }


    // PUT: api/ItemsInCart/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutItemsInCart(int id, ItemsInCartUpdateDTO itemsincart)
    {
        // Load the item in the shopping cart and check if it belongs to the current user
        var existingItem = await _context.ItemsInCarts
            .Include(i => i.ShoppingCart)
            .Where(i => i.ShoppingCart != null && i.ShoppingCart.UserId == GetCurrentUserId())
            .FirstOrDefaultAsync(i => i.Id == id);
        if (existingItem == null)
        {
            return NotFound();
        }

        existingItem.Quantity = itemsincart.Quantity;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // POST: api/ItemsInCart
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<ItemsInCart>> PostItemsInCart(ItemsInCartAddDTO itemsincart)
    {
        // Get the current user's shopping cart
        var shoppingCart = await _context.ShoppingCarts
            .Include(sc => sc.ItemsInCarts)
            .FirstOrDefaultAsync(sc => sc.UserId == GetCurrentUserId());

        if (shoppingCart == null)
        {
            return NotFound();
        }

        // Get the existing item in the shopping cart if there is one already
        var existingItem = shoppingCart.ItemsInCarts.FirstOrDefault(i => i.ProductId == itemsincart.ProductId);

        if (existingItem != null)
        {
            existingItem.Quantity += 1;
            await _context.SaveChangesAsync();
            return Ok(existingItem);
        }

        // If the item is not already in the shopping cart, add it to the user's  shopping cart
        var newItem = new ItemsInCart
        {
            ShoppingCartId = shoppingCart.Id,
            ProductId = itemsincart.ProductId,
            Quantity = 1
        };

        _context.ItemsInCarts.Add(newItem);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetItemsInCart", new { id = newItem.Id }, newItem);
    }

    // DELETE: api/ItemsInCart/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteItemsInCart(int? id)
    {
        // Load the item in the shopping cart and check if it belongs to the current user
        var itemsincart = await _context.ItemsInCarts
            .Include(i => i.ShoppingCart)
            .Where(i => i.ShoppingCart != null && i.ShoppingCart.UserId == GetCurrentUserId())
            .FirstOrDefaultAsync(i => i.Id == id);

        if (itemsincart == null)
        {
            return NotFound();
        }

        _context.ItemsInCarts.Remove(itemsincart);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private int GetCurrentUserId()
    {
        return int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    }
}


