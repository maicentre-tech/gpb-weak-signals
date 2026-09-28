import React, { useState, useEffect, useRef } from "react";
import img_bg from "./assets/images/image_29.png";
const Slide11: React.FC = () => {
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
  return <div id="slide-11" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-11" style={{
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
        width: "393.8px",
        height: "65.19px",
        boxSizing: "border-box",
        backgroundColor: "#ff0053",
        borderRadius: "12.19px"
      }} /><div key={1} style={{
        position: "absolute",
        left: "654.15px",
        top: "127.17px",
        width: "571.16px",
        height: "523.83px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        borderRadius: "20.25px"
      }} /><div key={2} style={{
        position: "absolute",
        left: "36.33px",
        top: "127.17px",
        width: "571.16px",
        height: "523.83px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        borderRadius: "17.85px"
      }} /><div key={3} style={{
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
            color: "#ffffff"
          }}>{"11"}</span></p></div><div key={4} style={{
        position: "absolute",
        left: "61.89px",
        top: "201.67px",
        width: "517.57px",
        height: "406.15px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "left",
          lineHeight: "1.08",
          textIndent: "-15.19px",
          paddingLeft: "15.19px",
          fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u041E\u043F\u0438\u0448\u0438\u0442\u0435 \u0432 \u0447\u0435\u043C \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0441\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u044E\u0449\u0430\u044F \u0432\u0430\u0448\u0435\u0433\u043E \u0440\u0435\u0448\u0435\u043D\u0438\u044F. "}</span></p></div><div key={5} style={{
        position: "absolute",
        left: "683.83px",
        top: "201.67px",
        width: "520.44px",
        height: "406.98px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "left",
          lineHeight: "1.08",
          textIndent: "-15.19px",
          paddingLeft: "15.19px",
          fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u041E\u043F\u0438\u0448\u0438\u0442\u0435 \u0432\u0430\u0448\u0438 \u0438\u0434\u0435\u0438 \u043F\u043E \u0434\u0430\u043B\u044C\u043D\u0435\u0439\u0448\u0435\u043C\u0443 \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u0438\u044E, \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u044E \u0438\u043B\u0438 \u0432\u043D\u0435\u0434\u0440\u0435\u043D\u0438\u044E "}</span><br /><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u043F\u0440\u043E\u0435\u043A\u0442\u0430."}</span></p><p style={{
          textAlign: "left",
          lineHeight: "1.08",
          fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))"
          }}>{"\xA0"}</span></p></div><div key={6} style={{
        position: "absolute",
        left: "55.2px",
        top: "47.96px",
        width: "1035.46px",
        height: "39.49px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "left",
          lineHeight: "1.08",
          fontSize: "calc(19.97pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(19.97pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#f2f2f2"
          }}>{"\u041A\u041E\u0420\u041E\u0422\u041A\u041E \u041E \u0420\u0415\u0428\u0415\u041D\u0418\u0418"}</span></p></div><div key={7} style={{
        position: "absolute",
        left: "60.69px",
        top: "155.02px",
        width: "517.57px",
        height: "58.28px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "left",
          lineHeight: "1.2",
          fontSize: "calc(20pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(20pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#520977"
          }}>{"\u0422\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0441\u0443\u0442\u044C \u0440\u0435\u0448\u0435\u043D\u0438\u044F"}</span></p></div><div key={8} style={{
        position: "absolute",
        left: "683.83px",
        top: "155.02px",
        width: "547.48px",
        height: "58.95px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "left",
          lineHeight: "1.2",
          fontSize: "calc(20pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(20pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#520977"
          }}>{"\u041C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u0430\u044F \u0441\u0443\u0442\u044C \u0440\u0435\u0448\u0435\u043D\u0438\u044F"}</span></p><p style={{
          textAlign: "left",
          lineHeight: "1.2",
          fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"\xA0"}</span></p></div></div></div>;
};
export default Slide11;
