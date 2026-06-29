using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AtelierPascaleWebsite.Models;
using AtelierPascaleWebsite.Data;

[Route("api/[controller]")]
[ApiController]
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
        return await _context.ItemsInCarts.ToListAsync();
    }

    // GET: api/ItemsInCart/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ItemsInCart>> GetItemsInCart(int id)
    {
        var itemsincart = await _context.ItemsInCarts.FindAsync(id);

        if (itemsincart == null)
        {
            return NotFound();
        }

        return itemsincart;
    }

    // PUT: api/ItemsInCart/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutItemsInCart(int? id, ItemsInCart itemsincart)
    {
        if (id != itemsincart.Id)
        {
            return BadRequest();
        }

        _context.Entry(itemsincart).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ItemsInCartExists(id))
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

    // POST: api/ItemsInCart
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<ItemsInCart>> PostItemsInCart(ItemsInCart itemsincart)
    {
        _context.ItemsInCarts.Add(itemsincart);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetItemsInCart", new { id = itemsincart.Id }, itemsincart);
    }

    // DELETE: api/ItemsInCart/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteItemsInCart(int? id)
    {
        var itemsincart = await _context.ItemsInCarts.FindAsync(id);
        if (itemsincart == null)
        {
            return NotFound();
        }

        _context.ItemsInCarts.Remove(itemsincart);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ItemsInCartExists(int? id)
    {
        return _context.ItemsInCarts.Any(e => e.Id == id);
    }
}
