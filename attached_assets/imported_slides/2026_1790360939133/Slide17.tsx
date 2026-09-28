import React, { useState, useEffect, useRef } from "react";
import img_bg from "./assets/images/image_30.png";
const Slide17: React.FC = () => {
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
  return <div id="slide-17" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-17" style={{
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
        left: "463.99px",
        top: "159.79px",
        width: "356.89px",
        height: "491.21px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        border: "1px solid #520977",
        borderRadius: "35.05px"
      }} /><div key={1} style={{
        position: "absolute",
        left: "878.32px",
        top: "159.79px",
        width: "341.05px",
        height: "491.21px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        border: "1px solid #520977",
        borderRadius: "33.49px"
      }} /><div key={2} style={{
        position: "absolute",
        left: "65.5px",
        top: "159.79px",
        width: "341.05px",
        height: "491.21px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        border: "1px solid #520977",
        borderRadius: "33.49px"
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
          }}>{"17"}</span></p></div><div key={4} style={{
        position: "absolute",
        left: "81.95px",
        top: "261.74px",
        width: "311.35px",
        height: "44.48px",
        boxSizing: "border-box"
      }} /><div key={5} style={{
        position: "absolute",
        left: "81.95px",
        top: "328.48px",
        width: "311.35px",
        height: "293.75px",
        boxSizing: "border-box"
      }} /><div key={6} style={{
        position: "absolute",
        left: "485.37px",
        top: "261.74px",
        width: "318.62px",
        height: "42.39px",
        boxSizing: "border-box"
      }} /><div key={7} style={{
        position: "absolute",
        left: "485.37px",
        top: "328.48px",
        width: "318.62px",
        height: "293.75px",
        boxSizing: "border-box"
      }} /><div key={8} style={{
        position: "absolute",
        left: "897.42px",
        top: "261.74px",
        width: "309.24px",
        height: "42.41px",
        boxSizing: "border-box"
      }} /><div key={9} style={{
        position: "absolute",
        left: "897.42px",
        top: "328.48px",
        width: "309.24px",
        height: "293.75px",
        boxSizing: "border-box"
      }} /><div key={10} style={{
        position: "absolute",
        left: "55.2px",
        top: "35.22px",
        width: "1189.63px",
        height: "39.49px",
        boxSizing: "border-box"
      }} /><div key={11} style={{
        position: "absolute",
        left: "81.95px",
        top: "186.08px",
        width: "137.64px",
        height: "63.11px",
        boxSizing: "border-box"
      }} /><div key={12} style={{
        position: "absolute",
        left: "484.54px",
        top: "185.43px",
        width: "137.64px",
        height: "60.15px",
        boxSizing: "border-box"
      }} /><div key={13} style={{
        position: "absolute",
        left: "897.42px",
        top: "185.41px",
        width: "137.64px",
        height: "60.17px",
        boxSizing: "border-box"
      }} /></div></div>;
};
export default Slide17;
