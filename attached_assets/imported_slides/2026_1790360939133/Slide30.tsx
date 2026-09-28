import React, { useState, useEffect, useRef } from "react";
import img_bg from "./assets/images/image_29.png";
const Slide30: React.FC = () => {
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
  return <div id="slide-30" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-30" style={{
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
        left: "780.47px",
        top: "150.73px",
        width: "523.5px",
        height: "48.47px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(24pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            textDecoration: "underline",
            fontSize: "calc(24pt * var(--pptx-font-scale, 1))",
            color: "#E4EAE9"
          }}>{"\u041F\u043E\u043C\u043E\u0436\u0435\u0442 \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0446\u0432\u0435\u0442 "}</span></p></div><div key={1} style={{
        position: "absolute",
        left: "47.12px",
        top: "274.56px",
        width: "506.68px",
        height: "87.24px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(24pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            textDecoration: "underline",
            fontSize: "calc(24pt * var(--pptx-font-scale, 1))",
            color: "#E4EAE9"
          }}>{"\u041F\u043E\u043C\u043E\u0436\u0435\u0442 \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 "}</span></p></div><div key={2} style={{
        position: "absolute",
        left: "780.47px",
        top: "427.43px",
        width: "523.5px",
        height: "48.47px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(24pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            textDecoration: "underline",
            fontSize: "calc(24pt * var(--pptx-font-scale, 1))",
            color: "#E4EAE9"
          }}>{"\u0422\u0443\u0442 \u0442\u044B \u043D\u0430\u0439\u0434\u0435\u0448\u044C \u0438\u043A\u043E\u043D\u043A\u0438"}</span></p></div><div key={3} style={{
        position: "absolute",
        left: "48.44px",
        top: "556.44px",
        width: "476.94px",
        height: "87.24px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(24pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            textDecoration: "underline",
            fontSize: "calc(24pt * var(--pptx-font-scale, 1))",
            color: "#E4EAE9"
          }}>{"\u0413\u043E\u0440\u044F\u0447\u0438\u0435 \u043A\u043B\u0430\u0432\u0438\u0448\u0438 "}</span><span style={{
            textDecoration: "underline",
            fontSize: "calc(24pt * var(--pptx-font-scale, 1))",
            color: "#E4EAE9"
          }}>{"PowerPoint"}</span></p></div><div key={4} style={{
        position: "absolute",
        left: "64.21px",
        top: "138.21px",
        width: "562.91px",
        height: "80.64px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        border: "1.33px solid #ffd6e3",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontSize: "calc(18.67pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            textDecoration: "underline",
            fontSize: "calc(18.67pt * var(--pptx-font-scale, 1))",
            color: "#F92571"
          }}>{"https://"}</span><span style={{
            textDecoration: "underline",
            fontSize: "calc(18.67pt * var(--pptx-font-scale, 1))",
            color: "#F92571"
          }}>{"colorscheme.ru"}</span><span style={{
            textDecoration: "underline",
            fontSize: "calc(18.67pt * var(--pptx-font-scale, 1))",
            color: "#F92571"
          }}>{"/"}</span></p></div><svg key={5} viewBox="0 0 114.62 78.73" preserveAspectRatio="none" style={{
        position: "absolute",
        left: "640px",
        top: "138.21px",
        width: "114.62px",
        height: "78.73px",
        overflow: "visible"
      }}><path d="M 0 0 L 78.58 0.86 L 114.62 39.37 L 83.03 77.87 L 0 78.73 C 0.11 64.98 0.22 51.23 0.33 37.47 C 0.22 24.98 0.11 12.49 0 0 Z" fill="none" stroke="#ffd6e3" strokeWidth={1.33} strokeLinejoin="round" /></svg><div key={6} style={{
        position: "absolute",
        left: "652.05px",
        top: "267.78px",
        width: "580.83px",
        height: "80.64px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        border: "1.33px solid #ffd6e3",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontSize: "calc(18.67pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            textDecoration: "underline",
            fontSize: "calc(18.67pt * var(--pptx-font-scale, 1))",
            color: "#F92571"
          }}>{"https://"}</span><span style={{
            textDecoration: "underline",
            fontSize: "calc(18.67pt * var(--pptx-font-scale, 1))",
            color: "#F92571"
          }}>{"www.neurascapes.com"}</span><span style={{
            textDecoration: "underline",
            fontSize: "calc(18.67pt * var(--pptx-font-scale, 1))",
            color: "#F92571"
          }}>{"/"}</span></p></div><svg key={7} viewBox="0 0 114.62 80.64" preserveAspectRatio="none" style={{
        position: "absolute",
        left: "525.38px",
        top: "267.78px",
        width: "114.62px",
        height: "80.64px",
        overflow: "visible",
        transform: "scaleX(-1)"
      }}><path d="M 0 0 L 78.58 0.88 L 114.62 40.32 L 83.03 79.76 L 0 80.64 C 0.11 66.55 0.22 52.47 0.33 38.38 C 0.22 25.59 0.11 12.79 0 0 Z" fill="none" stroke="#ffd6e3" strokeWidth={1.33} strokeLinejoin="round" /></svg><div key={8} style={{
        position: "absolute",
        left: "64.21px",
        top: "412.96px",
        width: "562.91px",
        height: "80.64px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        border: "1.33px solid #ffd6e3",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontSize: "calc(18.67pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><a href="https://flaticon.com.ru/" style={{
            fontSize: "calc(18.67pt * var(--pptx-font-scale, 1))",
            color: "#F92571"
          }}>{"https://www.flaticon.com/"}</a></p></div><svg key={9} viewBox="0 0 114.62 80.64" preserveAspectRatio="none" style={{
        position: "absolute",
        left: "640px",
        top: "412.96px",
        width: "114.62px",
        height: "80.64px",
        overflow: "visible"
      }}><path d="M 0 0 L 78.58 0.88 L 114.62 40.32 L 83.03 79.76 L 0 80.64 C 0.11 66.55 0.22 52.47 0.33 38.38 C 0.22 25.59 0.11 12.79 0 0 Z" fill="none" stroke="#ffd6e3" strokeWidth={1.33} strokeLinejoin="round" /></svg><div key={10} style={{
        position: "absolute",
        left: "652.05px",
        top: "551.25px",
        width: "580.83px",
        height: "80.64px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        border: "1.33px solid #ffd6e3",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><a href="https://nice-slides.ru/powerpoint/lessons/quickstart/\u0433\u043E\u0440\u044F\u0447\u0438\u0435-\u043A\u043B\u0430\u0432\u0438\u0448\u0438-powerpoint/" style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            color: "#F92571"
          }}>{"https://nice-"}</a><a href="https://nice-slides.ru/powerpoint/lessons/quickstart/\u0433\u043E\u0440\u044F\u0447\u0438\u0435-\u043A\u043B\u0430\u0432\u0438\u0448\u0438-powerpoint/" style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            color: "#F92571"
          }}>{"slides.ru"}</a><a href="https://nice-slides.ru/powerpoint/lessons/quickstart/\u0433\u043E\u0440\u044F\u0447\u0438\u0435-\u043A\u043B\u0430\u0432\u0438\u0448\u0438-powerpoint/" style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            color: "#F92571"
          }}>{"/"}</a><a href="https://nice-slides.ru/powerpoint/lessons/quickstart/\u0433\u043E\u0440\u044F\u0447\u0438\u0435-\u043A\u043B\u0430\u0432\u0438\u0448\u0438-powerpoint/" style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            color: "#F92571"
          }}>{"powerpoint"}</a><a href="https://nice-slides.ru/powerpoint/lessons/quickstart/\u0433\u043E\u0440\u044F\u0447\u0438\u0435-\u043A\u043B\u0430\u0432\u0438\u0448\u0438-powerpoint/" style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            color: "#F92571"
          }}>{"/lessons/"}</a><a href="https://nice-slides.ru/powerpoint/lessons/quickstart/\u0433\u043E\u0440\u044F\u0447\u0438\u0435-\u043A\u043B\u0430\u0432\u0438\u0448\u0438-powerpoint/" style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            color: "#F92571"
          }}>{"quickstart"}</a><a href="https://nice-slides.ru/powerpoint/lessons/quickstart/\u0433\u043E\u0440\u044F\u0447\u0438\u0435-\u043A\u043B\u0430\u0432\u0438\u0448\u0438-powerpoint/" style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            color: "#F92571"
          }}>{"/"}</a><a href="https://nice-slides.ru/powerpoint/lessons/quickstart/\u0433\u043E\u0440\u044F\u0447\u0438\u0435-\u043A\u043B\u0430\u0432\u0438\u0448\u0438-powerpoint/" style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            color: "#F92571"
          }}>{"\u0433\u043E\u0440\u044F\u0447\u0438\u0435-\u043A\u043B\u0430\u0432\u0438\u0448\u0438-"}</a><a href="https://nice-slides.ru/powerpoint/lessons/quickstart/\u0433\u043E\u0440\u044F\u0447\u0438\u0435-\u043A\u043B\u0430\u0432\u0438\u0448\u0438-powerpoint/" style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            color: "#F92571"
          }}>{"powerpoint"}</a><a href="https://nice-slides.ru/powerpoint/lessons/quickstart/\u0433\u043E\u0440\u044F\u0447\u0438\u0435-\u043A\u043B\u0430\u0432\u0438\u0448\u0438-powerpoint/" style={{
            fontSize: "calc(14pt * var(--pptx-font-scale, 1))",
            color: "#F92571"
          }}>{"/"}</a></p></div><svg key={11} viewBox="0 0 114.62 80.64" preserveAspectRatio="none" style={{
        position: "absolute",
        left: "525.38px",
        top: "551.25px",
        width: "114.62px",
        height: "80.64px",
        overflow: "visible",
        transform: "scaleX(-1)"
      }}><path d="M 0 0 L 78.58 0.88 L 114.62 40.32 L 83.03 79.76 L 0 80.64 C 0.11 66.55 0.22 52.47 0.33 38.38 C 0.22 25.59 0.11 12.79 0 0 Z" fill="none" stroke="#ffd6e3" strokeWidth={1.33} strokeLinejoin="round" /></svg><div key={12} style={{
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
          }}>{"30"}</span></p></div><div key={13} style={{
        position: "absolute",
        left: "55.4px",
        top: "42.99px",
        width: "635.67px",
        height: "39.5px",
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
          }}>{"\u041F\u043E\u043B\u0435\u0437\u043D\u044B\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B"}</span></p></div></div></div>;
};
export default Slide30;
