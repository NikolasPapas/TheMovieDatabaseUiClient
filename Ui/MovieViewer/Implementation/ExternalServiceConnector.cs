using MovieViewer.Interfaces;
using MovieViewer.Types.DTOs;

namespace MovieViewer.Implementation
{
    public class ExternalServiceConnector : IExternalServiceConnector
    {
        public ExternalServiceConnector()
        {

        }

        public async Task<IEnumerable<MovieListItemDto>> GetMovieList()
        {
            //TODO Call RestAPI
            return new List<MovieListItemDto>()
            {
                new MovieListItemDto()
                {
                    Id= "1",
                    OriginalTitle="zdfjkfhjsdld"
                }
            };
        }

        public async Task<MovieViewDto> GetMovieView(string id)
        {
            //TODO Call RestAPI
            return new MovieViewDto()
            {
                Id = "1",
                OriginalTitle = "zdfjkfhjsdld",
                Adult = true,
                ReleaseDate = DateTime.Now.AddDays(-100),
                VoteAverage = (decimal)6.7
            };
        }

    }
}
