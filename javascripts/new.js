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
    "https://firebasestorage.googleapis.com/v0/b/project-destination.appspot.com/o/images%2Fclassroom.jpg?alt=media&token=2f0f2b72-9d97-41c8-b114-37f3e971733e";
  return obj;
}
