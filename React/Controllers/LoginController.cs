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
                
                var check=_checkLogin.CheckForLogin(loginDetails);
                check.Wait();
                bool result = check.Result;
                Console.WriteLine(result);
                if(result==true)
                {
                    return Ok();
                }    
                return NotFound(result);
            }
        }
    }

