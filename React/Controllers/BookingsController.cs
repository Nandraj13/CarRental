using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using React.Entities;
using React.Services;

namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly IMongoCollection<Vehicle> _vehicles;
        private readonly IMongoCollection<Booking> _bookings;

        public IDataRepository<Booking> _dataRepository { get; }

        public BookingsController(IMongoClient client)
        {
            var database = client.GetDatabase("Vehicle_Renting_DB");
            _vehicles = database.GetCollection<Vehicle>("React.Entities.Vehicle");
            _bookings = database.GetCollection<Booking>("bookings");
        }

        [HttpPost]
        public async Task<IActionResult> BookVehicle([FromBody] Booking booking)
        {
            var vehicle = await _vehicles.Find(v => v._Id.ToString() == booking.VehicleId).FirstOrDefaultAsync();

            if (vehicle == null)
            {
                return NotFound("Vehicle not found.");
            }
            if(booking.PickupDate>booking.ReturnDate)
            {
                return BadRequest("Invalid booking dates");
            }    
            if (await CheckDateOverlap(booking.VehicleId, booking.PickupDate, booking.ReturnDate))
            {
                return BadRequest("Vehicle already booked for the selected dates.");
            }
            await _bookings.InsertOneAsync(booking);

            return Ok(booking);
        }

        private async Task<bool> CheckDateOverlap(string vehicleId, DateTime startDate, DateTime endDate)
        {
            var overlappingBookings = await _bookings.Find(x =>
                x.VehicleId == vehicleId &&
                ((x.PickupDate <= endDate && x.ReturnDate >= startDate) ||
                (x.PickupDate >= startDate && x.PickupDate <= endDate) ||
                (x.ReturnDate >= startDate && x.ReturnDate <= endDate)))
                .ToListAsync();

            return overlappingBookings.Any();
        }

        [HttpGet]
        public async Task<List<Booking>> GetBookings([FromQuery] string email)
        {
            var bookings = await _bookings.FindAsync(FilterDefinition<Booking>.Empty);

            var result=await bookings.ToListAsync();
            return result.Where(b => b.CustomerEmail.Equals(email)).ToList();

        }
      
    }




}