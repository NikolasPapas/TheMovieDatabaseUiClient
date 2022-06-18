using MovieViewer.Types.DTOs;
using System.Runtime.Serialization;

namespace MovieViewer.Types.ExternalComunication
{
    [DataContract]
    public class FilteredResponce
    {
        [DataMember(Name = "selectedFilter")]
        public string SelectedFilter { get; set; }

        [DataMember(Name = "list")]
        public IEnumerable<MovieListItemDto> List { get; set; }
    }
}
