using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using React.Entities;
using React.Services;

namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManageVehiclesController : ControllerBase
    {
        private readonly IDataRepository<Vehicle> _dataRepository;

        public ManageVehiclesController(IDataRepository<Vehicle> dataRepository)
        {         
            _dataRepository = dataRepository;
        }
        [HttpPost]
        public async Task<IActionResult> AddVehicle(Vehicle vehicle)
        {
            var result=await _dataRepository.AddAsync(vehicle);
            if(result==true)
            {
                return Ok();
            }
            return BadRequest();

        }


        [HttpGet("{mail}")]
        public async Task<List<Vehicle>> GetVEhiclesByID(string mail)
        {
            var result=await _dataRepository.GetAllByEmailAsync(mail);
            return result.ToList();
        }
       
        [HttpGet]
        [Route("vehicle_id/{vehicleid}")]
        public async Task<Vehicle> GetVehicleById(ObjectId vehicleid)
        {
            var result = await _dataRepository.GetByIdAsync(vehicleid);
            return result;
        }
    }
}
