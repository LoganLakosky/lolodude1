import { useState } from "react";
import MainContentWrapper from "./components/MainContentWrapper";

function App() {
  const [borderColor, setBorderColor] = useState<string>("#ffffff")

  return (
    <div className="mainPageContainer">
      <div className="mainPage" style={{ border: `2px solid ${borderColor}` }}>
        <MainContentWrapper border={setBorderColor} />
      </div>
    </div>
  );
}

export default App;
