function connect(onMessage) {
  const socket = new WebSocket(
    `wss://ws.finnhub.io?token=${process.env.REACT_APP_FINNHUB_TOKEN}`
  );

  // Connection opened -> Subscribe
  socket.addEventListener("open", function (event) {
    socket.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
    socket.send(
      JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" })
    );
    socket.send(JSON.stringify({ type: "subscribe", symbol: "IC MARKETS:1" }));
  });

  // Listen for messages
  socket.addEventListener("message", onMessage);

  // Unsubscribe
  const unsubscribe = function (symbol) {
    socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
  };

  return () => socket.close();
}

export default connect;
