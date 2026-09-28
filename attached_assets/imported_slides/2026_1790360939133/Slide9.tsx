import React, { useState, useEffect, useRef } from "react";
import img_bg from "./assets/images/image_29.png";
const Slide9: React.FC = () => {
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
  return <div id="slide-9" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-9" style={{
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
        left: "278.36px",
        top: "159.79px",
        width: "230.21px",
        height: "507.54px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        borderRadius: "22.61px"
      }} /><div key={1} style={{
        position: "absolute",
        left: "296.45px",
        top: "446.2px",
        width: "198.88px",
        height: "170.56px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u0420\u043E\u043B\u044C \u0432 \u043A\u043E\u043C\u0430\u043D\u0434\u0435"}</span></p><p style={{
          lineHeight: "1.2",
          fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u041D\u0438\u043A \u0432 \u043C\u0435\u0441\u0441\u0435\u043D\u0434\u0436\u0435\u0440\u0435"}</span></p><p style={{
          lineHeight: "1.2",
          fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430"}</span></p><p style={{
          lineHeight: "1.2",
          fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u041C\u0435\u0441\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u044B/\u0443\u0447\u0435\u0431\u044B"}</span></p></div><div key={2} style={{
        position: "absolute",
        left: "296.45px",
        top: "380.27px",
        width: "180.85px",
        height: "65.92px",
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
          }}>{"\u0418\u043C\u044F \u0424\u0430\u043C\u0438\u043B\u0438\u044F"}</span></p></div><div key={3} style={{
        position: "absolute",
        left: "520.39px",
        top: "159.79px",
        width: "230.21px",
        height: "507.54px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        borderRadius: "22.61px"
      }} /><div key={4} style={{
        position: "absolute",
        left: "538.48px",
        top: "446.2px",
        width: "198.88px",
        height: "170.56px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u0420\u043E\u043B\u044C \u0432 \u043A\u043E\u043C\u0430\u043D\u0434\u0435"}</span></p><p style={{
          lineHeight: "1.2",
          fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u041D\u0438\u043A \u0432 \u043C\u0435\u0441\u0441\u0435\u043D\u0434\u0436\u0435\u0440\u0435"}</span></p><p style={{
          lineHeight: "1.2",
          fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430"}</span></p><p style={{
          lineHeight: "1.2",
          fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u041C\u0435\u0441\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u044B/\u0443\u0447\u0435\u0431\u044B"}</span></p></div><div key={5} style={{
        position: "absolute",
        left: "538.48px",
        top: "380.27px",
        width: "180.85px",
        height: "65.92px",
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
          }}>{"\u0418\u043C\u044F \u0424\u0430\u043C\u0438\u043B\u0438\u044F"}</span></p></div><div key={6} style={{
        position: "absolute",
        left: "762.42px",
        top: "159.79px",
        width: "230.21px",
        height: "507.54px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        borderRadius: "22.61px"
      }} /><div key={7} style={{
        position: "absolute",
        left: "780.51px",
        top: "446.2px",
        width: "198.88px",
        height: "170.56px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u0420\u043E\u043B\u044C \u0432 \u043A\u043E\u043C\u0430\u043D\u0434\u0435"}</span></p><p style={{
          lineHeight: "1.2",
          fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u041D\u0438\u043A \u0432 \u043C\u0435\u0441\u0441\u0435\u043D\u0434\u0436\u0435\u0440\u0435"}</span></p><p style={{
          lineHeight: "1.2",
          fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430"}</span></p><p style={{
          lineHeight: "1.2",
          fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u041C\u0435\u0441\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u044B/\u0443\u0447\u0435\u0431\u044B"}</span></p></div><div key={8} style={{
        position: "absolute",
        left: "780.51px",
        top: "380.27px",
        width: "180.85px",
        height: "65.92px",
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
          }}>{"\u0418\u043C\u044F \u0424\u0430\u043C\u0438\u043B\u0438\u044F"}</span></p></div><div key={9} style={{
        position: "absolute",
        left: "1004.45px",
        top: "159.79px",
        width: "230.21px",
        height: "507.54px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        borderRadius: "22.61px"
      }} /><div key={10} style={{
        position: "absolute",
        left: "1022.53px",
        top: "446.2px",
        width: "198.88px",
        height: "170.56px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u0420\u043E\u043B\u044C \u0432 \u043A\u043E\u043C\u0430\u043D\u0434\u0435"}</span></p><p style={{
          lineHeight: "1.2",
          fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u041D\u0438\u043A \u0432 \u043C\u0435\u0441\u0441\u0435\u043D\u0434\u0436\u0435\u0440\u0435"}</span></p><p style={{
          lineHeight: "1.2",
          fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430"}</span></p><p style={{
          lineHeight: "1.2",
          fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u041C\u0435\u0441\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u044B/\u0443\u0447\u0435\u0431\u044B"}</span></p></div><div key={11} style={{
        position: "absolute",
        left: "1022.53px",
        top: "380.27px",
        width: "180.85px",
        height: "65.92px",
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
          }}>{"\u0418\u043C\u044F \u0424\u0430\u043C\u0438\u043B\u0438\u044F"}</span></p></div><div key={12} style={{
        position: "absolute",
        left: "36.33px",
        top: "159.79px",
        width: "230.21px",
        height: "507.54px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        borderRadius: "22.61px"
      }} /><div key={13} style={{
        position: "absolute",
        left: "36.33px",
        top: "34.07px",
        width: "414.98px",
        height: "65.19px",
        boxSizing: "border-box",
        backgroundColor: "#ff0053",
        borderRadius: "12.19px"
      }} /><div key={14} style={{
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
          }}>{"9"}</span></p></div><div key={15} style={{
        position: "absolute",
        left: "61.04px",
        top: "190.66px",
        width: "180.85px",
        height: "163.03px",
        boxSizing: "border-box"
      }} /><div key={16} style={{
        position: "absolute",
        left: "303.04px",
        top: "191.76px",
        width: "180.85px",
        height: "161.93px",
        boxSizing: "border-box"
      }} /><div key={17} style={{
        position: "absolute",
        left: "545.07px",
        top: "189.95px",
        width: "180.85px",
        height: "163.75px",
        boxSizing: "border-box"
      }} /><div key={18} style={{
        position: "absolute",
        left: "789.52px",
        top: "189.95px",
        width: "180.85px",
        height: "163.75px",
        boxSizing: "border-box"
      }} /><div key={19} style={{
        position: "absolute",
        left: "1029.13px",
        top: "189.95px",
        width: "180.85px",
        height: "163.75px",
        boxSizing: "border-box"
      }} /><div key={20} style={{
        position: "absolute",
        left: "54.42px",
        top: "47.22px",
        width: "1035.46px",
        height: "39.49px",
        boxSizing: "border-box"
      }} /><div key={21} style={{
        position: "absolute",
        left: "54.42px",
        top: "446.2px",
        width: "198.88px",
        height: "170.56px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "left",
          lineHeight: "1.08",
          textIndent: "-15.19px",
          paddingLeft: "15.19px",
          fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px",
            color: "#ff0053"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u0420\u043E\u043B\u044C \u0432 \u043A\u043E\u043C\u0430\u043D\u0434\u0435"}</span></p><p style={{
          textAlign: "left",
          lineHeight: "1.08",
          textIndent: "-15.19px",
          paddingLeft: "15.19px",
          fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px",
            color: "#ff0053"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u041D\u0438\u043A \u0432 \u043C\u0435\u0441\u0441\u0435\u043D\u0434\u0436\u0435\u0440\u0435"}</span></p><p style={{
          textAlign: "left",
          lineHeight: "1.08",
          textIndent: "-15.19px",
          paddingLeft: "15.19px",
          fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px",
            color: "#ff0053"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430"}</span></p><p style={{
          textAlign: "left",
          lineHeight: "1.08",
          textIndent: "-15.19px",
          paddingLeft: "15.19px",
          fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px",
            color: "#ff0053"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u041C\u0435\u0441\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u044B/\u0443\u0447\u0435\u0431\u044B"}</span></p></div><div key={22} style={{
        position: "absolute",
        left: "54.42px",
        top: "380.27px",
        width: "180.85px",
        height: "65.92px",
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
          }}>{"\u0418\u043C\u044F \u0424\u0430\u043C\u0438\u043B\u0438\u044F"}</span></p></div></div></div>;
};
export default Slide9;
