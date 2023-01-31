const socket = io("http://192.168.1.3:3000");

var PersonalID = null;
var readyToPlay = false;
socket.on("connection", (conected) => {
  console.log("Ya estoy conectado");
});
socket.on("setID", (ID) => {
  PersonalID = ID;
  console.log(ID);
});
socket.on("ready", () => {
  console.log("All players are connected");
  readyToPlay = true;
});
function sendEvent(eventType) {
  socket.emit("action", {
    autor: PersonalID,
    eventType,
  });
}
// socket.on("getAction", (eventType) => {
//   if (eventType.eventType.action == "move") {
//     PlayerTwo.move(eventType.eventType.to, 0);
//   }
// });
