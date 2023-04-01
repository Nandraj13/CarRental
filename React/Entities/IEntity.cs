using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace React.Entities
{
    public interface IEntity
    {
        [BsonId]
        public ObjectId _Id { get; set; }

        [Required]
        public string UserEmailId { get; set; }
    }
}