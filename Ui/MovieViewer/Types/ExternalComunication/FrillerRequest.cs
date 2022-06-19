using System.Runtime.Serialization;

namespace MovieViewer.Types.ExternalComunication
{

    [DataContract]
    public class FrillerRequest
    {
        [DataMember(Name = "filter")]
        public string? Filter { get; set; }

        [DataMember(Name = "page")]
        public int? Page { get; set; }

    }
}
