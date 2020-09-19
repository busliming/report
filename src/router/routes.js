const routes = [
  {
    path: "/",
    redirect: { name: "login" },
    component: () => import(/* webpackChunkName: "login" */ "src/pages/login/index.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import(/* webpackChunkName: "login" */ "src/pages/login/module/login.vue")
      },

      {
        path: "newpassword",
        name: "newpassword",
        component: () => import(/* webpackChunkName: "login" */ "src/pages/login/module/newpassword.vue")
      },
      {
        path: "password",
        name: "password",
        component: () => import(/* webpackChunkName: "login" */ "src/pages/login/module/password.vue")
      },
      {
        path: "browser",
        name: "browser",
        component: () => import(/* webpackChunkName: "login" */ "src/pages/login/module/browser.vue")
      },
      {
        path: "maintain",
        name: "maintain",
        component: () => import(/* webpackChunkName: "login" */ "src/pages/login/module/maintain.vue")
      },
      {
        path: "no_auth",
        name: "no_auth",
        component: () => import(/* webpackChunkName: "login" */ "src/pages/permission/index.vue")
      },
    ]
  },
  {
    path: "/main",
    name: "main_container",
    component: () => import("src/layouts/MyLayout.vue"),
    children: [
      //  首页
      {
        path: "home",
        name: "home",
        component: () => import(/* webpackChunkName: "home" */ "src/pages/home/index.vue")
      },
      //账户中心
      {
        path: "account",
        name: "account",
        component: () => import(/* webpackChunkName: "account" */ "src/pages/account/index.vue"),
        children: [
          {
            path: "basic",
            name: "basic",
            component: () => import(/* webpackChunkName: "account" */ "src/pages/account/basic/index.vue"),
          },
          {
            path: "basic_edit",
            name: "basic_edit",
            component: () => import(/* webpackChunkName: "account" */ "src/pages/account/basic/editEntry.vue"),
            meta: {
              father_menu: ['basic']
            }
          },
          {
            path: "secondary",
            name: "secondary",
            component: () => import(/* webpackChunkName: "account" */ "src/pages/account/secondary/index.vue"),
          },
          {
            path: "secondary_add",
            name: "secondary_add",
            component: () => import(/* webpackChunkName: "account" */ "src/pages/account/secondary/add.vue"),
            meta: {
              father_menu: ['secondary']
            }
          },
          {
            path: "secondary_update",
            name: "secondary_update",
            component: () => import(/* webpackChunkName: "account" */ "src/pages/account/secondary/update.vue"),
            meta: {
              father_menu: ['secondary']
            }
          },
          {
            path: "mykey",
            name: "mykey",
            component: () => import(/* webpackChunkName: "account" */ "src/pages/account/mykey/index.vue"),
          },
          {
            path: "betting",
            name: "betting",
            component: () => import(/* webpackChunkName: "account" */ "src/pages/account/betting/index.vue"),
          },
          {
            path: "betting_user_detail",
            name: "betting_user_detail",
            component: () => import(/* webpackChunkName: "account" */ "src/pages/account/betting/user_detail.vue"),
            meta: {
              father_menu: ['betting']
            }
          }
        ]
      },
      //  授权中心
      {
        path: "auth",
        name: "auth",
        component: () => import(/* webpackChunkName: "auth" */ "src/pages/auth/index.vue"),
        children: [
          {
            path: "user",
            name: "user",
            component: () => import(/* webpackChunkName: "auth" */ "src/pages/auth/user/index.vue"),
          },
          {
            path: "role",
            name: "role",
            component: () => import(/* webpackChunkName: "auth" */ "src/pages/auth/role/index.vue"),
          }
        ]
      },
      //  财务中心
      {
        path: "finance",
        name: "finance",
        component: () => import(/* webpackChunkName: "finance" */ "src/pages/finance/index.vue"),
        children: [
          {
            path: "liquidation",
            name: "liquidation",
            component: () => import(/* webpackChunkName: "finance" */ "src/pages/finance/liquidation/index.vue"),
          },
          {
            path: "statements",
            name: "statements",
            component: () => import(/* webpackChunkName: "finance" */ "src/pages/finance/statements/index.vue"),

          },
        ]
      },
      //数据中心
      {
        path: "data_center",
        name: "data_center",
        component: () => import(/* webpackChunkName: "data" */ "src/pages/data/index.vue"),
        children: [
          {
            path: "match_bonus",
            name: "match_bonus",
            component: () => import(/* webpackChunkName: "data" */ "src/pages/data/matchbonus/index.vue")
          },
          {
            path: "bet_slip",
            name: "bet_slip",
            component: () => import(/* webpackChunkName: "data" */ "src/pages/data/betslip/index.vue")
          },
          {
            path: "merchant_note",
            name: "merchant_note",
            component: () => import(/* webpackChunkName: "data" */ "src/pages/data/merchantnote/index.vue")
          },
          {
            path: "users",
            name: "users",
            component: () => import(/* webpackChunkName: "data" */ "src/pages/data/users/index.vue")
          },
          {
            path: "users_user_detail",
            name: "users_user_detail",
            component: () => import(/* webpackChunkName: "data" */ "src/pages/data/userdetail/index.vue"),
            meta: {
              father_menu: ['users']
            }
          }
        ]
      },
      //消息中心
      {
        path: "message_center",
        name: "message_center",
        component: () => import(/* webpackChunkName: "message" */ "src/pages/message/index.vue"),
        children: [
          {
            path: "bulletin",
            name: "bulletin",
            component: () => import(/* webpackChunkName: "message" */ "src/pages/message/bulletin/index.vue")
          },
          {
            path: "mymessage",
            name: "mymessage",
            component: () => import(/* webpackChunkName: "message" */ "src/pages/message/mymessage/index.vue")
          },

        ]
      },

      //设置中心
      {
        path: "setting",
        name: "setting",
        component: () => import(/* webpackChunkName: "setting" */ "src/pages/data/index.vue"),
        children: [
          {
            path: "merchantlevel",
            name: "merchantlevel",
            component: () => import(/* webpackChunkName: "setting" */ "src/pages/set/merchantlevel/index.vue")
          },
          {
            path: "platformrate",
            name: "platformrate",
            component: () => import(/* webpackChunkName: "setting" */ "src/pages/set/platformrate/index.vue")
          }
        ]
      }
    ]
  }
];

// Always leave this as last one
if (process.env.mOde !== "ssr") {
  routes.push({
    path: "*",
    component: () => import(/* webpackChunkName: "login" */ "src/pages/error/error404.vue")
  });
}

export default routes;
