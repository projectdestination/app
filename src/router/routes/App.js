// Views
import App from "@/views/external/App";
import Login from "@/views/shared/Login";
import Main from "@/views/external/Main";
import eventView from "@/views/external/Event";
import EditHomePageContent from "@/views/internal/edit/home-page/EditHomePageContent.vue";
import Admin from "@/views/internal/Admin.vue";

// Routes
import EventChildren from "./EventChildren";

// AuthGuard
import requireAuth from "@/router/guards/AuthGuard";

const route = {
  path: "/app",
  name: "app",
  component: App,
  children: [
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
      component: eventView,
      children: EventChildren
    },
    {
      path: "admin",
      name: "admin",
      component: Admin,
      beforeEnter: (from, to, next) => requireAuth(from, to, next, "admin"),
      children: [
        {
          path: "edit",
          component: EditHomePageContent
        }
      ]
    }
  ]
};

export default route;
