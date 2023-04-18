using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using React.Entities;
using React.Services;

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
        [HttpPut("UpdateUser/{email}")]
        public async Task<IActionResult> UpdateUserByEmail(NewUser newUser,string email)
        {
            var res=await _addUser.UpdateUserByEmail(email, newUser);
            if (res == true)
            { return Ok(); }
            return BadRequest();
        }
     }
}
