// server.js
// where all the backend magic happens
// dont expect any of this code to be sane
// i code like a drunk monkey on a xanax overdose

const express = require("express");
const kahoot = require("kahoot.js-updated");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
const listener = app.listen(port, () => {
  console.log("Kahot listening on port " + listener.address().port);
});
const io = require("socket.io")(listener);
io.on("connection", (socket) => {
  var pin = "";
  var name = ""
  socket.on("pin", (number) => {
    pin = number;
    socket.emit("stateChange", 2)
  })
  var client = new kahoot();
  function init(Client){
    Client.on("Joined", ()=>{
    socket.emit("stateChange", 3)
  })
  Client.on("QuizStart", ()=>{
    socket.emit("stateChange", 9)
  })
  Client.on("Disconnect", (string)=>{
    client=new kahoot();
    init(client);
  socket.emit("stateChange", 1)
  })
  Client.on("QuestionReady", (data) => {
    console.log(JSON.stringify(data))
    socket.emit("stateChange", 4)
  })
  Client.on("QuestionStart", (data) => {
    console.log(JSON.stringify(data));
    if(data.layout == "TRUE_FALSE"){
      socket.emit("stateChange", 10)
    }else if(data.layout == "CLASSIC"){
    socket.emit("stateChange", 5)
    }else if(data.type = "multiple_select_quiz"){
      socket.emit("stateChange", 11)
    }
  })
  Client.on("QuestionEnd", (data)=> {
    socket.emit("QuestionStats", JSON.stringify(data))
    socket.emit("stateChange", 7);
  })
  }
  socket.on("nick", (name) => {
    name=name.split("").join("​");
    client.join(pin, name);
    init(client)
    socket.emit("stateChange", 8)
  })
  socket.on("disconnect", ()=>{
    client.leave()
  })
  socket.on("answer", (answer) => {
    client.answer(answer);
    socket.emit("stateChange", 6)
  })
  
})
