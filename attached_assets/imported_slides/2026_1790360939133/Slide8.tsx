import React, { useState, useEffect, useRef } from "react";
import img_bg from "./assets/images/image_3.png";
const Slide8: React.FC = () => {
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
  return <div id="slide-8" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-8" style={{
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
        top: "312px",
        width: "677.83px",
        height: "408px",
        boxSizing: "border-box",
        backgroundColor: "rgba(220, 206, 228, 0.5)"
      }} /><div key={1} style={{
        position: "absolute",
        left: "0px",
        top: "35.2px",
        width: "677.83px",
        height: "312px",
        boxSizing: "border-box"
      }} /><div key={2} style={{
        position: "absolute",
        left: "716px",
        top: "241.8px",
        width: "519.22px",
        height: "70.2px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#520977"
          }}>{"\u041A\u0440\u0430\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u044F:"}</span></p></div><div key={3} style={{
        position: "absolute",
        left: "717.75px",
        top: "511.92px",
        width: "519.22px",
        height: "93.44px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u0427\u0442\u043E \u0434\u0435\u043B\u0430\u0435\u0442 \u0432\u0430\u0448\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u0443\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u043C \u0438\u043B\u0438 \u0438\u043D\u043D\u043E\u0432\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u043C?"}</span></p></div><div key={4} style={{
        position: "absolute",
        left: "35.17px",
        top: "407.66px",
        width: "591.06px",
        height: "251.87px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.44",
          fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#000000"
          }}>{"\u041A\u0430\u043F\u0438\u0442\u0430\u043D: "}</span><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u0424\u0418\u041E, \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C"}</span></p><p style={{
          lineHeight: "1.44",
          fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#000000"
          }}>{"\u041A\u043E\u043B-\u0432\u043E \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432: "}</span><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"__ \u0447\u0435\u043B\u043E\u0432\u0435\u043A"}</span></p><p style={{
          lineHeight: "1.44",
          fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#000000"
          }}>{"\u041A\u0440\u0430\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435: "}</span></p><p style={{
          lineHeight: "1.44",
          fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px"
          }}>{"-"}</span><span style={{
            fontStyle: "italic",
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u043A\u0430\u043A \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043B\u0430\u0441\u044C \u043A\u043E\u043C\u0430\u043D\u0434\u0430? "}</span></p><p style={{
          lineHeight: "1.44",
          fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px"
          }}>{"-"}</span><span style={{
            fontStyle: "italic",
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u043C\u0435\u0441\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u044B/\u0443\u0447\u0435\u0431\u044B \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432?"}</span></p><p style={{
          lineHeight: "1.44",
          fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#000000"
          }}>{"\u0413\u043E\u0440\u043E\u0434 \u0438 \u0440\u0435\u0433\u0438\u043E\u043D:"}</span></p></div><div key={5} style={{
        position: "absolute",
        left: "35.17px",
        top: "365.86px",
        width: "313.93px",
        height: "37.16px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#520977"
          }}>{"\u041E \u043A\u043E\u043C\u0430\u043D\u0434\u0435"}</span></p></div><div key={6} style={{
        position: "absolute",
        left: "716px",
        top: "109.11px",
        width: "381.81px",
        height: "106.58px",
        boxSizing: "border-box"
      }} /><svg key={7} style={{
        position: "absolute",
        left: "722.39px",
        top: "235.17px",
        width: "512.84px",
        height: "1px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="512.84" y2="0" stroke="#520977" strokeWidth="1.33" /></svg><svg key={8} style={{
        position: "absolute",
        left: "724.13px",
        top: "465.92px",
        width: "512.84px",
        height: "1px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="512.84" y2="0" stroke="#520977" strokeWidth="1.33" /></svg><svg key={9} style={{
        position: "absolute",
        left: "41.56px",
        top: "362.06px",
        width: "598.44px",
        height: "1px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="598.44" y2="0" stroke="#520977" strokeWidth="1.33" /></svg><div key={10} style={{
        position: "absolute",
        left: "716px",
        top: "476.82px",
        width: "519.22px",
        height: "70.2px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#520977"
          }}>{"\u0423\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0440\u0435\u0448\u0435\u043D\u0438\u044F:"}</span></p></div><div key={11} style={{
        position: "absolute",
        left: "714.75px",
        top: "275.06px",
        width: "519.22px",
        height: "93.44px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u0412 \u0447\u0435\u043C \u0441\u0443\u0442\u044C \u0432\u0430\u0448\u0435\u0433\u043E \u0440\u0435\u0448\u0435\u043D\u0438\u044F"}</span></p></div><div key={12} style={{
        position: "absolute",
        left: "1198.27px",
        top: "667.33px",
        width: "58.7px",
        height: "38.33px",
        boxSizing: "border-box",
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
          }}>{"8"}</span></p></div></div></div>;
};
export default Slide8;
