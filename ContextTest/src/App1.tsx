import React from "react";
import ContentContainer from "./components/ContentContainer";
import createFastContext from "./contexts/createFastContext";
const { Provider, useStore } = createFastContext({
  first: "",
  last: "",
});
function App1() {
  console.log("App");
  return (
    <Provider>
      <div className="container">
        <h5>App</h5>
        <ContentContainer />
      </div>
    </Provider>
  );
}

export default App1;
