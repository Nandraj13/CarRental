using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using React.Entities;
using React.Services;

namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManageVehiclesController : ControllerBase
    {
        private readonly IAddVehicle addVehicle;
        public ManageVehiclesController(IAddVehicle _addVehicle)
        {         
           addVehicle = _addVehicle;
        }
        [HttpPost]
        public async Task<IActionResult> AddVehicle(Vehicle vehicle)
        {
            var result=addVehicle.AddNewVehicleAsync(vehicle);
            if(result.GetAwaiter().GetResult()==true)
            {
                return Ok();
            }
            return BadRequest();

        }
    }
}
