using Microsoft.EntityFrameworkCore;
using AtelierPascaleWebsite.Models;

namespace AtelierPascaleWebsite.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<ItemsInCart> ItemsInCarts { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<ShoppingCart> ShoppingCarts { get; set; }
        public DbSet<User> Users { get; set; }
    }
}   