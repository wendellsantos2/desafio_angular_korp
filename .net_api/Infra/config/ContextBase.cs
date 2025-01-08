using Microsoft.EntityFrameworkCore;

namespace Entities.Context
{
    public class ContextBase : DbContext
    {
        public ContextBase(DbContextOptions<ContextBase> options) : base(options) { }



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(ObterStringConexao());
            }
        }

        private string ObterStringConexao()
        {
            return "Initial Catalog=app_tarefas Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=master;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False";
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tarefa>().ToTable("Tarefas");
            modelBuilder.Entity<Tarefa>().HasKey(t => t.Id);
            modelBuilder.Entity<Tarefa>().Property(t => t.Titulo).IsRequired().HasMaxLength(200);
            modelBuilder.Entity<Tarefa>().Property(t => t.Descricao).HasMaxLength(500);
            modelBuilder.Entity<Tarefa>().Property(t => t.Concluido).HasDefaultValue(false);
        }

    }
}
