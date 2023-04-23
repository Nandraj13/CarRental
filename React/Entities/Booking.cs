using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace React.Entities
{
    public class Booking
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string VehicleId { get; set; }

        public DateTime PickupDate { get; set; }

        public DateTime ReturnDate { get; set; }

        public string CustomerEmail { get; set; }

        public string OwnerEmail { get; set; }

        public decimal TotalRent { get; set; }
    }
}
