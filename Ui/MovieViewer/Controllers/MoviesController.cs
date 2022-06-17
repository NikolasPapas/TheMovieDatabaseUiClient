using Microsoft.AspNetCore.Mvc;
using MovieViewer.Types;
using MovieViewer.Types.DTOs;

namespace MovieViewer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly ILogger<MoviesController> _logger;

        public MoviesController(ILogger<MoviesController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("getPopularMovies")]
        public async Task<IEnumerable<MoviesDto>> GetPopularMovies()
        {
            _logger.LogInformation("getPopularMovies");
            return null;
        }

        [HttpGet]
        [Route("getMovieById")]
        public async Task<MovieViewDto> GetMovieById(string id)
        {
            _logger.LogInformation("getMovieById");
            return null;
        }
    }
}