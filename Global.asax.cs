using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;


namespace JdShopEx
{
    public class MvcApplication : System.Web.HttpApplication
    {
            protected void Application_Start()
            {
                //第一次访问网站时，初始化数据
                Database.SetInitializer(new JdShopEx.Models.SimpleData());

                AreaRegistration.RegisterAllAreas();
                FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
                RouteConfig.RegisterRoutes(RouteTable.Routes);
                BundleConfig.RegisterBundles(BundleTable.Bundles);
            }
        }
}
