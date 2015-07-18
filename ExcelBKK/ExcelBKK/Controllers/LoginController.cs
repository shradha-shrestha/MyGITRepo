using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ExcelBKK.CommonController;
using ExcelBKK.Core.Implementation;
using ExcelBKK.Core.Model;

namespace ExcelBKK.Controllers
{
    public class LoginController : Controller
    {
        //
        // GET: /Login/
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult mainLogin(string loginName, string loginPassword)
        {
            var Jcon = new JsonContainer();
            var objUserAccountHelper = new UserAccountHelper();
            var dt = objUserAccountHelper.SelectUserByLoginDetails(loginName, loginPassword);

            if (dt.Rows.Count <= 0)
            {
                Jcon.Result = -1;
                return Json(Jcon);
            }

            Session["userId"] = long.Parse(dt.Rows[0]["userId"].ToString());

            Jcon.Result = 1;
            return Json(Jcon);
        }

        public ActionResult registerUser(string firstName,
                                         string lastName,
                                         string nickName,
                                         string dateOfBirth,
                                         string role,
                                         string userName,
                                         string password)
        {
            int valid = 1;
            var Jcon = new JsonContainer();
            var objUserAccountHelper = new UserAccountHelper();

            if (objUserAccountHelper.VerifyUserName(userName))
            {
                Jcon.Result = -1;
                return Json(Jcon);
            }

            DateTime date;

            if (!DateTime.TryParse(dateOfBirth, out date))
            {
                Jcon.Result = 0;
                return Json(Jcon);
            }

            var userDetails = new UserAccount
            {
                firstName = firstName,
                lastName = lastName,
                nickName = nickName,
                dateOfBirth = date,
                role = role,
                userName = userName,
                password = password
            };

            try
            {
                objUserAccountHelper.InsertUserDetails(userDetails);
            }
            catch (Exception ex)
            {
                valid = 0;
            }

            Jcon.Result = valid;
            return Json(Jcon);            
        }

        public ActionResult updateUserDetails(string firstName,
                                        string lastName,
                                        string nickName,
                                        string dateOfBirth)
        {
            int valid = 1;
            var Jcon = new JsonContainer();
            var objUserAccountHelper = new UserAccountHelper();
            
            DateTime date;

            if (!DateTime.TryParse(dateOfBirth, out date))
            {
                Jcon.Result = 0;
                return Json(Jcon);
            }

            var userDetails = new UserAccount
            {
                userId = long.Parse(Session["userId"].ToString()),
                firstName = firstName,
                lastName = lastName,
                nickName = nickName,
                dateOfBirth = date
            };

            try
            {
                objUserAccountHelper.UpdateUserDetails(userDetails);
            }
            catch (Exception ex)
            {
                valid = 0;
            }

            Jcon.Result = valid;
            return Json(Jcon);  

        }

        public ActionResult logOut()
        {
            Session.Clear();
            return RedirectToAction("Index", "Login");
        }
	}
}