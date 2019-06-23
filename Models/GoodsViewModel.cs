using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JdShopEx.Models
{
    public class GoodsViewModel
    {
        public IEnumerable<Goods> Goods { get; set; }       //商品列表视图模型
        public PageInfo PageInfo { get; set; }              //分页数据模型
    }
}