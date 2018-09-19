export function eventForProductPage(payload) {
  const obj = {};
  obj.type = "event";
  obj.title = payload.title;
  obj.key = payload.key;
  obj.properties = {
    time: "",
    location: "",
    reach: ""
  };
  obj.text = "";
  obj["image-url"] =
    "https://firebasestorage.googleapis.com/v0/b/project-destination.appspot.com/o/20180329_181154.jpg?alt=media&token=78752082-d7b1-442f-9048-6d0c93e06f42";
  return obj;
}
