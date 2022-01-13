namespace ApiTester.ViewModels.Request;

using System.ComponentModel.DataAnnotations;

using ApiTester.ViewModels.Body;
using ApiTester.ViewModels.Header;
using ApiTester.Common.Enumerations;

public class RequestInputModel
{
    [Required]
    public string Url { get; set; }

    public RequestMethod Method { get; set; }

    public IEnumerable<HeaderInputModel> Headers { get; set; }

    public BodyInputModel Body { get; set; }
}
