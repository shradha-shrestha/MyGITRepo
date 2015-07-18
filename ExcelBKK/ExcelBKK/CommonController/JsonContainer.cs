using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExcelBKK.CommonController
{
    public class JsonContainer
    {
        public bool IsError { get; set; }
        public string ErrorMessage { get; set; }
        public object Result { get; set; }
    }
}