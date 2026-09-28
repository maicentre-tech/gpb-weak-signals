import React, { useState, useEffect, useRef } from "react";
import img_bg from "./assets/images/image_3.png";
const Slide20: React.FC = () => {
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
  return <div id="slide-20" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-20" style={{
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
        left: "624.86px",
        top: "143.46px",
        width: "619.98px",
        height: "83.11px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        border: "1px solid #520977",
        borderRadius: "13.58px"
      }} /><div key={2} style={{
        position: "absolute",
        left: "624.86px",
        top: "249.56px",
        width: "619.98px",
        height: "83.11px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        border: "1px solid #520977",
        borderRadius: "13.58px"
      }} /><div key={3} style={{
        position: "absolute",
        left: "624.86px",
        top: "355.67px",
        width: "619.98px",
        height: "83.11px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        border: "1px solid #520977",
        borderRadius: "13.58px"
      }} /><div key={4} style={{
        position: "absolute",
        left: "624.86px",
        top: "461.78px",
        width: "619.98px",
        height: "83.11px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        border: "1px solid #520977",
        borderRadius: "13.58px"
      }} /><div key={5} style={{
        position: "absolute",
        left: "624.86px",
        top: "567.89px",
        width: "619.98px",
        height: "83.11px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        border: "1px solid #520977",
        borderRadius: "13.58px"
      }} /><div key={6} style={{
        position: "absolute",
        left: "36.33px",
        top: "143.46px",
        width: "565.83px",
        height: "507.54px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        border: "1px solid #520977",
        borderRadius: "14.82px"
      }} /><div key={7} style={{
        position: "absolute",
        left: "65.5px",
        top: "181.85px",
        width: "497.03px",
        height: "434.57px",
        boxSizing: "border-box",
        backgroundColor: "transparent"
      }} /><div key={8} style={{
        position: "absolute",
        left: "648.06px",
        top: "151.76px",
        width: "573.28px",
        height: "63px",
        boxSizing: "border-box",
        backgroundColor: "transparent"
      }} /><div key={9} style={{
        position: "absolute",
        left: "648.06px",
        top: "259.62px",
        width: "573.28px",
        height: "63px",
        boxSizing: "border-box",
        backgroundColor: "transparent"
      }} /><div key={10} style={{
        position: "absolute",
        left: "648.06px",
        top: "365.98px",
        width: "573.28px",
        height: "63px",
        boxSizing: "border-box",
        backgroundColor: "transparent"
      }} /><div key={11} style={{
        position: "absolute",
        left: "648.06px",
        top: "472.08px",
        width: "573.28px",
        height: "63px",
        boxSizing: "border-box",
        backgroundColor: "transparent"
      }} /><div key={12} style={{
        position: "absolute",
        left: "648.06px",
        top: "579.2px",
        width: "573.28px",
        height: "63px",
        boxSizing: "border-box",
        backgroundColor: "transparent"
      }} /><div key={13} style={{
        position: "absolute",
        left: "1221.33px",
        top: "667.33px",
        width: "58.67px",
        height: "38.33px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "left",
          lineHeight: "1.2",
          fontSize: "calc(11.41pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(11.41pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#520977"
          }}>{"20"}</span></p></div><div key={14} style={{
        position: "absolute",
        left: "55.2px",
        top: "44.22px",
        width: "1035.46px",
        height: "39.49px",
        boxSizing: "border-box"
      }} /></div></div>;
};
export default Slide20;
