import store from "@/store/store";

function requireAuth(to, from, next, type) {
  store.dispatch("user/checkAuthState", { type: "none" });
  console.log(type);
  store.watch(
    state => state.user.user,
    () => {
      const { user } = store.state.user;
      switch (type) {
        case "admin": {
          const isAdmin =
            user &&
            user.is_validated &&
            ["admin", "super"].includes(user.user_type);
          if (isAdmin) {
            next();
          } else {
            next("/access_error");
          }
          break;
        }
        case "super": {
          const isSuper =
            user && user.is_validated && user.user_type === "super";
          if (isSuper) {
            next("/app/admin");
          } else {
            next("/access_error");
          }
          break;
        }
        case "event": {
          const userIsAllowedOrIsAdminOrSuper =
            (user &&
              user.is_validated &&
              user.company_key === to.params.owner_key) ||
            ["admin", "super"].includes(user.user_type);
          if (userIsAllowedOrIsAdminOrSuper) {
            next();
          } else {
            next("/access_error");
          }
          break;
        }
        case "main": {
          const userIsAuth = user && user.is_validated;
          if (userIsAuth) {
            next();
          } else {
            next("/");
            store.dispatch("errors/setError", {
              error: true,
              message: "Sign in to access app.",
              type: "warning"
            });
          }
          break;
        }
        default:
          break;
      }
    }
  );
}

export default requireAuth;
