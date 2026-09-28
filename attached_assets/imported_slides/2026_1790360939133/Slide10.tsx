import React, { useState, useEffect, useRef } from "react";
import img_bg from "./assets/images/image_30.png";
const Slide10: React.FC = () => {
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
  return <div id="slide-10" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-10" style={{
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
        width: "414.98px",
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
            color: "#520977"
          }}>{"10"}</span></p></div><div key={2} style={{
        position: "absolute",
        left: "53.32px",
        top: "47.22px",
        width: "1035.46px",
        height: "39.49px",
        boxSizing: "border-box"
      }} /><div key={3} style={{
        position: "absolute",
        left: "56.02px",
        top: "168.22px",
        width: "464.65px",
        height: "98.09px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "left",
          lineHeight: "1.2",
          fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0438\u0442\u0435, \u043A\u0430\u043A \u0432\u044B \u0441\u043E\u0431\u0440\u0430\u043B\u0438\u0441\u044C, \u0443\u0447\u0430\u0441\u0442\u0432\u043E\u0432\u0430\u043B\u0438 \u043B\u0438 \u0432\u043C\u0435\u0441\u0442\u0435 \u0432 \u043F\u0440\u043E\u0448\u043B\u044B\u0445 \u0445\u0430\u043A\u0430\u0442\u043E\u043D\u0430\u0445 \u0438\u043B\u0438 \u043F\u0440\u043E\u0435\u043A\u0442\u0430\u0445, \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043D\u044B\u0435 \u0444\u0430\u043A\u0442\u044B \u043E \u043A\u043E\u043C\u0430\u043D\u0434\u0435."}</span></p></div><div key={4} style={{
        position: "absolute",
        left: "56.02px",
        top: "134.35px",
        width: "313.93px",
        height: "37.16px",
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
            fontWeight: "700",
            color: "#520977"
          }}>{"\u041A\u0440\u0430\u0442\u043A\u0430\u044F \u0438\u0441\u0442\u043E\u0440\u0438\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u044B:"}</span></p></div><div key={5} style={{
        position: "absolute",
        left: "56.02px",
        top: "539.55px",
        width: "768.37px",
        height: "110.8px",
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
          }}>{"\u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0438\u0442\u0435 \u043E \u0441\u0430\u043C\u044B\u0445 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043D\u044B\u0445 \u0438\u043B\u0438 \u0441\u043B\u043E\u0436\u043D\u044B\u0445 \u043C\u043E\u043C\u0435\u043D\u0442\u0430\u0445 \u0432 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435"}</span><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{" "}</span><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0438 \u043A\u0430\u043A \u043A\u043E\u043C\u0430\u043D\u0434\u0430 \u0441 \u043D\u0438\u043C\u0438 \u0441\u043F\u0440\u0430\u0432\u0438\u043B\u0430\u0441\u044C."}</span></p><p style={{
          lineHeight: "1.2",
          fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u0417\u0434\u0435\u0441\u044C \u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F, \u0432 \u0442\u043E\u043C \u0447\u0438\u0441\u043B\u0435, \u0438 \u043B\u0438\u0447\u043D\u044B\u043C\u0438 \u0438\u0441\u0442\u043E\u0440\u0438\u044F\u043C\u0438,"}</span><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{" "}</span><br /><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043F\u043E\u0432\u043B\u0438\u044F\u043B\u0438 \u043D\u0430 \u0445\u043E\u0434 \u0432\u0430\u0448\u0435\u0433\u043E \u0443\u0447\u0430\u0441\u0442\u0438\u044F \u0432 \u0445\u0430\u043A\u0430\u0442\u043E\u043D\u0435."}</span></p></div><div key={6} style={{
        position: "absolute",
        left: "56.02px",
        top: "479.94px",
        width: "675.98px",
        height: "66.04px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        ["--pptx-font-scale"]: "0.84",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.32",
          fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#520977"
          }}>{"\u0421 \u043A\u0430\u043A\u0438\u043C\u0438 \u043E\u0441\u043D\u043E\u0432\u043D\u044B\u043C\u0438 \u0441\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u044F\u043C\u0438 \u0438\u043B\u0438 \u0432\u044B\u0437\u043E\u0432\u0430\u043C\u0438 "}</span><br /><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#520977"
          }}>{"\u0432\u044B \u0441\u0442\u043E\u043B\u043A\u043D\u0443\u043B\u0438\u0441\u044C \u0438 \u043A\u0430\u043A \u0438\u0445 \u043F\u0440\u0435\u043E\u0434\u043E\u043B\u0435\u043B\u0438?"}</span></p></div><div key={7} style={{
        position: "absolute",
        left: "56.02px",
        top: "360px",
        width: "519.22px",
        height: "113.23px",
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
          }}>{"\u0427\u0442\u043E \u0432\u0430\u0441 \u0432\u0434\u043E\u0445\u043D\u043E\u0432\u0438\u043B\u043E \u0438\u043B\u0438 \u0437\u0430\u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043E\u0432\u0430\u043B\u043E \u0432 \u044D\u0442\u043E\u0439 \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0435?"}</span></p></div><div key={8} style={{
        position: "absolute",
        left: "56.02px",
        top: "304.47px",
        width: "591.06px",
        height: "55.53px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        ["--pptx-font-scale"]: "0.683",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#520977"
          }}>{"\u041F\u043E\u0447\u0435\u043C\u0443 \u0432\u044B \u0432\u044B\u0431\u0440\u0430\u043B\u0438 \u0438\u043C\u0435\u043D\u043D\u043E \u044D\u0442\u0443 \u0437\u0430\u0434\u0430\u0447\u0443 "}</span><br /><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#520977"
          }}>{"\u0438\u0437 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u043D\u044B\u0445 \u043D\u0430 \u0445\u0430\u043A\u0430\u0442\u043E\u043D\u0435?"}</span></p></div><svg key={9} style={{
        position: "absolute",
        left: "65.5px",
        top: "288.26px",
        width: "1179.33px",
        height: "1px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="1179.33" y2="0" stroke="#ff0053" strokeWidth="1.33" /></svg><svg key={10} style={{
        position: "absolute",
        left: "65.5px",
        top: "462.68px",
        width: "1179.33px",
        height: "1px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="1179.33" y2="0" stroke="#ff0053" strokeWidth="1.33" /></svg><svg key={11} style={{
        position: "absolute",
        left: "65.5px",
        top: "116.54px",
        width: "1179.33px",
        height: "1px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="1179.33" y2="0" stroke="#ff0053" strokeWidth="1.33" /></svg><div key={12} style={{
        position: "absolute",
        left: "1156.51px",
        top: "134.35px",
        width: "100.46px",
        height: "37.16px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#520977"
          }}>{"01"}</span></p></div><div key={13} style={{
        position: "absolute",
        left: "1156.51px",
        top: "304.47px",
        width: "97.7px",
        height: "55.53px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#520977"
          }}>{"02"}</span></p></div><div key={14} style={{
        position: "absolute",
        left: "1156.51px",
        top: "479.94px",
        width: "97.7px",
        height: "59.61px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "right",
          lineHeight: "1.2",
          fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#520977"
          }}>{"03"}</span></p></div></div></div>;
};
export default Slide10;
