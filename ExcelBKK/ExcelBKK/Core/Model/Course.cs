using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExcelBKK.Core.Model
{
    public class Course
    {
        public long courseId { get; set; }
        public long userId { get; set; }
        public string courseName { get; set; }
        public string courseDescription { get; set; }
        public string courseCategory { get; set; }
        public string startTime { get; set; }
        public string endTime { get; set; }
        public long numberOfStudent { get; set; }
        public string instructorName { get; set; }
        public DateTime entryDate { get; set; }
    }
}