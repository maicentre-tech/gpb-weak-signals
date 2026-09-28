import React, { useState, useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import img_bg from "./assets/images/image_29.png";
const Slide21: React.FC = () => {
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
  return <div id="slide-21" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-21" style={{
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
        left: "660px",
        top: "498.39px",
        width: "584.83px",
        height: "175.01px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        borderRadius: "15.36px"
      }} /><div key={1} style={{
        position: "absolute",
        left: "660px",
        top: "297.36px",
        width: "584.83px",
        height: "175.01px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        borderRadius: "15.36px"
      }} /><div key={2} style={{
        position: "absolute",
        left: "660px",
        top: "96.33px",
        width: "584.83px",
        height: "175.01px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        borderRadius: "15.36px"
      }} /><div key={3} style={{
        position: "absolute",
        left: "36.33px",
        top: "34.07px",
        width: "326.7px",
        height: "65.19px",
        boxSizing: "border-box",
        backgroundColor: "#ff0053",
        borderRadius: "12.19px"
      }} /><div key={4} style={{
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
          }}>{"21"}</span></p></div><div key={5} style={{
        position: "absolute",
        left: "692.04px",
        top: "110.21px",
        width: "502.92px",
        height: "62.76px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "0px"
      }} /><div key={6} style={{
        position: "absolute",
        left: "692.04px",
        top: "173.21px",
        width: "502.92px",
        height: "81.85px",
        boxSizing: "border-box"
      }} /><div key={7} style={{
        position: "absolute",
        left: "692.04px",
        top: "306.12px",
        width: "502.92px",
        height: "59.16px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "0px"
      }} /><div key={8} style={{
        position: "absolute",
        left: "692.04px",
        top: "369.12px",
        width: "502.92px",
        height: "91.24px",
        boxSizing: "border-box"
      }} /><div key={9} style={{
        position: "absolute",
        left: "692.04px",
        top: "511.47px",
        width: "502.92px",
        height: "62.76px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "0px"
      }} /><div key={10} style={{
        position: "absolute",
        left: "692.04px",
        top: "574.47px",
        width: "502.92px",
        height: "89.03px",
        boxSizing: "border-box"
      }} /><ReactECharts key={11} option={{
        animation: false,
        grid: {
          containLabel: true,
          left: "5%",
          right: "5%",
          top: 40,
          bottom: 30
        },
        legend: {
          show: true
        },
        color: ["#5470c6", "#91cc75"],
        xAxis: {
          type: "category",
          data: ["2021", "2022", "2023", "2024"]
        },
        yAxis: {
          type: "value"
        },
        series: [{
          name: "\u0420\u044F\u0434 1",
          type: "bar",
          stack: null,
          data: [4.3, 2.5, 3.5, 4.5],
          itemStyle: {}
        }, {
          name: "\u0420\u044F\u0434 2",
          type: "bar",
          stack: null,
          data: [2.4, 4.4, 1.8, 2.8],
          itemStyle: {}
        }]
      }} style={{
        position: "absolute",
        left: "36.33px",
        top: "149.55px",
        width: "603.67px",
        height: "462.13px"
      }} /><div key={12} style={{
        position: "absolute",
        left: "55.2px",
        top: "44.22px",
        width: "290.15px",
        height: "39.49px",
        boxSizing: "border-box"
      }} /></div></div>;
};
export default Slide21;
