import React from "react";
import RouterGurad from "@/routers/RouterGurad";
import routeConfig from "@/routers";

import "./App.less";

function App() {
  return (
    <React.Suspense fallback={<></>}>
      <RouterGurad routes={routeConfig} />
    </React.Suspense>
  );
}

export default App;
