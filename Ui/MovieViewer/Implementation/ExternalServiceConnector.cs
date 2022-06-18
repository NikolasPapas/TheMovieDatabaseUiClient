using Microsoft.Extensions.Options;
using MovieViewer.Interfaces;
using MovieViewer.Types;
using MovieViewer.Types.DTOs;
using Newtonsoft.Json;
using System.Reflection;

namespace MovieViewer.Implementation
{
    public class ExternalServiceConnector : IExternalServiceConnector
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ExternalServiceConfiguration _config;
        private TheMoviesDatabaseResponse data;


        public ExternalServiceConnector(IOptions<ExternalServiceConfiguration> options, IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
            _config = options.Value;
        }

        public async Task<IEnumerable<MovieListItemDto>> GetMovieList()
        {
            if (data == null)
            {
                TheMoviesDatabaseResponse results = JsonConvert.DeserializeObject<TheMoviesDatabaseResponse>(await GetResultsfromTheMoviesDatabase());
                data = results;
            }
            return data.GetMovieListItemDto();
        }

        public async Task<MovieViewDto> GetMovieView(string id)
        {
            if (data == null)
            {
                TheMoviesDatabaseResponse results = JsonConvert.DeserializeObject<TheMoviesDatabaseResponse>(await GetResultsfromTheMoviesDatabase());
                data = results;
            }
            return data.GetMovieViewDto(id);
        }

        #region Helpers 

        private async Task<string> GetResultsfromTheMoviesDatabase()
        {
            var httpClient = _httpClientFactory.CreateClient(StatisValues.TheMoviesDatabaseClientName);
            var httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, GetUri(httpClient.BaseAddress.ToString(), GetQueryParamsFromConfiguration()).Uri) { };
            var httpResponseMessage = await httpClient.SendAsync(httpRequestMessage);
            if (!httpResponseMessage.IsSuccessStatusCode) throw new Exception($"Not Success, Code {httpResponseMessage.StatusCode}");
            string resultString = await httpResponseMessage.Content.ReadAsStringAsync();
            if (string.IsNullOrWhiteSpace(resultString)) throw new Exception("Null Response");
            return resultString;
        }

        private Dictionary<string, string> GetQueryParamsFromConfiguration()
        {
            Dictionary<string, string> queryParams = new Dictionary<string, string>();
            foreach (PropertyInfo prop in _config.GetType().GetProperties())
            {
                string name = prop.Name;
                object value = prop.GetValue(_config);
                queryParams.Add(name, value.ToString());
            }
            return queryParams;
        }

        private UriBuilder GetUri(string endpoint, Dictionary<string, string> queryParams)
        {
            var requestUri = new UriBuilder(endpoint);
            queryParams.Keys.ToList().ForEach(paramkey =>
            {
                if (requestUri.Query.Length > 1)
                {
                    requestUri.Query = $"{requestUri.Query}&{paramkey}={queryParams[paramkey]}";
                }
                else
                    requestUri.Query = $"?{paramkey}={queryParams[paramkey]}";
            });
            return requestUri;
        }

        #endregion
    }
}
