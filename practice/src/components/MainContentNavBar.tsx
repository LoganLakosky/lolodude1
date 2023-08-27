import { useState } from "react";
import "./styleSheets/mainContentNavBar.css";

type MainContentNavBarProps = {
  border: React.Dispatch<React.SetStateAction<string>>;
  setBoxShadowColor: React.Dispatch<React.SetStateAction<string>>;
};

export default function MainContentNavBar({ border, setBoxShadowColor }: MainContentNavBarProps) {
  const [newColors, setNewColors] = useState<string[]>();
  const [newThemeColor, setNewThemeColor] = useState<string>("grey");

  //Add more colors
  const colorsArray: string[] = [
    "#45d6bd",
    "#ffc0cb",
    "#dac2c8",
    "#d3ffce",
    "#ef4b34",
    "#e61234",
    "#e58835",
    "#da1984",
    "#e2a754",
    "#ffffff",
    "#D2B4DE",
    "#E6B0AA",
    "#D5F5E3",
    "#33E3FF",
    "#FF00FF",
    "#FFA4DC",
    "#E08EFF",
    "#D800ED",
    "#64FD00",
    "#FFEA50",
    "#FF1919",
    "#D4FF15",
  ];

  function generateNewColors() {
    const shuffledArray: string[] = colorsArray.sort((a, b) => 0.5 - Math.random());
    const tmpColors: string[] = [];

    for (let i = 0; i < 5; i++) {
      tmpColors.push(shuffledArray[i]);
    }

    setNewColors(tmpColors);
  }

  function updatePagesColor(newBorderColor: string) {
    border(newBorderColor);
    setNewThemeColor(newBorderColor);
    setBoxShadowColor(newBorderColor);
  }

  return (
    <div className="mainContentNavContainer">
      <div className="mainContentTopLeft" style={{ backgroundColor: newThemeColor }}></div>
      <div className="mainContentNav" style={{ boxShadow: `${newThemeColor} 0px 2px 10px` }}>
        <div className="changeColorsContainer">
          <button className="createNewColorsBtn" onClick={() => generateNewColors()}>
            Generate New Colors
          </button>

          {!newColors && (
            <>
              <button
                className="colorBtns"
                style={{ backgroundColor: "	#E5E4E2" }}
                onClick={() => updatePagesColor("	#E5E4E2")}
              ></button>
              <button
                className="colorBtns"
                style={{ backgroundColor: "#ffffff" }}
                onClick={() => updatePagesColor("#ffffff")}
              ></button>
              <button
                className="colorBtns"
                style={{ backgroundColor: "#ff4040" }}
                onClick={() => updatePagesColor("#ff4040")}
              ></button>
              <button
                className="colorBtns"
                style={{ backgroundColor: "#7feaff" }}
                onClick={() => updatePagesColor("#7feaff")}
              ></button>
              <button
                className="colorBtns"
                style={{ backgroundColor: "#d47fff" }}
                onClick={() => updatePagesColor("#d47fff")}
              ></button>
            </>
          )}

          {newColors?.map((item) => {
            return (
              <button
                className="colorBtns"
                key={item}
                style={{ backgroundColor: item }}
                onClick={() => updatePagesColor(item)}
              ></button>
            );
          })}
        </div>
        <div className="profilePictureContainer"></div>
      </div>
    </div>
  );
}
