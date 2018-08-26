import Status from "@/components/app/event/Status.vue";
import Preferences from "@/components/app/event/Preferences.vue";
import Documents from "@/components/app/event/Documents.vue";

const children = [
  {
    path: "status",
    name: "event_status",
    component: Status
  },
  {
    path: "preferences",
    name: "event_preferences",
    component: Preferences
  },
  {
    path: "documents",
    name: "event_documents",
    component: Documents
  }
];

export default children;
