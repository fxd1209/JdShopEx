using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace JdShopEx.Models
{
    //需要为数据库创建时的表中添加一些数据，数据模型
    public class SimpleData : DropCreateDatabaseIfModelChanges<StoreDBContext>
    {
        protected override void Seed(StoreDBContext context)
        {
            
            var users = new List<User>
            {
                new User{UserName="admin",PassWord="123456"},
                new User{UserName="lisi",PassWord="123456"}
            };
            
            var goods = new List<Goods>
            {
                 new Goods{GoodsName="巧克力",GoodsPrice=18.5,GoodsImg="/Content/Images/巧克力.png",GoodsDetail="DOVE给人的感觉是入口即化，巧克力溶化后在舌头上的感觉就像丝绸一样滑爽，香浓可口。"},
                 new Goods{GoodsName="可达鸭",GoodsPrice=18.5,GoodsImg="/Content/Images/可达鸭.jpg",GoodsDetail="DOVE给人的感觉是入口即化，巧克力溶化后在舌头上的感觉就像丝绸一样滑爽，香浓可口。"},
                 new Goods{GoodsName="帽子",GoodsPrice=18.5,GoodsImg="/Content/Images/maomaozi.jpg",GoodsDetail="DOVE给人的感觉是入口即化，巧克力溶化后在舌头上的感觉就像丝绸一样滑爽，香浓可口。"},
                 new Goods{GoodsName="加菲",GoodsPrice=18.5,GoodsImg="/Content/Images/加菲猫.png",GoodsDetail="DOVE给人的感觉是入口即化，巧克力溶化后在舌头上的感觉就像丝绸一样滑爽，香浓可口。"},
                 new Goods{GoodsName="曲奇饼",GoodsPrice=18.5,GoodsImg="/Content/Images/白色恋人.png",GoodsDetail="DOVE给人的感觉是入口即化，巧克力溶化后在舌头上的感觉就像丝绸一样滑爽，香浓可口。"},
                 new Goods{GoodsName="卷发棒",GoodsPrice=18.5,GoodsImg="/Content/Images/卷发棒.png",GoodsDetail="DOVE给人的感觉是入口即化，巧克力溶化后在舌头上的感觉就像丝绸一样滑爽，香浓可口。"},
                 new Goods{GoodsName="拉面",GoodsPrice=18.5,GoodsImg="/Content/Images/拉面.png",GoodsDetail="DOVE给人的感觉是入口即化，巧克力溶化后在舌头上的感觉就像丝绸一样滑爽，香浓可口。"},
                 new Goods{GoodsName="猫衣服",GoodsPrice=18.5,GoodsImg="/Content/Images/猫衣服.png",GoodsDetail="DOVE给人的感觉是入口即化，巧克力溶化后在舌头上的感觉就像丝绸一样滑爽，香浓可口。"},
                 new Goods{GoodsName="牛肉饭",GoodsPrice=18.5,GoodsImg="/Content/Images/牛肉饭.jpeg",GoodsDetail="DOVE给人的感觉是入口即化，巧克力溶化后在舌头上的感觉就像丝绸一样滑爽，香浓可口。"},
                 new Goods{GoodsName="青梅酒",GoodsPrice=18.5,GoodsImg="/Content/Images/青梅酒.png",GoodsDetail="DOVE给人的感觉是入口即化，巧克力溶化后在舌头上的感觉就像丝绸一样滑爽，香浓可口。"},
                 new Goods{GoodsName="啦啦啦",GoodsPrice=18.5,GoodsImg="/Content/Images/1.jpg",GoodsDetail="DOVE给人的感觉是入口即化，巧克力溶化后在舌头上的感觉就像丝绸一样滑爽，香浓可口。"}
            };
            //把数据加载到数据库上下文类的对象集合中，相当于往数据库中添加
            users.ForEach(u => context.Users.Add(u));
            goods.ForEach(g => context.Goods.Add(g));
            //不要忘了save一下
            context.SaveChanges();
        }

    }
}