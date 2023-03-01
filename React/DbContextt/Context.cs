using Microsoft.EntityFrameworkCore;
using React.Models;

namespace React.DbContextt
{
    public class ApplicationContext:DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> op):base(op)
        {

        }
        public DbSet<Users> users { get; set; }
    }
}
