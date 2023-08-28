import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { faDove, faNoteSticky, faCameraRetro, faGear } from "@fortawesome/free-solid-svg-icons";
import "./styleSheets/MainContent.css";
import { useState } from "react";
import Todo from "./mainContentCenterComponents/TodoFile/Todo";
import Twitter from "./mainContentCenterComponents/TwitterFile/Twitter";
import Notes from "./mainContentCenterComponents/NotesFile/NotesTop";
import ImgConverter from "./mainContentCenterComponents/ImgConverterFile/ImgConverter";
import Settigns from "./mainContentCenterComponents/SettingsFile/Settings";

type MainContentProps = {
  boxShadowColor: string;
};

export default function MainContent({ boxShadowColor }: MainContentProps) {
  //Please select from the dropdown on the left
  const [showTodos, setShowTodos] = useState<boolean>(true);
  const [showTwitter, setShowTwitter] = useState<boolean>(false);
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [showImgConverter, setShowImgConverter] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  function updateMidPageContent(idx: number) {
    switch (idx) {
      case 1: {
        setShowTwitter(false);
        setShowNotes(false);
        setShowImgConverter(false);
        setShowSettings(false);

        setShowTodos(true);
        break;
      }
      case 2: {
        setShowTodos(false);
        setShowNotes(false);
        setShowImgConverter(false);
        setShowSettings(false);

        setShowTwitter(true);
        break;
      }

      case 3: {
        setShowTwitter(false);
        setShowTodos(false);
        setShowImgConverter(false);
        setShowSettings(false);

        setShowNotes(true);
        break;
      }
      case 4: {
        setShowTwitter(false);
        setShowTodos(false);
        setShowNotes(false);
        setShowSettings(false);

        setShowImgConverter(true);
        break;
      }

      case 5: {
        setShowTwitter(false);
        setShowTodos(false);
        setShowNotes(false);
        setShowImgConverter(false);

        setShowSettings(true);
        break;
      }
    }
  }

  return (
    <div className="mainContent">
      <div className="mainContentLeft" style={{ boxShadow: `${boxShadowColor} 0px 0px 10px` }}>
        <button className="leftSideBarBtns" onClick={() => updateMidPageContent(1)}>
          <FontAwesomeIcon
            icon={faRectangleList}
            style={{ width: "60%", height: "60%", color: boxShadowColor }}
          />
        </button>
        <button className="leftSideBarBtns" onClick={() => updateMidPageContent(2)}>
          <FontAwesomeIcon
            icon={faDove}
            style={{ width: "60%", height: "60%", color: boxShadowColor }}
          />
        </button>
        <button className="leftSideBarBtns" onClick={() => updateMidPageContent(3)}>
          <FontAwesomeIcon
            icon={faNoteSticky}
            style={{ width: "60%", height: "60%", color: boxShadowColor }}
          />
        </button>
        <button className="leftSideBarBtns" onClick={() => updateMidPageContent(4)}>
          <FontAwesomeIcon
            icon={faCameraRetro}
            style={{ width: "60%", height: "60%", color: boxShadowColor }}
          />
        </button>
        <button className="leftSideBarBtns" onClick={() => updateMidPageContent(5)}>
          <FontAwesomeIcon
            icon={faGear}
            style={{ width: "60%", height: "60%", color: boxShadowColor }}
          />
        </button>
      </div>
      <div className="mainContentCenter">
        {showTodos && <Todo borderColor={boxShadowColor} />}
        {showTwitter && <Twitter />}
        {showNotes && <Notes borderColor={boxShadowColor} />}
        {showImgConverter && <ImgConverter borderColor={boxShadowColor} />}
        {showSettings && <Settigns />}
      </div>
    </div>
  );
}
