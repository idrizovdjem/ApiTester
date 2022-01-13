namespace ApiTester.Services.Requests;

using System.Text;

using ApiTester.ViewModels.Header;
using ApiTester.ViewModels.Request;
using ApiTester.Common.Enumerations;
using ApiTester.ViewModels.Response;

public class RequestsService : IRequestsService
{
    private readonly HttpClient httpClient;

    public RequestsService(HttpClient httpClient)
    {
        this.httpClient = httpClient;
    }

    public async Task<ResponseViewModel> SendAsync(RequestInputModel request)
    {
        using HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, request.Url);
        
        foreach(HeaderInputModel header in request.Headers)
        {
            httpRequestMessage.Headers.Add(header.Key, header.Value);
        }

        if(request.Body.Type != BodyType.NoBody)
        {
            byte[] bodyBytes = Encoding.UTF8.GetBytes(request.Body.Value);
            httpRequestMessage.Content = new ByteArrayContent(bodyBytes);
        }

        HttpResponseMessage httpResponseMessage = await httpClient.SendAsync(httpRequestMessage);
        List<HeaderViewModel> responseHeaders = new List<HeaderViewModel>();
        foreach(KeyValuePair<string, IEnumerable<string>> header in httpResponseMessage.Headers)
        {
            responseHeaders.Add(new HeaderViewModel()
            {
                Key = header.Key,
                Value = String.Join("; ", header.Value)
            });
        }

        ResponseViewModel responseViewModel = new ResponseViewModel()
        {
            StatusCode = httpResponseMessage.StatusCode,
            Headers = responseHeaders
        };

        return responseViewModel;
    }
}