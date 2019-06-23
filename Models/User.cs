using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JdShopEx.Models
{
    /// <summary>
    /// 用户表
    /// </summary>
    public class User
    {

        public int UserId { get; set; }//用户编号
        public string UserName { get; set; }//用户姓名
        public string PassWord { get; set; }//用户密码
    }
}