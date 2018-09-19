import Content from "@/views/internal/Content";
import EditProducts from "@/views/internal/EditProducts";
import EditHomePage from "@/views/internal/EditHomePage";

const route = {
  path: "content",
  name: "content",
  component: Content,
  children: [
    {
      path: "products",
      component: EditProducts
    },
    {
      path: "home",
      component: EditHomePage
    }
  ]
};

export default route;
