import { useState } from "react";
import MainContent from "./MainContent";
import MainContentNavBar from "./MainContentNavBar";

type MainContentWrapperProps = {
  border: React.Dispatch<React.SetStateAction<string>>;
};

export default function MainContentWrapper({ border }: MainContentWrapperProps) {

  const [boxShadowColor, setBoxShadowColor] = useState<string>("")


  return (
    <div className="mainContentContainer">
      <MainContentNavBar border={border} setBoxShadowColor={setBoxShadowColor} />

      <MainContent boxShadowColor={boxShadowColor} />
    </div>
  );
}
//<div className="mainContentCenter"></div>
