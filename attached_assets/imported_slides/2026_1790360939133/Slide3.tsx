import React, { useState, useEffect, useRef } from "react";
import img_bg from "./assets/images/image_3.png";
const Slide3: React.FC = () => {
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
  return <div id="slide-3" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-3" style={{
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
        top: "132.71px",
        width: "348.49px",
        height: "518.29px",
        boxSizing: "border-box",
        backgroundColor: "#753A93",
        borderRadius: "34.23px"
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
          }}>{"3"}</span></p></div><div key={2} style={{
        position: "absolute",
        left: "132.37px",
        top: "165.24px",
        width: "258.53px",
        height: "38.78px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        whiteSpace: "nowrap",
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
          }}>{"\u0422\u0438\u0442\u0443\u043B\u044C\u043D\u044B\u0439 \u0441\u043B\u0430\u0439\u0434 "}</span></p></div><div key={3} style={{
        position: "absolute",
        left: "132.37px",
        top: "244.42px",
        width: "290.97px",
        height: "136.79px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          marginBottom: "16pt",
          textIndent: "-30px",
          paddingLeft: "30px",
          fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
          marginTop: "0"
        }}><span style={{
            marginRight: "8px",
            color: "#FD0C50"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"\u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u044B "}</span></p><p style={{
          lineHeight: "1.2",
          marginBottom: "16pt",
          textIndent: "-30px",
          paddingLeft: "30px",
          fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
          marginTop: "0"
        }}><span style={{
            marginRight: "8px",
            color: "#FD0C50"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"\u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438"}</span></p><p style={{
          lineHeight: "1.2",
          textIndent: "-30px",
          paddingLeft: "30px",
          fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px",
            color: "#FD0C50"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"\u043B\u043E\u0433\u043E\u0442\u0438\u043F / \u043B\u043E\u0433\u043E\u0442\u0438\u043F\u044B \u043F\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0449\u0438\u043A\u0430 \u0437\u0430\u0434\u0430\u0447\u0438"}</span></p></div><div key={4} style={{
        position: "absolute",
        left: "129.84px",
        top: "581.96px",
        width: "321.46px",
        height: "49px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontStyle: "italic",
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#ffd6e3"
          }}>{"\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0431\u043B\u043E\u043A"}</span></p></div><div key={5} style={{
        position: "absolute",
        left: "129.84px",
        top: "543.77px",
        width: "290.97px",
        height: "51.7px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontStyle: "italic",
            fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
            color: "#ffd6e3"
          }}>{"\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439 \u0434\u043B\u044F \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044F \u0441\u043B\u0430\u0439\u0434 7"}</span></p></div><div key={6} style={{
        position: "absolute",
        left: "490.02px",
        top: "132.71px",
        width: "348.49px",
        height: "518.29px",
        boxSizing: "border-box",
        backgroundColor: "#753A93",
        borderRadius: "34.23px"
      }} /><div key={7} style={{
        position: "absolute",
        left: "523.11px",
        top: "165.24px",
        width: "282.94px",
        height: "67.86px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        whiteSpace: "nowrap",
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
          }}>{"\u0421\u043B\u0430\u0439\u0434\u044B \u043F\u0440\u043E \u0437\u0430\u0434\u0430\u0447\u0443 "}</span><br /><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            fontWeight: "700",
            color: "#ffffff"
          }}>{"\u0438 \u043A\u043E\u043C\u0430\u043D\u0434\u0443"}</span></p></div><div key={8} style={{
        position: "absolute",
        left: "526.43px",
        top: "244.42px",
        width: "290.97px",
        height: "284.89px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          marginBottom: "16pt",
          textIndent: "-30px",
          paddingLeft: "30px",
          fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
          marginTop: "0"
        }}><span style={{
            marginRight: "8px",
            color: "#FD0C50"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"\u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0441\u0443\u0442\u0438 \u0438 \u0443\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u0440\u0435\u0448\u0435\u043D\u0438\u044F"}</span></p><p style={{
          lineHeight: "1.2",
          marginBottom: "16pt",
          textIndent: "-30px",
          paddingLeft: "30px",
          fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
          marginTop: "0"
        }}><span style={{
            marginRight: "8px",
            color: "#FD0C50"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"\u043F\u043B\u0430\u043D \u043F\u043E \u0434\u0430\u043B\u044C\u043D\u0435\u0439\u0448\u0435\u043C\u0443 \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u044E \u0440\u0435\u0448\u0435\u043D\u0438\u044F"}</span></p><p style={{
          lineHeight: "1.2",
          marginBottom: "16pt",
          textIndent: "-30px",
          paddingLeft: "30px",
          fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
          marginTop: "0"
        }}><span style={{
            marginRight: "8px",
            color: "#FD0C50"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"\u0424\u0418\u041E \u0438 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0432\u0441\u0435\u0445 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432"}</span></p><p style={{
          lineHeight: "1.2",
          marginBottom: "16pt",
          textIndent: "-30px",
          paddingLeft: "30px",
          fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
          marginTop: "0"
        }}><span style={{
            marginRight: "8px",
            color: "#FD0C50"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"\u0440\u043E\u043B\u0438 \u0432 \u043A\u043E\u043C\u0430\u043D\u0434\u0435"}</span></p><p style={{
          lineHeight: "1.2",
          textIndent: "-30px",
          paddingLeft: "30px",
          fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px",
            color: "#FD0C50"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"\u0441\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u0438 \u0432\u044B\u0437\u043E\u0432\u044B \u0432\u043E \u0432\u0440\u0435\u043C\u044F \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u0437\u0430\u0434\u0430\u0447\u0438"}</span></p></div><div key={9} style={{
        position: "absolute",
        left: "520.58px",
        top: "581.96px",
        width: "321.46px",
        height: "49px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontStyle: "italic",
            fontSize: "calc(12pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#ffd6e3"
          }}>{"\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0431\u043B\u043E\u043A"}</span></p></div><div key={10} style={{
        position: "absolute",
        left: "523.11px",
        top: "541.65px",
        width: "290.97px",
        height: "51.7px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontStyle: "italic",
            fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
            color: "#ffd6e3"
          }}>{"\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439 \u0434\u043B\u044F \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044F \u0441\u043B\u0430\u0439\u0434\u044B 8-11"}</span></p></div><div key={11} style={{
        position: "absolute",
        left: "877.91px",
        top: "132.71px",
        width: "348.49px",
        height: "518.29px",
        boxSizing: "border-box",
        backgroundColor: "#976BAE",
        borderRadius: "34.23px"
      }} /><div key={12} style={{
        position: "absolute",
        left: "911px",
        top: "165.24px",
        width: "201.48px",
        height: "67.86px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        whiteSpace: "nowrap",
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
          }}>{"\u041F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u044F "}</span><br /><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            fontWeight: "700",
            color: "#ffffff"
          }}>{"\u0440\u0435\u0448\u0435\u043D\u0438\u044F"}</span></p></div><div key={13} style={{
        position: "absolute",
        left: "911px",
        top: "244.42px",
        width: "290.97px",
        height: "198.72px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          textIndent: "-30px",
          paddingLeft: "30px",
          fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px",
            color: "#FD0C50"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"\u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u043C\u0430\u044F \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 \u043F\u043E\u043B\u043D\u043E\u0439 \u043F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u0438 \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u043F\u0440\u0438\u0432\u0435\u0434\u0435\u043D\u0430 "}</span><br /><span style={{
            fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"\u043D\u0430 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u0441\u043B\u0430\u0439\u0434\u0435"}</span></p><p style={{
          lineHeight: "1.2",
          textIndent: "-30px",
          paddingLeft: "30px",
          fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px",
            color: "#FD0C50"
          }}>{"\u2022"}</span></p><p style={{
          lineHeight: "1.2",
          textIndent: "-30px",
          paddingLeft: "30px",
          fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            marginRight: "8px",
            color: "#FD0C50"
          }}>{"\u2022"}</span><span style={{
            fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"\u044D\u0442\u043E\u0442 \u0431\u043B\u043E\u043A \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D \u043F\u043E\u0441\u043B\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u043D\u044B\u0445 \u043E\u0431\u0449\u0438\u0445  \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u0441\u043B\u0430\u0439\u0434\u043E\u0432"}</span></p></div><div key={14} style={{
        position: "absolute",
        left: "911px",
        top: "541.65px",
        width: "290.97px",
        height: "51.7px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontStyle: "italic",
            fontSize: "calc(13pt * var(--pptx-font-scale, 1))",
            color: "#fed7e3"
          }}>{"\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439 \u0434\u043B\u044F \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044F \u0448\u0430\u0431\u043B\u043E\u043D\u044B \u043D\u0430 \u0441\u043B\u0430\u0439\u0434\u0430\u0445 12-29"}</span></p></div><div key={15} style={{
        position: "absolute",
        left: "99.5px",
        top: "42.83px",
        width: "540.5px",
        height: "65.19px",
        boxSizing: "border-box",
        backgroundColor: "#520977",
        borderRadius: "15.79px"
      }} /><div key={16} style={{
        position: "absolute",
        left: "132.37px",
        top: "47.37px",
        width: "478.53px",
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
          }}>{"\u0421\u041E\u0414\u0415\u0420\u0416\u0410\u041D\u0418\u0415 \u041F\u0420\u0415\u0417\u0415\u041D\u0422\u0410\u0426\u0418\u0418"}</span></p></div></div></div>;
};
export default Slide3;
