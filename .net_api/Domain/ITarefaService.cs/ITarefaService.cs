using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ITarefaService.cs
{
    public interface ITarefaService
    {
        Task<IEnumerable<Tarefa>> GetTarefasAsync();
        Task<Tarefa> GetTarefaByIdAsync(int id);
        Task AddTarefaAsync(Tarefa tarefa);
        Task UpdateTarefaAsync(Tarefa tarefa);
        Task DeleteTarefaAsync(int id);
    }
}
