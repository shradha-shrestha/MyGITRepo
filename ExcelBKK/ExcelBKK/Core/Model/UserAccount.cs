using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExcelBKK.Core.Model
{
    public class UserAccount
    {
        public long userId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string nickName { get; set; }
        public DateTime dateOfBirth { get; set; }
        public string role { get; set; }        
        public string userName { get; set; }
        public string password { get; set; }
        public string isActive { get; set; }
    }
}