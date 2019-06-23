using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JdShopEx.Models
{
    public class Goods
    {
        public int GoodsId{get;set;}            //商品id
        public string GoodsName { get; set; }   //商品名称
        public double GoodsPrice { get; set; }  //商品单价
        public string GoodsImg { get; set; }    //商品库存

        public string GoodsDetail { get; set; } //商品详细信息

    }
}