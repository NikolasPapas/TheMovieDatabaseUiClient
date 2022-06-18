using System.Runtime.Serialization;

namespace MovieViewer.Types
{
    [DataContract]
    public class TheMoviesDatabaseResponse
    {
        [DataMember(Name = "page")]
        public int Page { get; set; }

        [DataMember(Name = "total_pages")]
        public long TotalPages { get; set; }

        [DataMember(Name = "total_results")]
        public long TotalResults { get; set; }

        [DataMember(Name = "results")]
        public List<TheMoviesDatabaseResults> Results { get; set; }
    }

    [DataContract]
    public class TheMoviesDatabaseResults
    {
        [DataMember(Name = "id")]
        public string Id { get; set; }

        [DataMember(Name = "adult")]
        public bool Adult { get; set; }

        [DataMember(Name = "backdrop_path")]
        public string BackdropPath { get; set; }

        [DataMember(Name = "genre_ids")]
        public string[] GenreIds { get; set; }

        [DataMember(Name = "original_language")]
        public string OriginalLanguage { get; set; }

        [DataMember(Name = "original_title")]
        public string OriginalTitle { get; set; }

        [DataMember(Name = "overview")]
        public string Overview { get; set; }

        [DataMember(Name = "popularity")]
        public string Popularity { get; set; }

        [DataMember(Name = "poster_path")]
        public string PosterPath { get; set; }

        [DataMember(Name = "release_date")]
        public DateTime ReleaseDate { get; set; }

        [DataMember(Name = "title")]
        public string Title { get; set; }

        [DataMember(Name = "video")]
        public bool Video { get; set; }

        [DataMember(Name = "vote_average")]
        public decimal VoteAverage { get; set; }

        [DataMember(Name = "vote_count")]
        public long VoteCount { get; set; }
    }
}
