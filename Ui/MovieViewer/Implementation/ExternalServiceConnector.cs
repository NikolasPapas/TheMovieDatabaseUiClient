using Microsoft.Extensions.Options;
using MovieViewer.Interfaces;
using MovieViewer.Types;
using MovieViewer.Types.DTOs;
using MovieViewer.Types.ExternalComunication;
using Newtonsoft.Json;
using System.Reflection;

namespace MovieViewer.Implementation
{
    public class ExternalServiceConnector : IExternalServiceConnector
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ExternalServiceConfiguration _config;
        private TheMoviesDatabaseResponse _data;

        public ExternalServiceConnector(IOptions<ExternalServiceConfiguration> options, IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
            _config = options.Value;
            _data = new TheMoviesDatabaseResponse();
        }

        public async Task<IEnumerable<MovieListItemDto>> GetMovieList()
        {
            TheMoviesDatabaseResponse results = JsonConvert.DeserializeObject<TheMoviesDatabaseResponse>(await GetResultsfromTheMoviesDatabase());
            _data = results;
            return results.GetMovieListItemDto();
        }

        public async Task<MovieViewDto> GetMovieView(string id)
        {
            //TheMoviesDatabaseResponse results = JsonConvert.DeserializeObject<TheMoviesDatabaseResponse>(await GetResultsfromTheMoviesDatabase());
            return _data.GetMovieViewDto(id);
        }

        public async Task<FilteredResponse> GetFilteredMovies(FrillerRequest reques)
        {
            if (reques == null || string.IsNullOrEmpty(reques.Filter))
                return new FilteredResponse() { SelectedFilter = reques.Filter, List = null };
            TheMoviesDatabaseResponse results = JsonConvert.DeserializeObject<TheMoviesDatabaseResponse>(await GetResultsfromTheMoviesDatabase(CreateFilters(reques)));
            _data = results;
            return new FilteredResponse() { SelectedFilter = reques.Filter,SelectedPage= results.Page, PageCount= results.TotalPages, List = results.GetMovieListItemDto() };
        }

        private List<Tuple<string, string>> CreateFilters(FrillerRequest reques)
        {
            List<Tuple<string, string>> filters = new List<Tuple<string, string>>();
            filters.Add(new Tuple<string, string>("sort_by", $"{StatisValues.FilterList[reques.Filter].Item1}.{StatisValues.FilterList[reques.Filter].Item2}"));
            if (reques.Page != null) filters.Add(new Tuple<string, string>("page", reques.Page.ToString()));
            return filters;
        }

        #region Helpers 

        private async Task<string> GetResultsfromTheMoviesDatabase(List<Tuple<string, string>> filter = null)
        {
            var httpClient = _httpClientFactory.CreateClient(StatisValues.TheMoviesDatabaseClientName);
            var httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, GetUri(httpClient.BaseAddress.ToString(), GetQueryParamsFromConfiguration(), filter).Uri) { };
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

        private UriBuilder GetUri(string endpoint, Dictionary<string, string> queryParams, List<Tuple<string, string>> filter = null)
        {
            var requestUri = new UriBuilder(endpoint);
            if (filter != null && filter.Count>0) filter.ForEach(x=>queryParams.Add(x.Item1,x.Item2));
            queryParams.Keys.ToList().ForEach(paramkey =>
            {
                if (requestUri.Query.Length > 1)
                    requestUri.Query = $"{requestUri.Query}&{paramkey}={queryParams[paramkey]}";
                else
                    requestUri.Query = $"?{paramkey}={queryParams[paramkey]}";
            });
            return requestUri;
        }

        #endregion
    }
}
