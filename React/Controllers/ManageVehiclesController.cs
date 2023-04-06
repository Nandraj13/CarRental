using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using Newtonsoft.Json;
using React.Entities;
using React.Services;
using ZstdSharp.Unsafe;

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
            var result = await _dataRepository.AddAsync(vehicle);
            if (result == true)
            {
                return Ok();
            }
            return BadRequest();

        }


        [HttpGet("{mail}")]
        public async Task<List<Vehicle>> GetVEhiclesByID(string mail)
        {
            var result = await _dataRepository.GetAllByEmailAsync(mail);
            return result.ToList();
        }

        [HttpGet]
        [Route("vehicle_id/{vehicleid}")]
        public async Task<Vehicle> GetVehicleById(ObjectId vehicleid)
        {
            var result = await _dataRepository.GetByIdAsync(vehicleid);
            return result;
        }
        [HttpGet]
        [Route("vehicles/notapproved")]
        public async Task<List<Vehicle>> GetNotApprovedVehicles()
        {
            var result = await _dataRepository.GetNotApprovedAsync();
            return result.ToList();
        }
        [HttpGet]
        [Route("vehicles/approved")]
        public async Task<List<Vehicle>> GetApprovedVehicles()
        {
            var result = await _dataRepository.GetApprovedAsync();
            return result.ToList();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicleById(ObjectId Id)
        {
            try
            {
                await _dataRepository.DeleteAsync(Id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpPut("{id}")]
       
        public async Task<IActionResult> UpdateVehicleById(ObjectId id,Vehicle vehicle)
        {
            vehicle._Id= id;
            try
            {
                await _dataRepository.UpdateAsync(id,vehicle);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpPut]
        [Route("Approvevehicle/{id}")]
        public async Task<IActionResult> ApproveVehicle(ObjectId id, Vehicle vehicle)
        {
            vehicle._Id= id;
            vehicle.Approved = true;
            try
            {
                await _dataRepository.UpdateAsync(id, vehicle);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
