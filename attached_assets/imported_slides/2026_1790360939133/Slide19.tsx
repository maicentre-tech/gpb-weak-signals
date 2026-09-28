import React, { useState, useEffect, useRef } from "react";
import img_bg from "./assets/images/image_30.png";
const Slide19: React.FC = () => {
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
  return <div id="slide-19" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-19" style={{
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
          }}>{"19"}</span></p></div><div key={2} style={{
        position: "absolute",
        left: "781.12px",
        top: "106.67px",
        width: "462.55px",
        height: "323.2px",
        boxSizing: "border-box",
        borderRadius: "19.8px"
      }} /><div key={3} style={{
        position: "absolute",
        left: "781.12px",
        top: "460.8px",
        width: "462.55px",
        height: "190.2px",
        boxSizing: "border-box",
        borderRadius: "22.41px"
      }} /><div key={4} style={{
        position: "absolute",
        left: "36.33px",
        top: "338.47px",
        width: "714.56px",
        height: "312.53px",
        boxSizing: "border-box",
        borderRadius: "22.67px"
      }} /><div key={5} style={{
        position: "absolute",
        left: "36.33px",
        top: "106.67px",
        width: "714.56px",
        height: "213.11px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        border: "1.33px solid #520977",
        borderRadius: "21.58px"
      }} /><div key={6} style={{
        position: "absolute",
        left: "55.2px",
        top: "44.22px",
        width: "291.39px",
        height: "39.49px",
        boxSizing: "border-box"
      }} /></div></div>;
};
export default Slide19;
