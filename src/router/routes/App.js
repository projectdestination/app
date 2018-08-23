import App from "@/views/external/App";
import CreateUser from "@/views/shared/CreateAccount";
import Login from "@/views/shared/Login";
import Main from "@/views/external/Main";
import eventView from "@/views/external/Event";

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
      component: Main
    },
    {
      path: "event/:eventID",
      name: "event",
      component: eventView
    }
  ]
};

export default route;
