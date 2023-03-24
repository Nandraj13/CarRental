using MongoDB.Driver;
using React.Entities;

namespace React.Services
{
    public class AddVehicle : IAddVehicle
    {
        public readonly IMongoCollection<Vehicle> _collection;

        public AddVehicle(IMongoClient client)
        {
            var database = client.GetDatabase("Vehicle_Renting_DB");
            _collection = database.GetCollection<Vehicle>("Vehicles");

        }
        public async Task<bool> AddNewVehicleAsync(Vehicle vehicle)
        {
            try
            {
                await _collection.InsertOneAsync(vehicle);
                return true;
            } catch (Exception ex)
            {
                return false;
            }
        }
    }
}
