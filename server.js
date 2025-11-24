const WebSocket = require("ws");

const PORT = process.env.PORT || 10000;
const wss = new WebSocket.Server({ port: PORT });

console.log("Mock WS Server started on port", PORT);

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.send('{"protocol":"json","version":1}\x1e');

  ws.on("message", (msg) => {
    console.log("Received:", msg.toString());

    const clientIp = ws._socket.remoteAddress;
    console.log("Client IP:", clientIp);

    setTimeout(() => {
      ws.send(
        JSON.stringify({
          type: 3,
          invocationId: Date.now().toString(),
          status: "success",
          serverMessage: "Comment processed",
        }) + "\x1e"
      );
    }, 1000);
  });

  ws.on("close", () => console.log("Client disconnected"));
});
