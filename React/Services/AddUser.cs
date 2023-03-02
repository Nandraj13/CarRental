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

        public async Task AddNewUserAsync(NewUser newUser)
        {
            await _collection.InsertOneAsync(newUser);
        }
    }
}
