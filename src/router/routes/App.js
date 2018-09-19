// Views
import App from "@/views/external/App";
import Login from "@/views/shared/Login";
import Main from "@/views/external/Main";
import eventView from "@/views/external/Event";
import EditHomePageContent from "@/views/internal/edit/home-page/EditHomePageContent.vue";
import Admin from "@/views/internal/Admin.vue";
import SuperUser from "@/views/internal/SuperUser";
import Events from "@/views/internal/Events";
import Users from "@/views/internal/Users";
import AdminDashboard from "@/views/internal/AdminDashboard";
import EventEditor from "@/views/internal/EditEvent";
import EventTable from "@/components/app/event/EventTable";
import UserTable from "@/components/app/user/UserTable";
import CompanyTable from "@/components/app/company/CompanyTable";
import Companies from "@/views/internal/Companies";

// Routes
import EventChildren from "./EventChildren";
import Content from "./Content";

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
      path: "super",
      beforeEnter: (from, to, next) => requireAuth(from, to, next, "super"),
      component: SuperUser,
      children: []
    },
    {
      path: "admin",
      component: Admin,
      beforeEnter: (from, to, next) => requireAuth(from, to, next, "admin"),
      children: [
        {
          path: "/",
          component: AdminDashboard
        },
        {
          path: "edit",
          component: EditHomePageContent
        },
        {
          path: "companies",
          component: Companies,
          children: [
            {
              path: "/",
              component: CompanyTable
            }
          ]
        },
        {
          path: "users",
          component: Users,
          children: [
            {
              path: "/",
              component: UserTable
            }
          ]
        },
        {
          path: "events",
          component: Events,
          children: [
            {
              path: ":id",
              component: EventEditor
            },
            {
              path: "/",
              component: EventTable
            }
          ]
        },
        Content
      ]
    }
  ]
};

export default route;
