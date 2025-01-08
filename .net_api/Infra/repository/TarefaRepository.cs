using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.repository
{
    public class TarefaRepository
    {
        private readonly List<Tarefa> _tarefas = new List<Tarefa>();

        public IEnumerable<Tarefa> GetAll() => _tarefas;

        public Tarefa GetById(int id) => _tarefas.FirstOrDefault(t => t.Id == id);

        public void Add(Tarefa tarefa) => _tarefas.Add(tarefa);

        public void Update(Tarefa tarefa)
        {
            var index = _tarefas.FindIndex(t => t.Id == tarefa.Id);
            if (index != -1) _tarefas[index] = tarefa;
        }

        public void Delete(int id) => _tarefas.RemoveAll(t => t.Id == id);
    }
}
