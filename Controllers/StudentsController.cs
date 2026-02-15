using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagementAPI.Data;
using StudentManagementAPI.Models;

namespace StudentManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StudentsController(AppDbContext context)
        {
            _context = context;
        }

        // CREATE
        [HttpPost]
        public async Task<IActionResult> AddStudent(Student student)
        {
            _context.Students.Add(student);
            await _context.SaveChangesAsync();
            return Ok(student);
        }

        // READ ALL
        [HttpGet]
        public async Task<IActionResult> GetStudents()
        {
            return Ok(await _context.Students.ToListAsync());
        }

        // READ BY ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null)
                return NotFound();

            return Ok(student);
        }

        // UPDATE
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, Student student)
        {
            if (id != student.Id)
                return BadRequest();

            _context.Entry(student).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(student);
        }

        // DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null)
                return NotFound();

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return Ok("Deleted Successfully");
        }
    }
}
