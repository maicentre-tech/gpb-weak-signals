import React, { useState, useEffect, useRef } from "react";
import img_bg from "./assets/images/image_3.png";
const Slide27: React.FC = () => {
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
  return <div id="slide-27" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-27" style={{
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
        left: "120.64px",
        top: "120.68px",
        width: "448.08px",
        height: "296.37px"
      }}><div key={0} style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          width: "448.08px",
          height: "296.37px"
        }}><div key={0} style={{
            position: "absolute",
            left: "0.14px",
            top: "0px",
            width: "447.94px",
            height: "296.37px",
            boxSizing: "border-box",
            backgroundColor: "#520977",
            borderRadius: "3.83px",
            boxShadow: "0px 4px 5.33px rgba(0, 0, 0, 0.4)"
          }} /><div key={1} style={{
            position: "absolute",
            left: "0px",
            top: "21.98px",
            width: "447.94px",
            height: "20.98px",
            boxSizing: "border-box",
            backgroundColor: "#160a29"
          }} /><div key={2} style={{
            position: "absolute",
            left: "66.47px",
            top: "5.66px",
            width: "179.17px",
            height: "37.3px",
            boxSizing: "border-box",
            backgroundColor: "#160a29",
            borderRadius: "4.47px"
          }} /><div key={3} style={{
            position: "absolute",
            left: "7.29px",
            top: "7.99px",
            width: "6.32px",
            height: "6.33px",
            boxSizing: "border-box",
            backgroundColor: "#ffd6e3",
            borderRadius: "50%"
          }} /><div key={4} style={{
            position: "absolute",
            left: "18.49px",
            top: "7.99px",
            width: "6.32px",
            height: "6.33px",
            boxSizing: "border-box",
            backgroundColor: "#fc3777",
            borderRadius: "50%"
          }} /><div key={5} style={{
            position: "absolute",
            left: "29.69px",
            top: "7.99px",
            width: "6.32px",
            height: "6.33px",
            boxSizing: "border-box",
            backgroundColor: "#8a83d1",
            borderRadius: "50%"
          }} /><div key={6} style={{
            position: "absolute",
            left: "77.7px",
            top: "25.97px",
            width: "336.53px",
            height: "13.32px",
            boxSizing: "border-box",
            backgroundColor: "#FFFFFF",
            border: "2.67px solid #B3B3B3"
          }} /><div key={7} style={{
            position: "absolute",
            left: "426.35px",
            top: "5.66px",
            width: "10.24px",
            height: "10.31px"
          }}><div key={0} style={{
              position: "absolute",
              left: "0px",
              top: "0px",
              width: "2.57px",
              height: "2.57px",
              boxSizing: "border-box",
              clipPath: "path('M 2.24 0 C 0.32 0 0.32 0 0.32 0 C 0.15 0 0 0.15 0 0.32 C 0 2.25 0 2.25 0 2.25 C 0 2.44 0.15 2.57 0.32 2.57 C 2.24 2.57 2.24 2.57 2.24 2.57 C 2.42 2.57 2.57 2.44 2.57 2.25 C 2.57 0.32 2.57 0.32 2.57 0.32 C 2.57 0.15 2.42 0 2.24 0 Z')"
            }} /><div key={1} style={{
              position: "absolute",
              left: "0px",
              top: "3.87px",
              width: "2.57px",
              height: "2.57px",
              boxSizing: "border-box",
              clipPath: "path('M 2.24 0 C 0.32 0 0.32 0 0.32 0 C 0.15 0 0 0.15 0 0.32 C 0 2.25 0 2.25 0 2.25 C 0 2.42 0.15 2.57 0.32 2.57 C 2.24 2.57 2.24 2.57 2.24 2.57 C 2.42 2.57 2.57 2.42 2.57 2.25 C 2.57 0.32 2.57 0.32 2.57 0.32 C 2.57 0.15 2.42 0 2.24 0 Z')"
            }} /><div key={2} style={{
              position: "absolute",
              left: "0px",
              top: "7.72px",
              width: "2.57px",
              height: "2.59px",
              boxSizing: "border-box",
              clipPath: "path('M 2.24 0 C 0.32 0 0.32 0 0.32 0 C 0.15 0 0 0.15 0 0.34 C 0 2.27 0 2.27 0 2.27 C 0 2.44 0.15 2.59 0.32 2.59 C 2.24 2.59 2.24 2.59 2.24 2.59 C 2.42 2.59 2.57 2.44 2.57 2.27 C 2.57 0.34 2.57 0.34 2.57 0.34 C 2.57 0.15 2.42 0 2.24 0 Z')"
            }} /><div key={3} style={{
              position: "absolute",
              left: "3.85px",
              top: "0px",
              width: "2.55px",
              height: "2.57px",
              boxSizing: "border-box",
              clipPath: "path('M 2.23 0 C 0.32 0 0.32 0 0.32 0 C 0.15 0 0 0.15 0 0.32 C 0 2.25 0 2.25 0 2.25 C 0 2.44 0.15 2.57 0.32 2.57 C 2.23 2.57 2.23 2.57 2.23 2.57 C 2.4 2.57 2.55 2.44 2.55 2.25 C 2.55 0.32 2.55 0.32 2.55 0.32 C 2.55 0.15 2.4 0 2.23 0 Z')"
            }} /><div key={4} style={{
              position: "absolute",
              left: "3.85px",
              top: "3.87px",
              width: "2.55px",
              height: "2.57px",
              boxSizing: "border-box",
              clipPath: "path('M 2.23 0 C 0.32 0 0.32 0 0.32 0 C 0.15 0 0 0.15 0 0.32 C 0 2.25 0 2.25 0 2.25 C 0 2.42 0.15 2.57 0.32 2.57 C 2.23 2.57 2.23 2.57 2.23 2.57 C 2.4 2.57 2.55 2.42 2.55 2.25 C 2.55 0.32 2.55 0.32 2.55 0.32 C 2.55 0.15 2.4 0 2.23 0 Z')"
            }} /><div key={5} style={{
              position: "absolute",
              left: "3.85px",
              top: "7.72px",
              width: "2.55px",
              height: "2.59px",
              boxSizing: "border-box",
              clipPath: "path('M 2.23 0 C 0.32 0 0.32 0 0.32 0 C 0.15 0 0 0.15 0 0.34 C 0 2.27 0 2.27 0 2.27 C 0 2.44 0.15 2.59 0.32 2.59 C 2.23 2.59 2.23 2.59 2.23 2.59 C 2.4 2.59 2.55 2.44 2.55 2.27 C 2.55 0.34 2.55 0.34 2.55 0.34 C 2.55 0.15 2.4 0 2.23 0 Z')"
            }} /><div key={6} style={{
              position: "absolute",
              left: "7.69px",
              top: "0px",
              width: "2.56px",
              height: "2.57px",
              boxSizing: "border-box",
              clipPath: "path('M 2.24 0 C 0.32 0 0.32 0 0.32 0 C 0.13 0 0 0.15 0 0.32 C 0 2.25 0 2.25 0 2.25 C 0 2.44 0.13 2.57 0.32 2.57 C 2.24 2.57 2.24 2.57 2.24 2.57 C 2.41 2.57 2.56 2.44 2.56 2.25 C 2.56 0.32 2.56 0.32 2.56 0.32 C 2.56 0.15 2.41 0 2.24 0 Z')"
            }} /><div key={7} style={{
              position: "absolute",
              left: "7.69px",
              top: "3.87px",
              width: "2.56px",
              height: "2.57px",
              boxSizing: "border-box",
              clipPath: "path('M 2.24 0 C 0.32 0 0.32 0 0.32 0 C 0.13 0 0 0.15 0 0.32 C 0 2.25 0 2.25 0 2.25 C 0 2.42 0.13 2.57 0.32 2.57 C 2.24 2.57 2.24 2.57 2.24 2.57 C 2.41 2.57 2.56 2.42 2.56 2.25 C 2.56 0.32 2.56 0.32 2.56 0.32 C 2.56 0.15 2.41 0 2.24 0 Z')"
            }} /><div key={8} style={{
              position: "absolute",
              left: "7.69px",
              top: "7.72px",
              width: "2.56px",
              height: "2.59px",
              boxSizing: "border-box",
              clipPath: "path('M 2.24 0 C 0.32 0 0.32 0 0.32 0 C 0.13 0 0 0.15 0 0.34 C 0 2.27 0 2.27 0 2.27 C 0 2.44 0.13 2.59 0.32 2.59 C 2.24 2.59 2.24 2.59 2.24 2.59 C 2.41 2.59 2.56 2.44 2.56 2.27 C 2.56 0.34 2.56 0.34 2.56 0.34 C 2.56 0.15 2.41 0 2.24 0 Z')"
            }} /></div><div key={8} style={{
            position: "absolute",
            left: "426.53px",
            top: "28.02px",
            width: "9.69px",
            height: "8.54px",
            boxSizing: "border-box",
            backgroundColor: "#808080",
            clipPath: "path('M 5.45 0 C 3.32 0 1.56 1.59 1.25 3.66 C 0 3.66 0 3.66 0 3.66 C 1.82 6.1 1.82 6.1 1.82 6.1 C 3.63 3.66 3.63 3.66 3.63 3.66 C 2.49 3.66 2.49 3.66 2.49 3.66 C 2.77 2.27 3.99 1.22 5.45 1.22 C 7.12 1.22 8.48 2.59 8.48 4.27 C 8.48 5.95 7.12 7.32 5.45 7.32 C 5.45 8.54 5.45 8.54 5.45 8.54 C 7.8 8.54 9.69 6.63 9.69 4.27 C 9.69 1.91 7.8 0 5.45 0 Z')",
            transform: "rotate(90deg)"
          }} /><div key={9} style={{
            position: "absolute",
            left: "41.43px",
            top: "7.99px",
            width: "6.32px",
            height: "6.33px",
            boxSizing: "border-box",
            backgroundColor: "#520977",
            borderRadius: "50%"
          }} /></div><div key={1} style={{
          position: "absolute",
          left: "89.92px",
          top: "20.06px",
          width: "105.08px",
          height: "26.37px",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          padding: "4.8px 9.6px 4.8px 9.6px",
          whiteSpace: "nowrap",
          wordWrap: "break-word"
        }}><p style={{
            lineHeight: "1.2",
            fontSize: "calc(10pt * var(--pptx-font-scale, 1))",
            marginTop: "0",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(10pt * var(--pptx-font-scale, 1))",
              fontFamily: "'Poppins Light', 'Poppins', sans-serif",
              fontWeight: "300",
              color: "#000000"
            }}>{"www."}</span><span style={{
              fontSize: "calc(10pt * var(--pptx-font-scale, 1))",
              fontFamily: "'Poppins Light', 'Poppins', sans-serif",
              fontWeight: "300",
              color: "#000000"
            }}>{"lider"}</span><span style={{
              fontSize: "calc(10pt * var(--pptx-font-scale, 1))",
              fontFamily: "'Poppins Light', 'Poppins', sans-serif",
              fontWeight: "300",
              color: "#000000"
            }}>{".com"}</span></p></div><div key={2} style={{
          position: "absolute",
          left: "81.93px",
          top: "28.96px",
          width: "7.61px",
          height: "7.67px",
          boxSizing: "border-box",
          backgroundColor: "#808080",
          clipPath: "path('M 3.81 0 C 1.7 0 0 1.71 0 3.84 C 0 5.96 1.7 7.67 3.81 7.67 C 5.91 7.67 7.61 5.96 7.61 3.84 C 7.61 1.71 5.91 0 3.81 0 Z M 7.11 3.71 C 5.64 3.71 5.64 3.71 5.64 3.71 C 5.62 3.16 5.53 2.64 5.36 2.16 C 5.7 2.03 5.99 1.83 6.28 1.62 C 6.77 2.18 7.08 2.91 7.11 3.71 Z M 3.67 7.16 C 3.27 6.83 2.92 6.38 2.67 5.86 C 2.99 5.76 3.33 5.7 3.69 5.69 C 3.69 7.16 3.69 7.16 3.69 7.16 C 3.67 7.16 3.67 7.16 3.67 7.16 Z M 3.94 0.51 C 4.4 0.89 4.79 1.41 5.04 2.01 C 4.69 2.13 4.32 2.21 3.92 2.22 C 3.92 0.51 3.92 0.51 3.92 0.51 C 3.94 0.51 3.94 0.51 3.94 0.51 Z M 4.34 0.54 C 5.03 0.66 5.64 0.98 6.1 1.44 C 5.85 1.64 5.58 1.81 5.26 1.93 C 5.04 1.4 4.73 0.93 4.34 0.54 Z M 3.69 0.51 C 3.69 2.22 3.69 2.22 3.69 2.22 C 3.29 2.21 2.92 2.13 2.57 2.01 C 2.82 1.41 3.21 0.89 3.67 0.51 C 3.67 0.51 3.67 0.51 3.69 0.51 Z M 2.35 1.93 C 2.05 1.81 1.76 1.64 1.51 1.44 C 1.97 0.98 2.58 0.66 3.27 0.54 C 2.88 0.93 2.57 1.4 2.35 1.93 Z M 2.48 2.24 C 2.86 2.38 3.27 2.46 3.69 2.47 C 3.69 3.71 3.69 3.71 3.69 3.71 C 2.21 3.71 2.21 3.71 2.21 3.71 C 2.23 3.2 2.32 2.7 2.48 2.24 Z M 3.69 3.96 C 3.69 5.45 3.69 5.45 3.69 5.45 C 3.29 5.46 2.92 5.52 2.57 5.64 C 2.36 5.13 2.23 4.56 2.21 3.96 L 3.69 3.96 Z M 3.27 7.13 C 2.66 7.02 2.11 6.75 1.65 6.37 C 1.89 6.2 2.15 6.05 2.44 5.95 C 2.66 6.4 2.93 6.79 3.27 7.13 Z M 3.92 7.16 C 3.92 5.69 3.92 5.69 3.92 5.69 C 4.28 5.7 4.62 5.76 4.94 5.86 C 4.69 6.38 4.34 6.83 3.94 7.16 C 3.94 7.16 3.94 7.16 3.92 7.16 Z M 5.17 5.95 C 5.46 6.05 5.72 6.2 5.96 6.37 C 5.5 6.75 4.95 7.02 4.34 7.13 C 4.68 6.79 4.95 6.4 5.17 5.95 Z M 5.04 5.64 C 4.69 5.52 4.32 5.46 3.92 5.45 C 3.92 3.96 3.92 3.96 3.92 3.96 C 5.4 3.96 5.4 3.96 5.4 3.96 C 5.38 4.56 5.25 5.13 5.04 5.64 Z M 3.92 3.71 C 3.92 2.47 3.92 2.47 3.92 2.47 C 4.34 2.46 4.75 2.38 5.13 2.24 C 5.29 2.7 5.38 3.2 5.4 3.71 L 3.92 3.71 Z M 1.33 1.62 C 1.62 1.83 1.91 2.03 2.25 2.16 C 2.08 2.64 1.99 3.16 1.97 3.71 C 0.5 3.71 0.5 3.71 0.5 3.71 C 0.53 2.91 0.84 2.18 1.33 1.62 Z M 0.5 3.96 C 1.97 3.96 1.97 3.96 1.97 3.96 C 1.99 4.59 2.12 5.19 2.33 5.73 C 2.02 5.85 1.74 6.01 1.47 6.2 C 0.9 5.62 0.53 4.84 0.5 3.96 Z M 6.14 6.2 C 5.87 6.01 5.59 5.85 5.28 5.73 C 5.49 5.19 5.62 4.59 5.64 3.96 C 7.11 3.96 7.11 3.96 7.11 3.96 C 7.08 4.84 6.71 5.62 6.14 6.2 Z')"
        }} /></div><div key={2} style={{
        position: "absolute",
        left: "713.28px",
        top: "120.68px",
        width: "448.08px",
        height: "296.37px"
      }}><div key={0} style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          width: "448.08px",
          height: "296.37px"
        }}><div key={0} style={{
            position: "absolute",
            left: "0.14px",
            top: "0px",
            width: "447.94px",
            height: "296.37px",
            boxSizing: "border-box",
            backgroundColor: "#520977",
            borderRadius: "3.83px",
            boxShadow: "0px 4px 5.33px rgba(0, 0, 0, 0.4)"
          }} /><div key={1} style={{
            position: "absolute",
            left: "0px",
            top: "21.98px",
            width: "447.94px",
            height: "20.98px",
            boxSizing: "border-box",
            backgroundColor: "#160a29"
          }} /><div key={2} style={{
            position: "absolute",
            left: "66.47px",
            top: "5.66px",
            width: "179.17px",
            height: "37.3px",
            boxSizing: "border-box",
            backgroundColor: "#160a29",
            borderRadius: "4.47px"
          }} /><div key={3} style={{
            position: "absolute",
            left: "7.29px",
            top: "7.99px",
            width: "6.32px",
            height: "6.33px",
            boxSizing: "border-box",
            backgroundColor: "#ffd6e3",
            borderRadius: "50%"
          }} /><div key={4} style={{
            position: "absolute",
            left: "18.49px",
            top: "7.99px",
            width: "6.32px",
            height: "6.33px",
            boxSizing: "border-box",
            backgroundColor: "#fc3777",
            borderRadius: "50%"
          }} /><div key={5} style={{
            position: "absolute",
            left: "29.69px",
            top: "7.99px",
            width: "6.32px",
            height: "6.33px",
            boxSizing: "border-box",
            backgroundColor: "#8a83d1",
            borderRadius: "50%"
          }} /><div key={6} style={{
            position: "absolute",
            left: "77.7px",
            top: "25.97px",
            width: "336.53px",
            height: "13.32px",
            boxSizing: "border-box",
            backgroundColor: "#FFFFFF",
            border: "2.67px solid #B3B3B3"
          }} /><div key={7} style={{
            position: "absolute",
            left: "426.35px",
            top: "5.66px",
            width: "10.24px",
            height: "10.31px"
          }}><div key={0} style={{
              position: "absolute",
              left: "0px",
              top: "0px",
              width: "2.57px",
              height: "2.57px",
              boxSizing: "border-box",
              clipPath: "path('M 2.24 0 C 0.32 0 0.32 0 0.32 0 C 0.15 0 0 0.15 0 0.32 C 0 2.25 0 2.25 0 2.25 C 0 2.44 0.15 2.57 0.32 2.57 C 2.24 2.57 2.24 2.57 2.24 2.57 C 2.42 2.57 2.57 2.44 2.57 2.25 C 2.57 0.32 2.57 0.32 2.57 0.32 C 2.57 0.15 2.42 0 2.24 0 Z')"
            }} /><div key={1} style={{
              position: "absolute",
              left: "0px",
              top: "3.87px",
              width: "2.57px",
              height: "2.57px",
              boxSizing: "border-box",
              clipPath: "path('M 2.24 0 C 0.32 0 0.32 0 0.32 0 C 0.15 0 0 0.15 0 0.32 C 0 2.25 0 2.25 0 2.25 C 0 2.42 0.15 2.57 0.32 2.57 C 2.24 2.57 2.24 2.57 2.24 2.57 C 2.42 2.57 2.57 2.42 2.57 2.25 C 2.57 0.32 2.57 0.32 2.57 0.32 C 2.57 0.15 2.42 0 2.24 0 Z')"
            }} /><div key={2} style={{
              position: "absolute",
              left: "0px",
              top: "7.72px",
              width: "2.57px",
              height: "2.59px",
              boxSizing: "border-box",
              clipPath: "path('M 2.24 0 C 0.32 0 0.32 0 0.32 0 C 0.15 0 0 0.15 0 0.34 C 0 2.27 0 2.27 0 2.27 C 0 2.44 0.15 2.59 0.32 2.59 C 2.24 2.59 2.24 2.59 2.24 2.59 C 2.42 2.59 2.57 2.44 2.57 2.27 C 2.57 0.34 2.57 0.34 2.57 0.34 C 2.57 0.15 2.42 0 2.24 0 Z')"
            }} /><div key={3} style={{
              position: "absolute",
              left: "3.85px",
              top: "0px",
              width: "2.55px",
              height: "2.57px",
              boxSizing: "border-box",
              clipPath: "path('M 2.23 0 C 0.32 0 0.32 0 0.32 0 C 0.15 0 0 0.15 0 0.32 C 0 2.25 0 2.25 0 2.25 C 0 2.44 0.15 2.57 0.32 2.57 C 2.23 2.57 2.23 2.57 2.23 2.57 C 2.4 2.57 2.55 2.44 2.55 2.25 C 2.55 0.32 2.55 0.32 2.55 0.32 C 2.55 0.15 2.4 0 2.23 0 Z')"
            }} /><div key={4} style={{
              position: "absolute",
              left: "3.85px",
              top: "3.87px",
              width: "2.55px",
              height: "2.57px",
              boxSizing: "border-box",
              clipPath: "path('M 2.23 0 C 0.32 0 0.32 0 0.32 0 C 0.15 0 0 0.15 0 0.32 C 0 2.25 0 2.25 0 2.25 C 0 2.42 0.15 2.57 0.32 2.57 C 2.23 2.57 2.23 2.57 2.23 2.57 C 2.4 2.57 2.55 2.42 2.55 2.25 C 2.55 0.32 2.55 0.32 2.55 0.32 C 2.55 0.15 2.4 0 2.23 0 Z')"
            }} /><div key={5} style={{
              position: "absolute",
              left: "3.85px",
              top: "7.72px",
              width: "2.55px",
              height: "2.59px",
              boxSizing: "border-box",
              clipPath: "path('M 2.23 0 C 0.32 0 0.32 0 0.32 0 C 0.15 0 0 0.15 0 0.34 C 0 2.27 0 2.27 0 2.27 C 0 2.44 0.15 2.59 0.32 2.59 C 2.23 2.59 2.23 2.59 2.23 2.59 C 2.4 2.59 2.55 2.44 2.55 2.27 C 2.55 0.34 2.55 0.34 2.55 0.34 C 2.55 0.15 2.4 0 2.23 0 Z')"
            }} /><div key={6} style={{
              position: "absolute",
              left: "7.69px",
              top: "0px",
              width: "2.56px",
              height: "2.57px",
              boxSizing: "border-box",
              clipPath: "path('M 2.24 0 C 0.32 0 0.32 0 0.32 0 C 0.13 0 0 0.15 0 0.32 C 0 2.25 0 2.25 0 2.25 C 0 2.44 0.13 2.57 0.32 2.57 C 2.24 2.57 2.24 2.57 2.24 2.57 C 2.41 2.57 2.56 2.44 2.56 2.25 C 2.56 0.32 2.56 0.32 2.56 0.32 C 2.56 0.15 2.41 0 2.24 0 Z')"
            }} /><div key={7} style={{
              position: "absolute",
              left: "7.69px",
              top: "3.87px",
              width: "2.56px",
              height: "2.57px",
              boxSizing: "border-box",
              clipPath: "path('M 2.24 0 C 0.32 0 0.32 0 0.32 0 C 0.13 0 0 0.15 0 0.32 C 0 2.25 0 2.25 0 2.25 C 0 2.42 0.13 2.57 0.32 2.57 C 2.24 2.57 2.24 2.57 2.24 2.57 C 2.41 2.57 2.56 2.42 2.56 2.25 C 2.56 0.32 2.56 0.32 2.56 0.32 C 2.56 0.15 2.41 0 2.24 0 Z')"
            }} /><div key={8} style={{
              position: "absolute",
              left: "7.69px",
              top: "7.72px",
              width: "2.56px",
              height: "2.59px",
              boxSizing: "border-box",
              clipPath: "path('M 2.24 0 C 0.32 0 0.32 0 0.32 0 C 0.13 0 0 0.15 0 0.34 C 0 2.27 0 2.27 0 2.27 C 0 2.44 0.13 2.59 0.32 2.59 C 2.24 2.59 2.24 2.59 2.24 2.59 C 2.41 2.59 2.56 2.44 2.56 2.27 C 2.56 0.34 2.56 0.34 2.56 0.34 C 2.56 0.15 2.41 0 2.24 0 Z')"
            }} /></div><div key={8} style={{
            position: "absolute",
            left: "426.53px",
            top: "28.02px",
            width: "9.69px",
            height: "8.54px",
            boxSizing: "border-box",
            backgroundColor: "#808080",
            clipPath: "path('M 5.45 0 C 3.32 0 1.56 1.59 1.25 3.66 C 0 3.66 0 3.66 0 3.66 C 1.82 6.1 1.82 6.1 1.82 6.1 C 3.63 3.66 3.63 3.66 3.63 3.66 C 2.49 3.66 2.49 3.66 2.49 3.66 C 2.77 2.27 3.99 1.22 5.45 1.22 C 7.12 1.22 8.48 2.59 8.48 4.27 C 8.48 5.95 7.12 7.32 5.45 7.32 C 5.45 8.54 5.45 8.54 5.45 8.54 C 7.8 8.54 9.69 6.63 9.69 4.27 C 9.69 1.91 7.8 0 5.45 0 Z')",
            transform: "rotate(90deg)"
          }} /><div key={9} style={{
            position: "absolute",
            left: "41.43px",
            top: "7.99px",
            width: "6.32px",
            height: "6.33px",
            boxSizing: "border-box",
            backgroundColor: "#520977",
            borderRadius: "50%"
          }} /></div><div key={1} style={{
          position: "absolute",
          left: "89.92px",
          top: "20.06px",
          width: "105.08px",
          height: "26.37px",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          padding: "4.8px 9.6px 4.8px 9.6px",
          whiteSpace: "nowrap",
          wordWrap: "break-word"
        }}><p style={{
            lineHeight: "1.2",
            fontSize: "calc(10pt * var(--pptx-font-scale, 1))",
            marginTop: "0",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(10pt * var(--pptx-font-scale, 1))",
              fontFamily: "'Poppins Light', 'Poppins', sans-serif",
              fontWeight: "300",
              color: "#000000"
            }}>{"www."}</span><span style={{
              fontSize: "calc(10pt * var(--pptx-font-scale, 1))",
              fontFamily: "'Poppins Light', 'Poppins', sans-serif",
              fontWeight: "300",
              color: "#000000"
            }}>{"lider"}</span><span style={{
              fontSize: "calc(10pt * var(--pptx-font-scale, 1))",
              fontFamily: "'Poppins Light', 'Poppins', sans-serif",
              fontWeight: "300",
              color: "#000000"
            }}>{".com"}</span></p></div><div key={2} style={{
          position: "absolute",
          left: "81.93px",
          top: "28.96px",
          width: "7.61px",
          height: "7.67px",
          boxSizing: "border-box",
          backgroundColor: "#808080",
          clipPath: "path('M 3.81 0 C 1.7 0 0 1.71 0 3.84 C 0 5.96 1.7 7.67 3.81 7.67 C 5.91 7.67 7.61 5.96 7.61 3.84 C 7.61 1.71 5.91 0 3.81 0 Z M 7.11 3.71 C 5.64 3.71 5.64 3.71 5.64 3.71 C 5.62 3.16 5.53 2.64 5.36 2.16 C 5.7 2.03 5.99 1.83 6.28 1.62 C 6.77 2.18 7.08 2.91 7.11 3.71 Z M 3.67 7.16 C 3.27 6.83 2.92 6.38 2.67 5.86 C 2.99 5.76 3.33 5.7 3.69 5.69 C 3.69 7.16 3.69 7.16 3.69 7.16 C 3.67 7.16 3.67 7.16 3.67 7.16 Z M 3.94 0.51 C 4.4 0.89 4.79 1.41 5.04 2.01 C 4.69 2.13 4.32 2.21 3.92 2.22 C 3.92 0.51 3.92 0.51 3.92 0.51 C 3.94 0.51 3.94 0.51 3.94 0.51 Z M 4.34 0.54 C 5.03 0.66 5.64 0.98 6.1 1.44 C 5.85 1.64 5.58 1.81 5.26 1.93 C 5.04 1.4 4.73 0.93 4.34 0.54 Z M 3.69 0.51 C 3.69 2.22 3.69 2.22 3.69 2.22 C 3.29 2.21 2.92 2.13 2.57 2.01 C 2.82 1.41 3.21 0.89 3.67 0.51 C 3.67 0.51 3.67 0.51 3.69 0.51 Z M 2.35 1.93 C 2.05 1.81 1.76 1.64 1.51 1.44 C 1.97 0.98 2.58 0.66 3.27 0.54 C 2.88 0.93 2.57 1.4 2.35 1.93 Z M 2.48 2.24 C 2.86 2.38 3.27 2.46 3.69 2.47 C 3.69 3.71 3.69 3.71 3.69 3.71 C 2.21 3.71 2.21 3.71 2.21 3.71 C 2.23 3.2 2.32 2.7 2.48 2.24 Z M 3.69 3.96 C 3.69 5.45 3.69 5.45 3.69 5.45 C 3.29 5.46 2.92 5.52 2.57 5.64 C 2.36 5.13 2.23 4.56 2.21 3.96 L 3.69 3.96 Z M 3.27 7.13 C 2.66 7.02 2.11 6.75 1.65 6.37 C 1.89 6.2 2.15 6.05 2.44 5.95 C 2.66 6.4 2.93 6.79 3.27 7.13 Z M 3.92 7.16 C 3.92 5.69 3.92 5.69 3.92 5.69 C 4.28 5.7 4.62 5.76 4.94 5.86 C 4.69 6.38 4.34 6.83 3.94 7.16 C 3.94 7.16 3.94 7.16 3.92 7.16 Z M 5.17 5.95 C 5.46 6.05 5.72 6.2 5.96 6.37 C 5.5 6.75 4.95 7.02 4.34 7.13 C 4.68 6.79 4.95 6.4 5.17 5.95 Z M 5.04 5.64 C 4.69 5.52 4.32 5.46 3.92 5.45 C 3.92 3.96 3.92 3.96 3.92 3.96 C 5.4 3.96 5.4 3.96 5.4 3.96 C 5.38 4.56 5.25 5.13 5.04 5.64 Z M 3.92 3.71 C 3.92 2.47 3.92 2.47 3.92 2.47 C 4.34 2.46 4.75 2.38 5.13 2.24 C 5.29 2.7 5.38 3.2 5.4 3.71 L 3.92 3.71 Z M 1.33 1.62 C 1.62 1.83 1.91 2.03 2.25 2.16 C 2.08 2.64 1.99 3.16 1.97 3.71 C 0.5 3.71 0.5 3.71 0.5 3.71 C 0.53 2.91 0.84 2.18 1.33 1.62 Z M 0.5 3.96 C 1.97 3.96 1.97 3.96 1.97 3.96 C 1.99 4.59 2.12 5.19 2.33 5.73 C 2.02 5.85 1.74 6.01 1.47 6.2 C 0.9 5.62 0.53 4.84 0.5 3.96 Z M 6.14 6.2 C 5.87 6.01 5.59 5.85 5.28 5.73 C 5.49 5.19 5.62 4.59 5.64 3.96 C 7.11 3.96 7.11 3.96 7.11 3.96 C 7.08 4.84 6.71 5.62 6.14 6.2 Z')"
        }} /></div><div key={3} style={{
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
          }}>{"27"}</span></p></div><div key={4} style={{
        position: "absolute",
        left: "127.1px",
        top: "454.01px",
        width: "432.72px",
        height: "169.27px",
        boxSizing: "border-box"
      }} /><div key={5} style={{
        position: "absolute",
        left: "719.99px",
        top: "454.01px",
        width: "432.72px",
        height: "169.27px",
        boxSizing: "border-box"
      }} /><div key={6} style={{
        position: "absolute",
        left: "127.1px",
        top: "165.67px",
        width: "432.72px",
        height: "239.79px",
        boxSizing: "border-box"
      }} /><div key={7} style={{
        position: "absolute",
        left: "719.74px",
        top: "165.67px",
        width: "432.72px",
        height: "239.79px",
        boxSizing: "border-box"
      }} /><div key={8} style={{
        position: "absolute",
        left: "55.2px",
        top: "44.22px",
        width: "1035.46px",
        height: "39.49px",
        boxSizing: "border-box"
      }} /></div></div>;
};
export default Slide27;
