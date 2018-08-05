export default function consoleLog(message, type) {
  if (process.env.NODE_ENV === "development") {
    if (type === "table") {
      typeof message !== "object"
        ? console.error("Log for ", type, "must be object.")
        : console.table(message);
    } else {
      console.log(message);
    }
  }
}
