import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_256.png";
import img_2 from "./assets/images/image_257.png";
import img_3 from "./assets/images/image_258.png";
import img_4 from "./assets/images/image_259.png";
import img_5 from "./assets/images/image_260.png";
import img_6 from "./assets/images/image_261.png";
import img_7 from "./assets/images/image_262.png";
import img_8 from "./assets/images/image_263.png";
import img_9 from "./assets/images/image_264.png";
import img_10 from "./assets/images/image_265.png";
import img_11 from "./assets/images/image_266.png";
import img_12 from "./assets/images/image_267.png";
import img_13 from "./assets/images/image_268.png";
import img_14 from "./assets/images/image_269.png";
import img_15 from "./assets/images/image_270.png";
import img_16 from "./assets/images/image_271.png";
import img_17 from "./assets/images/image_272.png";
import img_18 from "./assets/images/image_273.png";
import img_19 from "./assets/images/image_274.png";
import img_20 from "./assets/images/image_275.png";
import img_21 from "./assets/images/image_276.png";
import img_22 from "./assets/images/image_277.png";
import img_23 from "./assets/images/image_278.png";
import img_24 from "./assets/images/image_279.png";
import img_25 from "./assets/images/image_280.png";
import img_26 from "./assets/images/image_281.png";
import img_27 from "./assets/images/image_282.png";
import img_28 from "./assets/images/image_283.png";
import img_29 from "./assets/images/image_284.png";
import img_30 from "./assets/images/image_285.png";
import img_31 from "./assets/images/image_286.png";
import img_32 from "./assets/images/image_287.png";
import img_33 from "./assets/images/image_288.png";
import img_34 from "./assets/images/image_289.png";
import img_35 from "./assets/images/image_290.png";
import img_36 from "./assets/images/image_291.png";
import img_37 from "./assets/images/image_292.png";
import img_38 from "./assets/images/image_293.png";
import img_39 from "./assets/images/image_294.png";
import img_40 from "./assets/images/image_295.png";
import img_41 from "./assets/images/image_296.png";
import img_42 from "./assets/images/image_297.png";
import img_43 from "./assets/images/image_298.png";
import img_44 from "./assets/images/image_299.png";
import img_45 from "./assets/images/image_300.png";
import img_46 from "./assets/images/image_301.png";
import img_47 from "./assets/images/image_302.png";
import img_48 from "./assets/images/image_303.png";
import img_49 from "./assets/images/image_304.png";
import img_50 from "./assets/images/image_305.png";
import img_51 from "./assets/images/image_306.png";
import img_52 from "./assets/images/image_307.png";
import img_53 from "./assets/images/image_308.png";
import img_54 from "./assets/images/image_309.png";
import img_55 from "./assets/images/image_310.png";
import img_56 from "./assets/images/image_311.png";
import img_57 from "./assets/images/image_312.png";
import img_58 from "./assets/images/image_313.png";
import img_59 from "./assets/images/image_314.png";
import img_60 from "./assets/images/image_315.png";
import img_61 from "./assets/images/image_316.png";
import img_62 from "./assets/images/image_317.png";
import img_63 from "./assets/images/image_318.png";
import img_64 from "./assets/images/image_319.png";
import img_65 from "./assets/images/image_320.png";
import img_66 from "./assets/images/image_321.png";
import img_67 from "./assets/images/image_322.png";
import img_68 from "./assets/images/image_323.png";
import img_69 from "./assets/images/image_324.png";
import img_70 from "./assets/images/image_325.png";
import img_71 from "./assets/images/image_326.png";
import img_72 from "./assets/images/image_327.png";
import img_73 from "./assets/images/image_328.png";
import img_74 from "./assets/images/image_329.png";
import img_75 from "./assets/images/image_330.png";
import img_76 from "./assets/images/image_331.png";
import img_77 from "./assets/images/image_332.png";
import img_78 from "./assets/images/image_333.png";
import img_79 from "./assets/images/image_334.png";
import img_80 from "./assets/images/image_335.png";
import img_81 from "./assets/images/image_336.png";
import img_82 from "./assets/images/image_337.png";
import img_83 from "./assets/images/image_338.png";
import img_84 from "./assets/images/image_339.png";
import img_85 from "./assets/images/image_340.png";
import img_86 from "./assets/images/image_341.png";
import img_87 from "./assets/images/image_342.png";
import img_88 from "./assets/images/image_343.png";
import img_89 from "./assets/images/image_344.png";
import img_90 from "./assets/images/image_345.png";
import img_91 from "./assets/images/image_346.png";
import img_92 from "./assets/images/image_347.png";
import img_93 from "./assets/images/image_348.png";
import img_94 from "./assets/images/image_349.png";
import img_95 from "./assets/images/image_350.png";
import img_96 from "./assets/images/image_351.png";
import img_97 from "./assets/images/image_352.png";
import img_98 from "./assets/images/image_353.png";
import img_99 from "./assets/images/image_354.png";
import img_100 from "./assets/images/image_355.png";
import img_101 from "./assets/images/image_356.png";
import img_102 from "./assets/images/image_357.png";
import img_103 from "./assets/images/image_358.png";
import img_104 from "./assets/images/image_359.png";
import img_105 from "./assets/images/image_360.png";
import img_106 from "./assets/images/image_361.png";
import img_107 from "./assets/images/image_362.png";
import img_bg from "./assets/images/image_29.png";
const Slide33: React.FC = () => {
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
  return <div id="slide-33" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-33" style={{
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
        left: "527.29px",
        top: "131.82px",
        width: "265.53px",
        height: "35.54px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#E4EAE9"
          }}>{"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438"}</span></p></div><div key={1} style={{
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
          }}>{"33"}</span></p></div><img key={2} src={img_1} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 4" style={{
        position: "absolute",
        left: "1110.01px",
        top: "173.2px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={3} src={img_2} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 6" style={{
        position: "absolute",
        left: "766.2px",
        top: "173.2px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={4} src={img_3} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 8" style={{
        position: "absolute",
        left: "176.8px",
        top: "173.2px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={5} src={img_4} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 10" style={{
        position: "absolute",
        left: "962.66px",
        top: "173.2px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={6} src={img_5} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 12" style={{
        position: "absolute",
        left: "471.5px",
        top: "173.2px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={7} src={img_6} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 14" style={{
        position: "absolute",
        left: "569.73px",
        top: "173.2px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={8} src={img_7} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 16" style={{
        position: "absolute",
        left: "717.08px",
        top: "173.2px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={9} src={img_8} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 18" style={{
        position: "absolute",
        left: "667.96px",
        top: "173.2px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={10} src={img_9} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 20" style={{
        position: "absolute",
        left: "1060.89px",
        top: "173.2px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={11} src={img_10} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 22" style={{
        position: "absolute",
        left: "618.85px",
        top: "173.2px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={12} src={img_11} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 24" style={{
        position: "absolute",
        left: "913.54px",
        top: "173.2px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={13} src={img_12} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 26" style={{
        position: "absolute",
        left: "520.62px",
        top: "173.2px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={14} src={img_13} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 28" style={{
        position: "absolute",
        left: "422.38px",
        top: "173.2px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={15} src={img_14} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 30" style={{
        position: "absolute",
        left: "815.31px",
        top: "173.2px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={16} src={img_15} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 32" style={{
        position: "absolute",
        left: "373.27px",
        top: "173.2px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={17} src={img_16} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 34" style={{
        position: "absolute",
        left: "324.15px",
        top: "173.2px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={18} src={img_17} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 36" style={{
        position: "absolute",
        left: "864.43px",
        top: "173.2px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={19} src={img_18} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 38" style={{
        position: "absolute",
        left: "1011.78px",
        top: "173.2px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={20} src={img_19} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 40" style={{
        position: "absolute",
        left: "275.04px",
        top: "173.2px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={21} src={img_20} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 42" style={{
        position: "absolute",
        left: "225.92px",
        top: "173.2px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={22} src={img_21} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 44" style={{
        position: "absolute",
        left: "1102.81px",
        top: "376.11px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={23} src={img_22} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 46" style={{
        position: "absolute",
        left: "1041.03px",
        top: "376.11px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={24} src={img_23} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 48" style={{
        position: "absolute",
        left: "979.25px",
        top: "376.11px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={25} src={img_24} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 50" style={{
        position: "absolute",
        left: "917.47px",
        top: "376.11px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={26} src={img_25} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 52" style={{
        position: "absolute",
        left: "855.69px",
        top: "376.11px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={27} src={img_26} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 54" style={{
        position: "absolute",
        left: "793.91px",
        top: "376.11px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={28} src={img_27} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 56" style={{
        position: "absolute",
        left: "732.13px",
        top: "376.11px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={29} src={img_28} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 58" style={{
        position: "absolute",
        left: "670.35px",
        top: "376.11px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={30} src={img_29} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 60" style={{
        position: "absolute",
        left: "608.57px",
        top: "376.11px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={31} src={img_30} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 62" style={{
        position: "absolute",
        left: "546.79px",
        top: "376.11px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={32} src={img_31} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1376" style={{
        position: "absolute",
        left: "485.01px",
        top: "376.11px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={33} src={img_32} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1378" style={{
        position: "absolute",
        left: "423.23px",
        top: "376.11px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={34} src={img_33} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1380" style={{
        position: "absolute",
        left: "361.45px",
        top: "376.11px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={35} src={img_34} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1382" style={{
        position: "absolute",
        left: "299.66px",
        top: "376.11px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={36} src={img_35} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1384" style={{
        position: "absolute",
        left: "237.88px",
        top: "376.11px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={37} src={img_36} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1386" style={{
        position: "absolute",
        left: "176.1px",
        top: "376.11px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><div key={38} style={{
        position: "absolute",
        left: "527.29px",
        top: "331.45px",
        width: "265.53px",
        height: "35.54px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#E4EAE9"
          }}>{"\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430"}</span></p></div><img key={39} src={img_37} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 387" style={{
        position: "absolute",
        left: "1068.52px",
        top: "275.49px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={40} src={img_38} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 389" style={{
        position: "absolute",
        left: "1107.4px",
        top: "275.49px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={41} src={img_39} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 393" style={{
        position: "absolute",
        left: "1029.64px",
        top: "275.49px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={42} src={img_40} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1408" style={{
        position: "absolute",
        left: "990.75px",
        top: "275.49px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={43} src={img_41} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1410" style={{
        position: "absolute",
        left: "951.87px",
        top: "275.49px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={44} src={img_42} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1412" style={{
        position: "absolute",
        left: "912.98px",
        top: "275.49px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={45} src={img_43} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1414" style={{
        position: "absolute",
        left: "874.1px",
        top: "275.49px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={46} src={img_44} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1416" style={{
        position: "absolute",
        left: "835.22px",
        top: "275.49px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={47} src={img_45} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1418" style={{
        position: "absolute",
        left: "796.33px",
        top: "275.49px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={48} src={img_46} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1420" style={{
        position: "absolute",
        left: "757.45px",
        top: "275.49px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={49} src={img_47} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1422" style={{
        position: "absolute",
        left: "718.56px",
        top: "275.49px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={50} src={img_48} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1424" style={{
        position: "absolute",
        left: "679.68px",
        top: "275.49px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={51} src={img_49} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1426" style={{
        position: "absolute",
        left: "640.8px",
        top: "275.49px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={52} src={img_50} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1428" style={{
        position: "absolute",
        left: "601.91px",
        top: "275.49px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={53} src={img_51} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1430" style={{
        position: "absolute",
        left: "563.03px",
        top: "275.49px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={54} src={img_52} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1432" style={{
        position: "absolute",
        left: "524.15px",
        top: "275.49px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={55} src={img_53} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1434" style={{
        position: "absolute",
        left: "485.26px",
        top: "275.49px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={56} src={img_54} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1436" style={{
        position: "absolute",
        left: "446.38px",
        top: "275.49px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={57} src={img_55} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1438" style={{
        position: "absolute",
        left: "407.49px",
        top: "275.49px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={58} src={img_56} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1440" style={{
        position: "absolute",
        left: "368.61px",
        top: "275.49px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={59} src={img_57} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1442" style={{
        position: "absolute",
        left: "329.73px",
        top: "275.49px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={60} src={img_58} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1444" style={{
        position: "absolute",
        left: "290.84px",
        top: "275.49px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={61} src={img_59} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1446" style={{
        position: "absolute",
        left: "251.96px",
        top: "275.49px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={62} src={img_60} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1448" style={{
        position: "absolute",
        left: "213.07px",
        top: "275.49px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={63} src={img_61} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1450" style={{
        position: "absolute",
        left: "174.19px",
        top: "275.49px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><div key={64} style={{
        position: "absolute",
        left: "520.62px",
        top: "231.52px",
        width: "298.85px",
        height: "35.54px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#E4EAE9"
          }}>{"\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435"}</span></p></div><div key={65} style={{
        position: "absolute",
        left: "447.61px",
        top: "441.82px",
        width: "411.55px",
        height: "35.54px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#E4EAE9"
          }}>{"\u041A\u0440\u0435\u0430\u0442\u0438\u0432\u043D\u044B\u0439 \u043F\u0440\u043E\u0446\u0435\u0441\u0441"}</span></p></div><img key={66} src={img_62} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 5" style={{
        position: "absolute",
        left: "1111.36px",
        top: "538.93px",
        width: "29.33px",
        height: "29.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={67} src={img_63} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 7" style={{
        position: "absolute",
        left: "1077.45px",
        top: "537.6px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={68} src={img_64} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 9" style={{
        position: "absolute",
        left: "1045.45px",
        top: "537.6px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={69} src={img_65} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 11" style={{
        position: "absolute",
        left: "1004.11px",
        top: "537.6px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={70} src={img_66} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 13" style={{
        position: "absolute",
        left: "963px",
        top: "537.6px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={71} src={img_67} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 15" style={{
        position: "absolute",
        left: "928.42px",
        top: "537.6px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={72} src={img_68} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 17" style={{
        position: "absolute",
        left: "892.67px",
        top: "537.6px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={73} src={img_69} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 19" style={{
        position: "absolute",
        left: "853.58px",
        top: "537.6px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={74} src={img_70} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 21" style={{
        position: "absolute",
        left: "812.95px",
        top: "537.6px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={75} src={img_71} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 23" style={{
        position: "absolute",
        left: "770.3px",
        top: "537.6px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={76} src={img_72} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 25" style={{
        position: "absolute",
        left: "735.85px",
        top: "537.6px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={77} src={img_73} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 27" style={{
        position: "absolute",
        left: "703.67px",
        top: "537.6px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={78} src={img_74} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 29" style={{
        position: "absolute",
        left: "668.06px",
        top: "537.6px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={79} src={img_75} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 31" style={{
        position: "absolute",
        left: "627.79px",
        top: "537.6px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={80} src={img_76} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 33" style={{
        position: "absolute",
        left: "585.62px",
        top: "537.6px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={81} src={img_77} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 35" style={{
        position: "absolute",
        left: "541.44px",
        top: "537.6px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={82} src={img_78} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 37" style={{
        position: "absolute",
        left: "494.89px",
        top: "537.6px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={83} src={img_79} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 39" style={{
        position: "absolute",
        left: "455.08px",
        top: "537.6px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={84} src={img_80} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 41" style={{
        position: "absolute",
        left: "410.6px",
        top: "537.6px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={85} src={img_81} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 43" style={{
        position: "absolute",
        left: "363.2px",
        top: "537.6px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={86} src={img_82} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 45" style={{
        position: "absolute",
        left: "318.59px",
        top: "537.6px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={87} src={img_83} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 47" style={{
        position: "absolute",
        left: "266.63px",
        top: "537.6px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={88} src={img_84} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 49" style={{
        position: "absolute",
        left: "222.69px",
        top: "537.6px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={89} src={img_85} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 51" style={{
        position: "absolute",
        left: "182.55px",
        top: "537.6px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={90} src={img_86} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 53" style={{
        position: "absolute",
        left: "1108.69px",
        top: "487.15px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={91} src={img_87} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 55" style={{
        position: "absolute",
        left: "1066.48px",
        top: "487.15px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={92} src={img_88} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 57" style={{
        position: "absolute",
        left: "1024.27px",
        top: "487.15px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={93} src={img_89} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 59" style={{
        position: "absolute",
        left: "982.07px",
        top: "487.15px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={94} src={img_90} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 61" style={{
        position: "absolute",
        left: "939.86px",
        top: "487.15px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={95} src={img_91} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1343" style={{
        position: "absolute",
        left: "897.65px",
        top: "487.15px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={96} src={img_92} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1344" style={{
        position: "absolute",
        left: "855.44px",
        top: "487.15px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={97} src={img_93} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1345" style={{
        position: "absolute",
        left: "813.23px",
        top: "487.15px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={98} src={img_94} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1346" style={{
        position: "absolute",
        left: "771.02px",
        top: "487.15px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={99} src={img_95} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1347" style={{
        position: "absolute",
        left: "728.82px",
        top: "487.15px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={100} src={img_96} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1348" style={{
        position: "absolute",
        left: "686.61px",
        top: "487.15px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={101} src={img_97} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1349" style={{
        position: "absolute",
        left: "644.4px",
        top: "487.15px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={102} src={img_98} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1350" style={{
        position: "absolute",
        left: "602.19px",
        top: "487.15px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={103} src={img_99} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1351" style={{
        position: "absolute",
        left: "559.98px",
        top: "487.15px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={104} src={img_100} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1352" style={{
        position: "absolute",
        left: "517.78px",
        top: "487.15px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={105} src={img_101} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1353" style={{
        position: "absolute",
        left: "478.23px",
        top: "488.48px",
        width: "29.33px",
        height: "29.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={106} src={img_102} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1354" style={{
        position: "absolute",
        left: "436.03px",
        top: "487.15px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={107} src={img_103} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1355" style={{
        position: "absolute",
        left: "393.82px",
        top: "487.15px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={108} src={img_104} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1356" style={{
        position: "absolute",
        left: "351.61px",
        top: "487.15px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={109} src={img_105} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1357" style={{
        position: "absolute",
        left: "309.4px",
        top: "487.15px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={110} src={img_106} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1358" style={{
        position: "absolute",
        left: "267.19px",
        top: "487.15px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={111} src={img_105} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1359" style={{
        position: "absolute",
        left: "224.98px",
        top: "487.15px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={112} src={img_107} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1360" style={{
        position: "absolute",
        left: "182.78px",
        top: "487.15px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><div key={113} style={{
        position: "absolute",
        left: "54.98px",
        top: "41.5px",
        width: "635.67px",
        height: "39.5px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(19.97pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(19.97pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#f2f2f2"
          }}>{"\u0418\u041A\u041E\u041D\u041A\u0418"}</span></p></div></div></div>;
};
export default Slide33;
