using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using AtelierPascaleWebsite.Models;
using AtelierPascaleWebsite.Data;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ShoppingCartsController : ControllerBase
{
    private readonly DatabaseContext _context;
    public ShoppingCartsController(DatabaseContext context)
    {
        _context = context;
    }

    // GET: api/ShoppingCart
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ShoppingCart>>> GetShoppingCart()
    {
        return await _context.ShoppingCarts.ToListAsync();
    }

    // GET: api/ShoppingCart/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ShoppingCart>> GetShoppingCart(int id)
    {
        var shoppingcart = await _context.ShoppingCarts.FindAsync(id);

        if (shoppingcart == null)
        {
            return NotFound();
        }

        return shoppingcart;
    }

    // PUT: api/ShoppingCart/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutShoppingCart(int? id, ShoppingCart shoppingcart)
    {
        if (id != shoppingcart.Id)
        {
            return BadRequest();
        }

        _context.Entry(shoppingcart).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ShoppingCartExists(id))
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

    // POST: api/ShoppingCart
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<ShoppingCart>> PostShoppingCart(ShoppingCart shoppingcart)
    {
        _context.ShoppingCarts.Add(shoppingcart);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetShoppingCart", new { id = shoppingcart.Id }, shoppingcart);
    }

    // DELETE: api/ShoppingCart/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteShoppingCart(int? id)
    {
        var shoppingcart = await _context.ShoppingCarts.FindAsync(id);
        if (shoppingcart == null)
        {
            return NotFound();
        }

        _context.ShoppingCarts.Remove(shoppingcart);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ShoppingCartExists(int? id)
    {
        return _context.ShoppingCarts.Any(e => e.Id == id);
    }
}


