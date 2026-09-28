import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_32.png";
import img_bg from "./assets/images/image_3.png";
const Slide26: React.FC = () => {
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
  return <div id="slide-26" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-26" style={{
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
        top: "34.07px",
        width: "326.7px",
        height: "65.19px",
        boxSizing: "border-box",
        backgroundColor: "#520977",
        borderRadius: "12.19px"
      }} /><img key={1} src={img_1} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 11" style={{
        position: "absolute",
        left: "396.67px",
        top: "94.96px",
        width: "477.83px",
        height: "373.48px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><div key={2} style={{
        position: "absolute",
        left: "427.13px",
        top: "124.66px",
        width: "418.78px",
        height: "314.99px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "10.76px"
      }} /><div key={3} style={{
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
            color: "#520977"
          }}>{"26"}</span></p></div><div key={4} style={{
        position: "absolute",
        left: "36.33px",
        top: "488.83px",
        width: "380.77px",
        height: "162.17px",
        boxSizing: "border-box"
      }} /><div key={5} style={{
        position: "absolute",
        left: "445.2px",
        top: "488.83px",
        width: "380.77px",
        height: "162.17px",
        boxSizing: "border-box"
      }} /><div key={6} style={{
        position: "absolute",
        left: "864.06px",
        top: "488.83px",
        width: "380.77px",
        height: "162.17px",
        boxSizing: "border-box"
      }} /><div key={7} style={{
        position: "absolute",
        left: "55.2px",
        top: "44.22px",
        width: "1035.46px",
        height: "39.49px",
        boxSizing: "border-box"
      }} /></div></div>;
};
export default Slide26;
