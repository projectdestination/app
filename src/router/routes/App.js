import App from "@/views/external/App";
import CreateUser from "@/views/shared/CreateAccount";
import Login from "@/views/shared/Login";

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
    }
  ]
};

export default route;
