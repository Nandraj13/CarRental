using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using React.DbContextt;
using React.Models;

namespace React.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationContext _context;
        public UserController(ApplicationContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<IActionResult> createUser(Users user)
        {
            var check=_context.users.Where(i=>i.Email==user.Email).FirstOrDefault();
            if (check!=null)
            {
                return BadRequest("Email Already Registered, Try Another");
            }
            var result = _context.users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(user);
          
        }
        [HttpPost("Logincheck")]
        public async Task<IActionResult> LoginCheck(LoginCredentials credentials){
            var check=await _context.users.Where(i=>i.Email==credentials.Email && i.Password==credentials.Password).FirstOrDefaultAsync();
            if (check!=null)
            {
                return Ok("Login Successfull");
            }
            return NotFound("Invalid username or password");
        }
    }
}
