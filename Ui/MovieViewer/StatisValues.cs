namespace MovieViewer
{
    public static class StatisValues
    {
        public static string TheMoviesDatabaseClientName = "TheMoviesDatabase";
        public static string ExternalServiceConfigurationName = "ExternalServiceConfiguration";

        #region Filters
        public static string FilterPopularity = "popularity";
        public static string FilterVoteAverage = "vote_average";
        public static string FilterRevenue = "revenue";
        public static string FilterVoteCount= "vote_count";
        public static string FilterPrimaryRealeseDate= "primary_realese_date";
        public static string FilterOriginalTitle= "original_title";

        public static string Most = "desc";
        public static string Least = "asc";

        public static Dictionary<string, Tuple<string, string>> FilterList = new Dictionary<string, Tuple<string, string>>()
        {
            { "Most Popular Movies",new Tuple<string,string>(FilterPopularity,Most) },
            { "Least Popular Movies",new Tuple<string,string>( FilterPopularity,Least) },


            { "Most Reted Movies",new Tuple<string,string>(FilterVoteAverage,Most) },
            { "Least Reted Movies",new Tuple<string,string>(FilterVoteAverage,Least) },

            { "Most Payed Movies",new Tuple<string,string>(FilterRevenue,Most) },
            { "Least Peyed Movies",new Tuple<string,string>( FilterRevenue,Least) },

            { "Most Voted Movies",new Tuple<string,string>(FilterVoteCount,Most) },
            { "Least Voted Movies",new Tuple<string,string>( FilterVoteCount,Least) },

            { "Most Recent Movies",new Tuple<string,string>(FilterPrimaryRealeseDate,Most) },
            { "Least Resent Movies",new Tuple<string,string>( FilterPrimaryRealeseDate,Least) },

            { "By Title (A->Z)",new Tuple<string,string>(FilterOriginalTitle,Most) },
            { "By Title (Z->A)",new Tuple<string,string>( FilterOriginalTitle,Least) },
        };
        #endregion
    }
}
