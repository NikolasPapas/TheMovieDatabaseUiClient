using MovieViewer.Types.DTOs;
using System.Runtime.Serialization;

namespace MovieViewer.Types.ExternalComunication
{
    [DataContract]
    public class FilteredResponse
    {
        [DataMember(Name = "selectedFilter")]
        public string SelectedFilter { get; set; }

        [DataMember(Name = "list")]
        public IEnumerable<MovieListItemDto> List { get; set; }

        [DataMember(Name = "selectedPage")]
        public int SelectedPage { get; set; }

        [DataMember(Name = "pageCount")]
        public long PageCount { get; set; }

    }
}
