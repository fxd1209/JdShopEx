using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JdShopEx.Models
{
    public class Cart
    {

        public int CartId { get; set; }//购物车Id
        public int GoodsId { get; set; }//
        public int Count { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedDate { get; set; }

        public User User { get; set; }
        public Goods Goods { get; set; }
    }
}