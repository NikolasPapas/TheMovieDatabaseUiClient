using Microsoft.AspNetCore.Mvc;
using MovieViewer.Interfaces;
using MovieViewer.Types;
using MovieViewer.Types.DTOs;

namespace MovieViewer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly ILogger<MoviesController> _logger;
        private readonly IExternalServiceConnector _externalServiceConnector;

        public MoviesController(IExternalServiceConnector externalServiceConnector, ILogger<MoviesController> logger)
        {
            _logger = logger;
            _externalServiceConnector = externalServiceConnector;
        }

        [HttpGet]
        [Route("getPopularMovies")]
        public async Task<IEnumerable<MovieListItemDto>> GetPopularMovies()
        {
            _logger.LogInformation("getPopularMovies");
            return await _externalServiceConnector.GetMovieList();
        }

        [HttpGet]
        [Route("getMovieById")]
        public async Task<MovieViewDto> GetMovieById([FromQuery]string id)
        {
            _logger.LogInformation("getMovieById");
            return await _externalServiceConnector.GetMovieView(id);
        }
    }
}