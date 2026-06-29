using Microsoft.EntityFrameworkCore;
using AtelierPascaleWebsite.Models;

namespace AtelierPascaleWebsite.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}   