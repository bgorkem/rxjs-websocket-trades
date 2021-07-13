import React, { useState } from "react";

import "./App.css";

import createConnection, { createWebSocketSubject } from "./connection";

import Blotter from "./Blotter";

function App() {
  const [connection, setConnection] = useState(null);

  const [data, setData] = useState([]);

  const onConnect = () => {
    const connection = createConnection(createWebSocketSubject());
    setConnection(connection);
    connection.stream.subscribe(setData);
  };

  const onDisconnect = () => {
    if (!connection) {
      return;
    }
    connection.close();
    setConnection(null);
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          {!connection && <button onClick={onConnect}>Connect</button>}

          {connection && <button onClick={onDisconnect}>Disconnect</button>}

          {/* <ul>
          {data &&
            data.map((d, i) => (
              <li key={i}>
                {d.s}: {d.p} : {new Date(d.t).toLocaleString()} : {d.v}
              </li>
            ))}
        </ul> */}
        </header>
        <p> {connection ? "Connection Open" : "Not connected"}</p>

        <Blotter data={data} />
      </div>
    </>
  );
}

export default App;
