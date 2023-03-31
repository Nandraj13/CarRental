using MongoDB.Bson;
using MongoDB.Driver;
using React.Entities;

namespace React.Services
{
    public class ManageVehicle : IManageVehicle
    {
        public readonly IMongoCollection<Vehicle> _collection;

        public ManageVehicle(IMongoClient client)
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

        public async Task<List<Vehicle>> GetVehicleByUserEmailAsync(string UserEmail)
        {
            var result = await _collection.FindAsync(x => x.UserEmailId == UserEmail);
            return result.ToList();
        }

        [Obsolete]
        public async Task<Vehicle> GetVehicleById(string id)
        {
            var objid=new ObjectId(id);
            var result = await _collection.FindAsync(id=>id._Id==objid);
            return result.FirstOrDefault();
        }
    }
}
