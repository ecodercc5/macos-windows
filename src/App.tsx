import React from "react";
import { Dock } from "./components/Dock";
import { MacOSApp } from "./components/MacOSApp";

function App() {
  return (
    <div className="App">
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
        <Dock>
          <MacOSApp state="opened" />
        </Dock>
      </div>
    </div>
  );
}

export default App;
