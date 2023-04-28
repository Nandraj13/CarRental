using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata;

namespace React.Entities
{
    public class Vehicle : IEntity
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId _Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        //[BsonRepresentation(BsonType.Binary)]
        public string Image { get; set; }

        [Required]
        //[BsonRepresentation(BsonType.Binary)]
        public string RCImage { get; set; }

        [Required]
        public string Capacity { get; set; }

        [Required]
        public string RGnumber { get; set; }

        [Required]
        public int RentPerHour { get; set; }

        [Required]
        public string FuelType { get; set; }

        [Required]
        public bool Approved { get; set; }

        [Required]
        public string UserEmailId { get; set; }

    }


}
