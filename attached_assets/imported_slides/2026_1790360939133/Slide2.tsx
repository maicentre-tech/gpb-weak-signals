import React, { useState, useEffect, useRef } from "react";
import img_bg from "./assets/images/image_2.png";
const Slide2: React.FC = () => {
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
  return <div id="slide-2" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-2" style={{
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
        left: "99.5px",
        top: "42.83px",
        width: "244.6px",
        height: "65.19px",
        boxSizing: "border-box",
        backgroundColor: "#ff0053",
        borderRadius: "15.79px"
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
            color: "#f2f2f2"
          }}>{"2"}</span></p></div><div key={2} style={{
        position: "absolute",
        left: "132.37px",
        top: "47.37px",
        width: "211.73px",
        height: "47.67px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "left",
          lineHeight: "1.08",
          fontSize: "calc(20pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(20pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#ffffff"
          }}>{"\u0412\u0412\u041E\u0414\u041D\u042B\u0415"}</span></p></div><div key={3} style={{
        position: "absolute",
        left: "89.99px",
        top: "207.17px",
        width: "808.22px",
        height: "387.75px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            fontWeight: "700",
            color: "#ffffff"
          }}>{"\u041F\u0440\u0438\u0432\u0435\u0442, \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            fontWeight: "700",
            color: "#ffffff"
          }}>{"\u0445\u0430\u043A\u0430\u0442\u043E\u043D\u0430"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            fontWeight: "700",
            color: "#ffffff"
          }}>{"!"}</span><br /></p><p style={{
          textAlign: "left",
          lineHeight: "1.2",
          fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"\u042D\u0442\u0430 \u043F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u044F \u2014 \u0433\u043E\u0442\u043E\u0432\u0430\u044F \u043E\u0441\u043D\u043E\u0432\u0430 \u0434\u043B\u044F \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044F \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u044B. \u0412\u043D\u0443\u0442\u0440\u0438 \u2014 \u043F\u0440\u0438\u043C\u0435\u0440\u044B \u0441\u043B\u0430\u0439\u0434\u043E\u0432, \u043B\u043E\u0433\u043E\u0442\u0438\u043F\u044B, \u0448\u0440\u0438\u0444\u0442\u044B, \u0446\u0432\u0435\u0442\u0430, \u0438\u043A\u043E\u043D\u043A\u0438 \u0438 \u0440\u0430\u0437\u043B\u0438\u0447\u043D\u044B\u0435 \u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B."}</span><br /></p><p style={{
          textAlign: "left",
          lineHeight: "1.2",
          fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"\u041C\u043E\u0436\u0435\u0448\u044C \u0441\u043C\u0435\u043B\u043E \u0434\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u0434\u0438\u0437\u0430\u0439\u043D \u044D\u0442\u043E\u043C\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0443 \u0438 \u0441\u043E\u0441\u0440\u0435\u0434\u043E\u0442\u043E\u0447\u0438\u0442\u044C \u0441\u0432\u043E\u044E \u044D\u043D\u0435\u0440\u0433\u0438\u044E \u0438 \u0432\u0440\u0435\u043C\u044F \u043D\u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0432\u0430\u0436\u043D\u043E\u043C \u2014 \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0435 \u0438\u043D\u043D\u043E\u0432\u0430\u0446\u0438\u043E\u043D\u043D\u043E\u0433\u043E \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u0434\u043B\u044F \u0442\u0432\u043E\u0435\u0439 \u043F\u043E\u0431\u0435\u0434\u044B! "}</span></p><p style={{
          textAlign: "left",
          lineHeight: "1.2",
          fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"\xA0"}</span></p><p style={{
          textAlign: "left",
          lineHeight: "1.2",
          fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"\u0423\u0434\u0430\u0447\u0438! "}</span></p><p style={{
          lineHeight: "1.2",
          fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"\xA0"}</span></p></div><div key={4} style={{
        position: "absolute",
        left: "188.47px",
        top: "556.91px",
        width: "861.25px",
        height: "100.19px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(18.67pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><br /><br /></p></div></div></div>;
};
export default Slide2;
