import React, { useState } from "react";

import "./App.css";

import createConnection, { createWebSocket } from "./connectObservable";

import Blotter from "./Blotter";

function App() {
  const [connection, setConnection] = useState(null);

  const [data, setData] = useState(null);

  const onConnect = () => {
    const connection = createConnection(createWebSocket());
    setConnection(connection);
    connection.subject.subscribe(console.log);
    connection.subject.subscribe(setData);
  };

  const onDisconnect = () => {
    console.log(connection);
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
          <button onClick={onConnect}>Connect</button>

          {<button onClick={onDisconnect}>Disconnect</button>}

          {/* <ul>
          {data &&
            data.map((d, i) => (
              <li key={i}>
                {d.s}: {d.p} : {new Date(d.t).toLocaleString()} : {d.v}
              </li>
            ))}
        </ul> */}
        </header>
        {connection && <p>{"Connection Open"}</p>}

        <Blotter data={data} />
      </div>
    </>
  );
}

export default App;
