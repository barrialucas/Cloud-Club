const io=require('../app.js')
const norm=require("../container/norm")
const messagesJson = new Container("../container/messages.json")


io.on("connection", async (socket) => {
  
    const messages = await messagesJson.getAll();
    const normalizedMsg = norm.normalizedMsg(messages);
    socket.emit("messages", normalizedMsg);
  
    function print(obj) {
      console.log(util.inspect(obj, false, 12, true));
    }
    socket.on("new-message", async (data) => {
      messagesJson.save(data);
      const messages = await messagesJson.getAll();
      const messagesId = {
              id: "normalize",
              allMessages: [messages]
          }
      const normalizedMsg = norm.normalizedMsg(messagesId,messages);
      io.sockets.emit("messages", normalizedMsg);
  
      print(normalizedMsg);
    });
  });