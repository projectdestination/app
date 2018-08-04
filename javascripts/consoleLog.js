export default function consoleLog(message) {
  if (process.env === 'development') console.log(message)
}
