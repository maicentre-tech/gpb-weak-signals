import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_33.png";
import img_bg from "./assets/images/image_3.png";
const Slide28: React.FC = () => {
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
  return <div id="slide-28" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-28" style={{
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
    }}><svg key={0} style={{
        position: "absolute",
        left: "445.64px",
        top: "196.37px",
        width: "72.09px",
        height: "1px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="72.09" y2="0" stroke="#ff0053" strokeWidth="2.67" /></svg><svg key={1} style={{
        position: "absolute",
        left: "445.64px",
        top: "429.88px",
        width: "72.09px",
        height: "1px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="72.09" y2="0" stroke="#520977" strokeWidth="2.67" /></svg><svg key={2} style={{
        position: "absolute",
        left: "761.22px",
        top: "196.37px",
        width: "72.09px",
        height: "1px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="72.09" y2="0" stroke="#e2b9f9" strokeWidth="2.67" /></svg><svg key={3} style={{
        position: "absolute",
        left: "761.22px",
        top: "429.88px",
        width: "72.09px",
        height: "1px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="72.09" y2="0" stroke="#fc3777" strokeWidth="2.67" /></svg><div key={4} style={{
        position: "absolute",
        left: "36.33px",
        top: "34.07px",
        width: "326.7px",
        height: "65.19px",
        boxSizing: "border-box",
        backgroundColor: "#520977",
        borderRadius: "12.19px"
      }} /><div key={5} style={{
        position: "absolute",
        left: "525.97px",
        top: "129.75px",
        width: "228.06px",
        height: "483.22px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "28.04px"
      }} /><div key={6} style={{
        position: "absolute",
        left: "37.41px",
        top: "172.31px",
        width: "400.31px",
        height: "107.27px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "0px"
      }} /><div key={7} style={{
        position: "absolute",
        left: "37.41px",
        top: "212.16px",
        width: "400.31px",
        height: "135.5px",
        boxSizing: "border-box"
      }} /><div key={8} style={{
        position: "absolute",
        left: "844.1px",
        top: "172.31px",
        width: "400.31px",
        height: "107.27px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "0px"
      }} /><div key={9} style={{
        position: "absolute",
        left: "844.1px",
        top: "212.16px",
        width: "400.31px",
        height: "135.5px",
        boxSizing: "border-box"
      }} /><div key={10} style={{
        position: "absolute",
        left: "37.41px",
        top: "405.73px",
        width: "400.31px",
        height: "107.27px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "0px"
      }} /><div key={11} style={{
        position: "absolute",
        left: "37.41px",
        top: "445.58px",
        width: "400.31px",
        height: "135.5px",
        boxSizing: "border-box"
      }} /><div key={12} style={{
        position: "absolute",
        left: "844.1px",
        top: "405.73px",
        width: "400.31px",
        height: "107.27px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "0px"
      }} /><div key={13} style={{
        position: "absolute",
        left: "844.1px",
        top: "445.58px",
        width: "400.31px",
        height: "135.5px",
        boxSizing: "border-box"
      }} /><div key={14} style={{
        position: "absolute",
        left: "519.89px",
        top: "126.91px",
        width: "238.15px",
        height: "489.54px"
      }}><svg key={0} viewBox="0 0 235.32 489.51" preserveAspectRatio="none" style={{
          position: "absolute",
          left: "2.28px",
          top: "0px",
          width: "235.32px",
          height: "489.51px",
          overflow: "visible"
        }}><path d="M 201.59 0.94 L 34.02 0.94 C 15.75 0.94 0.94 15.76 0.94 34.02 L 0.94 455.8 C 0.94 474.06 15.75 488.87 34.02 488.87 L 201.59 488.87 C 219.85 488.87 234.67 474.06 234.67 455.8 L 234.67 34.02 C 234.67 15.76 219.85 0.94 201.59 0.94 Z M 231.46 454.64 C 231.46 471.77 217.57 485.66 200.44 485.66 L 35.17 485.66 C 18.04 485.66 4.15 471.77 4.15 454.64 L 4.15 35.17 C 4.15 18.04 18.04 4.15 35.17 4.15 L 200.42 4.15 C 217.55 4.15 231.44 18.04 231.44 35.17 L 231.44 454.64 Z" fill="#520977" stroke="#520977" strokeWidth={1} strokeLinejoin="round" /></svg><div key={1} style={{
          position: "absolute",
          left: "10.75px",
          top: "0px",
          width: "225.25px",
          height: "39.01px",
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
          clipPath: "path('M 0.94 12.32 C 7.68 6.31 16.38 1.63 26.62 1.75 L 185.52 2.07 C 206.2 3.31 224.39 14.62 225.1 38.69 C 225.1 41.34 226.52 18.54 211.75 8.53 C 204.73 3.5 194.36 1.3 188.13 1.17 C 177.92 0.98 43.29 0.77 26.79 1.17 C 12.97 1.51 6.49 7.09 0.94 12.32 Z')"
        }} /><svg key={2} viewBox="0 0 229.03 483.22" preserveAspectRatio="none" style={{
          position: "absolute",
          left: "5.13px",
          top: "3.17px",
          width: "229.03px",
          height: "483.22px",
          overflow: "visible"
        }}><path d="M 197.22 0.94 L 31.96 0.94 C 14.84 0.94 0.94 14.83 0.94 31.97 L 0.94 451.43 C 0.94 468.56 14.84 482.45 31.96 482.45 L 197.22 482.45 C 214.34 482.45 228.24 468.56 228.24 451.43 L 228.24 31.97 C 228.24 14.83 214.34 0.94 197.22 0.94 Z M 226.63 450.5 C 226.63 467.26 213.03 480.85 196.27 480.85 L 32.9 480.85 C 16.13 480.85 2.54 467.26 2.54 450.5 L 2.54 32.89 C 2.54 16.13 16.13 2.56 32.9 2.56 L 196.29 2.56 C 213.05 2.56 226.64 16.14 226.64 32.91 L 226.64 450.5 Z" fill="#520977" stroke="#ffffff" strokeWidth={1} strokeLinejoin="round" /></svg><div key={3} style={{
          position: "absolute",
          left: "4.98px",
          top: "3.01px",
          width: "229.03px",
          height: "483.22px",
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
          clipPath: "path('M 197.38 482.78 L 32.11 482.78 C 14.93 482.78 0.94 468.8 0.94 451.6 L 0.94 32.12 C 0.93 14.94 14.93 0.94 32.11 0.94 L 197.38 0.94 C 214.57 0.94 228.55 14.93 228.55 32.11 L 228.55 451.58 C 228.55 468.77 214.57 482.77 197.38 482.77 Z M 32.11 1.26 C 15.1 1.26 1.25 15.12 1.25 32.12 L 1.25 451.6 C 1.25 468.61 15.09 482.47 32.1 482.47 L 197.37 482.47 C 214.38 482.47 228.22 468.62 228.22 451.6 L 228.22 32.12 C 228.22 15.12 214.38 1.27 197.37 1.27 L 32.11 1.27 Z M 196.44 481.17 L 33.05 481.17 C 16.22 481.17 2.54 467.48 2.54 450.67 L 2.54 33.06 C 2.54 16.25 16.23 2.56 33.05 2.56 L 196.44 2.56 C 213.26 2.56 226.94 16.25 226.94 33.06 L 226.94 450.65 C 226.94 467.48 213.25 481.16 196.44 481.16 Z M 33.05 2.87 C 16.4 2.87 2.86 16.41 2.86 33.06 L 2.86 450.65 C 2.86 467.3 16.4 480.84 33.05 480.84 L 196.44 480.84 C 213.08 480.84 226.63 467.3 226.63 450.65 L 226.63 33.06 C 226.63 16.41 213.08 2.87 196.44 2.87 L 33.05 2.87 Z')"
        }} /><svg key={4} viewBox="0 0 225.25 39.01" preserveAspectRatio="none" style={{
          position: "absolute",
          left: "10.75px",
          top: "449.89px",
          width: "225.25px",
          height: "39.01px",
          overflow: "visible"
        }}><path d="M 0.94 27.53 C 7.68 33.55 16.38 38.23 26.62 38.09 L 185.52 37.78 C 206.2 36.53 224.39 25.22 225.1 1.16 C 225.1 -1.5 226.52 21.3 211.75 31.31 C 204.73 36.34 194.36 38.54 188.13 38.67 C 177.92 38.86 43.29 39.07 26.79 38.67 C 12.97 38.33 6.48 32.76 0.94 27.53 Z" fill="#ffffff" stroke="#ffffff" strokeWidth={1} strokeLinejoin="round" /></svg><div key={5} style={{
          position: "absolute",
          left: "235.63px",
          top: "102.03px",
          width: "2.52px",
          height: "52.85px",
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
          clipPath: "path('M 0.95 0.94 L 1.69 0.94 L 1.69 53.14 L 0.95 53.14 Z')"
        }} /><div key={6} style={{
          position: "absolute",
          left: "236.39px",
          top: "102.05px",
          width: "1.26px",
          height: "52.85px",
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
          clipPath: "path('M 0.95 53.13 L 0.95 0.94 L 1.32 1.4 C 1.13 5.13 1.15 48.95 1.32 52.67 L 0.95 53.13 Z')"
        }} /><div key={7} style={{
          position: "absolute",
          left: "0.38px",
          top: "102.03px",
          width: "2.52px",
          height: "36.49px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.95 0.94 L 1.69 0.94 L 1.69 36.02 L 0.95 36.02 Z')"
        }} /><svg key={8} viewBox="0 0 1.26 36.49" preserveAspectRatio="none" style={{
          position: "absolute",
          left: "0px",
          top: "102.05px",
          width: "1.26px",
          height: "36.49px",
          overflow: "visible"
        }}><path d="M 1.32 36.01 L 1.32 0.94 L 0.95 1.4 C 1.13 5.13 1.12 31.83 0.95 35.56 L 1.32 36.01 Z" fill="#ffffff" stroke="#ffffff" strokeWidth={1} strokeLinejoin="round" /></svg><svg key={9} viewBox="0 0 2.52 36.49" preserveAspectRatio="none" style={{
          position: "absolute",
          left: "1.12px",
          top: "102.05px",
          width: "2.52px",
          height: "36.49px",
          overflow: "visible"
        }}><path d="M 0.95 0.94 L 1.75 0.94 L 1.75 36.02 L 0.95 36.02 Z" fill="#ffffff" stroke="#ffffff" strokeWidth={1} strokeLinejoin="round" /></svg><div key={10} style={{
          position: "absolute",
          left: "0.38px",
          top: "146.03px",
          width: "2.52px",
          height: "36.49px",
          boxSizing: "border-box",
          backgroundColor: "#FE095F",
          clipPath: "path('M 0.95 0.94 L 1.69 0.94 L 1.69 36.02 L 0.95 36.02 Z')"
        }} /><div key={11} style={{
          position: "absolute",
          left: "0px",
          top: "146.04px",
          width: "1.26px",
          height: "36.49px",
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
          clipPath: "path('M 1.32 36.01 L 1.32 0.94 L 0.95 1.4 C 1.13 5.13 1.12 31.83 0.95 35.56 L 1.32 36.01 Z')"
        }} /><svg key={12} viewBox="0 0 2.52 36.49" preserveAspectRatio="none" style={{
          position: "absolute",
          left: "1.12px",
          top: "146.03px",
          width: "2.52px",
          height: "36.49px",
          overflow: "visible"
        }}><path d="M 0.95 0.94 L 1.75 0.94 L 1.75 36.02 L 0.95 36.02 Z" fill="#ffffff" stroke="#ffffff" strokeWidth={1} strokeLinejoin="round" /></svg><svg key={13} viewBox="0 0 2.52 20.13" preserveAspectRatio="none" style={{
          position: "absolute",
          left: "0.38px",
          top: "60.49px",
          width: "2.52px",
          height: "20.13px",
          overflow: "visible"
        }}><path d="M 0.95 0.94 L 1.69 0.94 L 1.69 19.98 L 0.95 19.98 Z" fill="#ffffff" stroke="#ffffff" strokeWidth={1} strokeLinejoin="round" /></svg><div key={14} style={{
          position: "absolute",
          left: "0px",
          top: "60.51px",
          width: "1.26px",
          height: "20.13px",
          boxSizing: "border-box",
          backgroundColor: "#A0A0A0",
          clipPath: "path('M 1.32 19.97 L 1.32 0.94 L 0.95 1.4 C 1.13 5.13 1.12 15.79 0.95 19.51 L 1.32 19.97 Z')"
        }} /><svg key={15} viewBox="0 0 2.52 20.13" preserveAspectRatio="none" style={{
          position: "absolute",
          left: "1.12px",
          top: "60.51px",
          width: "2.52px",
          height: "20.13px",
          overflow: "visible"
        }}><path d="M 0.95 0.94 L 1.75 0.94 L 1.75 19.98 L 0.95 19.98 Z" fill="#ffffff" stroke="#ffffff" strokeWidth={1} strokeLinejoin="round" /></svg><div key={16} style={{
          position: "absolute",
          left: "105.15px",
          top: "487.03px",
          width: "28.94px",
          height: "2.52px",
          boxSizing: "border-box",
          backgroundColor: "#000000",
          clipPath: "path('M 26.14 0.95 L 3.01 0.95 C 2.54 0.95 2.13 1.01 2 1.08 L 0.98 1.52 C 0.79 1.65 1.3 1.78 1.99 1.78 L 27.17 1.78 C 27.86 1.78 28.36 1.65 28.17 1.52 L 27.16 1.08 C 27.03 1 26.61 0.95 26.15 0.95 Z')"
        }} /><div key={17} style={{
          position: "absolute",
          left: "88.77px",
          top: "9.87px",
          width: "60.4px",
          height: "18.88px",
          boxSizing: "border-box",
          backgroundColor: "#000000",
          clipPath: "path('M 51.6 18.1 L 9.51 18.1 C 4.78 18.1 0.94 14.26 0.94 9.52 L 0.94 9.52 C 0.94 4.78 4.78 0.94 9.51 0.94 L 51.6 0.94 C 56.34 0.94 60.17 4.78 60.17 9.52 L 60.17 9.52 C 60.17 14.25 56.34 18.1 51.6 18.1 Z')"
        }} /><div key={18} style={{
          position: "absolute",
          left: "133.31px",
          top: "14.7px",
          width: "8.81px",
          height: "8.81px",
          boxSizing: "border-box",
          backgroundColor: "#666666",
          clipPath: "path('M 8.45 4.69 C 8.45 6.77 6.77 8.45 4.69 8.45 C 2.62 8.45 0.94 6.77 0.94 4.69 C 0.94 2.62 2.62 0.94 4.69 0.94 C 6.77 0.94 8.45 2.62 8.45 4.69 Z')"
        }} /><img key={19} src={img_1} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 32" style={{
          position: "absolute",
          left: "134.42px",
          top: "15.85px",
          width: "7.55px",
          height: "6.29px",
          boxSizing: "border-box",
          clipPath: "path('M 0 0 L 7.55 0 L 7.55 7.55 L 0 7.55 Z')",
          objectFit: "fill"
        }} /><div key={20} style={{
          position: "absolute",
          left: "134.92px",
          top: "16.31px",
          width: "5.03px",
          height: "5.03px",
          boxSizing: "border-box",
          backgroundColor: "#0B131C",
          clipPath: "path('M 5.22 3.08 C 5.22 4.26 4.26 5.22 3.08 5.22 C 1.9 5.22 0.94 4.26 0.94 3.08 C 0.94 1.9 1.9 0.94 3.08 0.94 C 4.26 0.94 5.22 1.9 5.22 3.08 Z')"
        }} /><div key={21} style={{
          position: "absolute",
          left: "135.18px",
          top: "16.58px",
          width: "5.03px",
          height: "5.03px",
          boxSizing: "border-box",
          backgroundColor: "#231F20",
          clipPath: "path('M 4.69 2.82 C 4.69 3.85 3.85 4.69 2.82 4.69 C 1.79 4.69 0.94 3.86 0.94 2.82 C 0.94 1.77 1.77 0.94 2.82 0.94 C 3.86 0.94 4.69 1.77 4.69 2.82 Z')"
        }} /><div key={22} style={{
          position: "absolute",
          left: "135.18px",
          top: "16.58px",
          width: "5.03px",
          height: "5.03px",
          boxSizing: "border-box",
          backgroundColor: "#231F20",
          clipPath: "path('M 4.69 2.82 C 4.69 3.85 3.85 4.69 2.82 4.69 C 1.79 4.69 0.94 3.86 0.94 2.82 C 0.94 1.77 1.77 0.94 2.82 0.94 C 3.86 0.94 4.69 1.77 4.69 2.82 Z')"
        }} /><div key={23} style={{
          position: "absolute",
          left: "137.42px",
          top: "18.75px",
          width: "2.52px",
          height: "2.52px",
          boxSizing: "border-box",
          backgroundColor: "#CCCCCC",
          clipPath: "path('M 2.28 1.61 C 2.28 1.25 1.98 0.95 1.61 0.95 C 1.25 0.95 0.95 1.25 0.95 1.61 C 0.95 1.98 1.25 2.28 1.61 2.28 C 1.98 2.28 2.28 1.98 2.28 1.61 Z')"
        }} /></div><div key={15} style={{
        position: "absolute",
        left: "55.2px",
        top: "44.22px",
        width: "1035.46px",
        height: "39.49px",
        boxSizing: "border-box"
      }} /></div></div>;
};
export default Slide28;
