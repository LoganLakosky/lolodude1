import "./ImgConverter.css";
import { useState } from "react";

type ImgConverterProps = {
  borderColor: string;
};

export default function ImgConverter({ borderColor }: ImgConverterProps) {
  const [dragAndDropFile, setDragAndDropFile] = useState<File | undefined>();

  const [showFileType, setShowFileType] = useState<boolean>(false);

  const [availableConvertTypes, setAvailableConvertTypes] = useState<string[]>();

  //HIDE THIS BTN AGAIN
  const [showAvailableconvertTypes, setShowAvailableConvertTypes] = useState<boolean>(false);

  const [showConvertButton, setShowConvertButton] = useState<boolean>(false);

  const [showConvertTypes, setShowConvertTypes] = useState<boolean>(false);

  function handleImgChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    console.log(target.files[0].type);

    if (!validateImage(target.files[0].type)) {
      setShowConvertButton(false);
      setShowConvertTypes(false);
      setShowAvailableConvertTypes(false);
      return;
    }

    checkAvailableConvertTypes(target.files[0].type);

    setShowAvailableConvertTypes(true);

    console.log("target", target.files);
    setDragAndDropFile(target.files[0]);
    setShowFileType(true);
  }

  function validateImage(fileType: string): boolean {
    if (fileType !== "image/webp" && fileType !== "image/jpeg" && fileType !== "image/png") {
      alert(`${fileType} is not a supported fileType`);
      return false;
    }

    return true;
  }

  function checkAvailableConvertTypes(fileType: string) {
    if (fileType == "image/webp") {
      setAvailableConvertTypes(["png", "jpeg"]);
    } else if (fileType == "image/jpeg") {
      setAvailableConvertTypes(["png", "webp"]);
    } else if (fileType == "image/png") {
      setAvailableConvertTypes(["jpeg", "webp"]);
    }
    setShowConvertButton(true);
  }

  function showAvailableFileTypes() {
    setShowConvertTypes(true);
    console.log(availableConvertTypes);
  }

  function hideAvailableTypes() {
    setShowConvertTypes(false);
  }

  return (
    <div className="imgConverterMainContainer">
      <div className="imgConverterTop">
        <h2>Image Type Converter</h2>
      </div>
      <div className="imgConverterMain">
        <div className="dragAndDropContainer" style={{ border: `2px solid ${borderColor}` }}>
          <div className="dragAndDropTop">
            {showFileType ? <h2>{dragAndDropFile?.name}</h2> : <h2>Drag and drop a file below</h2>}
          </div>

          <div className="dragAndDropMain">
            <div className="dragAndDrop">
              <div className="fileInputContainer">
                <input
                  type="file"
                  name="fileInput"
                  className="fileInput"
                  onChange={handleImgChange}
                />
              </div>
              <div className="convertTypesContainer">
                {showAvailableconvertTypes && (
                  <button
                    className="availableFileTypesBtn"
                    onClick={() => showAvailableFileTypes()}
                  >
                    Show available file types
                  </button>
                )}
                {showConvertTypes && (
                  <div
                    className="availableConvertTypesContainer"
                    style={{ border: `2px solid ${borderColor}` }}
                  >
                    {availableConvertTypes!.map((item: string) => {
                      return (
                        <button className="currentTypesBtn" key={item}>
                          {item}
                        </button>
                      );
                    })}
                    <button className="closeAvailableTypes" onClick={() => hideAvailableTypes()}>
                      X
                    </button>
                  </div>
                )}
              </div>
              <div className="convertFileBtnContainer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
