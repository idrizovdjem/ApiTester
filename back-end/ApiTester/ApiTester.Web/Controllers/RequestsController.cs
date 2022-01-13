namespace ApiTester.Web.Controllers;

using Microsoft.AspNetCore.Mvc;

using ApiTester.Services.Requests;
using ApiTester.ViewModels.Request;
using ApiTester.ViewModels.Response;

public class RequestsController : BaseApiController
{
    private readonly IRequestsService requestsService;

    public RequestsController(IRequestsService requestsService)
    {
        this.requestsService = requestsService;
    }

    [HttpPost]
    public async Task<IActionResult> OnPostAsync(RequestInputModel inputModel)
    {
        ResponseViewModel response = await this.requestsService.SendAsync(inputModel);
        return Ok(response); 
    }
}
