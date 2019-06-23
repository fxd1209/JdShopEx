using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using JdShopEx.Models;

namespace JdShopEx.Controllers
{
    public class PageController : Controller
    {
        //首先需要创建一个数据库上下文访问的对象
        StoreDBContext db = new StoreDBContext();

        //get方式，直接访问名为Login.cshtml的视图
        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(User user)
        {
            //先去数据库中根据传递进来的用户名和密码判断是否存在这个用户
            User us = db.Users.SingleOrDefault(u => u.UserName == user.UserName && u.PassWord == user.PassWord);
            if (us != null)
            {
                //如果存在，就给这个对象存到Session中
                Session["user"] = us;
                return RedirectToAction("GoodsList");
            }
            else
            {
                //利用ViewBag的方式把参数传递回前台
                ViewBag.error = "用户名或者密码错误";
                return View();
            }
        }
        //get方式，直接访问名为Register.cshtml的视图
        [HttpGet]
        public ActionResult Register()
        {
            return View();
        }

        public ActionResult ShowGoods()
        {
            return View(db.Goods);
        }


        [HttpPost]
        public ActionResult Register(User user)
        {
            //我们使用数据模型的方式，把属性注入到对象中传递过来,调用模型集合的Add方法
            db.Users.Add(user);
            db.SaveChanges();

            return RedirectToAction("Login");
        }


        //先直接访问商品列表页面
        public ActionResult GoodsList()
        {
            //得到session
            User user = (User)Session["user"];
            if (user == null)
            {
                return RedirectToAction("Login");
            }
           ViewBag.username = user.UserName;
            return View();
        }
        //页面通过ajax的请求得到分页的商品数据
        [HttpPost]
        public ActionResult GoodsList(string title = "", int pageIndex = 1)
        {
            //然后设置每页显示的条数
            int pageSize = 10;
            //根据商品的编号排序，然后contains模糊查询 ,然后通过skip和take取得数据
            var goods = db.Goods.Where(g => g.GoodsName.Contains(title)).OrderBy(g => g.GoodsId).Skip((pageIndex - 1) * pageSize).Take(pageSize);
            //构建视图模型，填充商品列表和分页的数据
            var goodsViewModel = new GoodsViewModel
            {
                Goods = goods,
                PageInfo = new PageInfo
                {
                    PageSize = pageSize,
                    PageIndex = pageIndex,
                    Count = db.Goods.Where(g => g.GoodsName.Contains(title)).Count()
                }
            };
            //返回json数据
            return Json(goodsViewModel, JsonRequestBehavior.AllowGet);
        }
        //ajax加载购物车中的商品列表
        public ActionResult LoadCartList()
        {
            //得到session
            User user = (User)Session["user"];
            List<Cart> list = db.Carts.Include("Goods").Where(c => c.UserId == user.UserId).ToList();
            var jsonObject = new
            {
                cartList = list
            };
            return Json(jsonObject, JsonRequestBehavior.AllowGet);
        }



        //显示商品详情
        /*  public ActionResult GoodsDetail(int id)
          {
              var goods = db.Goods.Find(id);
              return View(goods);
          }*/

        //ajax添加购物车
        [HttpPost]
        public ActionResult AjaxAddCart(int id)
        {
            //先从Session中得到当前用户的信息
            var user = (User)Session["user"];
            //根据用户的id和商品的id判断这个用户在购物车中是否存在这条数据
            var cart = db.Carts.SingleOrDefault(c => c.Goods.GoodsId == id && c.UserId == user.UserId);
            //不存在就创建一个购物车对象信息，并且添加到数据库中
            if (cart == null)
            {
                cart = new Cart
                {
                    Count = 1,
                    GoodsId = id,
                    Goods = db.Goods.Find(id),
                    UserId = user.UserId,

                    CreatedDate = DateTime.Now

                };
                db.Carts.Add(cart);
            }
            else
            {
                //否则找到这个商品的信息把数量自增
                cart.Count++;
            }
            db.SaveChanges();
            return Json("成功", JsonRequestBehavior.AllowGet);
        }


        //添加购物车
        [HttpGet]
        public ActionResult AddCart(int id)
        {
            //先从Session中得到当前用户的信息
            var user = (User)Session["user"];
            //根据用户的id和商品的id判断这个用户在购物车中是否存在这条数据
            var cart = db.Carts.SingleOrDefault(c => c.Goods.GoodsId == id && c.UserId == user.UserId);
            //不存在就创建一个购物车对象信息，并且添加到数据库中
            if (cart == null)
            {
                cart = new Cart
                {
                    Count = 1,
                    GoodsId = id,
                    Goods = db.Goods.Find(id),
                    UserId = user.UserId,

                    CreatedDate = DateTime.Now

                };
                db.Carts.Add(cart);
            }
            else
            {
                //否则找到这个商品的信息把数量自增
                cart.Count++;
            }
            db.SaveChanges();
            return RedirectToAction("CartList");
        }
        //显示所有列表
        public ActionResult CartList()
        {
            var user = (User)Session["user"];
            var carts = db.Carts.Include("Goods").Where(c => c.UserId == user.UserId).ToList();
            return View(carts);
        }

        //ajax计算价格
        public JsonResult ComputedPrice(int[] cartId)
        {
            double sum = 0;
            /*添加if-else判断，当购物车为空时，不会抛出异常*/
            if (cartId == null)
            {
                sum = 0000;
            }
            else
            {
                foreach (int id in cartId)
                {
                    Cart cart = db.Carts.Include("Goods").Single(c => c.CartId == id);
                    sum += cart.Count * cart.Goods.GoodsPrice;
                }
            }

            //get方式访问一定要后面这句
            return Json(sum, JsonRequestBehavior.AllowGet);
        }
        //ajax更改购物车商品的数目
        public JsonResult ChangeCount()
        {
            int cartId = int.Parse(Request["cartId"]);
            Cart cart = db.Carts.Single(c => c.CartId == cartId);
            cart.Count++;
            db.SaveChanges();
            return Json(null);
        }


        //删除购物车
        public JsonResult DelCartId()
        {
            int cartId = int.Parse(Request["cartId"]);
            Cart cart = db.Carts.Single(c => c.CartId == cartId);
            db.Carts.Remove(cart); //删除购物车商品
            db.SaveChanges();
            return Json(null);
        }

        /**
         * 显示商品详细信息，取消原来post数据，直接链接，下面放session里面是很不合理的
         * */
        public ActionResult GoodsDetail()
        {
            int goodsid = int.Parse(Request.Params["goodsId"]);
          //  int goodsid = int.Parse(Request["goodsId"]);
            var good = db.Goods.Find(goodsid);
            ViewData["GoodDetail"] = good;
            //  Session["GoodDetail"] = good;
            return View();
        }
        //显示商品详细信息
         //public  ActionResult GoodsDetail()
         //{
            
         //    return View();
         //}
    }
    
}
