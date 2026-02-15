using System.ComponentModel.DataAnnotations;

namespace StudentManagementAPI.Models
{
    public class Student
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string RollNo { get; set; }

        public string Course { get; set; }

        public int Marks { get; set; }
    }
}
