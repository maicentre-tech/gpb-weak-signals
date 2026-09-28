import React, { useState, useEffect, useRef } from "react";
import img_bg from "./assets/images/image_29.png";
const Slide24: React.FC = () => {
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
  return <div id="slide-24" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-24" style={{
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
        left: "45.05px",
        top: "315.82px",
        width: "391.43px",
        height: "383.92px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        borderRadius: "19.78px"
      }} /><div key={1} style={{
        position: "absolute",
        left: "454.29px",
        top: "315.82px",
        width: "391.43px",
        height: "383.92px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        borderRadius: "19.78px"
      }} /><div key={2} style={{
        position: "absolute",
        left: "863.53px",
        top: "315.82px",
        width: "391.43px",
        height: "383.92px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        borderRadius: "19.78px"
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
        left: "560.66px",
        top: "143.47px",
        width: "157.96px",
        height: "147.1px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "24.52px"
      }} /><div key={5} style={{
        position: "absolute",
        left: "161.79px",
        top: "143.47px",
        width: "157.96px",
        height: "147.1px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "24.52px"
      }} /><div key={6} style={{
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
          }}>{"24"}</span></p></div><div key={7} style={{
        position: "absolute",
        left: "64.7px",
        top: "345.07px",
        width: "342.69px",
        height: "249.36px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "0px"
      }} /><div key={8} style={{
        position: "absolute",
        left: "479.78px",
        top: "342.73px",
        width: "342.69px",
        height: "249.36px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "0px"
      }} /><div key={9} style={{
        position: "absolute",
        left: "882.42px",
        top: "344.09px",
        width: "342.69px",
        height: "249.36px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "0px"
      }} /><svg key={10} style={{
        position: "absolute",
        left: "319.37px",
        top: "222.68px",
        width: "240.27px",
        height: "1.21px",
        overflow: "visible"
      }}><line x1="0" y1="1.21" x2="240.27" y2="0" stroke="#000000" strokeWidth="1.33" /></svg><div key={11} style={{
        position: "absolute",
        left: "199.38px",
        top: "184.07px",
        width: "77.54px",
        height: "72.22px"
      }}><div key={0} style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          width: "77.54px",
          height: "72.22px",
          boxSizing: "border-box",
          backgroundColor: "#FD0C50",
          clipPath: "path('M 73.34 2.41 C 74.44 2.41 75.16 3.16 75.16 4.27 L 75.16 44.08 L 66.05 44.08 C 65.5 44.08 64.95 44.63 64.95 45.19 C 64.95 45.93 65.5 46.48 66.05 46.48 L 75.16 46.48 L 75.16 50.19 C 75.16 51.29 74.44 52.22 73.34 52.22 L 4.21 52.22 C 3.11 52.22 2.2 51.29 2.2 50.19 L 2.2 46.48 L 61.12 46.48 C 61.67 46.48 62.22 45.93 62.22 45.19 C 62.22 44.63 61.67 44.08 61.12 44.08 L 47.62 44.08 L 47.62 2.41 Z M 40.87 54.44 L 40.87 55.92 C 40.87 57.22 39.96 58.15 38.68 58.15 C 37.59 58.15 36.49 57.22 36.49 55.92 L 36.49 54.44 Z M 46.52 54.44 L 47.26 64.07 L 30.29 64.07 L 31.02 54.44 L 34.3 54.44 L 34.3 55.92 C 34.3 58.51 36.31 60.55 38.68 60.55 C 41.24 60.55 43.24 58.51 43.24 55.92 L 43.24 54.44 Z M 52.54 66.29 C 52.73 66.29 52.91 66.47 52.91 66.66 L 52.91 69.62 C 52.91 69.81 52.73 70 52.54 70 L 25 70 C 24.82 70 24.64 69.81 24.64 69.62 L 24.64 66.66 C 24.64 66.47 24.82 66.29 25 66.29 Z M 4.21 0.01 C 1.83 0.01 0.01 1.86 0.01 4.27 L 0.01 11.48 C 0.01 12.23 0.55 12.78 1.1 12.78 C 1.65 12.78 2.2 12.23 2.2 11.48 L 2.2 4.27 C 2.2 3.16 3.11 2.41 4.21 2.41 L 45.25 2.41 L 45.25 44.08 L 2.2 44.08 L 2.2 16.67 C 2.2 15.93 1.83 15.56 1.1 15.56 C 0.55 15.56 0.01 15.93 0.01 16.67 L 0.01 50.19 C 0.01 52.59 1.83 54.44 4.21 54.44 L 28.83 54.44 L 27.92 64.07 L 25 64.07 C 23.54 64.07 22.45 65.18 22.45 66.66 L 22.45 69.62 C 22.45 71.11 23.54 72.21 25 72.21 L 52.54 72.21 C 54.01 72.21 55.1 71.11 55.1 69.62 L 55.1 66.66 C 55.1 65.18 54.01 64.07 52.54 64.07 L 49.62 64.07 L 48.71 54.44 L 73.34 54.44 C 75.53 54.44 77.54 52.59 77.54 50.19 L 77.54 4.27 C 77.54 1.86 75.72 0.01 73.34 0.01 Z')"
        }} /><div key={1} style={{
          position: "absolute",
          left: "8.03px",
          top: "14.19px",
          width: "32.66px",
          height: "25.63px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 29.85 0 C 29.47 0 29.14 0.17 29.01 0.44 L 21.71 9.14 L 19.88 7.67 C 19.71 7.48 19.43 7.39 19.16 7.39 C 18.88 7.39 18.61 7.48 18.43 7.67 L 13.87 12.67 L 8.39 10.63 C 8.3 10.54 8.16 10.49 8 10.49 C 7.85 10.49 7.67 10.54 7.48 10.63 L 2.19 13.78 L 2.19 3.59 C 2.19 3.04 1.83 2.48 1.1 2.48 C 0.55 2.48 0.01 3.04 0.01 3.59 L 0.01 24.52 C 0.01 25.08 0.55 25.63 1.1 25.63 L 31.56 25.63 C 32.11 25.63 32.65 25.08 32.65 24.52 C 32.65 23.97 32.29 23.41 31.56 23.41 L 31.01 23.41 L 31.01 17.11 C 31.01 16.37 30.47 15.82 29.92 15.82 C 29.19 15.82 28.64 16.37 28.64 17.11 L 28.64 23.41 L 25.9 23.41 L 25.9 22.48 C 25.9 21.93 25.36 21.37 24.81 21.37 C 24.08 21.37 23.54 21.74 23.54 22.48 L 23.54 23.41 L 19.71 23.41 L 19.71 22.48 C 19.71 21.93 19.34 21.37 18.61 21.37 C 18.06 21.37 17.52 21.74 17.52 22.48 L 17.52 23.41 L 13.69 23.41 L 13.69 22.48 C 13.69 21.93 13.14 21.37 12.59 21.37 C 11.86 21.37 11.5 21.74 11.5 22.48 L 11.5 23.41 L 7.67 23.41 L 7.67 22.48 C 7.67 21.93 7.12 21.37 6.39 21.37 C 5.84 21.37 5.29 21.74 5.29 22.48 L 5.29 23.41 L 2.19 23.41 L 2.19 16.37 L 8.03 12.85 L 13.87 15.26 C 13.96 15.31 14.08 15.33 14.19 15.33 C 14.5 15.33 14.83 15.16 14.96 14.89 L 19.34 10.08 L 21.16 11.56 C 21.41 11.8 21.66 11.91 21.91 11.91 C 22.2 11.91 22.5 11.76 22.8 11.56 L 28.64 4.33 L 28.64 11.93 C 28.64 12.67 29.19 13.04 29.73 13.04 C 30.47 13.04 31.01 12.67 31.01 11.93 L 31.01 1.18 C 31.01 0.63 30.65 0.26 30.29 0.08 C 30.14 0.02 29.99 0 29.85 0 Z')"
        }} /><div key={2} style={{
          position: "absolute",
          left: "14.96px",
          top: "19.45px",
          width: "2.2px",
          height: "3.16px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 1.1 0 C 0.55 0 0.01 0.56 0.01 1.3 L 0.01 2.04 C 0.01 2.79 0.55 3.15 1.1 3.15 C 1.83 3.15 2.19 2.79 2.19 2.04 L 2.19 1.3 C 2.19 0.56 1.83 0 1.1 0 Z')"
        }} /><div key={3} style={{
          position: "absolute",
          left: "26.09px",
          top: "16.3px",
          width: "2.37px",
          height: "3.16px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 1.09 0.01 C 0.55 0.01 0 0.56 0 1.11 L 0 2.04 C 0 2.6 0.55 3.15 1.09 3.15 C 1.82 3.15 2.37 2.6 2.37 2.04 L 2.37 1.11 C 2.37 0.56 1.82 0.01 1.09 0.01 Z')"
        }} /><div key={4} style={{
          position: "absolute",
          left: "36.67px",
          top: "9.45px",
          width: "2.38px",
          height: "3.16px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 1.28 0 C 0.55 0 0 0.37 0 1.11 L 0 1.86 C 0 2.6 0.55 3.15 1.28 3.15 C 1.83 3.15 2.37 2.6 2.37 1.86 L 2.37 1.11 C 2.37 0.37 1.83 0 1.28 0 Z')"
        }} /><div key={5} style={{
          position: "absolute",
          left: "8.03px",
          top: "6.11px",
          width: "6.21px",
          height: "2.23px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 1.1 0.01 C 0.55 0.01 0.01 0.56 0.01 1.12 C 0.01 1.86 0.55 2.23 1.1 2.23 L 5.11 2.23 C 5.66 2.23 6.2 1.86 6.2 1.12 C 6.2 0.56 5.66 0.01 5.11 0.01 Z')"
        }} /><div key={6} style={{
          position: "absolute",
          left: "8.03px",
          top: "10.37px",
          width: "10.77px",
          height: "2.42px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 1.1 0 C 0.55 0 0.01 0.56 0.01 1.11 C 0.01 1.86 0.55 2.41 1.1 2.41 L 9.49 2.41 C 10.22 2.41 10.77 1.86 10.77 1.11 C 10.77 0.56 10.22 0 9.49 0 Z')"
        }} /><div key={7} style={{
          position: "absolute",
          left: "58.01px",
          top: "9.82px",
          width: "7.12px",
          height: "12.22px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 3.47 0 C 2.92 0 2.37 0.37 2.37 1.11 L 2.37 1.3 C 1.1 1.66 0.01 2.78 0.01 4.26 C 0.01 5.92 1.28 7.22 2.92 7.22 L 4.02 7.22 C 4.38 7.22 4.75 7.59 4.75 7.96 C 4.75 8.33 4.38 8.7 4.02 8.7 L 2.92 8.7 C 2.74 8.7 2.37 8.51 2.37 8.15 C 2.24 7.73 1.79 7.52 1.35 7.52 C 1.2 7.52 1.06 7.54 0.92 7.59 C 0.37 7.96 0.01 8.51 0.37 9.07 C 0.73 10 1.46 10.74 2.37 10.92 C 2.37 11.66 2.92 12.22 3.47 12.22 C 4.2 12.22 4.75 11.66 4.75 10.92 C 6.03 10.55 7.12 9.44 7.12 7.96 C 7.12 6.3 5.66 5 4.02 5 L 2.92 5 C 2.56 5 2.37 4.63 2.37 4.26 C 2.37 3.89 2.56 3.52 2.92 3.52 L 4.02 3.52 C 4.38 3.52 4.56 3.7 4.75 3.89 C 4.86 4.24 5.21 4.45 5.59 4.45 C 5.8 4.45 6.01 4.39 6.2 4.26 C 6.75 3.89 6.94 3.15 6.57 2.59 C 6.03 1.85 5.47 1.48 4.75 1.3 L 4.75 1.11 C 4.75 0.37 4.2 0 3.47 0 Z')"
        }} /><div key={8} style={{
          position: "absolute",
          left: "51.99px",
          top: "6.11px",
          width: "19.17px",
          height: "19.45px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 9.49 2.23 C 13.51 2.23 16.98 5.56 16.98 9.82 C 16.98 13.89 13.69 17.22 9.49 17.22 C 5.48 17.22 2.2 13.89 2.2 9.82 C 2.2 5.56 5.48 2.23 9.49 2.23 Z M 9.49 0.01 C 4.21 0.01 0.01 4.26 0.01 9.63 C 0.01 15.19 4.21 19.44 9.49 19.44 C 14.79 19.44 19.16 15.19 19.16 9.63 C 19.16 4.45 14.79 0.01 9.49 0.01 Z')"
        }} /><div key={9} style={{
          position: "absolute",
          left: "51.08px",
          top: "28.33px",
          width: "10.41px",
          height: "2.42px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 1.1 0 C 0.37 0 0.01 0.56 0.01 1.11 C 0.01 1.86 0.37 2.41 1.1 2.41 L 9.31 2.41 C 9.86 2.41 10.4 1.86 10.4 1.11 C 10.4 0.56 10.04 0 9.31 0 Z')"
        }} /><div key={10} style={{
          position: "absolute",
          left: "65.13px",
          top: "32.96px",
          width: "5.84px",
          height: "2.23px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 1.09 0.01 C 0.37 0.01 0.01 0.37 0.01 1.12 C 0.01 1.67 0.37 2.23 1.09 2.23 L 4.56 2.23 C 5.29 2.23 5.84 1.67 5.84 1.12 C 5.84 0.56 5.29 0.01 4.56 0.01 Z')"
        }} /><div key={11} style={{
          position: "absolute",
          left: "51.08px",
          top: "32.96px",
          width: "6.58px",
          height: "2.23px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 1.1 0.01 C 0.37 0.01 0.01 0.37 0.01 1.12 C 0.01 1.67 0.37 2.23 1.1 2.23 L 5.48 2.23 C 6.03 2.23 6.57 1.67 6.57 1.12 C 6.57 0.56 6.21 0.01 5.48 0.01 Z')"
        }} /><div key={12} style={{
          position: "absolute",
          left: "59.29px",
          top: "32.96px",
          width: "4.39px",
          height: "2.23px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 1.1 0.01 C 0.55 0.01 0 0.37 0 1.12 C 0 1.67 0.55 2.23 1.1 2.23 L 3.29 2.23 C 3.84 2.23 4.38 1.67 4.38 1.12 C 4.38 0.56 3.84 0.01 3.29 0.01 Z')"
        }} /><div key={13} style={{
          position: "absolute",
          left: "51.08px",
          top: "37.41px",
          width: "19.71px",
          height: "2.41px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 1.1 0 C 0.37 0 0.01 0.56 0.01 1.11 C 0.01 1.86 0.37 2.41 1.1 2.41 L 18.61 2.41 C 19.34 2.41 19.71 1.86 19.71 1.11 C 19.71 0.56 19.34 0 18.61 0 Z')"
        }} /></div><div key={12} style={{
        position: "absolute",
        left: "599.53px",
        top: "180.86px",
        width: "77.54px",
        height: "76.8px"
      }}><div key={0} style={{
          position: "absolute",
          left: "43.05px",
          top: "20.08px",
          width: "4.02px",
          height: "3.02px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 2.66 0.01 C 2.57 0.01 2.47 0.02 2.37 0.05 L 0.74 0.79 C 0.18 0.98 0.01 1.72 0.18 2.27 C 0.37 2.64 0.74 3.01 1.09 3.01 C 1.28 3.01 1.46 3.01 1.65 2.83 L 3.1 2.27 C 3.65 2.09 4.01 1.35 3.84 0.79 C 3.53 0.34 3.11 0.01 2.66 0.01 Z')"
        }} /><div key={1} style={{
          position: "absolute",
          left: "40.68px",
          top: "15.8px",
          width: "3.66px",
          height: "3.6px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 2.28 0.01 C 1.98 0.01 1.67 0.15 1.46 0.45 L 0.38 1.75 C 0.01 2.3 0.19 3.04 0.74 3.41 C 0.92 3.6 1.1 3.6 1.29 3.6 C 1.65 3.6 2.01 3.41 2.2 3.23 L 3.29 1.75 C 3.65 1.38 3.47 0.64 2.92 0.26 C 2.76 0.1 2.53 0.01 2.28 0.01 Z')"
        }} /><div key={2} style={{
          position: "absolute",
          left: "43.96px",
          top: "24.95px",
          width: "4.02px",
          height: "2.6px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 1.46 0 C 0.74 0 0.18 0.37 0.18 0.93 C 0.01 1.67 0.37 2.23 1.09 2.23 L 2.74 2.6 L 2.93 2.6 C 3.47 2.6 3.84 2.23 4.02 1.67 C 4.02 0.93 3.65 0.37 3.1 0.37 L 1.46 0 Z')"
        }} /><div key={3} style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          width: "77.54px",
          height: "76.8px",
          boxSizing: "border-box",
          backgroundColor: "#ff0053",
          clipPath: "path('M 36.67 3.29 L 47.25 7.73 L 40.14 10.7 C 40.09 10.75 40.03 10.77 39.98 10.77 C 39.85 10.77 39.72 10.64 39.59 10.51 L 36.67 3.29 Z M 62.94 16.06 C 63.31 16.06 63.67 16.25 63.67 16.62 L 63.67 19.95 C 63.67 20.32 63.31 20.69 62.94 20.69 L 56.74 20.69 L 54.91 16.06 Z M 67.32 9.95 C 68.42 9.95 69.33 10.88 69.33 11.99 L 69.33 30.51 L 60.93 30.51 L 57.84 22.91 L 62.94 22.91 C 64.59 22.91 65.86 21.62 65.86 19.95 L 65.86 16.62 C 65.86 14.95 64.59 13.66 62.94 13.66 L 54 13.66 L 52.36 9.95 Z M 33.94 2.74 L 37.58 11.44 C 37.95 12.55 38.86 13.1 39.96 13.1 C 40.32 13.1 40.69 13.1 41.05 12.91 L 49.62 9.21 L 58.38 30.69 L 52.91 30.69 C 52.36 30.69 51.82 31.06 51.82 31.8 C 51.82 32.36 52.36 32.91 52.91 32.91 L 73.34 32.91 C 74.44 32.91 75.16 33.84 75.16 34.76 L 75.16 69.76 C 75.16 72.54 73.16 74.57 70.42 74.57 L 12.23 74.57 C 13.32 73.28 14.05 71.61 14.05 69.76 L 14.05 57.17 C 14.05 56.61 13.51 56.06 12.77 56.06 C 12.23 56.06 11.67 56.61 11.67 57.17 L 11.67 69.76 C 11.67 72.54 9.67 74.57 6.93 74.57 C 4.38 74.57 2.19 72.54 2.19 69.76 L 2.19 20.14 C 2.19 19.02 3.1 18.1 4.2 18.1 L 6.39 18.1 L 8.58 23.84 C 8.85 24.26 9.22 24.47 9.63 24.47 C 9.76 24.47 9.9 24.44 10.04 24.4 C 10.59 24.21 10.95 23.47 10.76 22.91 L 7.3 14.59 C 7.12 14.4 7.3 14.03 7.48 14.03 L 33.94 2.74 Z M 34.57 0 C 34.43 0 34.3 0.05 34.12 0.14 L 6.57 11.8 C 5.29 12.36 4.57 14.03 5.11 15.32 L 5.29 15.88 L 4.2 15.88 C 1.82 15.88 0 17.73 0 20.14 L 0 69.76 C 0 73.64 3.1 76.79 6.93 76.79 L 70.42 76.79 C 74.44 76.79 77.53 73.64 77.53 69.76 L 77.53 34.76 C 77.53 32.36 75.53 30.51 73.34 30.51 L 71.52 30.51 L 71.52 11.99 C 71.52 9.59 69.69 7.73 67.32 7.73 L 51.45 7.73 L 51.26 7.18 C 51.08 6.99 50.9 6.62 50.72 6.62 L 35.03 0.14 C 34.85 0.05 34.71 0 34.57 0 Z')"
        }} /><div key={4} style={{
          position: "absolute",
          left: "10.21px",
          top: "16.71px",
          width: "38.87px",
          height: "36.57px",
          boxSizing: "border-box",
          backgroundColor: "#FD0C50",
          clipPath: "path('M 21.14 2.34 C 22.15 2.34 23.14 2.53 24.09 2.88 C 26.28 3.8 27.92 5.47 28.65 7.5 C 29.56 9.54 29.56 11.76 28.83 13.8 L 25.18 13.8 C 25.55 13.05 25.73 12.13 25.36 11.2 C 25 10.46 24.27 9.91 23.54 9.54 C 23.17 9.35 22.77 9.26 22.35 9.26 C 21.95 9.26 21.53 9.35 21.17 9.54 L 20.08 10.09 C 19.97 10.13 19.87 10.15 19.77 10.15 C 19.34 10.15 18.94 9.84 18.8 9.54 C 18.62 8.98 18.98 8.61 19.34 8.43 L 20.44 7.88 C 20.62 7.78 20.76 7.74 20.9 7.74 C 21.04 7.74 21.17 7.78 21.35 7.88 C 21.56 8.02 21.77 8.08 21.97 8.08 C 22.29 8.08 22.58 7.91 22.81 7.69 C 23.17 7.13 23 6.39 22.63 6.02 C 22.15 5.66 21.61 5.46 21.04 5.46 C 20.72 5.46 20.4 5.52 20.08 5.65 L 19.89 5.28 C 19.74 4.82 19.22 4.49 18.74 4.49 C 18.63 4.49 18.53 4.51 18.43 4.54 C 17.89 4.91 17.7 5.47 17.89 6.02 L 18.07 6.39 C 16.79 7.32 16.24 8.98 16.79 10.46 C 17.34 11.58 18.52 12.39 19.78 12.39 C 20.19 12.39 20.59 12.31 20.99 12.13 L 22.08 11.58 L 22.81 11.58 C 23 11.76 23.17 11.95 23.17 12.13 C 23.36 12.5 23.17 13.05 22.81 13.24 L 21.53 13.8 L 21.17 13.8 C 20.99 13.8 20.81 13.8 20.62 13.61 C 20.44 13.33 20.16 13.19 19.87 13.19 C 19.57 13.19 19.25 13.33 18.98 13.61 C 18.98 13.61 18.98 13.8 18.8 13.8 L 13.32 13.8 C 12.41 11.76 12.41 9.54 13.32 7.5 C 14.06 5.47 15.7 3.8 17.7 3.06 C 18.86 2.57 20.02 2.34 21.14 2.34 Z M 20.99 0 C 19.62 0 18.25 0.28 16.98 0.84 C 14.23 1.95 12.23 3.98 11.14 6.58 C 10.23 8.98 10.04 11.58 10.77 13.8 L 5.66 13.8 C 4.93 13.8 4.38 13.98 3.84 14.16 L 2.38 10.84 C 2.24 10.43 1.83 10.13 1.4 10.13 C 1.24 10.13 1.07 10.18 0.92 10.28 C 0.38 10.46 0.01 11.2 0.38 11.76 L 2.01 15.84 C 1.65 16.57 1.46 17.31 1.46 18.05 L 1.46 35.27 C 1.46 36.01 2.01 36.57 2.56 36.57 C 3.29 36.57 3.84 36.01 3.84 35.27 L 3.84 18.05 C 3.84 16.94 4.57 16.2 5.66 16.2 L 37.59 16.2 C 38.32 16.2 38.86 15.65 38.86 14.91 C 38.86 14.35 38.32 13.8 37.59 13.8 L 31.2 13.8 C 31.93 11.39 31.75 8.98 30.84 6.58 C 29.75 3.98 27.56 1.95 25 0.84 C 23.73 0.28 22.35 0 20.99 0 Z')"
        }} /><div key={5} style={{
          position: "absolute",
          left: "11.86px",
          top: "12.12px",
          width: "10.77px",
          height: "5.8px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 9.25 0.01 C 9.14 0.01 9.04 0.02 8.94 0.05 L 0.91 3.58 C 0.37 3.76 0 4.5 0.18 5.05 C 0.37 5.61 0.91 5.79 1.28 5.79 L 1.65 5.79 L 9.85 2.28 C 10.4 2.09 10.76 1.35 10.4 0.79 C 10.25 0.34 9.73 0.01 9.25 0.01 Z')"
        }} /><div key={6} style={{
          position: "absolute",
          left: "13.5px",
          top: "17.77px",
          width: "5.84px",
          height: "3.67px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 4.58 0 C 4.41 0 4.22 0.05 4.02 0.15 L 0.73 1.45 C 0.18 1.82 0.01 2.37 0.18 2.92 C 0.37 3.48 0.73 3.67 1.28 3.67 L 1.65 3.67 L 4.93 2.18 C 5.47 2 5.84 1.26 5.66 0.71 C 5.4 0.3 5.04 0 4.58 0 Z')"
        }} /><div key={7} style={{
          position: "absolute",
          left: "18.79px",
          top: "64.38px",
          width: "8.04px",
          height: "2.23px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 1.1 0.01 C 0.55 0.01 0 0.37 0 1.12 C 0 1.67 0.55 2.22 1.1 2.22 L 6.94 2.22 C 7.49 2.22 8.03 1.67 8.03 1.12 C 8.03 0.37 7.49 0.01 6.94 0.01 Z')"
        }} /><div key={8} style={{
          position: "absolute",
          left: "18.79px",
          top: "68.46px",
          width: "18.61px",
          height: "2.42px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 1.1 0.01 C 0.55 0.01 0 0.56 0 1.11 C 0 1.86 0.55 2.41 1.1 2.41 L 17.51 2.41 C 18.06 2.41 18.6 1.86 18.6 1.11 C 18.6 0.56 18.06 0.01 17.51 0.01 Z')"
        }} /></div><div key={13} style={{
        position: "absolute",
        left: "1024.39px",
        top: "183.7px",
        width: "77.54px",
        height: "72.96px"
      }}><div key={0} style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          width: "77.54px",
          height: "72.96px",
          boxSizing: "border-box",
          backgroundColor: "#FD0C50",
          clipPath: "path('M 38.86 66.48 C 39.95 66.48 40.87 67.4 40.87 68.51 C 40.87 69.62 39.95 70.73 38.86 70.73 C 37.59 70.73 36.67 69.62 36.67 68.51 C 36.67 67.4 37.59 66.48 38.86 66.48 Z M 2.74 0 C 1.29 0 0.01 1.3 0.01 2.78 L 0.01 7.41 C 0.01 8.89 1.1 10 2.56 10 L 2.56 40.18 C 2.56 40.73 3.11 41.29 3.65 41.29 C 4.38 41.29 4.93 40.92 4.93 40.18 L 4.93 10 L 59.29 10 C 59.84 10 60.39 9.63 60.39 8.89 C 60.39 8.33 59.84 7.77 59.29 7.77 L 2.74 7.77 C 2.56 7.77 2.38 7.6 2.38 7.41 L 2.38 2.78 C 2.38 2.41 2.56 2.22 2.74 2.22 L 74.98 2.22 C 75.16 2.22 75.34 2.6 75.34 2.78 L 75.34 7.41 C 75.34 7.6 75.16 7.77 74.98 7.77 L 64.4 7.77 C 63.67 7.77 63.12 8.33 63.12 8.89 C 63.12 9.63 63.67 10 64.4 10 L 72.79 10 L 72.79 57.03 C 72.79 57.22 72.61 57.4 72.42 57.4 L 5.3 57.4 C 5.12 57.4 4.93 57.22 4.93 57.03 L 4.93 45.37 C 4.93 44.63 4.38 44.25 3.65 44.25 C 3.11 44.25 2.56 44.63 2.56 45.37 L 2.56 57.03 C 2.56 58.51 3.84 59.62 5.3 59.62 L 37.59 59.62 L 37.59 64.25 C 35.76 64.8 34.48 66.48 34.48 68.51 C 34.48 70.91 36.31 72.95 38.86 72.95 C 41.23 72.95 43.06 70.91 43.06 68.51 C 43.06 66.48 41.78 64.8 39.95 64.25 L 39.95 59.62 L 72.24 59.62 C 73.7 59.62 74.98 58.51 74.98 57.03 L 74.98 10 C 76.44 10 77.53 8.89 77.53 7.41 L 77.53 2.78 C 77.53 1.3 76.44 0 74.98 0 Z')"
        }} /><div key={1} style={{
          position: "absolute",
          left: "58.56px",
          top: "46.47px",
          width: "10.4px",
          height: "2.23px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 1.28 0.01 C 0.55 0.01 0 0.56 0 1.12 C 0 1.86 0.55 2.22 1.28 2.22 L 9.12 2.22 C 9.85 2.22 10.4 1.86 10.4 1.12 C 10.22 0.56 9.85 0.01 9.12 0.01 Z')"
        }} /><div key={2} style={{
          position: "absolute",
          left: "50.72px",
          top: "50.54px",
          width: "18.25px",
          height: "2.42px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 1.1 0.01 C 0.55 0.01 0 0.56 0 1.11 C 0 1.86 0.55 2.41 1.1 2.41 L 16.97 2.41 C 17.7 2.41 18.25 1.86 18.25 1.11 C 18.25 0.56 17.7 0.01 16.97 0.01 Z')"
        }} /><div key={3} style={{
          position: "absolute",
          left: "50.72px",
          top: "16.11px",
          width: "3.84px",
          height: "2.41px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 1.1 0 C 0.55 0 0 0.56 0 1.11 C 0 1.85 0.55 2.41 1.1 2.41 L 2.56 2.41 C 3.29 2.41 3.83 1.85 3.83 1.11 C 3.83 0.56 3.29 0 2.56 0 Z')"
        }} /><div key={4} style={{
          position: "absolute",
          left: "56.37px",
          top: "16.11px",
          width: "12.59px",
          height: "2.41px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 1.1 0 C 0.55 0 0.01 0.56 0.01 1.11 C 0.01 1.85 0.55 2.41 1.1 2.41 L 11.31 2.41 C 12.04 2.41 12.59 1.85 12.59 1.11 C 12.59 0.56 12.04 0 11.31 0 Z')"
        }} /><div key={5} style={{
          position: "absolute",
          left: "50.72px",
          top: "20.36px",
          width: "18.25px",
          height: "2.23px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 1.1 0.01 C 0.55 0.01 0 0.37 0 1.12 C 0 1.67 0.55 2.23 1.1 2.23 L 16.97 2.23 C 17.7 2.23 18.25 1.67 18.25 1.12 C 18.25 0.37 17.7 0.01 16.97 0.01 Z')"
        }} /><div key={6} style={{
          position: "absolute",
          left: "50.72px",
          top: "27.21px",
          width: "18.25px",
          height: "14.83px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 1.1 0.01 C 0.37 0.01 0 0.38 0 1.12 L 0 13.71 C 0 14.27 0.55 14.82 1.1 14.82 L 16.97 14.82 C 17.7 14.82 18.25 14.27 18.25 13.71 C 18.25 12.97 17.7 12.42 16.97 12.42 L 14.24 12.42 L 14.24 2.42 C 14.24 1.86 13.68 1.31 13.14 1.31 C 12.6 1.31 12.04 1.86 12.04 2.42 L 12.04 12.42 L 10.22 12.42 L 10.22 8.71 C 10.22 8.16 9.68 7.6 9.13 7.6 C 8.4 7.6 7.85 8.16 7.85 8.71 L 7.85 12.42 L 6.02 12.42 L 6.02 5.93 C 6.02 5.19 5.66 4.63 4.93 4.63 C 4.38 4.63 3.83 5.19 3.83 5.93 L 3.83 12.42 L 2.19 12.42 L 2.19 1.12 C 2.19 0.56 1.65 0.01 1.1 0.01 Z')"
        }} /><div key={7} style={{
          position: "absolute",
          left: "8.03px",
          top: "14.25px",
          width: "38.32px",
          height: "38.89px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 19.16 9.45 C 24.64 9.45 29.2 13.89 29.2 19.45 C 29.2 25.19 24.64 29.63 19.16 29.63 C 13.69 29.63 9.31 25 9.31 19.45 C 9.31 13.89 13.69 9.45 19.16 9.45 Z M 35.94 20.74 C 35.76 24.27 34.49 27.59 32.3 30.19 L 29.01 26.85 C 30.29 25 31.2 22.97 31.39 20.74 Z M 18.06 2.42 L 18.06 7.23 C 11.87 7.78 6.94 13.15 6.94 19.45 C 6.94 26.3 12.41 31.85 19.16 31.85 C 22.45 31.85 25.37 30.74 27.56 28.52 C 28.65 29.63 29.75 30.74 30.84 31.85 C 27.92 34.82 23.73 36.67 19.16 36.67 C 9.86 36.67 2.38 28.89 2.38 19.45 C 2.38 10.38 9.31 2.97 18.06 2.42 Z M 19.16 0.01 C 8.58 0.01 0.01 8.89 0.01 19.45 C 0.01 30.19 8.58 38.89 19.16 38.89 C 29.75 38.89 38.32 30.19 38.32 19.45 C 38.32 15.38 37.04 11.48 34.67 8.16 C 34.47 7.84 34.16 7.71 33.82 7.71 C 33.55 7.71 33.27 7.81 33.03 7.97 C 32.67 8.34 32.48 8.89 32.84 9.45 C 34.67 12.04 35.76 15.19 35.94 18.34 L 31.39 18.34 C 30.84 12.42 26.09 7.78 20.26 7.23 L 20.26 2.42 C 23.73 2.6 26.82 3.9 29.56 6.12 C 29.77 6.26 30.01 6.32 30.24 6.32 C 30.61 6.32 30.98 6.16 31.2 5.93 C 31.57 5.38 31.57 4.63 31.02 4.27 C 27.56 1.48 23.54 0.01 19.16 0.01 Z')"
        }} /><div key={8} style={{
          position: "absolute",
          left: "9.12px",
          top: "50.12px",
          width: "5.48px",
          height: "3.95px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 1.28 0.01 C 1.01 0.01 0.73 0.15 0.55 0.43 C 0.01 0.79 0.01 1.53 0.55 1.91 L 2.01 3.57 C 2.19 3.76 2.56 3.94 2.74 3.94 C 3.1 3.94 3.28 3.76 3.65 3.57 L 5.1 1.91 C 5.47 1.53 5.47 0.79 5.1 0.43 C 4.84 0.15 4.52 0.01 4.22 0.01 C 3.93 0.01 3.65 0.15 3.47 0.43 L 2.74 1.17 L 2.01 0.43 C 1.83 0.15 1.55 0.01 1.28 0.01 Z')"
        }} /><div key={9} style={{
          position: "absolute",
          left: "29.38px",
          top: "34.16px",
          width: "5.48px",
          height: "3.81px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 1.26 0.01 C 0.96 0.01 0.64 0.1 0.37 0.29 C 0 0.65 0 1.4 0.37 1.95 L 1.82 3.44 C 2.19 3.62 2.38 3.8 2.74 3.8 C 2.92 3.8 3.29 3.62 3.47 3.44 L 5.11 1.95 C 5.47 1.4 5.47 0.65 5.11 0.29 C 4.84 0.1 4.51 0.01 4.22 0.01 C 3.92 0.01 3.65 0.1 3.47 0.29 L 2.74 1.03 L 2.01 0.29 C 1.82 0.1 1.55 0.01 1.26 0.01 Z')"
        }} /><div key={10} style={{
          position: "absolute",
          left: "41.41px",
          top: "16.38px",
          width: "5.48px",
          height: "3.81px",
          boxSizing: "border-box",
          backgroundColor: "#E4EAE9",
          clipPath: "path('M 1.29 0.01 C 1.01 0.01 0.73 0.1 0.55 0.29 C 0.01 0.65 0.01 1.39 0.55 1.95 L 2.01 3.43 C 2.2 3.62 2.37 3.8 2.74 3.8 C 3.11 3.8 3.28 3.62 3.47 3.43 L 5.11 1.95 C 5.47 1.39 5.47 0.65 5.11 0.29 C 4.84 0.1 4.52 0.01 4.22 0.01 C 3.93 0.01 3.65 0.1 3.47 0.29 L 2.74 1.03 L 2.01 0.29 C 1.83 0.1 1.55 0.01 1.29 0.01 Z')"
        }} /></div><div key={14} style={{
        position: "absolute",
        left: "980.26px",
        top: "146.62px",
        width: "157.96px",
        height: "147.1px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "24.52px"
      }} /><div key={15} style={{
        position: "absolute",
        left: "55.2px",
        top: "44.22px",
        width: "1035.46px",
        height: "39.49px",
        boxSizing: "border-box"
      }} /><svg key={16} style={{
        position: "absolute",
        left: "718.44px",
        top: "222.48px",
        width: "261.41px",
        height: "1.31px",
        overflow: "visible"
      }}><line x1="0" y1="1.31" x2="261.41" y2="0" stroke="#000000" strokeWidth="1.33" /></svg></div></div>;
};
export default Slide24;
