import React, { useState, useEffect, useRef } from "react";
import img_bg from "./assets/images/image_29.png";
const Slide16: React.FC = () => {
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
  return <div id="slide-16" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-16" style={{
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
        left: "345.24px",
        top: "159.79px",
        width: "280.61px",
        height: "491.21px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        borderRadius: "27.56px"
      }} /><div key={2} style={{
        position: "absolute",
        left: "654.15px",
        top: "159.79px",
        width: "280.61px",
        height: "491.21px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        borderRadius: "27.56px"
      }} /><div key={3} style={{
        position: "absolute",
        left: "963.06px",
        top: "159.79px",
        width: "280.61px",
        height: "491.21px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        borderRadius: "27.56px"
      }} /><div key={4} style={{
        position: "absolute",
        left: "36.33px",
        top: "159.79px",
        width: "280.61px",
        height: "491.21px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        borderRadius: "27.56px"
      }} /><div key={5} style={{
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
          }}>{"16"}</span></p></div><div key={6} style={{
        position: "absolute",
        left: "54.69px",
        top: "245.65px",
        width: "239.8px",
        height: "44.48px",
        boxSizing: "border-box"
      }} /><div key={7} style={{
        position: "absolute",
        left: "54.69px",
        top: "328.48px",
        width: "239.8px",
        height: "293.75px",
        boxSizing: "border-box"
      }} /><div key={8} style={{
        position: "absolute",
        left: "363.03px",
        top: "249.19px",
        width: "245.4px",
        height: "42.39px",
        boxSizing: "border-box"
      }} /><div key={9} style={{
        position: "absolute",
        left: "363.03px",
        top: "329.04px",
        width: "245.4px",
        height: "293.75px",
        boxSizing: "border-box"
      }} /><div key={10} style={{
        position: "absolute",
        left: "677.83px",
        top: "249.83px",
        width: "238.17px",
        height: "42.41px",
        boxSizing: "border-box"
      }} /><div key={11} style={{
        position: "absolute",
        left: "677.83px",
        top: "329.3px",
        width: "238.17px",
        height: "293.75px",
        boxSizing: "border-box"
      }} /><div key={12} style={{
        position: "absolute",
        left: "987.67px",
        top: "245.65px",
        width: "237.64px",
        height: "44.48px",
        boxSizing: "border-box"
      }} /><div key={13} style={{
        position: "absolute",
        left: "987.67px",
        top: "328.48px",
        width: "237.64px",
        height: "293.75px",
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
        top: "186.08px",
        width: "80.95px",
        height: "44.48px",
        boxSizing: "border-box"
      }} /><div key={16} style={{
        position: "absolute",
        left: "362.2px",
        top: "185.43px",
        width: "80.95px",
        height: "42.39px",
        boxSizing: "border-box"
      }} /><div key={17} style={{
        position: "absolute",
        left: "677.83px",
        top: "185.41px",
        width: "80.95px",
        height: "42.41px",
        boxSizing: "border-box"
      }} /><div key={18} style={{
        position: "absolute",
        left: "987.67px",
        top: "186.08px",
        width: "80.95px",
        height: "44.48px",
        boxSizing: "border-box"
      }} /></div></div>;
};
export default Slide16;
