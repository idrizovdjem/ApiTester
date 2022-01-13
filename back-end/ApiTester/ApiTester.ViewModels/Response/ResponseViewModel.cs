namespace ApiTester.ViewModels.Response;

using System.Net;

using ApiTester.ViewModels.Header;

public class ResponseViewModel
{
    public HttpStatusCode StatusCode { get; set; }

    public IEnumerable<HeaderViewModel> Headers { get; set; }
}
