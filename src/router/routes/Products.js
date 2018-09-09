import Products from "@/views/external/Products";
import Product from "@/components/Product";

const route = {
  path: "/products",
  component: Products,
  children: [
    {
      path: ":routeID",
      component: Product,
      name: "product"
    },
    {
      path: "/",
      beforeEnter: (from, to, next) => {
        next("/products/start");
      }
    }
  ]
};

export default route;
