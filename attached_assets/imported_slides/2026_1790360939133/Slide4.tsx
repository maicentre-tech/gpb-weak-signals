import React, { useState, useEffect, useRef } from "react";
import img_bg from "./assets/images/image_4.png";
const Slide4: React.FC = () => {
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
  return <div id="slide-4" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-4" style={{
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
          }}>{"4"}</span></p></div><div key={1} style={{
        position: "absolute",
        left: "160.48px",
        top: "278.2px",
        width: "190.8px",
        height: "85.69px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "left",
          lineHeight: "1.08",
          fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u044F"}</span></p></div><div key={2} style={{
        position: "absolute",
        left: "431.59px",
        top: "278.2px",
        width: "194.32px",
        height: "81.47px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "left",
          lineHeight: "1.08",
          fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u041C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u0430\u044F \u0447\u0430\u0441\u0442\u044C \u0440\u0435\u0448\u0435\u043D\u0438\u044F"}</span></p></div><div key={3} style={{
        position: "absolute",
        left: "702.7px",
        top: "278.2px",
        width: "192.18px",
        height: "85.69px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "left",
          lineHeight: "1.08",
          fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u0411\u0438\u0437\u043D\u0435\u0441\u043E\u0432\u0430\u044F \u0441\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u044E\u0449\u0430\u044F \u0440\u0435\u0448\u0435\u043D\u0438\u044F"}</span></p></div><div key={4} style={{
        position: "absolute",
        left: "160.48px",
        top: "499.44px",
        width: "190.8px",
        height: "84.05px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "left",
          lineHeight: "1.08",
          fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u0422\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043F\u0440\u043E\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0440\u0435\u0448\u0435\u043D\u0438\u044F"}</span></p></div><div key={5} style={{
        position: "absolute",
        left: "428.15px",
        top: "499.44px",
        width: "197.77px",
        height: "84.05px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "left",
          lineHeight: "1.08",
          fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u0423\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0440\u0435\u0448\u0435\u043D\u0438\u044F"}</span></p></div><div key={6} style={{
        position: "absolute",
        left: "699.13px",
        top: "499.44px",
        width: "195.75px",
        height: "84.05px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        ["--pptx-font-scale"]: "0.969",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u041F\u043B\u0430\u043D\u044B "}</span><br /><span style={{
            fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#000000"
          }}>{"\u043F\u043E \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u044E \u0440\u0435\u0448\u0435\u043D\u0438\u044F"}</span></p></div><div key={7} style={{
        position: "absolute",
        left: "161.93px",
        top: "204.23px",
        width: "180.39px",
        height: "67.27px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(36pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(36pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#ff0053"
          }}>{"01"}</span></p></div><div key={8} style={{
        position: "absolute",
        left: "431.59px",
        top: "204.23px",
        width: "180.39px",
        height: "67.27px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(36pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(36pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#ff0053"
          }}>{"02"}</span></p></div><div key={9} style={{
        position: "absolute",
        left: "705.31px",
        top: "204.23px",
        width: "180.39px",
        height: "67.27px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(36pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(36pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#ff0053"
          }}>{"03"}</span></p></div><div key={10} style={{
        position: "absolute",
        left: "161.93px",
        top: "425.32px",
        width: "180.39px",
        height: "67.27px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(36pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(36pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#ff0053"
          }}>{"04"}</span></p></div><div key={11} style={{
        position: "absolute",
        left: "431.59px",
        top: "425.32px",
        width: "180.39px",
        height: "67.27px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(36pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(36pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#ff0053"
          }}>{"05"}</span></p></div><div key={12} style={{
        position: "absolute",
        left: "705.31px",
        top: "425.32px",
        width: "180.39px",
        height: "67.27px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(36pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(36pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#ff0053"
          }}>{"06"}</span></p></div><div key={13} style={{
        position: "absolute",
        left: "132.37px",
        top: "124.58px",
        width: "417.6px",
        height: "47.14px",
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
            color: "#000000"
          }}>{"\u0414\u043B\u044F \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432\u044B\u0445 \u0440\u0435\u0448\u0435\u043D\u0438\u0439"}</span></p></div><div key={14} style={{
        position: "absolute",
        left: "409.91px",
        top: "188.29px",
        width: "247.78px",
        height: "197px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        border: "1.33px solid #000000",
        borderRadius: "19.35px"
      }} /><div key={15} style={{
        position: "absolute",
        left: "682.35px",
        top: "188.29px",
        width: "247.78px",
        height: "197px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        border: "1.33px solid #ff0053",
        borderRadius: "19.35px"
      }} /><div key={16} style={{
        position: "absolute",
        left: "141.37px",
        top: "188.29px",
        width: "247.78px",
        height: "197px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        border: "1.33px solid #000000",
        borderRadius: "19.35px"
      }} /><div key={17} style={{
        position: "absolute",
        left: "409.91px",
        top: "403.64px",
        width: "247.78px",
        height: "197px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        border: "1.33px solid #000000",
        borderRadius: "19.35px"
      }} /><div key={18} style={{
        position: "absolute",
        left: "682.35px",
        top: "403.64px",
        width: "247.78px",
        height: "197px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        border: "1.33px solid #000000",
        borderRadius: "19.35px"
      }} /><div key={19} style={{
        position: "absolute",
        left: "141.37px",
        top: "403.64px",
        width: "247.78px",
        height: "197px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        border: "1.33px solid #ff0053",
        borderRadius: "19.35px"
      }} /><div key={20} style={{
        position: "absolute",
        left: "99.5px",
        top: "42.83px",
        width: "772.9px",
        height: "65.19px",
        boxSizing: "border-box",
        backgroundColor: "#520977",
        borderRadius: "15.79px"
      }} /><div key={21} style={{
        position: "absolute",
        left: "132.37px",
        top: "47.37px",
        width: "762.5px",
        height: "47.67px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(20pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(20pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#ffffff"
          }}>{"\u0420\u0415\u041A\u041E\u041C\u0415\u041D\u0414\u0423\u0415\u041C\u0410\u042F \u0421\u0422\u0420\u0423\u041A\u0422\u0423\u0420\u0410 \u041F\u0420\u0415\u0417\u0415\u041D\u0422\u0410\u0426\u0418\u0418"}</span></p></div></div></div>;
};
export default Slide4;
