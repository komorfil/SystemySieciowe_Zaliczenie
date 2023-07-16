using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models
{
    public class UserContext : DbContext
    {
        public UserContext()
        {
        }

        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging(); // Dodaj tę linię
        }

        public DbSet<User> Users { get; set; }
    }
}
