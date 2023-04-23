using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace React.Entities
{
    public class Booking
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string VehicleId { get; set; }

        public DateTime PickupDate { get; set; }

        public DateTime ReturnDate { get; set; }

        public string CustomerName { get; set; }

        public string CustomerEmail { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }

        public decimal TotalPrice { get; set; }
    }
}
