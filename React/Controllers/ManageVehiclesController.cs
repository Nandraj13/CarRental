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
        private readonly IManageVehicle Vehicle;
        public ManageVehiclesController(IManageVehicle _Vehicle)
        {         
           Vehicle = _Vehicle;
        }
        [HttpPost]
        public async Task<IActionResult> AddVehicle(Vehicle vehicle)
        {
            var result=await Vehicle.AddNewVehicleAsync(vehicle);
            if(result==true)
            {
                return Ok();
            }
            return BadRequest();

        }
        [HttpGet("{email}")]
        public async Task<List<Vehicle>> GetVehicleByUserEmail(string email)
        {
            var result=await Vehicle.GetVehicleByUserEmailAsync(email);
            return result;
        }
       
        [HttpGet]
        [Route("vehicle_id/{vehicleid}")]
        public async Task<Vehicle> GetVehicleById(string vehicleid)
        {
            var result = await Vehicle.GetVehicleById(vehicleid);
            return result;
        }
    }
}
