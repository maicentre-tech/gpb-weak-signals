import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_6.png";
import img_2 from "./assets/images/image_7.png";
import img_3 from "./assets/images/image_8.png";
import img_4 from "./assets/images/image_9.png";
import img_5 from "./assets/images/image_10.png";
import img_6 from "./assets/images/image_11.png";
import img_7 from "./assets/images/image_12.png";
import img_8 from "./assets/images/image_13.png";
import img_9 from "./assets/images/image_14.png";
import img_10 from "./assets/images/image_15.png";
import img_11 from "./assets/images/image_16.png";
import img_12 from "./assets/images/image_17.png";
import img_13 from "./assets/images/image_18.png";
import img_14 from "./assets/images/image_19.png";
import img_15 from "./assets/images/image_20.png";
import img_16 from "./assets/images/image_21.png";
import img_17 from "./assets/images/image_22.png";
import img_18 from "./assets/images/image_23.png";
import img_19 from "./assets/images/image_24.png";
import img_20 from "./assets/images/image_25.png";
import img_21 from "./assets/images/image_26.png";
import img_22 from "./assets/images/image_27.png";
import img_bg from "./assets/images/image_28.png";
const Slide6: React.FC = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({
    s: 1,
    x: 0,
    y: 0
  });
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const s = Math.min(w / 1280, h / 720);
      setLayout({
        s,
        x: (w - 1280 * s) / 2,
        y: (h - 720 * s) / 2
      });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return <div id="slide-6" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-6" style={{
      position: "absolute",
      width: "1280px",
      height: "720px",
      overflow: "hidden",
      transformOrigin: "top left",
      color: "#000000",
      backgroundImage: `url(${img_bg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      transform: `scale(${layout.s})`,
      left: layout.x + "px",
      top: layout.y + "px"
    }}><div key={0} style={{
        position: "absolute",
        left: "1198.27px",
        top: "667.33px",
        width: "58.7px",
        height: "38.33px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#f2f2f2"
          }}>{"6"}</span></p></div><div key={1} style={{
        position: "absolute",
        left: "99.5px",
        top: "42.83px",
        width: "658.9px",
        height: "65.19px",
        boxSizing: "border-box",
        backgroundColor: "#ff0053",
        borderRadius: "15.79px"
      }} /><div key={2} style={{
        position: "absolute",
        left: "132.37px",
        top: "47.37px",
        width: "612.83px",
        height: "47.67px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(20pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(20pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#ffffff"
          }}>{"\u041B\u041E\u0413\u041E\u0422\u0418\u041F\u042B \u041F\u041E\u0421\u0422\u0410\u041D\u041E\u0412\u0429\u0418\u041A\u041E\u0412 \u0417\u0410\u0414\u0410\u0427"}</span></p></div><img key={3} src={img_1} alt=" " style={{
        position: "absolute",
        left: "294.12px",
        top: "287.73px",
        width: "244.67px",
        height: "52.66px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={4} src={img_2} alt=" " style={{
        position: "absolute",
        left: "915.58px",
        top: "287.73px",
        width: "201.33px",
        height: "52.66px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={5} src={img_3} alt=" " style={{
        position: "absolute",
        left: "923.66px",
        top: "386.35px",
        width: "192.67px",
        height: "52.66px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={6} src={img_4} alt=" " style={{
        position: "absolute",
        left: "41.33px",
        top: "287.73px",
        width: "120.67px",
        height: "52.66px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={7} src={img_5} alt=" " style={{
        position: "absolute",
        left: "41.33px",
        top: "386.38px",
        width: "135.33px",
        height: "52.66px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={8} src={img_6} alt=" " style={{
        position: "absolute",
        left: "640px",
        top: "288.39px",
        width: "158px",
        height: "52.66px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={9} src={img_7} alt=" " style={{
        position: "absolute",
        left: "282.67px",
        top: "386.38px",
        width: "132.67px",
        height: "51.99px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={10} src={img_8} alt=" " style={{
        position: "absolute",
        left: "515.66px",
        top: "386.35px",
        width: "302px",
        height: "45.99px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={11} src={img_9} alt=" " style={{
        position: "absolute",
        left: "705.33px",
        top: "194.67px",
        width: "130px",
        height: "46.66px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={12} src={img_10} alt=" " style={{
        position: "absolute",
        left: "333.97px",
        top: "201.01px",
        width: "248px",
        height: "34px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={13} src={img_11} alt=" " style={{
        position: "absolute",
        left: "965.57px",
        top: "194.67px",
        width: "151.33px",
        height: "46.66px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={14} src={img_12} alt=" " style={{
        position: "absolute",
        left: "300px",
        top: "625.3px",
        width: "198px",
        height: "32.66px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={15} src={img_13} alt=" " style={{
        position: "absolute",
        left: "41.33px",
        top: "626.97px",
        width: "206.67px",
        height: "29.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={16} src={img_14} alt=" " style={{
        position: "absolute",
        left: "40.67px",
        top: "525.98px",
        width: "150.67px",
        height: "47.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={17} src={img_15} alt=" " style={{
        position: "absolute",
        left: "258.67px",
        top: "531.98px",
        width: "246.67px",
        height: "35.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={18} src={img_16} alt=" " style={{
        position: "absolute",
        left: "572.66px",
        top: "525.98px",
        width: "184.67px",
        height: "47.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={19} src={img_17} alt=" " style={{
        position: "absolute",
        left: "824.66px",
        top: "525.98px",
        width: "198px",
        height: "47.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={20} src={img_18} alt=" " style={{
        position: "absolute",
        left: "1089.99px",
        top: "525.98px",
        width: "148.67px",
        height: "47.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={21} src={img_19} alt=" " style={{
        position: "absolute",
        left: "550px",
        top: "629.63px",
        width: "233.33px",
        height: "24px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={22} src={img_20} alt=" " style={{
        position: "absolute",
        left: "835.33px",
        top: "617.3px",
        width: "197.33px",
        height: "48.66px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={23} src={img_21} alt=" " style={{
        position: "absolute",
        left: "1084.66px",
        top: "626.97px",
        width: "154px",
        height: "29.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><div key={24} style={{
        position: "absolute",
        left: "33.53px",
        top: "146px",
        width: "244.67px",
        height: "35.54px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            textTransform: "uppercase",
            fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
            fontWeight: "700",
            color: "#ffffff"
          }}>{"\u0413\u043E\u0440\u043E\u0434"}</span></p></div><div key={25} style={{
        position: "absolute",
        left: "33.53px",
        top: "475.55px",
        width: "244.67px",
        height: "35.54px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            textTransform: "uppercase",
            fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
            fontWeight: "700",
            color: "#ffffff"
          }}>{"\u0411\u0438\u0437\u043D\u0435\u0441"}</span></p></div><img key={26} src={img_22} alt=" " style={{
        position: "absolute",
        left: "41.33px",
        top: "195.74px",
        width: "208.67px",
        height: "46.66px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><div key={27} style={{
        position: "absolute",
        left: "798px",
        top: "47.37px",
        width: "444.67px",
        height: "58.16px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(15pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(15pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"\u0427\u0435\u0440\u043D\u044B\u0435 \u0432\u0435\u0440\u0441\u0438\u0438"}</span></p><p style={{
          lineHeight: "1.2",
          fontSize: "calc(15pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            textDecoration: "underline",
            fontSize: "calc(15pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"https://"}</span><span style={{
            textDecoration: "underline",
            fontSize: "calc(15pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"disk.yandex.ru"}</span><span style={{
            textDecoration: "underline",
            fontSize: "calc(15pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"/d/PXfwjMA16G2aTw"}</span></p></div></div></div>;
};
export default Slide6;
