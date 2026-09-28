import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_34.png";
import img_2 from "./assets/images/image_35.png";
import img_3 from "./assets/images/image_36.png";
import img_4 from "./assets/images/image_37.png";
import img_5 from "./assets/images/image_38.png";
import img_6 from "./assets/images/image_39.png";
import img_7 from "./assets/images/image_40.png";
import img_8 from "./assets/images/image_41.png";
import img_9 from "./assets/images/image_42.png";
import img_10 from "./assets/images/image_43.png";
import img_11 from "./assets/images/image_44.png";
import img_12 from "./assets/images/image_45.png";
import img_13 from "./assets/images/image_46.png";
import img_14 from "./assets/images/image_47.png";
import img_15 from "./assets/images/image_48.png";
import img_16 from "./assets/images/image_49.png";
import img_17 from "./assets/images/image_50.png";
import img_18 from "./assets/images/image_51.png";
import img_19 from "./assets/images/image_52.png";
import img_20 from "./assets/images/image_53.png";
import img_21 from "./assets/images/image_54.png";
import img_22 from "./assets/images/image_55.png";
import img_23 from "./assets/images/image_56.png";
import img_24 from "./assets/images/image_57.png";
import img_25 from "./assets/images/image_58.png";
import img_26 from "./assets/images/image_59.png";
import img_27 from "./assets/images/image_60.png";
import img_28 from "./assets/images/image_61.png";
import img_29 from "./assets/images/image_62.png";
import img_30 from "./assets/images/image_63.png";
import img_31 from "./assets/images/image_64.png";
import img_bg from "./assets/images/image_29.png";
const Slide31: React.FC = () => {
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
  return <div id="slide-31" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-31" style={{
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
        left: "36.33px",
        top: "167.68px",
        width: "1213.35px",
        height: "384.65px",
        boxSizing: "border-box",
        backgroundColor: "rgba(255, 255, 255, 0.51)",
        borderRadius: "16.17px"
      }} /><div key={1} style={{
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
          }}>{"31"}</span></p></div><div key={2} style={{
        position: "absolute",
        left: "54.98px",
        top: "41.5px",
        width: "635.67px",
        height: "39.5px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(19.97pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(19.97pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#f2f2f2"
          }}>{"\u0418\u041A\u041E\u041D\u041A\u0418"}</span></p></div><img key={3} src={img_1} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1346" style={{
        position: "absolute",
        left: "655.02px",
        top: "404.86px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={4} src={img_2} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1350" style={{
        position: "absolute",
        left: "554.67px",
        top: "404.86px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={5} src={img_3} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1354" style={{
        position: "absolute",
        left: "456.06px",
        top: "404.86px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={6} src={img_4} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1358" style={{
        position: "absolute",
        left: "355.15px",
        top: "404.86px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={7} src={img_5} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1362" style={{
        position: "absolute",
        left: "255.09px",
        top: "404.86px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={8} src={img_6} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1366" style={{
        position: "absolute",
        left: "153.85px",
        top: "404.86px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={9} src={img_7} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1370" style={{
        position: "absolute",
        left: "54.38px",
        top: "404.86px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={10} src={img_8} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1372" style={{
        position: "absolute",
        left: "1151.05px",
        top: "311.67px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={11} src={img_9} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1374" style={{
        position: "absolute",
        left: "1051px",
        top: "311.67px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={12} src={img_10} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1376" style={{
        position: "absolute",
        left: "855.43px",
        top: "311.67px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={13} src={img_11} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1378" style={{
        position: "absolute",
        left: "948.07px",
        top: "311.67px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={14} src={img_12} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1380" style={{
        position: "absolute",
        left: "754.78px",
        top: "311.67px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={15} src={img_13} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1382" style={{
        position: "absolute",
        left: "655.02px",
        top: "311.67px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={16} src={img_14} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1384" style={{
        position: "absolute",
        left: "554.67px",
        top: "311.67px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={17} src={img_15} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1386" style={{
        position: "absolute",
        left: "455.2px",
        top: "311.67px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={18} src={img_16} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1388" style={{
        position: "absolute",
        left: "355.15px",
        top: "311.67px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={19} src={img_17} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1390" style={{
        position: "absolute",
        left: "255.09px",
        top: "311.67px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={20} src={img_18} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1392" style={{
        position: "absolute",
        left: "155.03px",
        top: "311.67px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={21} src={img_19} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1394" style={{
        position: "absolute",
        left: "54.98px",
        top: "311.67px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={22} src={img_20} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1396" style={{
        position: "absolute",
        left: "155.03px",
        top: "226.34px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={23} src={img_21} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1398" style={{
        position: "absolute",
        left: "255.09px",
        top: "226.34px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={24} src={img_22} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1400" style={{
        position: "absolute",
        left: "355.15px",
        top: "226.34px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={25} src={img_23} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1402" style={{
        position: "absolute",
        left: "455.2px",
        top: "226.34px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={26} src={img_24} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1404" style={{
        position: "absolute",
        left: "555.26px",
        top: "226.34px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={27} src={img_25} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1406" style={{
        position: "absolute",
        left: "655.32px",
        top: "226.34px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={28} src={img_26} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1408" style={{
        position: "absolute",
        left: "755.37px",
        top: "226.34px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={29} src={img_27} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1410" style={{
        position: "absolute",
        left: "855.43px",
        top: "226.34px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={30} src={img_28} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1412" style={{
        position: "absolute",
        left: "955.49px",
        top: "226.34px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={31} src={img_29} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1414" style={{
        position: "absolute",
        left: "1055.55px",
        top: "226.34px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={32} src={img_30} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1416" style={{
        position: "absolute",
        left: "1155.6px",
        top: "226.34px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={33} src={img_31} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1418" style={{
        position: "absolute",
        left: "54.98px",
        top: "226.34px",
        width: "85.33px",
        height: "85.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /></div></div>;
};
export default Slide31;
