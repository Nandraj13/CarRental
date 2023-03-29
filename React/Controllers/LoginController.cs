using Microsoft.AspNetCore.Mvc;
using React.Entities;
using React.Services;

namespace React.Controllers
{
   
        [ApiController]
        [Route("api/[controller]")]
        public class LoginController : ControllerBase
        {
        private readonly ICheckLogin _checkLogin;

            public LoginController(ICheckLogin checkLogin)
            {
                _checkLogin = checkLogin;
            }
            [HttpGet]
            public IActionResult hello()
            {
                return Ok("hello");
            }

            [HttpPost]
            public async Task<IActionResult> CheckLogin(LoginDetails loginDetails)
            {
                Console.WriteLine(loginDetails);
                
                var check=await _checkLogin.CheckForLogin(loginDetails);

                bool result = check;
                Console.WriteLine(result);
                if(result==true)
                {
                    return Ok();
                }    
                return NotFound(result);
            }
        }
    }

