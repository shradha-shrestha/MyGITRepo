using System;
using System.Collections.Generic;
using System.Globalization;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ExcelBKK.CommonController;
using ExcelBKK.Core.Implementation;
using ExcelBKK.Core.Model;

namespace ExcelBKK.Controllers
{
    public class HomeController : BasedController
    {
        //
        // GET: /Home/
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult addCourse(string courseName,
                                         string courseDesc,
                                         string courseCategory,
                                         string startTime,
                                         string endTime,
                                         long noOfStudents)
        {
            int valid = 1;
            var Jcon = new JsonContainer();
            var objCourseHelper = new CourseHelper();

            var courseDetails = new Course
            {
                userId = long.Parse(Session["userId"].ToString()),
                courseName = string.Empty,
                startTime = string.Empty,
                endTime = string.Empty
            };

            try
            {
                var dtCourse = objCourseHelper.SearchCourse(courseDetails);

                courseDetails.courseName = courseName;
                courseDetails.courseDescription = courseDesc;
                courseDetails.courseCategory = courseCategory;
                courseDetails.startTime = startTime;
                courseDetails.endTime = endTime;
                courseDetails.numberOfStudent = noOfStudents;

                if (dtCourse.Rows.Count <= 0)
                    objCourseHelper.InsertCourse(courseDetails);
                else
                {    
                    var isValid = true;                        
                    var dummyStartTime = DateTime.Parse(startTime);
                    var dummyEndTime = DateTime.Parse(endTime);

                    //check condition for valid timing
                    foreach(DataRow row in dtCourse.Rows)
                    {
                        var rowStartTime = DateTime.Parse(row["startTime"].ToString());
                        var rowEndTime = DateTime.Parse(row["endTime"].ToString());

                        if (dummyStartTime < rowStartTime && dummyEndTime > rowEndTime)
                            isValid = false;
                        else if (dummyStartTime > rowStartTime && dummyStartTime < rowEndTime)
                            isValid = false;
                        else if (dummyEndTime > rowStartTime && dummyEndTime < rowEndTime)
                            isValid = false;
                            
                        if (!isValid)
                        {
                            Jcon.Result = -1;
                            return Json(Jcon);
                        }
                    }

                    if (isValid)
                        objCourseHelper.InsertCourse(courseDetails);
                }                    
            }
            catch (Exception ex)
            {
                valid = 0;
            }

            Jcon.Result = valid;
            return Json(Jcon);
        }

        public ActionResult loadCourses(string courseName)
        {
            var Jcon = new JsonContainer();
            var objCourseHelper = new CourseHelper();

            var courseDetails = new Course
            {
                userId = 0,
                courseName = string.Empty,
                startTime = string.Empty,
                endTime = string.Empty
            };

            var dtCourse = objCourseHelper.SearchCourse(courseDetails);
            List<Course> courseList = new List<Course>();

            foreach (DataRow dr in dtCourse.Rows)
            {
                Course course = new Course { courseName = dr["courseName"].ToString() };
                courseList.Add(course);
            }

            Jcon.Result = courseList.Distinct().OrderBy(x => x.courseName).ToList();
            return Json(Jcon);
        }

        public ActionResult loadCourseTimings(string courseName)
        {
            var Jcon = new JsonContainer();
            var objCourseHelper = new CourseHelper();

            var courseDetails = new Course
            {
                userId = 0,
                courseName = string.Empty,
                startTime = string.Empty,
                endTime = string.Empty
            };

            var dtCourse = objCourseHelper.SearchCourse(courseDetails);
            List<Course> courseList = new List<Course>();

            foreach (DataRow dr in dtCourse.Rows)
            {
                var course = new Course { startTime = dr["startTime"].ToString(),
                                              endTime = dr["startTime"].ToString() + " - " + dr["endTime"].ToString() };
                courseList.Add(course);
            }

            Jcon.Result = courseList.Distinct().OrderBy(x => x.startTime).ToList();
            return Json(Jcon);
        }

        public ActionResult searchResults(string courseName, string courseTiming)
        {
            string startTime = string.Empty, endTime = string.Empty;

            courseName = string.IsNullOrEmpty(courseName) ? "-SELECT-" : courseName;
            courseTiming = string.IsNullOrEmpty(courseTiming) ? "-SELECT-" : courseTiming;

            if (courseName.ToUpper() == "-SELECT-")
                courseName = string.Empty;

            if (courseTiming.ToUpper() == "-SELECT-")
                courseTiming = string.Empty;
            else
            {
                var substrings = courseTiming.Split('-');
                startTime = substrings[0].Trim(' ');
                endTime = substrings[1].Trim(' ');
            }

            var Jcon = new JsonContainer();
            var objCourseHelper = new CourseHelper();

            var courseDetails = new Course
            {
                userId = 0,
                courseName = courseName,
                startTime = startTime,
                endTime = endTime
            };

            var dtCourse = objCourseHelper.SearchCourse(courseDetails);
            List<Course> courseList = new List<Course>();

            foreach (DataRow dr in dtCourse.Rows)
            {
                var course = new Course
                {
                    courseName = dr["courseName"].ToString(),
                    courseDescription = dr["courseDescription"].ToString(),
                    courseCategory = dr["courseCategory"].ToString(),
                    startTime = dr["startTime"].ToString(),
                    endTime = dr["endTime"].ToString(),
                    numberOfStudent = long.Parse(dr["numberOfStudent"].ToString()),
                    instructorName = dr["instructorName"].ToString()
                    
                };
                courseList.Add(course);
            }

            Jcon.Result = courseList.Distinct().OrderBy(x => x.courseName).ToList();
            return Json(Jcon);
        }
    }
}