import EventView from "@/views/Event";
const route = {
  path: "/event/:eventID",
  name: "publicEvent",
  component: EventView
};

export default route;
