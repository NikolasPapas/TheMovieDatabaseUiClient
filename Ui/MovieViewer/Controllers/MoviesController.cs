using Microsoft.AspNetCore.Mvc;
using MovieViewer.Types;

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
    }
}