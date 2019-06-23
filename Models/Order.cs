using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JdShopEx.Models
{
    public class Order
    {   
        public int OrderId{ get; set; }                     //订单id
        public int Total { get; set; }                      //订单总价
        public DateTime CreatedDate { get; set; }           //订单创建时间
        public int UserId { get; set; }                     //订单所属用户id

        public User user { get; set; }                      // 订单所属用户
        public List<OrderDetail> OrderDetails { get; set; } //订单详情列表
    }
}