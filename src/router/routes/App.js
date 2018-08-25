import App from "@/views/external/App";
import CreateUser from "@/views/shared/CreateAccount";
import Login from "@/views/shared/Login";
import Main from "@/views/external/Main";
import eventView from "@/views/external/Event";
import EditHomePageContent from "@/views/internal/edit/home-page/EditHomePageContent";
import Admin from "@/views/internal/Admin.vue";

import requireAuth from "@/router/guards/AuthGuard";

const route = {
  path: "/app",
  name: "app",
  component: App,
  children: [
    {
      path: "create",
      component: CreateUser
    },
    {
      path: "login",
      component: Login
    },
    {
      path: "main",
      beforeEnter: (from, to, next) => requireAuth(from, to, next, "main"),
      component: Main
    },
    {
      path: "event/:eventID",
      name: "event",
      beforeEnter: (from, to, next) => requireAuth(from, to, next, "event"),
      component: eventView
    },
    {
      path: "admin",
      name: "admin",
      component: Admin,
      beforeEnter: (from, to, next) => requireAuth(from, to, next, "admin"),
      children: [
        {
          path: "edit",
          name: "editContent",
          component: EditHomePageContent
        }
      ]
    }
  ]
};

export default route;
