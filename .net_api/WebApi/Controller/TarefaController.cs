using Entities;
using Infra.repository;
using Microsoft.AspNetCore.Mvc;

namespace webApi.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class TarefaController : ControllerBase
    {
        private readonly TarefaRepository _repo = new TarefaRepository();

        [HttpGet]
        public IActionResult Get() => Ok(_repo.GetAll());

        [HttpPost]
        public IActionResult Post(Tarefa tarefa)
        {
            _repo.Add(tarefa);
            return Created("", tarefa);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Tarefa tarefa)
        {
            var existing = _repo.GetById(id);
            if (existing == null) return NotFound();
            _repo.Update(tarefa);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _repo.Delete(id);
            return NoContent();
        }
    }
}
