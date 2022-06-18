using MovieViewer.Types;
using MovieViewer.Types.DTOs;

namespace MovieViewer.Implementation
{
    public static class Extensions
    {
        public static IEnumerable<MovieListItemDto> GetMovieListItemDto(this TheMoviesDatabaseResponse source)
        {
            return source.Results.Select(item => new MovieListItemDto() { Id = item.Id, Title = item.Title });
        }

        public static MovieViewDto GetMovieViewDto(this TheMoviesDatabaseResponse source, string id)
        {
            var item = source.Results.FirstOrDefault(x => x.Id == id);
            DateTime? releaseParsedDate = null;
            if (DateTime.TryParse(item?.ReleaseDate, out DateTime releaseDate))
                releaseParsedDate = releaseDate;

            return new MovieViewDto()
            {
                Id = item.Id,
                Title = item.Title,
                OriginalTitle = item.OriginalTitle,
                Adult = item.Adult,
                OriginalLanguage = item.OriginalLanguage,
                Overview = item.Overview,
                ReleaseDate = releaseParsedDate,
                BackdropPath = item.BackdropPath,
                VoteAverage = item.VoteAverage,
                VoteCount = item.VoteCount
            };
        }

    }
}
