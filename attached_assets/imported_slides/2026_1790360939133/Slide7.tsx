import React, { useState, useEffect, useRef } from "react";
import img_bg from "./assets/images/image_2.png";
const Slide7: React.FC = () => {
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
  return <div id="slide-7" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-7" style={{
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
        left: "0px",
        top: "408.87px",
        width: "658.46px",
        height: "179.19px",
        boxSizing: "border-box",
        backgroundColor: "transparent"
      }} /><div key={1} style={{
        position: "absolute",
        left: "32.04px",
        top: "34.62px",
        width: "545.23px",
        height: "113.66px",
        boxSizing: "border-box"
      }} /><div key={2} style={{
        position: "absolute",
        left: "0px",
        top: "594.17px",
        width: "937.6px",
        height: "79.49px",
        boxSizing: "border-box",
        backgroundColor: "transparent"
      }} /><div key={3} style={{
        position: "absolute",
        left: "-31.15px",
        top: "-32.97px",
        width: "643.06px",
        height: "239.96px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        border: "1px solid #ffd6e3",
        borderRadius: "23.57px"
      }} /></div></div>;
};
export default Slide7;
