namespace ApiTester.Services.Requests;

using ApiTester.ViewModels.Request;
using ApiTester.ViewModels.Response;

public interface IRequestsService
{
    Task<ResponseViewModel> SendAsync(RequestInputModel inputModel);
}
