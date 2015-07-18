using System;
using System.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using ExcelBKK.Core.Model;

namespace ExcelBKK.Core.Implementation
{
    public class CourseHelper
    {
        private string connectionString = string.Empty;

        public CourseHelper()
        {
            connectionString = ConfigurationManager.ConnectionStrings["ExcelBkkDBKey"].ConnectionString;
        }

        public void InsertCourse(Course courseDetails)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                var cmd = new SqlCommand("insertCourseDetails", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@userId", courseDetails.userId));
                cmd.Parameters.Add(new SqlParameter("@courseName", courseDetails.courseName));
                cmd.Parameters.Add(new SqlParameter("@courseDescription", courseDetails.courseDescription));
                cmd.Parameters.Add(new SqlParameter("@courseCategory", courseDetails.courseCategory));
                cmd.Parameters.Add(new SqlParameter("@startTime", courseDetails.startTime));
                cmd.Parameters.Add(new SqlParameter("@endTime", courseDetails.endTime));
                cmd.Parameters.Add(new SqlParameter("@numberOfStudent", courseDetails.numberOfStudent));
                cmd.ExecuteNonQuery();

                conn.Close();
            }
        }

        public DataTable SearchCourse(Course courseDetails)
        {
            DataSet dataset = new DataSet();

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                var cmd = new SqlCommand("searchCourse", conn);
                cmd.CommandType = CommandType.StoredProcedure;               

                cmd.Parameters.Add(new SqlParameter("@userId", courseDetails.userId));
                cmd.Parameters.Add(new SqlParameter("@courseName", courseDetails.courseName));
                cmd.Parameters.Add(new SqlParameter("@startTime", courseDetails.startTime));
                cmd.Parameters.Add(new SqlParameter("@endTime", courseDetails.endTime));

                var adapter = new SqlDataAdapter(cmd);
                adapter.Fill(dataset);

                conn.Close();

                return dataset.Tables[0];
            }
        }
    }
}