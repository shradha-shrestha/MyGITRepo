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
    public class UserAccountHelper
    {
        private string connectionString = string.Empty;

        public UserAccountHelper()
        {
            connectionString = ConfigurationManager.ConnectionStrings["ExcelBkkDBKey"].ConnectionString;
        }

        public DataTable SelectUserDetails(long userId)
        {
            DataSet dataset = new DataSet();

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                var cmd = new SqlCommand("selectUserDetails", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@userId", userId));

                var adapter = new SqlDataAdapter(cmd);
                adapter.Fill(dataset);

                conn.Close();

                return dataset.Tables[0];
            }
        }

        public void InsertUserDetails(UserAccount userDetails)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();               
                var cmd = new SqlCommand("insertUserDetails", conn);
                cmd.CommandType = CommandType.StoredProcedure;                                  

                //cmd.Parameters.Add("@firstName", SqlDbType.NVarChar).Value = userDetails.firstName;
                cmd.Parameters.Add(new SqlParameter("@firstName", userDetails.firstName));
                cmd.Parameters.Add(new SqlParameter("@lastName", userDetails.lastName));
                cmd.Parameters.Add(new SqlParameter("@nickName", userDetails.nickName));
                cmd.Parameters.Add(new SqlParameter("@dateOfBirth", userDetails.dateOfBirth));
                cmd.Parameters.Add(new SqlParameter("@role", userDetails.role));
                cmd.Parameters.Add(new SqlParameter("@userName", userDetails.userName));
                cmd.Parameters.Add(new SqlParameter("@password", Cryptography.CreateHash(userDetails.password)));
                cmd.Parameters.Add(new SqlParameter("@isActive", 'Y'));
                cmd.ExecuteNonQuery();

                conn.Close();
            }
        }

        public void UpdateUserDetails(UserAccount userDetails)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                var cmd = new SqlCommand("updateUserDetails", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@userId", userDetails.userId));
                cmd.Parameters.Add(new SqlParameter("@firstName", userDetails.firstName));
                cmd.Parameters.Add(new SqlParameter("@lastName", userDetails.lastName));
                cmd.Parameters.Add(new SqlParameter("@nickName", userDetails.nickName));
                cmd.Parameters.Add(new SqlParameter("@dateOfBirth", userDetails.dateOfBirth));               
                
                cmd.ExecuteNonQuery();

                conn.Close();
            }
        }

        public bool VerifyUserName(string userName)
        {
            DataSet dataset = new DataSet();

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                var cmd = new SqlCommand("verifyUserName", conn);
                cmd.CommandType = CommandType.StoredProcedure;                
                cmd.Parameters.Add(new SqlParameter("@userName", userName));

                var adapter = new SqlDataAdapter(cmd);
                adapter.Fill(dataset);

                conn.Close();

                var abc = dataset.Tables[0].Rows.Count > 0;

                return dataset.Tables[0].Rows.Count > 0;
            }
        }

        public DataTable SelectUserByLoginDetails(string userName, string password)
        {
            var dataset = new DataSet();

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();

                var cmd = new SqlCommand("selectUserByLoginDetails", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@userName", userName));
                cmd.Parameters.Add(new SqlParameter("@password", Cryptography.CreateHash(password)));

                var adapter = new SqlDataAdapter(cmd);
                adapter.Fill(dataset);

                conn.Close();

                return dataset.Tables[0];
            }
        }
    }
}