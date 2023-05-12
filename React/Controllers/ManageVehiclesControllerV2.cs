using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using Newtonsoft.Json;
using React.Entities;
using React.EntityV2;
using React.Services;
using ZstdSharp.Unsafe;

namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManageVehiclesV2Controller : ControllerBase
    {
        private readonly IDataRepository<VehicleV2> _dataRepository;


        public ManageVehiclesV2Controller(IDataRepository<VehicleV2> dataRepository)
        {
            _dataRepository = dataRepository;
        }
        [HttpPost]
        public async Task<IActionResult> AddVehicle(VehicleV2 vehicle)
        {
            var result = await _dataRepository.AddAsync(vehicle);
            if (result == true)
            {
                return Ok();
            }
            return BadRequest();

        }


        [HttpGet("{mail}")]
        public async Task<List<VehicleV2>> GetVehiclesByID(string mail)
        {
            var result = await _dataRepository.GetAllByEmailAsync(mail);
            return result.ToList();
        }

        [HttpGet]
        [Route("vehicle_id/{vehicleid}")]
        public async Task<VehicleV2> GetVehicleById(ObjectId vehicleid)
        {
            var result = await _dataRepository.GetByIdAsync(vehicleid);
            return result;
        }
        [HttpGet]
        [Route("vehicles/notapproved")]
        public async Task<List<VehicleV2>> GetNotApprovedVehicles()
        {
            var result = await _dataRepository.GetNotApprovedAsync();
            return result.ToList();
        }
        //[HttpGet]
        //[Route("vehicles/approved")]
        //public async Task<List<VehicleV2>> GetApprovedVehicles()
        //{
        //    var result = await _dataRepository.GetApprovedAsync();
        //    return result.ToList();
        //}

        [HttpGet]
        [Route("vehicles/approved")]
        public async Task<List<VehicleV2>> GetApprovedVehiclesV2([FromQuery] string city)
        {
            var result = await _dataRepository.GetApprovedAsync();
            return result.Where(v=>v.City.Equals(city)).ToList();
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

        public async Task<IActionResult> UpdateVehicleById(ObjectId id, VehicleV2 vehicle)
        {
            vehicle._Id = id;
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
        [HttpPut]
        [Route("Approvevehicle/{id}")]
        public async Task<IActionResult> ApproveVehicle(ObjectId id, VehicleV2 vehicle)
        {
            vehicle._Id = id;
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
        [HttpPut]
        [Route("Unapprovevehicle/{id}")]
        public async Task<IActionResult> UnApproveVehicle(ObjectId id, VehicleV2 vehicle)
        {
            vehicle._Id = id;
            vehicle.Approved = false;
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
        [HttpGet]
        [Route("ViewAvailableVehicles/{email}")]
        public async Task<List<VehicleV2>> GetAvailableVehicles(string email) {
            var result = await _dataRepository.GetVehiclesForBooking(email);
            return result.ToList();
        }
    }
}
