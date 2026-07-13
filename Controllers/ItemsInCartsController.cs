using AtelierPascaleWebsite.Data;
using AtelierPascaleWebsite.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ItemsInCartsController : ControllerBase
{
    private readonly DatabaseContext _context;
    public ItemsInCartsController(DatabaseContext context)
    {
        _context = context;
    }

    // GET: api/ItemsInCart
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ItemsInCart>>> GetItemsInCart()
    {
        if (User.IsInRole("Admin"))
        {
            return await _context.ItemsInCarts.ToListAsync();
        }

        else
        {
            var userId = GetCurrentUserId();
            var itemsInCart = await _context.ItemsInCarts
                .Include(i => i.ShoppingCart)
                .Where(i => i.ShoppingCart != null && i.ShoppingCart.UserId == userId)
                .ToListAsync();
            return itemsInCart;
        }
    }

    // POST: api/ItemsInCart
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<ItemsInCart>> PostItemsInCart(ItemsInCart itemsincart)
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
        itemsincart.ShoppingCartId = shoppingCart.Id;

        _context.ItemsInCarts.Add(itemsincart);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetItemsInCart", new { id = itemsincart.Id }, itemsincart);
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


