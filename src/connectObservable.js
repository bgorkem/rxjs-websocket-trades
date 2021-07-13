import { webSocket } from "rxjs/webSocket";

import { map, distinctUntilChanged } from "rxjs/operators";

console.log(process.env.REACT_APP_FINNHUB_TOKEN);

export const createWebSocket = () =>
  webSocket(`wss://ws.finnhub.io?token=${process.env.REACT_APP_FINNHUB_TOKEN}`);

function createConnection(subject) {
  subject.next({ type: "subscribe", symbol: "BINANCE:ETHUSDT" });
  subject.next({ type: "subscribe", symbol: "BINANCE:BTCUSDT" });
  subject.next({ type: "subscribe", symbol: "BINANCE:ETHEUR" });

  return {
    subject: subject.pipe(
      map((v) => v.data),
      distinctUntilChanged()
    ),
    close: () => subject.complete(),
  };
}

export default createConnection;
