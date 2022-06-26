import React, { useState } from "react";
import { Dock } from "./components/Dock";
import { MacOSApp } from "./components/MacOSApp";
import { MacOSAppContainer } from "./containers/MacOSAppContainer";
import { useAppIds } from "./hooks/use-app-ids";

function App() {
  const appIds = useAppIds();
  // const appIds = ["finder"];

  const [, setState] = useState({});

  // console.log("Yo");
  console.log(appIds);

  return (
    <div className="App">
      <button onClick={() => setState({})}>Re-render</button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
        <Dock>
          {appIds.map((id) => (
            // <li key={id}>{id}</li>
            <MacOSAppContainer key={id} appId={id} />
          ))}
        </Dock>
      </div>
    </div>
  );
}

export default App;
