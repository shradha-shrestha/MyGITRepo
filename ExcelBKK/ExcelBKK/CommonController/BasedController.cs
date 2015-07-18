using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using ExcelBKK.Core.Model;
using ExcelBKK.Core.Implementation;

namespace ExcelBKK.CommonController
{
    public class BasedController : Controller
    {
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
			if (Session["userId"] == null || Session["userId"].ToString() == string.Empty)
            {
                filterContext.Result =  RedirectToAction("index","login");
                return;               
            }
            var sessionUserid = long.Parse(Session["userId"].ToString());

            var objUserAccountHelper = new UserAccountHelper();
            var sessionDt = objUserAccountHelper.SelectUserDetails(sessionUserid);

            ViewBag.UserName = sessionDt.Rows[0]["userName"].ToString();
            ViewBag.firstName = sessionDt.Rows[0]["firstName"].ToString();
            ViewBag.lastName = sessionDt.Rows[0]["lastName"].ToString();
            ViewBag.nickName = sessionDt.Rows[0]["nickName"].ToString();
            ViewBag.dateOfBirth = (Convert.ToDateTime(sessionDt.Rows[0]["dateOfBirth"].ToString())).ToString("yyyy-MM-dd");
            ViewBag.role = sessionDt.Rows[0]["role"].ToString().ToLower();
            ViewBag.isInstructor = ViewBag.role == "instructor";
        }
	}
}