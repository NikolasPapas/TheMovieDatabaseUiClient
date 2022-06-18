using System.Runtime.Serialization;

namespace MovieViewer.Types.DTOs
{
    [DataContract]
    public class MovieViewDto : MovieListItemDto
    {
        [DataMember(Name = "adult")]
        public bool Adult { get; set; }

        [DataMember(Name = "originalTitle")]
        public string OriginalTitle { get; set; }

        [DataMember(Name = "originaLanguage")]
        public string OriginalLanguage { get; set; }

        [DataMember(Name = "overview")]
        public string Overview { get; set; }

        [DataMember(Name = "releaseDate")]
        public DateTime? ReleaseDate { get; set; }

        [DataMember(Name = "backdropPath")]
        public string BackdropPath { get; set; }

        [DataMember(Name = "vote_average")]
        public decimal VoteAverage { get; set; }

        [DataMember(Name = "voteCount")]
        public long VoteCount { get; set; }
    }
}
