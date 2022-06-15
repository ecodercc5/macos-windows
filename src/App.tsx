import React from "react";
import { Dock } from "./components/Dock";

function App() {
  return (
    <div className="App">
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
        <Dock>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Finder_Icon_macOS_Big_Sur.png"
            className="h-[50px] w-[50px]"
          />
        </Dock>
      </div>
    </div>
  );
}

export default App;
