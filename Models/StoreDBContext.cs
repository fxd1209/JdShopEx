using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace JdShopEx.Models
{
    public class StoreDBContext : DbContext
    {
        //一个类继承DBContext后，放在类中的所有的DbSet类型的数据模型都会被数据库创建表结构
        public DbSet<User> Users { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Goods> Goods { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }


    }
}