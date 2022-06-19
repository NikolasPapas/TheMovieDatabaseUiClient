using MovieViewer.Types.DTOs;
using MovieViewer.Types.ExternalComunication;

namespace MovieViewer.Interfaces
{
    public interface IExternalServiceConnector
    {
        Task<IEnumerable<MovieListItemDto>> GetMovieList();
        Task<MovieViewDto> GetMovieView(string id);
        Task<FilteredResponse> GetFilteredMovies(FrillerRequest reques);
    }
}
