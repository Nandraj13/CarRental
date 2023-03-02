using MongoDB.Driver;
using React.Entities;

namespace React.Services
{
    public class CheckLogin : ICheckLogin
    {

        public readonly IMongoCollection<NewUser> _collection;

        public CheckLogin(IMongoClient client)
        {
            var database = client.GetDatabase("Vehicle_Renting_DB");
            _collection = database.GetCollection<NewUser>("users");

        }

        public async Task<bool> CheckForLogin(LoginDetails loginDetails)
        {
            var user = await _collection.FindAsync(c => c.Email == loginDetails.Email
            && c.Password == loginDetails.Password);
            if(user == null)
            {
                return false;
            }
            var result = user.First();
            Console.WriteLine(result);
            if (result == null)
            {
                return false;
            }

            return true;
        }
    }
}
