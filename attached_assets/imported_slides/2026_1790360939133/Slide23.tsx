import React, { useState, useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import img_bg from "./assets/images/image_31.png";
const Slide23: React.FC = () => {
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
  return <div id="slide-23" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-23" style={{
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
            color: "#2d1451"
          }}>{"23"}</span></p></div><div key={2} style={{
        position: "absolute",
        left: "711.45px",
        top: "142.81px",
        width: "502.92px",
        height: "107.27px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "0px"
      }} /><div key={3} style={{
        position: "absolute",
        left: "711.45px",
        top: "182.66px",
        width: "502.92px",
        height: "67.42px",
        boxSizing: "border-box"
      }} /><div key={4} style={{
        position: "absolute",
        left: "711.45px",
        top: "275.99px",
        width: "502.92px",
        height: "107.27px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "0px"
      }} /><div key={5} style={{
        position: "absolute",
        left: "711.45px",
        top: "315.84px",
        width: "502.92px",
        height: "67.42px",
        boxSizing: "border-box"
      }} /><div key={6} style={{
        position: "absolute",
        left: "711.45px",
        top: "409.18px",
        width: "502.92px",
        height: "107.27px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "0px"
      }} /><div key={7} style={{
        position: "absolute",
        left: "711.45px",
        top: "449.02px",
        width: "502.92px",
        height: "67.42px",
        boxSizing: "border-box"
      }} /><div key={8} style={{
        position: "absolute",
        left: "711.45px",
        top: "542.36px",
        width: "502.92px",
        height: "107.27px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "0px"
      }} /><div key={9} style={{
        position: "absolute",
        left: "711.45px",
        top: "582.21px",
        width: "502.92px",
        height: "67.42px",
        boxSizing: "border-box"
      }} /><ReactECharts key={10} option={{
        animation: false,
        grid: {
          containLabel: true,
          left: "5%",
          right: "5%",
          top: 40,
          bottom: 30
        },
        legend: {
          show: false
        },
        color: ["#5470c6", "#91cc75", "#fac858", "#ee6666"],
        series: [{
          name: "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430",
          type: "pie",
          radius: ["75%", "70%"],
          data: [{
            name: "2020",
            value: 8.2
          }, {
            name: "2021",
            value: 3.2
          }, {
            name: "2022",
            value: 1.4
          }, {
            name: "2023",
            value: 1.2
          }],
          label: {
            formatter: "{b}: {d}%"
          }
        }]
      }} style={{
        position: "absolute",
        left: "65.63px",
        top: "142.81px",
        width: "538.14px",
        height: "460.44px"
      }} /><div key={11} style={{
        position: "absolute",
        left: "55.2px",
        top: "44.22px",
        width: "1035.46px",
        height: "39.49px",
        boxSizing: "border-box"
      }} /></div></div>;
};
export default Slide23;
