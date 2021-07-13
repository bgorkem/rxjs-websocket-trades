import { webSocket } from "rxjs/webSocket";

import { map, distinctUntilChanged, bufferTime } from "rxjs/operators";

export const createWebSocketSubject = () =>
  webSocket(`wss://ws.finnhub.io?token=${process.env.REACT_APP_FINNHUB_TOKEN}`);

export default function createConnection(wsSubject) {
  wsSubject.next({ type: "subscribe", symbol: "BINANCE:ETHUSDT" });
  wsSubject.next({ type: "subscribe", symbol: "BINANCE:BTCUSDT" });
  wsSubject.next({ type: "subscribe", symbol: "BINANCE:ETHEUR" });

  return {
    stream: wsSubject.pipe(
      bufferTime(5000),
      map((arrays) => arrays.map((a) => a.data).flat(1)),
      distinctUntilChanged()
    ),
    close: () => wsSubject.complete(),
  };
}
