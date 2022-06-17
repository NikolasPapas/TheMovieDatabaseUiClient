using MovieViewer.Types.DTOs;

namespace MovieViewer.Interfaces
{
    public interface IExternalServiceConnector
    {
        Task<IEnumerable<MovieListItemDto>> GetMovieList();
        Task<MovieViewDto> GetMovieView(string id);
    }
}
