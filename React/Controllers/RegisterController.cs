using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using React.Entities;
using React.Services;

namespace React.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegisterController : ControllerBase
    {
        private readonly IAddUser _addUser;

        public RegisterController(IAddUser addUser)
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
            await _addUser.AddNewUserAsync(newUser);
            return Ok();
        }
    }
}
