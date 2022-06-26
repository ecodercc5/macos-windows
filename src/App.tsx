import React from "react";
import { Dock } from "./components/Dock";
import { MacOSApp } from "./components/MacOSApp";
import { MacOSAppContainer } from "./containers/MacOSAppContainer";
import { useAppIds } from "./hooks/use-app-ids";

function App() {
  const appIds = useAppIds();
  // const appIds = ["finder"];

  // console.log("Yo");
  console.log(appIds);

  return (
    <div className="App">
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
        <Dock>
          {appIds.map((id) => (
            <MacOSAppContainer key={id} appId={id} />
          ))}
        </Dock>
      </div>
    </div>
  );
}

{
  /* <MacOSApp
  icon="https://upload.wikimedia.org/wikipedia/commons/c/c9/Finder_Icon_macOS_Big_Sur.png"
  status="opened"
/>
<MacOSApp
  icon="https://cdn-bhcgp.nitrocdn.com/lQsUIlYWTGkhjqgYKmLJkHSBczAwGDPM/assets/static/optimized/rev-f8d7f54/wp-content/uploads/2020/07/findmy-1024x1024.png.webp"
  status="opened"
/> */
}

export default App;
