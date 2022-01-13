namespace ApiTester.ViewModels.Body;

using System.ComponentModel.DataAnnotations;

using ApiTester.Common.Enumerations;

public class BodyInputModel
{
    public BodyType Type { get; set; }

    public string Value { get; set; }
}
