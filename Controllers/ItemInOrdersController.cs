using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AtelierPascaleWebsite.Models;
using AtelierPascaleWebsite.Data;

[Route("api/[controller]")]
[ApiController]
public class ItemInOrdersController : ControllerBase
{
    private readonly DatabaseContext _context;
    public ItemInOrdersController(DatabaseContext context)
    {
        _context = context;
    }

    // GET: api/ItemInOrder
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ItemInOrder>>> GetItemInOrder()
    {
        return await _context.ItemsInOrders.ToListAsync();
    }

    // GET: api/ItemInOrder/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ItemInOrder>> GetItemInOrder(int id)
    {
        var iteminorder = await _context.ItemsInOrders.FindAsync(id);

        if (iteminorder == null)
        {
            return NotFound();
        }

        return iteminorder;
    }

    // POST: api/ItemInOrder
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<ItemInOrder>> PostItemInOrder(ItemInOrder iteminorder)
    {
        _context.ItemsInOrders.Add(iteminorder);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetItemInOrder", new { id = iteminorder.Id }, iteminorder);
    }

}
