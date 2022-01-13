using System.ComponentModel.DataAnnotations;

namespace ApiTester.ViewModels.Header
{
    public class HeaderInputModel
    {
        [Required]
        public string Key { get; set; }

        [Required]
        public string Value { get; set; }
    }
}
