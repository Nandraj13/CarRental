using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using React.Entities;
using React.Services;
using System.ComponentModel.DataAnnotations;

namespace React.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IAddUser _addUser;

        public UserController(IAddUser addUser)
        {
            _addUser = addUser;
        }
        [HttpGet]
        public IActionResult hello()
        {
            return Ok("hello");
        }

        [HttpPost]
        public async Task<IActionResult> AddNewUSerAsync(NewUser newUser)
        {
            Random r = new Random();
            newUser._id = r.Next();
            var res = await _addUser.AddNewUserAsync(newUser);
            if (res == true)
                return Ok();
            return BadRequest();
        }
        [HttpGet("{email}")]
        public async  Task<NewUser> GetUserByEmail(string email)
        {
            var res=await _addUser.GetUserByEmail(email);
            return res;
        }
        [HttpGet("Checkuser/{email}")]
        public async Task<IActionResult> CheckUser(string email)
        {
            var res = await _addUser.CheckUser(email);
            if (res == true)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("UpdateUser/{email}")]
        public async Task<IActionResult> UpdateUserByEmail(NewUser newUser,string email)
        {
            var res=await _addUser.UpdateUserByEmail(email, newUser);
            if (res == true)
            { return Ok(); }
            return BadRequest();
        }
        [HttpPut("UpdatePassword/{email}")]
        public async Task<IActionResult> UpdatePasswordByEmail([FromBody] PasswordDto Password,string email)
        {
            var newUser = await _addUser.GetUserByEmail(email);
            newUser.Password=Password.Password;
            var res = await _addUser.UpdateUserByEmail(email, newUser);
            if (res == true)
            { return Ok(); }
            return BadRequest();
        }
    }
}
