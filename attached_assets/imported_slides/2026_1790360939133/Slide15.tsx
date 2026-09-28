import React, { useState, useEffect, useRef } from "react";
import img_bg from "./assets/images/image_3.png";
const Slide15: React.FC = () => {
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
  return <div id="slide-15" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-15" style={{
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
        left: "56.01px",
        top: "38.89px",
        width: "583.99px",
        height: "46.44px",
        boxSizing: "border-box"
      }} /><div key={1} style={{
        position: "absolute",
        left: "54.71px",
        top: "177.96px",
        width: "514.67px",
        height: "74.81px",
        boxSizing: "border-box"
      }} /><div key={2} style={{
        position: "absolute",
        left: "54.71px",
        top: "267.93px",
        width: "514.67px",
        height: "74.81px",
        boxSizing: "border-box"
      }} /><div key={3} style={{
        position: "absolute",
        left: "54.71px",
        top: "357.9px",
        width: "514.67px",
        height: "74.81px",
        boxSizing: "border-box"
      }} /><div key={4} style={{
        position: "absolute",
        left: "54.71px",
        top: "447.88px",
        width: "514.67px",
        height: "74.81px",
        boxSizing: "border-box"
      }} /><div key={5} style={{
        position: "absolute",
        left: "54.71px",
        top: "537.85px",
        width: "514.67px",
        height: "74.81px",
        boxSizing: "border-box"
      }} /><div key={6} style={{
        position: "absolute",
        left: "1201.2px",
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
          }}>{"15"}</span></p></div><svg key={7} style={{
        position: "absolute",
        left: "54.71px",
        top: "168.47px",
        width: "1190.12px",
        height: "1px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="1190.12" y2="0" stroke="#520977" strokeWidth="1.33" /></svg><svg key={8} style={{
        position: "absolute",
        left: "54.71px",
        top: "258.85px",
        width: "1190.12px",
        height: "1px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="1190.12" y2="0" stroke="#520977" strokeWidth="1.33" /></svg><svg key={9} style={{
        position: "absolute",
        left: "54.71px",
        top: "350.96px",
        width: "1190.12px",
        height: "1px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="1190.12" y2="0" stroke="#520977" strokeWidth="1.33" /></svg><svg key={10} style={{
        position: "absolute",
        left: "54.71px",
        top: "439.17px",
        width: "1190.12px",
        height: "1px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="1190.12" y2="0" stroke="#520977" strokeWidth="1.33" /></svg><svg key={11} style={{
        position: "absolute",
        left: "54.71px",
        top: "529.98px",
        width: "1190.12px",
        height: "1px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="1190.12" y2="0" stroke="#520977" strokeWidth="1.33" /></svg></div></div>;
};
export default Slide15;
