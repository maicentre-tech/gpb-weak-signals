import React, { useState, useEffect, useRef } from "react";
import img_bg from "./assets/images/image_30.png";
const Slide18: React.FC = () => {
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
  return <div id="slide-18" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-18" style={{
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
        backgroundColor: "#ff0053",
        borderRadius: "12.19px"
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
            color: "#520977"
          }}>{"18"}</span></p></div><div key={2} style={{
        position: "absolute",
        left: "169.65px",
        top: "150px",
        width: "405.97px",
        height: "44.48px",
        boxSizing: "border-box"
      }} /><div key={3} style={{
        position: "absolute",
        left: "169.66px",
        top: "209.59px",
        width: "405.97px",
        height: "70.56px",
        boxSizing: "border-box"
      }} /><div key={4} style={{
        position: "absolute",
        left: "167.62px",
        top: "318.4px",
        width: "405.97px",
        height: "42.39px",
        boxSizing: "border-box"
      }} /><div key={5} style={{
        position: "absolute",
        left: "167.62px",
        top: "375.91px",
        width: "405.97px",
        height: "70.56px",
        boxSizing: "border-box"
      }} /><div key={6} style={{
        position: "absolute",
        left: "167.62px",
        top: "484.71px",
        width: "405.97px",
        height: "42.41px",
        boxSizing: "border-box"
      }} /><div key={7} style={{
        position: "absolute",
        left: "167.62px",
        top: "542.22px",
        width: "405.97px",
        height: "70.56px",
        boxSizing: "border-box"
      }} /><div key={8} style={{
        position: "absolute",
        left: "765.26px",
        top: "150px",
        width: "405.97px",
        height: "44.48px",
        boxSizing: "border-box"
      }} /><div key={9} style={{
        position: "absolute",
        left: "765.26px",
        top: "209.59px",
        width: "405.97px",
        height: "70.56px",
        boxSizing: "border-box"
      }} /><div key={10} style={{
        position: "absolute",
        left: "763.22px",
        top: "318.4px",
        width: "405.97px",
        height: "42.39px",
        boxSizing: "border-box"
      }} /><div key={11} style={{
        position: "absolute",
        left: "763.22px",
        top: "375.91px",
        width: "405.97px",
        height: "70.56px",
        boxSizing: "border-box"
      }} /><div key={12} style={{
        position: "absolute",
        left: "763.22px",
        top: "484.71px",
        width: "405.97px",
        height: "42.41px",
        boxSizing: "border-box"
      }} /><div key={13} style={{
        position: "absolute",
        left: "763.22px",
        top: "542.22px",
        width: "405.97px",
        height: "70.56px",
        boxSizing: "border-box"
      }} /><div key={14} style={{
        position: "absolute",
        left: "55.2px",
        top: "44.22px",
        width: "1035.46px",
        height: "39.49px",
        boxSizing: "border-box"
      }} /><div key={15} style={{
        position: "absolute",
        left: "54.69px",
        top: "146.36px",
        width: "80.95px",
        height: "44.48px",
        boxSizing: "border-box"
      }} /><div key={16} style={{
        position: "absolute",
        left: "52.66px",
        top: "314.75px",
        width: "80.95px",
        height: "42.39px",
        boxSizing: "border-box"
      }} /><div key={17} style={{
        position: "absolute",
        left: "52.66px",
        top: "481.07px",
        width: "80.95px",
        height: "42.41px",
        boxSizing: "border-box"
      }} /><div key={18} style={{
        position: "absolute",
        left: "650.29px",
        top: "146.36px",
        width: "80.95px",
        height: "44.48px",
        boxSizing: "border-box"
      }} /><div key={19} style={{
        position: "absolute",
        left: "648.26px",
        top: "314.75px",
        width: "80.95px",
        height: "42.39px",
        boxSizing: "border-box"
      }} /><div key={20} style={{
        position: "absolute",
        left: "648.26px",
        top: "481.07px",
        width: "80.95px",
        height: "42.41px",
        boxSizing: "border-box"
      }} /></div></div>;
};
export default Slide18;
