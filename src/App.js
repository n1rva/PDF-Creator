/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from "react";
import Spreadsheet from "react-spreadsheet";
import { jsPDF } from "jspdf";
import JSZip from "jszip";

import {
  DataOpt,
  DownMd,
  DownMdLoading,
  DownSm,
  DownSmLoading,
  UploadBtn,
  Font,
  CloseBtn,
} from "./components/Buttons";

export default function Home() {
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [fontFile, setFontFile] = useState(null);
  const [imgDimensions, setImgDimensions] = useState({
    width: "",
    height: "",
  });

  const [textProperties, setTextProperties] = useState({
    xAxis: 50,
    yAxis: 50,
    fontSize: 30,
    color: "#319795",
    font: "Helvetica",
  });

  const [loadingSingle, setLoadingSingle] = useState(false);
  const [loadingBatch, setLoadingBatch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImgUploaded, setIsImgUploaded] = useState(false);
  const [isDownloadDisable, setisDownloadDisable] = useState(true);

  const [data, setData] = useState([]);

  const [excelData, setExcelData] = useState([
    [
      {
        value:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer.",
      },
      { value: "Lorem_Ipsum" },
    ],
    [{ value: "Magnus Carlsen" }, { value: "Chess_Player" }],
    [undefined, undefined],
  ]);

  const cvsDiv = useRef();
  const canvas = useRef();
  let ctx;

  useEffect(() => {
    canvas.current.height = cvsDiv.current.clientHeight;
    canvas.current.width = cvsDiv.current.clientWidth;
  }, []);

  const handleFile = (e) => {
    if (e.target.files[0].type.split("/")[0] !== "image") return;
    const file = e.target.files[0];

    setImg(window.URL.createObjectURL(file));
    setIsImgUploaded(true);
  };

  const handleData = (e) => {
    //prevents loop
    if (JSON.stringify(e) !== JSON.stringify(excelData)) {
      setExcelData(e);

      //adds one row if there is no more empty row
      const lastItem = e.slice(-1)[0];
      lastItem.forEach((item) => {
        if (item) {
          const newData = [...e, [undefined, undefined]];
          setExcelData(newData);
          return;
        }
      });
    }
  };

  const handleFont = (e) => {
    setFontFile(URL.createObjectURL(e.target.files[0]));

    const loadFont = async () => {
      const font = new FontFace(
        e.target.files[0].name.split(".")[0],
        `url(${URL.createObjectURL(e.target.files[0])})`
      );

      await font.load();

      document.fonts.add(font);
      setTextProperties({
        ...textProperties,
        font: e.target.files[0].name.split(".")[0],
      });
    };
    loadFont();
  };
  const canvasHandler = () => {
    let background = new Image();
    background.src = img;

    ctx = canvas.current.getContext("2d");

    background.onload = async () => {
      //some calculations for fit image to parent div
      let loadedImageWidth = background.width;
      let loadedImageHeight = background.height;

      setImgDimensions({ width: background.width, height: background.height });

      let scaleFactor = Math.min(
        canvas.current.clientWidth / loadedImageWidth,
        canvas.current.clientHeight / loadedImageHeight
      );

      let newWidth = loadedImageWidth * scaleFactor;
      let newHeight = loadedImageHeight * scaleFactor;

      let x = canvas.current.clientWidth / 2 - newWidth / 2;
      let y = canvas.current.clientHeight / 2 - newHeight / 2;

      //clears prev. image
      ctx.clearRect(
        0,
        0,
        canvas.current.clientWidth,
        canvas.current.clientHeight
      );

      //calculation for fontSize rescale
      const fontScale = background.width / newWidth;

      const xText = 0.01 * textProperties.xAxis * newWidth + x;
      const yText = 0.01 * textProperties.yAxis * newHeight + y;

      ctx.font =
        textProperties.fontSize / fontScale + "px " + textProperties.font;
      ctx.textAlign = "center";
      ctx.textBaseline = "center";
      ctx.fillStyle = textProperties.color;

      ctx.drawImage(background, x, y, newWidth, newHeight);

      ctx.fillText(text || "Lorem Ipsum", xText, yText);
    };
  };

  const createPDF = (text) => {
    const pdf = new jsPDF({
      orientation:
        imgDimensions.width > imgDimensions.height ? "landscape" : "portrait",
      unit: "px",
      format: [imgDimensions.width, imgDimensions.height],
    });

    pdf.addImage(
      img,
      "PNG",
      0,
      0,
      imgDimensions.width,
      imgDimensions.height,
      "",
      "FAST"
    );

    fontFile && pdf.addFont(fontFile, textProperties.font, "normal");
    pdf.setFont(textProperties.font, "normal");
    pdf.setFontSize(textProperties.fontSize);
    pdf.setTextColor(textProperties.color);

    pdf.text(
      text,
      0.01 * textProperties.xAxis * imgDimensions.width,
      0.01 * textProperties.yAxis * imgDimensions.height,
      "center"
    );

    return pdf;
  };

  const singleDownloadHandle = async () => {
    setLoadingSingle(true);

    setTimeout(() => {
      const pdf = createPDF(text);
      pdf.save("single.pdf");
      setLoadingSingle(false);
    }, 1);
  };

  const batchDownloadHandle = () => {
    setLoadingBatch(true);

    setTimeout(() => {
      const zip = new JSZip();

      data.forEach((i) => {
        const pdf = createPDF(i.text);
        zip.file(`${i.fName}.pdf`, pdf.output("blob"));
      });

      zip.generateAsync({ type: "blob" }).then(function (content) {
        const blobUrl = URL.createObjectURL(content);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = "batch.zip";
        link.click();
      });

      setLoadingBatch(false);
    }, 1);
  };

  const handleModalClose = () => {
    const newData = [];

    excelData.forEach((row, index) => {
      if (row[0] && row[0].value) {
        newData.push({
          text: row[0].value,
          fName: row[1]?.value || index,
        });
      }
    });

    setData(newData);
    setIsModalOpen(false);
    setisDownloadDisable(false);
  };

  useEffect(() => {
    let t = setTimeout(() => {
      canvasHandler();
    }, 2);
    return () => clearTimeout(t);
  }, [text, textProperties]);

  useEffect(() => {
    canvasHandler();
  }, [img]);

  return (
    <div className="bg-bodyColor text-white h-screen flex Parent">
      <div className="container m-auto w-fit">
        <div className="flex gap-4 h-[600px]">
          <div className="flex flex-col gap-4 basis-1/3">
            <div className="bg-second flex flex-col justify-between p-5 rounded-xl h-full">
              <div>
                <UploadBtn onChange={handleFile} />
              </div>
              <div>
                <label
                  htmlFor="width-range"
                  className="block mb-2 text-[15px] font-medium"
                >
                  Horizontal Align
                </label>
                <input
                  id="width-range"
                  type="range"
                  min="0"
                  max="100"
                  value={textProperties.xAxis}
                  onChange={(e) =>
                    setTextProperties({
                      ...textProperties,
                      xAxis: e.target.value,
                    })
                  }
                  className="w-full bg-forth h-2 appearance-none rounded-md cursor-pointer "
                />
              </div>
              <div>
                <label
                  htmlFor="height-range"
                  className="block mb-2 text-[15px] font-medium"
                >
                  Vertical Align
                </label>
                <input
                  id="height-range"
                  type="range"
                  min="0"
                  max="100"
                  value={textProperties.yAxis}
                  onChange={(e) =>
                    setTextProperties({
                      ...textProperties,
                      yAxis: e.target.value,
                    })
                  }
                  className="w-full bg-forth h-2 rounded-md appearance-none cursor-pointer"
                />
              </div>
              <div className="flex flex-row mt-2">
                <div className="basis-1/2 ">
                  <label
                    htmlFor="fontSize"
                    className="block mb-2 text-[15px] font-medium"
                  >
                    Font Size
                  </label>
                  <input
                    type="number"
                    className="w-1/2 h-10 bg-forth text-center rounded-md text-bodyColor placeholder:text-second ring-1 ring-white outline-none border-third focus:ring-2 focus:ring-white focus:border-transparent"
                    min={0}
                    id="fontSize"
                    value={textProperties.fontSize}
                    onChange={(e) =>
                      setTextProperties({
                        ...textProperties,
                        fontSize: +e.target.value,
                      })
                    }
                  />
                </div>
                <div className="basis-1/2">
                  <label
                    htmlFor="colorInput"
                    className="block mb-2 text-[15px] font-medium"
                  >
                    Color
                  </label>
                  <input
                    type="color"
                    id="colorInput"
                    className="cursor-pointer"
                    value={textProperties.color}
                    onChange={(e) =>
                      setTextProperties({
                        ...textProperties,
                        color: e.target.value,
                      })
                    }
                    title="Choose your color"
                  />
                </div>
              </div>
              <div>
                <div>
                  <label className="block mb-2 text-[15px] font-medium">
                    Custom Font
                  </label>
                  <div className="flex flex-row gap-2 ">
                    <div className="w-10/12 h-10 flex flex-row justify-between caret-transparent rounded-md border border-third bg-transparent text-white placeholder:white outline-none px-3 py-2 focus:border-transparent ">
                      {textProperties.font}
                      {fontFile && (
                        <span>
                          <svg
                            className="h-6 text-primary"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            ></path>
                          </svg>
                        </span>
                      )}
                    </div>
                    <Font onChange={(e) => handleFont(e)} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-second rounded-xl p-5 h-[120px]">
              <span className="mb-4 block font-bold">Download Single PDF</span>
              <div className="flex flex-row gap-2">
                <input
                  type="text"
                  className="w-10/12 h-10 bg-forth text-bodyColor placeholder:text-gray-600 rounded-md border-third ring-1 ring-white outline-none p-3 focus:ring-2 focus:ring-white focus:border-transparent "
                  placeholder="Text"
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                {loadingSingle ? (
                  <DownSmLoading />
                ) : (
                  <DownSm
                    onClick={singleDownloadHandle}
                    disabled={!isImgUploaded}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-[600px] h-full basis-2/3">
            <div ref={cvsDiv} className="h-full">
              <canvas ref={canvas} />
            </div>
            <div className="p-5 bg-second rounded-xl h-[120px]">
              {isModalOpen && (
                <div className="absolute w-full h-full left-0 top-0 bg-gray-500 bg-opacity-70 transition-opacity duration-1000">
                  <div
                    onClick={handleModalClose}
                    className="absolute top-0 left-0 w-full h-full"
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md h-[620px] w-[60vw] shadow-lg bg-second bg-opacity-90 z-20">
                    <div className="flex p-4">
                      <div className="w-4/5 overflow-auto bg-white h-[590px] font-medium">
                        <Spreadsheet
                          columnLabels={["Text", "File Name (optinal)"]}
                          data={excelData}
                          onChange={handleData}
                        ></Spreadsheet>
                      </div>
                      <div className="flex flex-col font-normal text-center gap-4  justify-center items-center">
                        <div className="h-28 w-3/5 p-5 rounded-3xl bg-primary">
                          In the &quot;text&quot; column type what you want to
                          see in each pdf
                        </div>
                        <div className="h-12 w-1 rounded-md bg-third" />
                        <div className="h-28 w-3/5 p-5 rounded-3xl bg-primary">
                          Type or the name of each pdf in the &quot;File
                          Name&quot; column. (Optinal)
                        </div>
                        <div className="h-12 w-1 rounded-md bg-third" />
                        <div className="h-28 w-3/5 p-6 rounded-3xl bg-primary">
                          Auto-saves every time you type or copy-paste
                        </div>
                      </div>
                      <div>
                        <CloseBtn onClick={handleModalClose} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="mb-4 flex">
                <span className="font-bold">Download Batch .zip</span>
                <div>
                  <div
                    className="relative font-normal text-center pl-1 before:z-10 before:absolute before:left-1/2 before:-top-3 before:w-max before:max-w-xs before:-translate-x-1/2 before:-translate-y-full before:rounded-lg before:bg-second before:shadow-md before:shadow-bodyColor before:px-2 before:py-1.5 before:text-white before:invisible before:content-[attr(data-tip)] after:z-10 after:absolute after:left-1/2 after:-top-3 after:h-0 after:w-0 after:-translate-x-1/2 after:border-8 after:border-t-gray-700 after:border-l-transparent after:border-b-transparent after:border-r-transparent after:invisible hover:before:visible hover:after:visible"
                    data-tip={`Use spreadsheet to get multiple pdf with one source image`}
                  >
                    <svg
                      className="h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="basis-2/3 flex justify-center ">
                  <DataOpt
                    disabled={!isImgUploaded}
                    onClick={() => setIsModalOpen(true)}
                  />
                </div>
                <div className="basis-1/3 flex justify-center">
                  {loadingBatch ? (
                    <DownMdLoading />
                  ) : (
                    <DownMd
                      disabled={isDownloadDisable}
                      onClick={batchDownloadHandle}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
