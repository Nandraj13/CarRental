using MongoDB.Driver;
using React.Entities;
using MongoDB.Bson;

namespace React.Services
{
    public class DataRepository<T> : IDataRepository<T> where T : IEntity
    {
        private readonly IMongoDatabase _db;
        private readonly IMongoCollection<T> _collection;

        public DataRepository(IMongoClient client)
        {
            _db = client.GetDatabase("Vehicle_Renting_DB");
            _collection = _db.GetCollection<T>(typeof(T).ToString());

        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            var result = await _collection.FindAsync(FilterDefinition<T>.Empty);
            return await result.ToListAsync();
        }
         public async Task<IEnumerable<T>> GetAllByIdAsync(ObjectId id)
        {
            var filter = Builders<T>.Filter.Eq(t => t._Id, id);
            var result = await _collection.FindAsync(filter);
            return await result.ToListAsync();
        }

        public async Task<T> GetByIdAsync(ObjectId id)
        {
            var filter = Builders<T>.Filter.Eq(t => t._Id, id);
            var result = await _collection.FindAsync(filter);
            return await result.FirstOrDefaultAsync();
        }
        public async Task<IEnumerable<T>> GetAllByEmailAsync(string mail)
        {
            var filter = Builders<T>.Filter.Eq(t => t.UserEmailId, mail);
            var result = await _collection.FindAsync(filter);
            return await result.ToListAsync();
        }

        public async Task<T> GetByEailAsync(string mail)
        {
            var filter = Builders<T>.Filter.Eq(t => t.UserEmailId, mail);
            var result = await _collection.FindAsync(filter);
            return await result.FirstOrDefaultAsync();
        }

        public async Task<bool> AddAsync(T entity)
        {
            try
            {
                await _collection.InsertOneAsync(entity);

            }
            catch (Exception e)
            {
                return false;
            }
            return true;
        }

        public async Task UpdateAsync(ObjectId id, T entity)
        {
            var filter = Builders<T>.Filter.Eq(t => t._Id, id);
            await _collection.ReplaceOneAsync(filter, entity);
        }

        public async Task DeleteAsync(ObjectId id)
        {
            var filter = Builders<T>.Filter.Eq(t => t._Id, id);
            await _collection.DeleteOneAsync(filter);
        }

        public async Task<IEnumerable<T>> GetNotApprovedAsync()
        {
            var filter = Builders<T>.Filter.Eq(t => t.Approved,false);
            var result = await _collection.FindAsync(filter);
            return await result.ToListAsync();
        }
        public async Task<IEnumerable<T>> GetApprovedAsync()
        {
            var filter = Builders<T>.Filter.Eq(t => t.Approved, true);
            var result = await _collection.FindAsync(filter);
            return await result.ToListAsync();
        }

        public async Task ApproveVehicleAsync(ObjectId id, T entity)
        {
            var filter = Builders<T>.Filter.Eq(t => t._Id, id);
            await _collection.ReplaceOneAsync(filter, entity);
        }
    }
}
