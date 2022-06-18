using System.Runtime.Serialization;

namespace MovieViewer.Types.DTOs
{

    [DataContract]
    public class MovieListItemDto
    {
        [DataMember(Name = "id")]
        public string Id { get;set;}

        [DataMember(Name = "originalTitle")]
        public string OriginalTitle { get;set;}
    }
}
