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
        public async Task<NewUser> GetUserByEmail(string email)
        {
            var user=await _collection.FindAsync(i=>i.Email.Equals(email));
            return user.First();
           
        }

        public async Task<bool> UpdateUserByEmail(string email,NewUser newuser)
        {
            int id = Convert.ToInt32(newuser._id);
            newuser._id = id;
            var filter = Builders<NewUser>.Filter.Eq(t => t.Email, email);
            var user = await _collection.ReplaceOneAsync(filter,newuser);
            
                return true;
            
           
        }
    }
}
