import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_33.png";
import img_bg from "./assets/images/image_29.png";
const Slide29: React.FC = () => {
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
  return <div id="slide-29" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-29" style={{
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
        left: "42.11px",
        top: "524.08px",
        width: "287.59px",
        height: "143.26px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        borderRadius: "7.38px"
      }} /><div key={1} style={{
        position: "absolute",
        left: "346.73px",
        top: "524.08px",
        width: "287.59px",
        height: "143.26px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        borderRadius: "7.38px"
      }} /><div key={2} style={{
        position: "absolute",
        left: "651.36px",
        top: "524.08px",
        width: "287.59px",
        height: "143.26px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        borderRadius: "7.38px"
      }} /><div key={3} style={{
        position: "absolute",
        left: "955.99px",
        top: "524.08px",
        width: "287.59px",
        height: "143.26px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        borderRadius: "7.38px"
      }} /><div key={4} style={{
        position: "absolute",
        left: "36.33px",
        top: "34.07px",
        width: "326.7px",
        height: "65.19px",
        boxSizing: "border-box",
        backgroundColor: "#ff0053",
        borderRadius: "12.19px"
      }} /><div key={5} style={{
        position: "absolute",
        left: "109.71px",
        top: "119.67px",
        width: "181.23px",
        height: "384px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "22.7px"
      }} /><div key={6} style={{
        position: "absolute",
        left: "395.84px",
        top: "119.67px",
        width: "181.23px",
        height: "384px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "22.7px"
      }} /><div key={7} style={{
        position: "absolute",
        left: "708.96px",
        top: "120.18px",
        width: "181.23px",
        height: "384px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "22.7px"
      }} /><div key={8} style={{
        position: "absolute",
        left: "1010.18px",
        top: "117.6px",
        width: "181.23px",
        height: "384px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "22.7px"
      }} /><div key={9} style={{
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
          }}>{"29"}</span></p></div><div key={10} style={{
        position: "absolute",
        left: "47.16px",
        top: "528.66px",
        width: "279.06px",
        height: "133.47px",
        boxSizing: "border-box"
      }} /><div key={11} style={{
        position: "absolute",
        left: "346.73px",
        top: "528.66px",
        width: "284.11px",
        height: "133.47px",
        boxSizing: "border-box"
      }} /><div key={12} style={{
        position: "absolute",
        left: "651.36px",
        top: "528.66px",
        width: "286.42px",
        height: "133.47px",
        boxSizing: "border-box"
      }} /><div key={13} style={{
        position: "absolute",
        left: "957.12px",
        top: "528.66px",
        width: "287.59px",
        height: "133.47px",
        boxSizing: "border-box"
      }} /><div key={14} style={{
        position: "absolute",
        left: "104.69px",
        top: "115.15px",
        width: "191.27px",
        height: "393.2px"
      }}><div key={0} style={{
          position: "absolute",
          left: "1.55px",
          top: "0px",
          width: "188.99px",
          height: "393.15px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 161.9 0.76 L 27.32 0.76 C 12.65 0.76 0.76 12.66 0.76 27.32 L 0.76 366.07 C 0.76 380.74 12.65 392.63 27.32 392.63 L 161.9 392.63 C 176.57 392.63 188.46 380.74 188.46 366.07 L 188.46 27.32 C 188.46 12.66 176.57 0.76 161.9 0.76 Z M 185.89 365.15 C 185.89 378.9 174.73 390.06 160.97 390.06 L 28.25 390.06 C 14.49 390.06 3.34 378.9 3.34 365.15 L 3.34 28.25 C 3.34 14.49 14.49 3.33 28.25 3.33 L 160.96 3.33 C 174.72 3.33 185.88 14.49 185.88 28.25 L 185.88 365.15 Z')"
        }} /><div key={1} style={{
          position: "absolute",
          left: "8.63px",
          top: "0.03px",
          width: "180.91px",
          height: "31.33px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 9.9 C 6.17 5.07 13.16 1.31 21.38 1.41 L 149 1.66 C 165.61 2.66 180.22 11.75 180.79 31.07 C 180.79 33.2 181.93 14.89 170.07 6.85 C 164.43 2.81 156.1 1.04 151.1 0.94 C 142.9 0.79 34.77 0.62 21.52 0.94 C 10.42 1.21 5.22 5.69 0.76 9.9 Z')"
        }} /><div key={2} style={{
          position: "absolute",
          left: "4.12px",
          top: "2.58px",
          width: "183.94px",
          height: "388.09px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 158.39 0.76 L 25.67 0.76 C 11.92 0.76 0.76 11.91 0.76 25.67 L 0.76 362.56 C 0.76 376.32 11.92 387.47 25.67 387.47 L 158.39 387.47 C 172.15 387.47 183.3 376.32 183.3 362.56 L 183.3 25.67 C 183.3 11.91 172.15 0.76 158.39 0.76 Z M 182.01 361.81 C 182.01 375.28 171.09 386.19 157.63 386.19 L 26.42 386.19 C 12.96 386.19 2.04 375.28 2.04 361.81 L 2.04 26.42 C 2.04 12.96 12.96 2.05 26.42 2.05 L 157.64 2.05 C 171.1 2.05 182.02 12.97 182.02 26.43 L 182.02 361.81 Z')"
        }} /><div key={3} style={{
          position: "absolute",
          left: "4px",
          top: "2.45px",
          width: "183.94px",
          height: "388.09px",
          boxSizing: "border-box",
          backgroundColor: "#000000",
          clipPath: "path('M 158.52 387.74 L 25.79 387.74 C 11.99 387.74 0.76 376.51 0.76 362.69 L 0.76 25.8 C 0.75 12 11.99 0.76 25.79 0.76 L 158.52 0.76 C 172.33 0.76 183.56 11.99 183.56 25.79 L 183.56 362.68 C 183.56 376.49 172.33 387.73 158.52 387.73 Z M 25.79 1.01 C 12.13 1.01 1 12.14 1 25.8 L 1 362.69 C 1 376.36 12.12 387.48 25.78 387.48 L 158.51 387.48 C 172.18 387.48 183.29 376.37 183.29 362.69 L 183.29 25.8 C 183.29 12.14 172.18 1.02 158.51 1.02 L 25.79 1.02 Z M 157.76 386.44 L 26.54 386.44 C 13.03 386.44 2.04 375.45 2.04 361.94 L 2.04 26.55 C 2.04 13.05 13.04 2.05 26.54 2.05 L 157.76 2.05 C 171.28 2.05 182.26 13.05 182.26 26.55 L 182.26 361.93 C 182.26 375.45 171.27 386.43 157.76 386.43 Z M 26.54 2.31 C 13.17 2.31 2.29 13.18 2.29 26.55 L 2.29 361.93 C 2.29 375.31 13.17 386.18 26.54 386.18 L 157.76 386.18 C 171.13 386.18 182.01 375.31 182.01 361.93 L 182.01 26.55 C 182.01 13.18 171.13 2.31 157.76 2.31 L 26.54 2.31 Z')"
        }} /><div key={4} style={{
          position: "absolute",
          left: "8.63px",
          top: "361.35px",
          width: "180.91px",
          height: "31.33px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 22.11 C 6.17 26.94 13.16 30.7 21.38 30.59 L 149 30.34 C 165.61 29.34 180.22 20.25 180.79 0.93 C 180.79 -1.2 181.93 17.11 170.07 25.14 C 164.43 29.19 156.1 30.96 151.1 31.06 C 142.9 31.21 34.77 31.38 21.52 31.06 C 10.42 30.78 5.2 26.31 0.76 22.11 Z')"
        }} /><div key={5} style={{
          position: "absolute",
          left: "189.25px",
          top: "81.97px",
          width: "2.02px",
          height: "42.45px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 0.76 L 1.35 0.76 L 1.35 42.68 L 0.76 42.68 Z')"
        }} /><div key={6} style={{
          position: "absolute",
          left: "189.85px",
          top: "81.98px",
          width: "1.01px",
          height: "42.45px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 42.67 L 0.76 0.76 L 1.06 1.12 C 0.91 4.12 0.92 39.32 1.06 42.31 L 0.76 42.67 Z')"
        }} /><div key={7} style={{
          position: "absolute",
          left: "0.3px",
          top: "81.97px",
          width: "2.02px",
          height: "29.31px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 0.76 L 1.35 0.76 L 1.35 28.94 L 0.76 28.94 Z')"
        }} /><div key={8} style={{
          position: "absolute",
          left: "0px",
          top: "81.98px",
          width: "1.01px",
          height: "29.31px",
          boxSizing: "border-box",
          backgroundColor: "#A0A0A0",
          clipPath: "path('M 1.06 28.93 L 1.06 0.76 L 0.76 1.12 C 0.91 4.12 0.9 25.57 0.76 28.56 L 1.06 28.93 Z')"
        }} /><div key={9} style={{
          position: "absolute",
          left: "0.9px",
          top: "81.98px",
          width: "2.02px",
          height: "29.31px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 0.76 L 1.4 0.76 L 1.4 28.94 L 0.76 28.94 Z')"
        }} /><div key={10} style={{
          position: "absolute",
          left: "0.3px",
          top: "117.31px",
          width: "2.02px",
          height: "29.31px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 0.76 L 1.35 0.76 L 1.35 28.94 L 0.76 28.94 Z')"
        }} /><div key={11} style={{
          position: "absolute",
          left: "0px",
          top: "117.32px",
          width: "1.01px",
          height: "29.31px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 1.06 28.93 L 1.06 0.76 L 0.76 1.12 C 0.91 4.12 0.9 25.57 0.76 28.56 L 1.06 28.93 Z')"
        }} /><div key={12} style={{
          position: "absolute",
          left: "0.9px",
          top: "117.31px",
          width: "2.02px",
          height: "29.31px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 0.76 L 1.4 0.76 L 1.4 28.94 L 0.76 28.94 Z')"
        }} /><div key={13} style={{
          position: "absolute",
          left: "0.3px",
          top: "48.61px",
          width: "2.02px",
          height: "16.17px",
          boxSizing: "border-box",
          backgroundColor: "#3B3B3B",
          clipPath: "path('M 0.76 0.76 L 1.35 0.76 L 1.35 16.05 L 0.76 16.05 Z')"
        }} /><div key={14} style={{
          position: "absolute",
          left: "0px",
          top: "48.62px",
          width: "1.01px",
          height: "16.17px",
          boxSizing: "border-box",
          backgroundColor: "#A0A0A0",
          clipPath: "path('M 1.06 16.04 L 1.06 0.76 L 0.76 1.12 C 0.91 4.12 0.9 12.68 0.76 15.67 L 1.06 16.04 Z')"
        }} /><div key={15} style={{
          position: "absolute",
          left: "0.9px",
          top: "48.62px",
          width: "2.02px",
          height: "16.17px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 0.76 L 1.4 0.76 L 1.4 16.05 L 0.76 16.05 Z')"
        }} /><div key={16} style={{
          position: "absolute",
          left: "84.45px",
          top: "391.18px",
          width: "23.25px",
          height: "2.02px",
          boxSizing: "border-box",
          backgroundColor: "#000000",
          clipPath: "path('M 21 0.76 L 2.42 0.76 C 2.04 0.76 1.71 0.81 1.61 0.87 L 0.79 1.22 C 0.64 1.32 1.04 1.42 1.6 1.42 L 21.83 1.42 C 22.38 1.42 22.79 1.32 22.64 1.22 L 21.82 0.87 C 21.72 0.8 21.38 0.76 21.01 0.76 Z')"
        }} /><div key={17} style={{
          position: "absolute",
          left: "71.29px",
          top: "7.95px",
          width: "48.51px",
          height: "15.16px",
          boxSizing: "border-box",
          backgroundColor: "#000000",
          clipPath: "path('M 41.45 14.53 L 7.64 14.53 C 3.84 14.53 0.76 11.45 0.76 7.64 L 0.76 7.64 C 0.76 3.84 3.84 0.76 7.64 0.76 L 41.45 0.76 C 45.25 0.76 48.33 3.84 48.33 7.64 L 48.33 7.64 C 48.33 11.44 45.25 14.53 41.45 14.53 Z')"
        }} /><div key={18} style={{
          position: "absolute",
          left: "107.07px",
          top: "11.83px",
          width: "7.07px",
          height: "7.07px",
          boxSizing: "border-box",
          backgroundColor: "#666666",
          clipPath: "path('M 6.78 3.77 C 6.78 5.43 5.43 6.78 3.77 6.78 C 2.11 6.78 0.76 5.43 0.76 3.77 C 0.76 2.11 2.11 0.76 3.77 0.76 C 5.43 0.76 6.78 2.11 6.78 3.77 Z')"
        }} /><img key={19} src={img_1} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 141" style={{
          position: "absolute",
          left: "107.96px",
          top: "12.75px",
          width: "6.06px",
          height: "5.05px",
          boxSizing: "border-box",
          clipPath: "path('M 0 0 L 6.06 0 L 6.06 6.06 L 0 6.06 Z')",
          objectFit: "fill"
        }} /><div key={20} style={{
          position: "absolute",
          left: "108.36px",
          top: "13.13px",
          width: "4.04px",
          height: "4.04px",
          boxSizing: "border-box",
          backgroundColor: "#0B131C",
          clipPath: "path('M 4.19 2.47 C 4.19 3.42 3.42 4.19 2.47 4.19 C 1.53 4.19 0.76 3.42 0.76 2.47 C 0.76 1.53 1.53 0.76 2.47 0.76 C 3.42 0.76 4.19 1.53 4.19 2.47 Z')"
        }} /><div key={21} style={{
          position: "absolute",
          left: "108.57px",
          top: "13.34px",
          width: "4.04px",
          height: "4.04px",
          boxSizing: "border-box",
          backgroundColor: "#231F20",
          clipPath: "path('M 3.77 2.26 C 3.77 3.09 3.09 3.77 2.26 3.77 C 1.43 3.77 0.76 3.1 0.76 2.26 C 0.76 1.42 1.42 0.76 2.26 0.76 C 3.1 0.76 3.77 1.42 3.77 2.26 Z')"
        }} /><div key={22} style={{
          position: "absolute",
          left: "108.57px",
          top: "13.34px",
          width: "4.04px",
          height: "4.04px",
          boxSizing: "border-box",
          backgroundColor: "#231F20",
          clipPath: "path('M 3.77 2.26 C 3.77 3.09 3.09 3.77 2.26 3.77 C 1.43 3.77 0.76 3.1 0.76 2.26 C 0.76 1.42 1.42 0.76 2.26 0.76 C 3.1 0.76 3.77 1.42 3.77 2.26 Z')"
        }} /><div key={23} style={{
          position: "absolute",
          left: "110.36px",
          top: "15.09px",
          width: "2.02px",
          height: "2.02px",
          boxSizing: "border-box",
          backgroundColor: "#CCCCCC",
          clipPath: "path('M 1.83 1.29 C 1.83 1 1.59 0.76 1.29 0.76 C 1 0.76 0.76 1 0.76 1.29 C 0.76 1.59 1 1.83 1.29 1.83 C 1.59 1.83 1.83 1.59 1.83 1.29 Z')"
        }} /></div><div key={15} style={{
        position: "absolute",
        left: "391.68px",
        top: "115.15px",
        width: "191.27px",
        height: "393.2px"
      }}><div key={0} style={{
          position: "absolute",
          left: "1.55px",
          top: "0px",
          width: "188.99px",
          height: "393.15px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 161.9 0.76 L 27.32 0.76 C 12.65 0.76 0.76 12.66 0.76 27.32 L 0.76 366.07 C 0.76 380.74 12.65 392.63 27.32 392.63 L 161.9 392.63 C 176.57 392.63 188.46 380.74 188.46 366.07 L 188.46 27.32 C 188.46 12.66 176.57 0.76 161.9 0.76 Z M 185.89 365.15 C 185.89 378.9 174.73 390.06 160.97 390.06 L 28.25 390.06 C 14.49 390.06 3.34 378.9 3.34 365.15 L 3.34 28.25 C 3.34 14.49 14.49 3.33 28.25 3.33 L 160.96 3.33 C 174.72 3.33 185.88 14.49 185.88 28.25 L 185.88 365.15 Z')"
        }} /><div key={1} style={{
          position: "absolute",
          left: "8.63px",
          top: "0.03px",
          width: "180.91px",
          height: "31.33px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 9.9 C 6.17 5.07 13.16 1.31 21.38 1.41 L 149 1.66 C 165.61 2.66 180.22 11.75 180.79 31.07 C 180.79 33.2 181.93 14.89 170.07 6.85 C 164.43 2.81 156.1 1.04 151.1 0.94 C 142.9 0.79 34.77 0.62 21.52 0.94 C 10.42 1.21 5.22 5.69 0.76 9.9 Z')"
        }} /><div key={2} style={{
          position: "absolute",
          left: "4.12px",
          top: "2.58px",
          width: "183.94px",
          height: "388.09px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 158.39 0.76 L 25.67 0.76 C 11.92 0.76 0.76 11.91 0.76 25.67 L 0.76 362.56 C 0.76 376.32 11.92 387.47 25.67 387.47 L 158.39 387.47 C 172.15 387.47 183.3 376.32 183.3 362.56 L 183.3 25.67 C 183.3 11.91 172.15 0.76 158.39 0.76 Z M 182.01 361.81 C 182.01 375.28 171.09 386.19 157.63 386.19 L 26.42 386.19 C 12.96 386.19 2.04 375.28 2.04 361.81 L 2.04 26.42 C 2.04 12.96 12.96 2.05 26.42 2.05 L 157.64 2.05 C 171.1 2.05 182.02 12.97 182.02 26.43 L 182.02 361.81 Z')"
        }} /><div key={3} style={{
          position: "absolute",
          left: "4px",
          top: "2.45px",
          width: "183.94px",
          height: "388.09px",
          boxSizing: "border-box",
          backgroundColor: "#000000",
          clipPath: "path('M 158.52 387.74 L 25.79 387.74 C 11.99 387.74 0.76 376.51 0.76 362.69 L 0.76 25.8 C 0.75 12 11.99 0.76 25.79 0.76 L 158.52 0.76 C 172.33 0.76 183.56 11.99 183.56 25.79 L 183.56 362.68 C 183.56 376.49 172.33 387.73 158.52 387.73 Z M 25.79 1.01 C 12.13 1.01 1 12.14 1 25.8 L 1 362.69 C 1 376.36 12.12 387.48 25.78 387.48 L 158.51 387.48 C 172.18 387.48 183.29 376.37 183.29 362.69 L 183.29 25.8 C 183.29 12.14 172.18 1.02 158.51 1.02 L 25.79 1.02 Z M 157.76 386.44 L 26.54 386.44 C 13.03 386.44 2.04 375.45 2.04 361.94 L 2.04 26.55 C 2.04 13.05 13.04 2.05 26.54 2.05 L 157.76 2.05 C 171.28 2.05 182.26 13.05 182.26 26.55 L 182.26 361.93 C 182.26 375.45 171.27 386.43 157.76 386.43 Z M 26.54 2.31 C 13.17 2.31 2.29 13.18 2.29 26.55 L 2.29 361.93 C 2.29 375.31 13.17 386.18 26.54 386.18 L 157.76 386.18 C 171.13 386.18 182.01 375.31 182.01 361.93 L 182.01 26.55 C 182.01 13.18 171.13 2.31 157.76 2.31 L 26.54 2.31 Z')"
        }} /><div key={4} style={{
          position: "absolute",
          left: "8.63px",
          top: "361.35px",
          width: "180.91px",
          height: "31.33px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 22.11 C 6.17 26.94 13.16 30.7 21.38 30.59 L 149 30.34 C 165.61 29.34 180.22 20.25 180.79 0.93 C 180.79 -1.2 181.93 17.11 170.07 25.14 C 164.43 29.19 156.1 30.96 151.1 31.06 C 142.9 31.21 34.77 31.38 21.52 31.06 C 10.42 30.78 5.2 26.31 0.76 22.11 Z')"
        }} /><div key={5} style={{
          position: "absolute",
          left: "189.25px",
          top: "81.97px",
          width: "2.02px",
          height: "42.45px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 0.76 L 1.35 0.76 L 1.35 42.68 L 0.76 42.68 Z')"
        }} /><div key={6} style={{
          position: "absolute",
          left: "189.85px",
          top: "81.98px",
          width: "1.01px",
          height: "42.45px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 42.67 L 0.76 0.76 L 1.06 1.12 C 0.91 4.12 0.92 39.32 1.06 42.31 L 0.76 42.67 Z')"
        }} /><div key={7} style={{
          position: "absolute",
          left: "0.3px",
          top: "81.97px",
          width: "2.02px",
          height: "29.31px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 0.76 L 1.35 0.76 L 1.35 28.94 L 0.76 28.94 Z')"
        }} /><div key={8} style={{
          position: "absolute",
          left: "0px",
          top: "81.98px",
          width: "1.01px",
          height: "29.31px",
          boxSizing: "border-box",
          backgroundColor: "#A0A0A0",
          clipPath: "path('M 1.06 28.93 L 1.06 0.76 L 0.76 1.12 C 0.91 4.12 0.9 25.57 0.76 28.56 L 1.06 28.93 Z')"
        }} /><div key={9} style={{
          position: "absolute",
          left: "0.9px",
          top: "81.98px",
          width: "2.02px",
          height: "29.31px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 0.76 L 1.4 0.76 L 1.4 28.94 L 0.76 28.94 Z')"
        }} /><div key={10} style={{
          position: "absolute",
          left: "0.3px",
          top: "117.31px",
          width: "2.02px",
          height: "29.31px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 0.76 L 1.35 0.76 L 1.35 28.94 L 0.76 28.94 Z')"
        }} /><div key={11} style={{
          position: "absolute",
          left: "0px",
          top: "117.32px",
          width: "1.01px",
          height: "29.31px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 1.06 28.93 L 1.06 0.76 L 0.76 1.12 C 0.91 4.12 0.9 25.57 0.76 28.56 L 1.06 28.93 Z')"
        }} /><div key={12} style={{
          position: "absolute",
          left: "0.9px",
          top: "117.31px",
          width: "2.02px",
          height: "29.31px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 0.76 L 1.4 0.76 L 1.4 28.94 L 0.76 28.94 Z')"
        }} /><div key={13} style={{
          position: "absolute",
          left: "0.3px",
          top: "48.61px",
          width: "2.02px",
          height: "16.17px",
          boxSizing: "border-box",
          backgroundColor: "#3B3B3B",
          clipPath: "path('M 0.76 0.76 L 1.35 0.76 L 1.35 16.05 L 0.76 16.05 Z')"
        }} /><div key={14} style={{
          position: "absolute",
          left: "0px",
          top: "48.62px",
          width: "1.01px",
          height: "16.17px",
          boxSizing: "border-box",
          backgroundColor: "#A0A0A0",
          clipPath: "path('M 1.06 16.04 L 1.06 0.76 L 0.76 1.12 C 0.91 4.12 0.9 12.68 0.76 15.67 L 1.06 16.04 Z')"
        }} /><div key={15} style={{
          position: "absolute",
          left: "0.9px",
          top: "48.62px",
          width: "2.02px",
          height: "16.17px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 0.76 L 1.4 0.76 L 1.4 16.05 L 0.76 16.05 Z')"
        }} /><div key={16} style={{
          position: "absolute",
          left: "84.45px",
          top: "391.18px",
          width: "23.25px",
          height: "2.02px",
          boxSizing: "border-box",
          backgroundColor: "#000000",
          clipPath: "path('M 21 0.76 L 2.42 0.76 C 2.04 0.76 1.71 0.81 1.61 0.87 L 0.79 1.22 C 0.64 1.32 1.04 1.42 1.6 1.42 L 21.83 1.42 C 22.38 1.42 22.79 1.32 22.64 1.22 L 21.82 0.87 C 21.72 0.8 21.38 0.76 21.01 0.76 Z')"
        }} /><div key={17} style={{
          position: "absolute",
          left: "71.29px",
          top: "7.95px",
          width: "48.51px",
          height: "15.16px",
          boxSizing: "border-box",
          backgroundColor: "#000000",
          clipPath: "path('M 41.45 14.53 L 7.64 14.53 C 3.84 14.53 0.76 11.45 0.76 7.64 L 0.76 7.64 C 0.76 3.84 3.84 0.76 7.64 0.76 L 41.45 0.76 C 45.25 0.76 48.33 3.84 48.33 7.64 L 48.33 7.64 C 48.33 11.44 45.25 14.53 41.45 14.53 Z')"
        }} /><div key={18} style={{
          position: "absolute",
          left: "107.07px",
          top: "11.83px",
          width: "7.07px",
          height: "7.07px",
          boxSizing: "border-box",
          backgroundColor: "#666666",
          clipPath: "path('M 6.78 3.77 C 6.78 5.43 5.43 6.78 3.77 6.78 C 2.11 6.78 0.76 5.43 0.76 3.77 C 0.76 2.11 2.11 0.76 3.77 0.76 C 5.43 0.76 6.78 2.11 6.78 3.77 Z')"
        }} /><img key={19} src={img_1} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 166" style={{
          position: "absolute",
          left: "107.96px",
          top: "12.75px",
          width: "6.06px",
          height: "5.05px",
          boxSizing: "border-box",
          clipPath: "path('M 0 0 L 6.06 0 L 6.06 6.06 L 0 6.06 Z')",
          objectFit: "fill"
        }} /><div key={20} style={{
          position: "absolute",
          left: "108.36px",
          top: "13.13px",
          width: "4.04px",
          height: "4.04px",
          boxSizing: "border-box",
          backgroundColor: "#0B131C",
          clipPath: "path('M 4.19 2.47 C 4.19 3.42 3.42 4.19 2.47 4.19 C 1.53 4.19 0.76 3.42 0.76 2.47 C 0.76 1.53 1.53 0.76 2.47 0.76 C 3.42 0.76 4.19 1.53 4.19 2.47 Z')"
        }} /><div key={21} style={{
          position: "absolute",
          left: "108.57px",
          top: "13.34px",
          width: "4.04px",
          height: "4.04px",
          boxSizing: "border-box",
          backgroundColor: "#231F20",
          clipPath: "path('M 3.77 2.26 C 3.77 3.09 3.09 3.77 2.26 3.77 C 1.43 3.77 0.76 3.1 0.76 2.26 C 0.76 1.42 1.42 0.76 2.26 0.76 C 3.1 0.76 3.77 1.42 3.77 2.26 Z')"
        }} /><div key={22} style={{
          position: "absolute",
          left: "108.57px",
          top: "13.34px",
          width: "4.04px",
          height: "4.04px",
          boxSizing: "border-box",
          backgroundColor: "#231F20",
          clipPath: "path('M 3.77 2.26 C 3.77 3.09 3.09 3.77 2.26 3.77 C 1.43 3.77 0.76 3.1 0.76 2.26 C 0.76 1.42 1.42 0.76 2.26 0.76 C 3.1 0.76 3.77 1.42 3.77 2.26 Z')"
        }} /><div key={23} style={{
          position: "absolute",
          left: "110.36px",
          top: "15.09px",
          width: "2.02px",
          height: "2.02px",
          boxSizing: "border-box",
          backgroundColor: "#CCCCCC",
          clipPath: "path('M 1.83 1.29 C 1.83 1 1.59 0.76 1.29 0.76 C 1 0.76 0.76 1 0.76 1.29 C 0.76 1.59 1 1.83 1.29 1.83 C 1.59 1.83 1.83 1.59 1.83 1.29 Z')"
        }} /></div><div key={16} style={{
        position: "absolute",
        left: "703.32px",
        top: "115.15px",
        width: "191.27px",
        height: "393.2px"
      }}><div key={0} style={{
          position: "absolute",
          left: "1.55px",
          top: "0px",
          width: "188.99px",
          height: "393.15px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 161.9 0.76 L 27.32 0.76 C 12.65 0.76 0.76 12.66 0.76 27.32 L 0.76 366.07 C 0.76 380.74 12.65 392.63 27.32 392.63 L 161.9 392.63 C 176.57 392.63 188.46 380.74 188.46 366.07 L 188.46 27.32 C 188.46 12.66 176.57 0.76 161.9 0.76 Z M 185.89 365.15 C 185.89 378.9 174.73 390.06 160.97 390.06 L 28.25 390.06 C 14.49 390.06 3.34 378.9 3.34 365.15 L 3.34 28.25 C 3.34 14.49 14.49 3.33 28.25 3.33 L 160.96 3.33 C 174.72 3.33 185.88 14.49 185.88 28.25 L 185.88 365.15 Z')"
        }} /><div key={1} style={{
          position: "absolute",
          left: "8.63px",
          top: "0.03px",
          width: "180.91px",
          height: "31.33px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 9.9 C 6.17 5.07 13.16 1.31 21.38 1.41 L 149 1.66 C 165.61 2.66 180.22 11.75 180.79 31.07 C 180.79 33.2 181.93 14.89 170.07 6.85 C 164.43 2.81 156.1 1.04 151.1 0.94 C 142.9 0.79 34.77 0.62 21.52 0.94 C 10.42 1.21 5.22 5.69 0.76 9.9 Z')"
        }} /><div key={2} style={{
          position: "absolute",
          left: "4.12px",
          top: "2.58px",
          width: "183.94px",
          height: "388.09px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 158.39 0.76 L 25.67 0.76 C 11.92 0.76 0.76 11.91 0.76 25.67 L 0.76 362.56 C 0.76 376.32 11.92 387.47 25.67 387.47 L 158.39 387.47 C 172.15 387.47 183.3 376.32 183.3 362.56 L 183.3 25.67 C 183.3 11.91 172.15 0.76 158.39 0.76 Z M 182.01 361.81 C 182.01 375.28 171.09 386.19 157.63 386.19 L 26.42 386.19 C 12.96 386.19 2.04 375.28 2.04 361.81 L 2.04 26.42 C 2.04 12.96 12.96 2.05 26.42 2.05 L 157.64 2.05 C 171.1 2.05 182.02 12.97 182.02 26.43 L 182.02 361.81 Z')"
        }} /><div key={3} style={{
          position: "absolute",
          left: "4px",
          top: "2.45px",
          width: "183.94px",
          height: "388.09px",
          boxSizing: "border-box",
          backgroundColor: "#000000",
          clipPath: "path('M 158.52 387.74 L 25.79 387.74 C 11.99 387.74 0.76 376.51 0.76 362.69 L 0.76 25.8 C 0.75 12 11.99 0.76 25.79 0.76 L 158.52 0.76 C 172.33 0.76 183.56 11.99 183.56 25.79 L 183.56 362.68 C 183.56 376.49 172.33 387.73 158.52 387.73 Z M 25.79 1.01 C 12.13 1.01 1 12.14 1 25.8 L 1 362.69 C 1 376.36 12.12 387.48 25.78 387.48 L 158.51 387.48 C 172.18 387.48 183.29 376.37 183.29 362.69 L 183.29 25.8 C 183.29 12.14 172.18 1.02 158.51 1.02 L 25.79 1.02 Z M 157.76 386.44 L 26.54 386.44 C 13.03 386.44 2.04 375.45 2.04 361.94 L 2.04 26.55 C 2.04 13.05 13.04 2.05 26.54 2.05 L 157.76 2.05 C 171.28 2.05 182.26 13.05 182.26 26.55 L 182.26 361.93 C 182.26 375.45 171.27 386.43 157.76 386.43 Z M 26.54 2.31 C 13.17 2.31 2.29 13.18 2.29 26.55 L 2.29 361.93 C 2.29 375.31 13.17 386.18 26.54 386.18 L 157.76 386.18 C 171.13 386.18 182.01 375.31 182.01 361.93 L 182.01 26.55 C 182.01 13.18 171.13 2.31 157.76 2.31 L 26.54 2.31 Z')"
        }} /><div key={4} style={{
          position: "absolute",
          left: "8.63px",
          top: "361.35px",
          width: "180.91px",
          height: "31.33px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 22.11 C 6.17 26.94 13.16 30.7 21.38 30.59 L 149 30.34 C 165.61 29.34 180.22 20.25 180.79 0.93 C 180.79 -1.2 181.93 17.11 170.07 25.14 C 164.43 29.19 156.1 30.96 151.1 31.06 C 142.9 31.21 34.77 31.38 21.52 31.06 C 10.42 30.78 5.2 26.31 0.76 22.11 Z')"
        }} /><div key={5} style={{
          position: "absolute",
          left: "189.25px",
          top: "81.97px",
          width: "2.02px",
          height: "42.45px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 0.76 L 1.35 0.76 L 1.35 42.68 L 0.76 42.68 Z')"
        }} /><div key={6} style={{
          position: "absolute",
          left: "189.85px",
          top: "81.98px",
          width: "1.01px",
          height: "42.45px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 42.67 L 0.76 0.76 L 1.06 1.12 C 0.91 4.12 0.92 39.32 1.06 42.31 L 0.76 42.67 Z')"
        }} /><div key={7} style={{
          position: "absolute",
          left: "0.3px",
          top: "81.97px",
          width: "2.02px",
          height: "29.31px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 0.76 L 1.35 0.76 L 1.35 28.94 L 0.76 28.94 Z')"
        }} /><div key={8} style={{
          position: "absolute",
          left: "0px",
          top: "81.98px",
          width: "1.01px",
          height: "29.31px",
          boxSizing: "border-box",
          backgroundColor: "#A0A0A0",
          clipPath: "path('M 1.06 28.93 L 1.06 0.76 L 0.76 1.12 C 0.91 4.12 0.9 25.57 0.76 28.56 L 1.06 28.93 Z')"
        }} /><div key={9} style={{
          position: "absolute",
          left: "0.9px",
          top: "81.98px",
          width: "2.02px",
          height: "29.31px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 0.76 L 1.4 0.76 L 1.4 28.94 L 0.76 28.94 Z')"
        }} /><div key={10} style={{
          position: "absolute",
          left: "0.3px",
          top: "117.31px",
          width: "2.02px",
          height: "29.31px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 0.76 L 1.35 0.76 L 1.35 28.94 L 0.76 28.94 Z')"
        }} /><div key={11} style={{
          position: "absolute",
          left: "0px",
          top: "117.32px",
          width: "1.01px",
          height: "29.31px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 1.06 28.93 L 1.06 0.76 L 0.76 1.12 C 0.91 4.12 0.9 25.57 0.76 28.56 L 1.06 28.93 Z')"
        }} /><div key={12} style={{
          position: "absolute",
          left: "0.9px",
          top: "117.31px",
          width: "2.02px",
          height: "29.31px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 0.76 L 1.4 0.76 L 1.4 28.94 L 0.76 28.94 Z')"
        }} /><div key={13} style={{
          position: "absolute",
          left: "0.3px",
          top: "48.61px",
          width: "2.02px",
          height: "16.17px",
          boxSizing: "border-box",
          backgroundColor: "#3B3B3B",
          clipPath: "path('M 0.76 0.76 L 1.35 0.76 L 1.35 16.05 L 0.76 16.05 Z')"
        }} /><div key={14} style={{
          position: "absolute",
          left: "0px",
          top: "48.62px",
          width: "1.01px",
          height: "16.17px",
          boxSizing: "border-box",
          backgroundColor: "#A0A0A0",
          clipPath: "path('M 1.06 16.04 L 1.06 0.76 L 0.76 1.12 C 0.91 4.12 0.9 12.68 0.76 15.67 L 1.06 16.04 Z')"
        }} /><div key={15} style={{
          position: "absolute",
          left: "0.9px",
          top: "48.62px",
          width: "2.02px",
          height: "16.17px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 0.76 L 1.4 0.76 L 1.4 16.05 L 0.76 16.05 Z')"
        }} /><div key={16} style={{
          position: "absolute",
          left: "84.45px",
          top: "391.18px",
          width: "23.25px",
          height: "2.02px",
          boxSizing: "border-box",
          backgroundColor: "#000000",
          clipPath: "path('M 21 0.76 L 2.42 0.76 C 2.04 0.76 1.71 0.81 1.61 0.87 L 0.79 1.22 C 0.64 1.32 1.04 1.42 1.6 1.42 L 21.83 1.42 C 22.38 1.42 22.79 1.32 22.64 1.22 L 21.82 0.87 C 21.72 0.8 21.38 0.76 21.01 0.76 Z')"
        }} /><div key={17} style={{
          position: "absolute",
          left: "71.29px",
          top: "7.95px",
          width: "48.51px",
          height: "15.16px",
          boxSizing: "border-box",
          backgroundColor: "#000000",
          clipPath: "path('M 41.45 14.53 L 7.64 14.53 C 3.84 14.53 0.76 11.45 0.76 7.64 L 0.76 7.64 C 0.76 3.84 3.84 0.76 7.64 0.76 L 41.45 0.76 C 45.25 0.76 48.33 3.84 48.33 7.64 L 48.33 7.64 C 48.33 11.44 45.25 14.53 41.45 14.53 Z')"
        }} /><div key={18} style={{
          position: "absolute",
          left: "107.07px",
          top: "11.83px",
          width: "7.07px",
          height: "7.07px",
          boxSizing: "border-box",
          backgroundColor: "#666666",
          clipPath: "path('M 6.78 3.77 C 6.78 5.43 5.43 6.78 3.77 6.78 C 2.11 6.78 0.76 5.43 0.76 3.77 C 0.76 2.11 2.11 0.76 3.77 0.76 C 5.43 0.76 6.78 2.11 6.78 3.77 Z')"
        }} /><img key={19} src={img_1} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 191" style={{
          position: "absolute",
          left: "107.96px",
          top: "12.75px",
          width: "6.06px",
          height: "5.05px",
          boxSizing: "border-box",
          clipPath: "path('M 0 0 L 6.06 0 L 6.06 6.06 L 0 6.06 Z')",
          objectFit: "fill"
        }} /><div key={20} style={{
          position: "absolute",
          left: "108.36px",
          top: "13.13px",
          width: "4.04px",
          height: "4.04px",
          boxSizing: "border-box",
          backgroundColor: "#0B131C",
          clipPath: "path('M 4.19 2.47 C 4.19 3.42 3.42 4.19 2.47 4.19 C 1.53 4.19 0.76 3.42 0.76 2.47 C 0.76 1.53 1.53 0.76 2.47 0.76 C 3.42 0.76 4.19 1.53 4.19 2.47 Z')"
        }} /><div key={21} style={{
          position: "absolute",
          left: "108.57px",
          top: "13.34px",
          width: "4.04px",
          height: "4.04px",
          boxSizing: "border-box",
          backgroundColor: "#231F20",
          clipPath: "path('M 3.77 2.26 C 3.77 3.09 3.09 3.77 2.26 3.77 C 1.43 3.77 0.76 3.1 0.76 2.26 C 0.76 1.42 1.42 0.76 2.26 0.76 C 3.1 0.76 3.77 1.42 3.77 2.26 Z')"
        }} /><div key={22} style={{
          position: "absolute",
          left: "108.57px",
          top: "13.34px",
          width: "4.04px",
          height: "4.04px",
          boxSizing: "border-box",
          backgroundColor: "#231F20",
          clipPath: "path('M 3.77 2.26 C 3.77 3.09 3.09 3.77 2.26 3.77 C 1.43 3.77 0.76 3.1 0.76 2.26 C 0.76 1.42 1.42 0.76 2.26 0.76 C 3.1 0.76 3.77 1.42 3.77 2.26 Z')"
        }} /><div key={23} style={{
          position: "absolute",
          left: "110.36px",
          top: "15.09px",
          width: "2.02px",
          height: "2.02px",
          boxSizing: "border-box",
          backgroundColor: "#CCCCCC",
          clipPath: "path('M 1.83 1.29 C 1.83 1 1.59 0.76 1.29 0.76 C 1 0.76 0.76 1 0.76 1.29 C 0.76 1.59 1 1.83 1.29 1.83 C 1.59 1.83 1.83 1.59 1.83 1.29 Z')"
        }} /></div><div key={17} style={{
        position: "absolute",
        left: "1005.28px",
        top: "113px",
        width: "191.27px",
        height: "393.2px"
      }}><div key={0} style={{
          position: "absolute",
          left: "1.55px",
          top: "0px",
          width: "188.99px",
          height: "393.15px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 161.9 0.76 L 27.32 0.76 C 12.65 0.76 0.76 12.66 0.76 27.32 L 0.76 366.07 C 0.76 380.74 12.65 392.63 27.32 392.63 L 161.9 392.63 C 176.57 392.63 188.46 380.74 188.46 366.07 L 188.46 27.32 C 188.46 12.66 176.57 0.76 161.9 0.76 Z M 185.89 365.15 C 185.89 378.9 174.73 390.06 160.97 390.06 L 28.25 390.06 C 14.49 390.06 3.34 378.9 3.34 365.15 L 3.34 28.25 C 3.34 14.49 14.49 3.33 28.25 3.33 L 160.96 3.33 C 174.72 3.33 185.88 14.49 185.88 28.25 L 185.88 365.15 Z')"
        }} /><div key={1} style={{
          position: "absolute",
          left: "8.63px",
          top: "0.03px",
          width: "180.91px",
          height: "31.33px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 9.9 C 6.17 5.07 13.16 1.31 21.38 1.41 L 149 1.66 C 165.61 2.66 180.22 11.75 180.79 31.07 C 180.79 33.2 181.93 14.89 170.07 6.85 C 164.43 2.81 156.1 1.04 151.1 0.94 C 142.9 0.79 34.77 0.62 21.52 0.94 C 10.42 1.21 5.22 5.69 0.76 9.9 Z')"
        }} /><div key={2} style={{
          position: "absolute",
          left: "4.12px",
          top: "2.58px",
          width: "183.94px",
          height: "388.09px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 158.39 0.76 L 25.67 0.76 C 11.92 0.76 0.76 11.91 0.76 25.67 L 0.76 362.56 C 0.76 376.32 11.92 387.47 25.67 387.47 L 158.39 387.47 C 172.15 387.47 183.3 376.32 183.3 362.56 L 183.3 25.67 C 183.3 11.91 172.15 0.76 158.39 0.76 Z M 182.01 361.81 C 182.01 375.28 171.09 386.19 157.63 386.19 L 26.42 386.19 C 12.96 386.19 2.04 375.28 2.04 361.81 L 2.04 26.42 C 2.04 12.96 12.96 2.05 26.42 2.05 L 157.64 2.05 C 171.1 2.05 182.02 12.97 182.02 26.43 L 182.02 361.81 Z')"
        }} /><div key={3} style={{
          position: "absolute",
          left: "4px",
          top: "2.45px",
          width: "183.94px",
          height: "388.09px",
          boxSizing: "border-box",
          backgroundColor: "#000000",
          clipPath: "path('M 158.52 387.74 L 25.79 387.74 C 11.99 387.74 0.76 376.51 0.76 362.69 L 0.76 25.8 C 0.75 12 11.99 0.76 25.79 0.76 L 158.52 0.76 C 172.33 0.76 183.56 11.99 183.56 25.79 L 183.56 362.68 C 183.56 376.49 172.33 387.73 158.52 387.73 Z M 25.79 1.01 C 12.13 1.01 1 12.14 1 25.8 L 1 362.69 C 1 376.36 12.12 387.48 25.78 387.48 L 158.51 387.48 C 172.18 387.48 183.29 376.37 183.29 362.69 L 183.29 25.8 C 183.29 12.14 172.18 1.02 158.51 1.02 L 25.79 1.02 Z M 157.76 386.44 L 26.54 386.44 C 13.03 386.44 2.04 375.45 2.04 361.94 L 2.04 26.55 C 2.04 13.05 13.04 2.05 26.54 2.05 L 157.76 2.05 C 171.28 2.05 182.26 13.05 182.26 26.55 L 182.26 361.93 C 182.26 375.45 171.27 386.43 157.76 386.43 Z M 26.54 2.31 C 13.17 2.31 2.29 13.18 2.29 26.55 L 2.29 361.93 C 2.29 375.31 13.17 386.18 26.54 386.18 L 157.76 386.18 C 171.13 386.18 182.01 375.31 182.01 361.93 L 182.01 26.55 C 182.01 13.18 171.13 2.31 157.76 2.31 L 26.54 2.31 Z')"
        }} /><div key={4} style={{
          position: "absolute",
          left: "8.63px",
          top: "361.35px",
          width: "180.91px",
          height: "31.33px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 22.11 C 6.17 26.94 13.16 30.7 21.38 30.59 L 149 30.34 C 165.61 29.34 180.22 20.25 180.79 0.93 C 180.79 -1.2 181.93 17.11 170.07 25.14 C 164.43 29.19 156.1 30.96 151.1 31.06 C 142.9 31.21 34.77 31.38 21.52 31.06 C 10.42 30.78 5.2 26.31 0.76 22.11 Z')"
        }} /><div key={5} style={{
          position: "absolute",
          left: "189.25px",
          top: "81.97px",
          width: "2.02px",
          height: "42.45px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 0.76 L 1.35 0.76 L 1.35 42.68 L 0.76 42.68 Z')"
        }} /><div key={6} style={{
          position: "absolute",
          left: "189.85px",
          top: "81.98px",
          width: "1.01px",
          height: "42.45px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 42.67 L 0.76 0.76 L 1.06 1.12 C 0.91 4.12 0.92 39.32 1.06 42.31 L 0.76 42.67 Z')"
        }} /><div key={7} style={{
          position: "absolute",
          left: "0.3px",
          top: "81.97px",
          width: "2.02px",
          height: "29.31px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 0.76 L 1.35 0.76 L 1.35 28.94 L 0.76 28.94 Z')"
        }} /><div key={8} style={{
          position: "absolute",
          left: "0px",
          top: "81.98px",
          width: "1.01px",
          height: "29.31px",
          boxSizing: "border-box",
          backgroundColor: "#A0A0A0",
          clipPath: "path('M 1.06 28.93 L 1.06 0.76 L 0.76 1.12 C 0.91 4.12 0.9 25.57 0.76 28.56 L 1.06 28.93 Z')"
        }} /><div key={9} style={{
          position: "absolute",
          left: "0.9px",
          top: "81.98px",
          width: "2.02px",
          height: "29.31px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 0.76 L 1.4 0.76 L 1.4 28.94 L 0.76 28.94 Z')"
        }} /><div key={10} style={{
          position: "absolute",
          left: "0.3px",
          top: "117.31px",
          width: "2.02px",
          height: "29.31px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 0.76 L 1.35 0.76 L 1.35 28.94 L 0.76 28.94 Z')"
        }} /><div key={11} style={{
          position: "absolute",
          left: "0px",
          top: "117.32px",
          width: "1.01px",
          height: "29.31px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 1.06 28.93 L 1.06 0.76 L 0.76 1.12 C 0.91 4.12 0.9 25.57 0.76 28.56 L 1.06 28.93 Z')"
        }} /><div key={12} style={{
          position: "absolute",
          left: "0.9px",
          top: "117.31px",
          width: "2.02px",
          height: "29.31px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 0.76 L 1.4 0.76 L 1.4 28.94 L 0.76 28.94 Z')"
        }} /><div key={13} style={{
          position: "absolute",
          left: "0.3px",
          top: "48.61px",
          width: "2.02px",
          height: "16.17px",
          boxSizing: "border-box",
          backgroundColor: "#3B3B3B",
          clipPath: "path('M 0.76 0.76 L 1.35 0.76 L 1.35 16.05 L 0.76 16.05 Z')"
        }} /><div key={14} style={{
          position: "absolute",
          left: "0px",
          top: "48.62px",
          width: "1.01px",
          height: "16.17px",
          boxSizing: "border-box",
          backgroundColor: "#A0A0A0",
          clipPath: "path('M 1.06 16.04 L 1.06 0.76 L 0.76 1.12 C 0.91 4.12 0.9 12.68 0.76 15.67 L 1.06 16.04 Z')"
        }} /><div key={15} style={{
          position: "absolute",
          left: "0.9px",
          top: "48.62px",
          width: "2.02px",
          height: "16.17px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.76 0.76 L 1.4 0.76 L 1.4 16.05 L 0.76 16.05 Z')"
        }} /><div key={16} style={{
          position: "absolute",
          left: "84.45px",
          top: "391.18px",
          width: "23.25px",
          height: "2.02px",
          boxSizing: "border-box",
          backgroundColor: "#000000",
          clipPath: "path('M 21 0.76 L 2.42 0.76 C 2.04 0.76 1.71 0.81 1.61 0.87 L 0.79 1.22 C 0.64 1.32 1.04 1.42 1.6 1.42 L 21.83 1.42 C 22.38 1.42 22.79 1.32 22.64 1.22 L 21.82 0.87 C 21.72 0.8 21.38 0.76 21.01 0.76 Z')"
        }} /><div key={17} style={{
          position: "absolute",
          left: "71.29px",
          top: "7.95px",
          width: "48.51px",
          height: "15.16px",
          boxSizing: "border-box",
          backgroundColor: "#000000",
          clipPath: "path('M 41.45 14.53 L 7.64 14.53 C 3.84 14.53 0.76 11.45 0.76 7.64 L 0.76 7.64 C 0.76 3.84 3.84 0.76 7.64 0.76 L 41.45 0.76 C 45.25 0.76 48.33 3.84 48.33 7.64 L 48.33 7.64 C 48.33 11.44 45.25 14.53 41.45 14.53 Z')"
        }} /><div key={18} style={{
          position: "absolute",
          left: "107.07px",
          top: "11.83px",
          width: "7.07px",
          height: "7.07px",
          boxSizing: "border-box",
          backgroundColor: "#666666",
          clipPath: "path('M 6.78 3.77 C 6.78 5.43 5.43 6.78 3.77 6.78 C 2.11 6.78 0.76 5.43 0.76 3.77 C 0.76 2.11 2.11 0.76 3.77 0.76 C 5.43 0.76 6.78 2.11 6.78 3.77 Z')"
        }} /><img key={19} src={img_1} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 216" style={{
          position: "absolute",
          left: "107.96px",
          top: "12.75px",
          width: "6.06px",
          height: "5.05px",
          boxSizing: "border-box",
          clipPath: "path('M 0 0 L 6.06 0 L 6.06 6.06 L 0 6.06 Z')",
          objectFit: "fill"
        }} /><div key={20} style={{
          position: "absolute",
          left: "108.36px",
          top: "13.13px",
          width: "4.04px",
          height: "4.04px",
          boxSizing: "border-box",
          backgroundColor: "#0B131C",
          clipPath: "path('M 4.19 2.47 C 4.19 3.42 3.42 4.19 2.47 4.19 C 1.53 4.19 0.76 3.42 0.76 2.47 C 0.76 1.53 1.53 0.76 2.47 0.76 C 3.42 0.76 4.19 1.53 4.19 2.47 Z')"
        }} /><div key={21} style={{
          position: "absolute",
          left: "108.57px",
          top: "13.34px",
          width: "4.04px",
          height: "4.04px",
          boxSizing: "border-box",
          backgroundColor: "#231F20",
          clipPath: "path('M 3.77 2.26 C 3.77 3.09 3.09 3.77 2.26 3.77 C 1.43 3.77 0.76 3.1 0.76 2.26 C 0.76 1.42 1.42 0.76 2.26 0.76 C 3.1 0.76 3.77 1.42 3.77 2.26 Z')"
        }} /><div key={22} style={{
          position: "absolute",
          left: "108.57px",
          top: "13.34px",
          width: "4.04px",
          height: "4.04px",
          boxSizing: "border-box",
          backgroundColor: "#231F20",
          clipPath: "path('M 3.77 2.26 C 3.77 3.09 3.09 3.77 2.26 3.77 C 1.43 3.77 0.76 3.1 0.76 2.26 C 0.76 1.42 1.42 0.76 2.26 0.76 C 3.1 0.76 3.77 1.42 3.77 2.26 Z')"
        }} /><div key={23} style={{
          position: "absolute",
          left: "110.36px",
          top: "15.09px",
          width: "2.02px",
          height: "2.02px",
          boxSizing: "border-box",
          backgroundColor: "#CCCCCC",
          clipPath: "path('M 1.83 1.29 C 1.83 1 1.59 0.76 1.29 0.76 C 1 0.76 0.76 1 0.76 1.29 C 0.76 1.59 1 1.83 1.29 1.83 C 1.59 1.83 1.83 1.59 1.83 1.29 Z')"
        }} /></div><div key={18} style={{
        position: "absolute",
        left: "55.2px",
        top: "44.22px",
        width: "1035.46px",
        height: "39.49px",
        boxSizing: "border-box"
      }} /></div></div>;
};
export default Slide29;
