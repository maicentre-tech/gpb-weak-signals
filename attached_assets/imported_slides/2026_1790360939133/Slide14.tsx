import React, { useState, useEffect, useRef } from "react";
import img_bg from "./assets/images/image_29.png";
const Slide14: React.FC = () => {
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
  return <div id="slide-14" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-14" style={{
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
        top: "27.93px",
        width: "562.17px",
        height: "664.74px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        borderRadius: "38.94px"
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
            color: "#ffffff"
          }}>{"14"}</span></p></div><div key={2} style={{
        position: "absolute",
        left: "65.31px",
        top: "52.17px",
        width: "501.97px",
        height: "43.67px",
        boxSizing: "border-box"
      }} /><div key={3} style={{
        position: "absolute",
        left: "640px",
        top: "0px",
        width: "640px",
        height: "720px",
        boxSizing: "border-box"
      }} /><div key={4} style={{
        position: "absolute",
        left: "62.51px",
        top: "120.07px",
        width: "504.76px",
        height: "495.26px",
        boxSizing: "border-box"
      }} /></div></div>;
};
export default Slide14;
