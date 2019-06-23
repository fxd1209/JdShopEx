using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JdShopEx.Models
{
    public class OrderDetail
    {
        public int OrderDetailId { get; set; }      //详情id
        public int GoodsId { get; set; }            //商品id
        public int Count { get; set; }              //购买数量
        public double SmallPlan { get; set; }       //小计
        public int OrderId { get; set; }            //所属订单编号
        public Goods Goods { get; set; }            //商品对象
        public Order Order { get; set; }            //订单对象

    }
}