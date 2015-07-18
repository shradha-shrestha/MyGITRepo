using System;
using System.Security.Cryptography;
using System.Text;

namespace ExcelBKK.Core.Implementation
{
    public static class Cryptography
    {
        private static string itoa64 = "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        public static bool VerifyHash(string text, string hash)
        {
            if (hash.Length == 34) return (hashCryptPrivate(ASCIIEncoding.ASCII.GetBytes(text), hash, itoa64) == hash);
            return false;
        }

        public static string CreateHash(string text)
        {
            byte[] random = ASCIIEncoding.ASCII.GetBytes("123456");

            string hash = hashCryptPrivate(ASCIIEncoding.ASCII.GetBytes(text), hashGensaltPrivate(random, itoa64), itoa64);

            if (hash.Length == 34) return hash;

            return sMD5(text);
        }

        private static string hashCryptPrivate(byte[] text, string genSalt, string itoa64)
        {
            string output = "*";
            MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
            if (!genSalt.StartsWith("$H$")) return output;
            //   $count_log2 = strpos($itoa64, $setting[3]);
            int count_log2 = itoa64.IndexOf(genSalt[3]);
            if (count_log2 < 7 || count_log2 > 30) return output;

            int count = 1 << count_log2;
            byte[] salt = ASCIIEncoding.ASCII.GetBytes(genSalt.Substring(4, 8));

            if (salt.Length != 8) return output;

            byte[] hash = md5.ComputeHash(Combine(salt, text));

            do
            {
                hash = md5.ComputeHash(Combine(hash, text));
            } while (count-- > 1);

            output = genSalt.Substring(0, 12);
            output += hashEncode64(hash, 16, itoa64);

            return output;
        }

        private static byte[] Combine(byte[] b1, byte[] b2)
        {
            byte[] retVal = new byte[b1.Length + b2.Length];
            Array.Copy(b1, 0, retVal, 0, b1.Length);
            Array.Copy(b2, 0, retVal, b1.Length, b2.Length);
            return retVal;
        }

        private static string hashEncode64(byte[] input, int count, string itoa64)
        {
            string output = "";
            int i = 0; int value = 0;

            do
            {
                value = input[i++];
                output += itoa64[value & 0x3f];

                if (i < count) value |= input[i] << 8;
                output += itoa64[(value >> 6) & 0x3f];
                if (i++ >= count)
                    break;

                if (i < count) value |= input[i] << 16;
                output += itoa64[(value >> 12) & 0x3f];
                if (i++ >= count)
                    break;

                output += itoa64[(value >> 18) & 0x3f];

            } while (i < count);

            return output;
        }

        private static string hashGensaltPrivate(byte[] input, string itoa64)
        {
            int iteration_count_log2 = 6;

            string output = "$H$";
            output += itoa64[Math.Min(iteration_count_log2 + 5, 30)];
            output += hashEncode64(input, 6, itoa64);

            return output;
        }

        private static string sMD5(string text)
        { return sMD5(text, false); }

        private static string sMD5(string text, bool raw)
        {
            MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
            if (raw) return Encoding.ASCII.GetString(md5.ComputeHash(Encoding.ASCII.GetBytes(text)));
            else return BitConverter.ToString(md5.ComputeHash(Encoding.ASCII.GetBytes(text))).Replace("-", "");
        }        
    }
}