import React, { useState, useEffect, useRef } from "react";
import img_bg from "./assets/images/image_3.png";
const Slide25: React.FC = () => {
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
  return <div id="slide-25" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-25" style={{
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
          }}>{"25"}</span></p></div><div key={2} style={{
        position: "absolute",
        left: "36.33px",
        top: "153.08px",
        width: "265.21px",
        height: "155.03px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "0px"
      }} /><div key={3} style={{
        position: "absolute",
        left: "36.33px",
        top: "190.45px",
        width: "265.21px",
        height: "117.66px",
        boxSizing: "border-box"
      }} /><div key={4} style={{
        position: "absolute",
        left: "507.4px",
        top: "153.08px",
        width: "265.21px",
        height: "155.03px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "0px"
      }} /><div key={5} style={{
        position: "absolute",
        left: "507.4px",
        top: "190.45px",
        width: "265.21px",
        height: "117.66px",
        boxSizing: "border-box"
      }} /><div key={6} style={{
        position: "absolute",
        left: "979.62px",
        top: "153.08px",
        width: "265.21px",
        height: "155.03px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "0px"
      }} /><div key={7} style={{
        position: "absolute",
        left: "979.62px",
        top: "190.45px",
        width: "265.21px",
        height: "117.66px",
        boxSizing: "border-box"
      }} /><div key={8} style={{
        position: "absolute",
        left: "272.29px",
        top: "506.6px",
        width: "265.21px",
        height: "155.03px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "0px"
      }} /><div key={9} style={{
        position: "absolute",
        left: "272.29px",
        top: "543.97px",
        width: "265.21px",
        height: "117.66px",
        boxSizing: "border-box"
      }} /><div key={10} style={{
        position: "absolute",
        left: "743.35px",
        top: "506.6px",
        width: "265.21px",
        height: "155.03px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        borderRadius: "0px"
      }} /><div key={11} style={{
        position: "absolute",
        left: "743.35px",
        top: "543.97px",
        width: "265.21px",
        height: "117.66px",
        boxSizing: "border-box"
      }} /><svg key={12} style={{
        position: "absolute",
        left: "216.9px",
        top: "405.27px",
        width: "139.9px",
        height: "1px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="139.9" y2="0" stroke="#000000" strokeWidth="1.33" /></svg><svg key={13} style={{
        position: "absolute",
        left: "452.72px",
        top: "405.47px",
        width: "139.9px",
        height: "1px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="139.9" y2="0" stroke="#000000" strokeWidth="1.33" /></svg><svg key={14} style={{
        position: "absolute",
        left: "688.54px",
        top: "405.47px",
        width: "139.9px",
        height: "1px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="139.9" y2="0" stroke="#000000" strokeWidth="1.33" /></svg><svg key={15} style={{
        position: "absolute",
        left: "921.83px",
        top: "405.47px",
        width: "139.9px",
        height: "1px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="139.9" y2="0" stroke="#000000" strokeWidth="1.33" /></svg><svg key={16} style={{
        position: "absolute",
        left: "168.94px",
        top: "308.11px",
        width: "1px",
        height: "60.19px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="0" y2="60.19" stroke="#000000" strokeWidth="1.33" /></svg><svg key={17} style={{
        position: "absolute",
        left: "404.76px",
        top: "442.65px",
        width: "1px",
        height: "60.37px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="0.13" y2="60.37" stroke="#000000" strokeWidth="1.33" /></svg><svg key={18} style={{
        position: "absolute",
        left: "640px",
        top: "308.11px",
        width: "1px",
        height: "60.19px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="0.58" y2="60.19" stroke="#000000" strokeWidth="1.33" /></svg><svg key={19} style={{
        position: "absolute",
        left: "875.95px",
        top: "442.65px",
        width: "1px",
        height: "60.37px",
        overflow: "visible"
      }}><line x1="0.45" y1="0" x2="0" y2="60.37" stroke="#000000" strokeWidth="1.33" /></svg><svg key={20} style={{
        position: "absolute",
        left: "1112.22px",
        top: "308.11px",
        width: "1px",
        height: "60.19px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="0" y2="60.19" stroke="#000000" strokeWidth="1.33" /></svg><div key={21} style={{
        position: "absolute",
        left: "125.05px",
        top: "368.3px",
        width: "91.84px",
        height: "74.35px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        border: "1.33px solid #ff0053",
        borderRadius: "12.39px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontSize: "calc(24pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(24pt * var(--pptx-font-scale, 1))",
            fontWeight: "700",
            color: "#ff0053"
          }}>{"1"}</span></p></div><div key={22} style={{
        position: "absolute",
        left: "358.26px",
        top: "368.1px",
        width: "91.84px",
        height: "74.35px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        border: "1.33px solid #ff0053",
        borderRadius: "12.39px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontSize: "calc(24pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(24pt * var(--pptx-font-scale, 1))",
            fontWeight: "700",
            color: "#ff0053"
          }}>{"2"}</span></p></div><div key={23} style={{
        position: "absolute",
        left: "594.08px",
        top: "369.16px",
        width: "91.84px",
        height: "74.35px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        border: "1.33px solid #ff0053",
        borderRadius: "12.39px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontSize: "calc(24pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(24pt * var(--pptx-font-scale, 1))",
            fontWeight: "700",
            color: "#ff0053"
          }}>{"3"}</span></p></div><div key={24} style={{
        position: "absolute",
        left: "828.32px",
        top: "368.1px",
        width: "91.84px",
        height: "74.35px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        border: "1.33px solid #ff0053",
        borderRadius: "12.39px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontSize: "calc(24pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(24pt * var(--pptx-font-scale, 1))",
            fontWeight: "700",
            color: "#ff0053"
          }}>{"4"}</span></p></div><div key={25} style={{
        position: "absolute",
        left: "1061.73px",
        top: "371.51px",
        width: "91.84px",
        height: "74.35px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        border: "1.33px solid #ff0053",
        borderRadius: "12.39px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontSize: "calc(24pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(24pt * var(--pptx-font-scale, 1))",
            fontWeight: "700",
            color: "#ff0053"
          }}>{"5"}</span></p></div><div key={26} style={{
        position: "absolute",
        left: "55.2px",
        top: "44.22px",
        width: "1035.46px",
        height: "39.49px",
        boxSizing: "border-box"
      }} /><div key={27} style={{
        position: "absolute",
        left: "19.58px",
        top: "143.9px",
        width: "297.76px",
        height: "166.02px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        border: "1.33px solid #ff0053",
        borderRadius: "18.07px"
      }} /><div key={28} style={{
        position: "absolute",
        left: "487.58px",
        top: "143.9px",
        width: "297.76px",
        height: "166.02px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        border: "1.33px solid #ff0053",
        borderRadius: "18.07px"
      }} /><div key={29} style={{
        position: "absolute",
        left: "955.58px",
        top: "143.9px",
        width: "297.76px",
        height: "166.02px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        border: "1.33px solid #ff0053",
        borderRadius: "18.07px"
      }} /><div key={30} style={{
        position: "absolute",
        left: "259.51px",
        top: "506.6px",
        width: "297.76px",
        height: "166.02px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        border: "1.33px solid #ff0053",
        borderRadius: "18.07px"
      }} /><div key={31} style={{
        position: "absolute",
        left: "729.52px",
        top: "503.02px",
        width: "297.76px",
        height: "166.02px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        border: "1.33px solid #ff0053",
        borderRadius: "18.07px"
      }} /></div></div>;
};
export default Slide25;
