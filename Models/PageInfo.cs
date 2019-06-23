using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JdShopEx.Models
{
    public class PageInfo
    {
        public int PageIndex { get; set; }  //当前页
        public int Count { get; set; }      //总条数
        public int PageSize { get; set; }   //每页显示的条数
        public int Total                    //总页数的算法
        {
            get 
            {
                return Count % PageSize == 0 ? Count / PageSize : Count / PageSize + 1;
            }
        }

    }
}