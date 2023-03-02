using MongoDB.Bson;
using MongoDB.Driver;
using React.Entities;

namespace React.Services
{
    public class AddUser : IAddUser
    {
        public readonly IMongoCollection<NewUser> _collection;

        public AddUser(IMongoClient client)
        {
            var database = client.GetDatabase("Vehicle_Renting_DB");
            _collection = database.GetCollection<NewUser>("users");

        }

        public async Task<bool> AddNewUserAsync(NewUser newUser)
        {
            var user = _collection.Find(i=>i.Email== newUser.Email).FirstOrDefault();
            if (user == null)
            {
                await _collection.InsertOneAsync(newUser);
                return true;
            }
            return false;
            
        }
    }
}
