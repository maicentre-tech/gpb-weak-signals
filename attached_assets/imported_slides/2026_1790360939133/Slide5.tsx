import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_5.png";
import img_bg from "./assets/images/image_3.png";
const Slide5: React.FC = () => {
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
  return <div id="slide-5" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-5" style={{
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
          }}>{"5"}</span></p></div><div key={1} style={{
        position: "absolute",
        left: "81.51px",
        top: "224.75px",
        width: "124.72px",
        height: "35.54px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            textTransform: "uppercase",
            fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
            fontWeight: "700",
            color: "#520977"
          }}>{"\u0428\u0440\u0438\u0444\u0442:"}</span></p></div><div key={2} style={{
        position: "absolute",
        left: "81.51px",
        top: "301.25px",
        width: "124.72px",
        height: "35.54px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            textTransform: "uppercase",
            fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
            fontWeight: "700",
            color: "#520977"
          }}>{"\u0426\u0412\u0415\u0422\u0410:"}</span></p></div><div key={3} style={{
        position: "absolute",
        left: "206.24px",
        top: "224.46px",
        width: "732.94px",
        height: "33.93px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(15pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(15pt * var(--pptx-font-scale, 1))"
          }}>{"Montserrat: "}</span><span style={{
            fontSize: "calc(15pt * var(--pptx-font-scale, 1))"
          }}>{" "}</span><span style={{
            textDecoration: "underline",
            fontSize: "calc(15pt * var(--pptx-font-scale, 1))"
          }}>{"https://fonts-"}</span><span style={{
            textDecoration: "underline",
            fontSize: "calc(15pt * var(--pptx-font-scale, 1))"
          }}>{"online.ru"}</span><span style={{
            textDecoration: "underline",
            fontSize: "calc(15pt * var(--pptx-font-scale, 1))"
          }}>{"/fonts/"}</span><span style={{
            textDecoration: "underline",
            fontSize: "calc(15pt * var(--pptx-font-scale, 1))"
          }}>{"montserrat"}</span></p></div><div key={4} style={{
        position: "absolute",
        left: "83.46px",
        top: "340.18px",
        width: "820.05px",
        height: "32.31px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))"
          }}>{"\u0430\u043A\u0446\u0435\u043D\u0442\u043D\u044B\u0435"}</span></p></div><div key={5} style={{
        position: "absolute",
        left: "83.46px",
        top: "497.13px",
        width: "820.05px",
        height: "32.31px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))"
          }}>{"\u0431\u0430\u0437\u043E\u0432\u044B\u0435"}</span></p></div><svg key={6} style={{
        position: "absolute",
        left: "89.48px",
        top: "286px",
        width: "1108.78px",
        height: "1px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="1108.78" y2="0" stroke="rgba(255, 0, 83, 0.3)" strokeWidth="2.67" /></svg><div key={7} style={{
        position: "absolute",
        left: "670.84px",
        top: "500.87px",
        width: "170.03px",
        height: "60.59px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(10.5pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontStyle: "italic",
            fontSize: "calc(10.5pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "500",
            color: "#520977"
          }}>{"\u0426\u0432\u0435\u0442\u043E\u0432\u0430\u044F \u0441\u0445\u0435\u043C\u0430 \u0443\u0436\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430 "}</span><br /><span style={{
            fontStyle: "italic",
            fontSize: "calc(10.5pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "500",
            color: "#520977"
          }}>{"\u0432 \u044D\u0442\u043E\u043C \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0435"}</span></p></div><div key={8} style={{
        position: "absolute",
        left: "846.45px",
        top: "501.33px",
        width: "177.76px",
        height: "125.16px",
        boxSizing: "border-box",
        borderRadius: "11.72px",
        overflow: "hidden"
      }}><img src={img_1} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 19" style={{
          position: "absolute",
          left: "-4.3px",
          top: "0px",
          width: "186.37px",
          height: "125.16px",
          maxWidth: "none"
        }} /></div><div key={9} style={{
        position: "absolute",
        left: "94.21px",
        top: "383.52px",
        width: "157.04px",
        height: "78.81px",
        boxSizing: "border-box",
        backgroundColor: "#ff0053",
        border: "1px solid #ffffff",
        borderRadius: "13.14px",
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
            color: "#ffffff"
          }}>{"HEX "}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"#"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"FF0053"}</span></p></div><div key={10} style={{
        position: "absolute",
        left: "274.21px",
        top: "383.52px",
        width: "159.1px",
        height: "78.81px",
        boxSizing: "border-box",
        backgroundColor: "#ffd6e3",
        border: "1px solid #ffffff",
        borderRadius: "13.14px",
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
            color: "#1c1d22"
          }}>{"HEX #FFD6E4"}</span></p></div><div key={11} style={{
        position: "absolute",
        left: "456.27px",
        top: "383.52px",
        width: "159.1px",
        height: "78.81px",
        boxSizing: "border-box",
        backgroundColor: "#8a83d1",
        border: "1px solid #ffffff",
        borderRadius: "13.14px",
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
            color: "#1c1d22"
          }}>{"HEX #8A83D1"}</span></p></div><div key={12} style={{
        position: "absolute",
        left: "638.33px",
        top: "383.52px",
        width: "159.1px",
        height: "78.81px",
        boxSizing: "border-box",
        backgroundColor: "#fc3777",
        border: "1px solid #ffffff",
        borderRadius: "13.14px",
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
            color: "#ffffff"
          }}>{"HEX #"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"FC3777"}</span></p></div><div key={13} style={{
        position: "absolute",
        left: "820.39px",
        top: "383.52px",
        width: "159.1px",
        height: "78.81px",
        boxSizing: "border-box",
        backgroundColor: "#2d1451",
        border: "1px solid #ffffff",
        borderRadius: "13.14px",
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
            color: "#ffffff"
          }}>{"HEX #"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"310F53"}</span></p></div><div key={14} style={{
        position: "absolute",
        left: "94.21px",
        top: "540.88px",
        width: "157.04px",
        height: "78.81px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        border: "1px solid #ffffff",
        borderRadius: "13.14px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.8",
          fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            color: "#1c1d22"
          }}>{"HEX "}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            color: "#1c1d22"
          }}>{"#"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            color: "#1c1d22"
          }}>{"FFFFFF"}</span></p></div><div key={15} style={{
        position: "absolute",
        left: "276.27px",
        top: "540.88px",
        width: "157.04px",
        height: "78.81px",
        boxSizing: "border-box",
        backgroundColor: "#1c1d22",
        border: "1px solid #ffffff",
        borderRadius: "13.14px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.8",
          fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"HEX"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            color: "#1c1d22"
          }}>{" "}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"#"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"1C1D22"}</span></p></div><div key={16} style={{
        position: "absolute",
        left: "998.22px",
        top: "383.52px",
        width: "159.1px",
        height: "78.81px",
        boxSizing: "border-box",
        backgroundColor: "#520977",
        border: "1px solid #ffffff",
        borderRadius: "13.14px",
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
            color: "#ffffff"
          }}>{"HEX #"}</span><span style={{
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"520978"}</span></p></div><div key={17} style={{
        position: "absolute",
        left: "99.5px",
        top: "42.83px",
        width: "309.7px",
        height: "65.19px",
        boxSizing: "border-box",
        backgroundColor: "#520977",
        borderRadius: "15.79px"
      }} /><div key={18} style={{
        position: "absolute",
        left: "132.37px",
        top: "47.37px",
        width: "244.6px",
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
          }}>{"\u041E\u0424\u041E\u0420\u041C\u041B\u0415\u041D\u0418\u0415"}</span></p></div></div></div>;
};
export default Slide5;
