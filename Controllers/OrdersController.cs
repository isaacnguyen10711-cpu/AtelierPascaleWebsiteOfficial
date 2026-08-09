using AtelierPascaleWebsite.Data;
using AtelierPascaleWebsite.Models;
using AtelierPascaleWebsite.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class OrdersController : ControllerBase
{
    private readonly DatabaseContext _context;
    public OrdersController(DatabaseContext context)
    {
        _context = context;
    }

    // GET: api/Order
    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrder()
    {
        return await _context.Orders.ToListAsync();
    }

    // GET: api/Order/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrder(int id)
    {
        var order = await _context.Orders.FindAsync(id);

        if (order == null)
        {
            return NotFound();
        }

        return order;
    }

    // POST: api/Order
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<OrderResponseDTO>> PostOrder(OrderCreateRequestDTO order)
    {
        // Get the user's shopping cart to calculate the total price of the order
        var shoppingCart = await _context.ShoppingCarts
            .Include(sc => sc.ItemsInCarts)
            .ThenInclude(iic => iic.Product)
            .FirstOrDefaultAsync(sc => sc.UserId == GetCurrentUserId());

        if (shoppingCart == null || shoppingCart.ItemsInCarts.Count == 0)
        {
            return BadRequest("Shopping cart is empty or does not exist.");
        }

        var totalPrice = shoppingCart.ItemsInCarts.Sum(iic => iic.Product!.Price * iic.Quantity);

        // Create a new order with the provided details and the calculated total price
        var confirmedOrder = new Order
        {
            UserId = GetCurrentUserId(),
            FirstName = order.FirstName,
            LastName = order.LastName,
            Email = order.Email,
            ShippingAddress = order.ShippingAddress,
            City = order.City,
            State = order.State,
            PostalCode = order.PostalCode,
            TotalPrice = totalPrice,
            OrderDate = DateTime.UtcNow,
            Status = "Pending"
        };

        _context.Orders.Add(confirmedOrder);
        await _context.SaveChangesAsync();

        // Add items from the shopping cart into the ItemsInOrder table directly after creating the order
        foreach (var item in shoppingCart.ItemsInCarts)
        {
            var itemInOrder = new ItemInOrder
            {
                OrderId = confirmedOrder.Id,
                ProductId = item.ProductId,
                Quantity = item.Quantity,
                PriceAtPurchase = item.Product!.Price
            };
            _context.ItemsInOrders.Add(itemInOrder);
        }
        // Remove items from the shopping cart after creating the order
        _context.ItemsInCarts.RemoveRange(shoppingCart.ItemsInCarts);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetOrder", new { id = confirmedOrder.Id }, new OrderResponseDTO
        {
            OrderId = confirmedOrder.Id,
            OrderDate = confirmedOrder.OrderDate
        });
    }

    private int GetCurrentUserId()
    {
        return int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    }
}
