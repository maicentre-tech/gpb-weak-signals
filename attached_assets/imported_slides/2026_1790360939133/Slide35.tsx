import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_491.png";
import img_2 from "./assets/images/image_492.png";
import img_3 from "./assets/images/image_493.png";
import img_4 from "./assets/images/image_494.png";
import img_5 from "./assets/images/image_495.png";
import img_6 from "./assets/images/image_496.png";
import img_7 from "./assets/images/image_497.png";
import img_8 from "./assets/images/image_498.png";
import img_9 from "./assets/images/image_499.png";
import img_10 from "./assets/images/image_500.png";
import img_11 from "./assets/images/image_501.png";
import img_12 from "./assets/images/image_502.png";
import img_13 from "./assets/images/image_503.png";
import img_14 from "./assets/images/image_504.png";
import img_15 from "./assets/images/image_505.png";
import img_16 from "./assets/images/image_506.png";
import img_17 from "./assets/images/image_507.png";
import img_18 from "./assets/images/image_508.png";
import img_19 from "./assets/images/image_509.png";
import img_20 from "./assets/images/image_510.png";
import img_21 from "./assets/images/image_511.png";
import img_22 from "./assets/images/image_512.png";
import img_23 from "./assets/images/image_513.png";
import img_24 from "./assets/images/image_514.png";
import img_25 from "./assets/images/image_515.png";
import img_26 from "./assets/images/image_516.png";
import img_27 from "./assets/images/image_517.png";
import img_28 from "./assets/images/image_518.png";
import img_29 from "./assets/images/image_519.png";
import img_30 from "./assets/images/image_520.png";
import img_31 from "./assets/images/image_521.png";
import img_32 from "./assets/images/image_522.png";
import img_33 from "./assets/images/image_523.png";
import img_34 from "./assets/images/image_524.png";
import img_35 from "./assets/images/image_525.png";
import img_36 from "./assets/images/image_526.png";
import img_37 from "./assets/images/image_527.png";
import img_38 from "./assets/images/image_528.png";
import img_39 from "./assets/images/image_529.png";
import img_40 from "./assets/images/image_530.png";
import img_41 from "./assets/images/image_531.png";
import img_42 from "./assets/images/image_532.png";
import img_43 from "./assets/images/image_533.png";
import img_44 from "./assets/images/image_534.png";
import img_45 from "./assets/images/image_535.png";
import img_46 from "./assets/images/image_536.png";
import img_47 from "./assets/images/image_537.png";
import img_48 from "./assets/images/image_538.png";
import img_49 from "./assets/images/image_539.png";
import img_50 from "./assets/images/image_540.png";
import img_51 from "./assets/images/image_541.png";
import img_52 from "./assets/images/image_542.png";
import img_53 from "./assets/images/image_543.png";
import img_54 from "./assets/images/image_544.png";
import img_55 from "./assets/images/image_545.png";
import img_56 from "./assets/images/image_546.png";
import img_57 from "./assets/images/image_547.png";
import img_58 from "./assets/images/image_548.png";
import img_59 from "./assets/images/image_549.png";
import img_60 from "./assets/images/image_550.png";
import img_61 from "./assets/images/image_551.png";
import img_62 from "./assets/images/image_552.png";
import img_63 from "./assets/images/image_553.png";
import img_64 from "./assets/images/image_554.png";
import img_65 from "./assets/images/image_555.png";
import img_66 from "./assets/images/image_556.png";
import img_67 from "./assets/images/image_557.png";
import img_68 from "./assets/images/image_558.png";
import img_69 from "./assets/images/image_559.png";
import img_70 from "./assets/images/image_560.png";
import img_71 from "./assets/images/image_561.png";
import img_72 from "./assets/images/image_562.png";
import img_73 from "./assets/images/image_563.png";
import img_74 from "./assets/images/image_564.png";
import img_75 from "./assets/images/image_565.png";
import img_76 from "./assets/images/image_566.png";
import img_77 from "./assets/images/image_567.png";
import img_78 from "./assets/images/image_568.png";
import img_79 from "./assets/images/image_569.png";
import img_80 from "./assets/images/image_570.png";
import img_81 from "./assets/images/image_571.png";
import img_82 from "./assets/images/image_572.png";
import img_83 from "./assets/images/image_573.png";
import img_84 from "./assets/images/image_574.png";
import img_85 from "./assets/images/image_575.png";
import img_86 from "./assets/images/image_576.png";
import img_87 from "./assets/images/image_577.png";
import img_88 from "./assets/images/image_578.png";
import img_89 from "./assets/images/image_579.png";
import img_90 from "./assets/images/image_580.png";
import img_91 from "./assets/images/image_581.png";
import img_92 from "./assets/images/image_582.png";
import img_93 from "./assets/images/image_583.png";
import img_94 from "./assets/images/image_584.png";
import img_95 from "./assets/images/image_585.png";
import img_96 from "./assets/images/image_586.png";
import img_97 from "./assets/images/image_587.png";
import img_98 from "./assets/images/image_588.png";
import img_99 from "./assets/images/image_589.png";
import img_100 from "./assets/images/image_590.png";
import img_101 from "./assets/images/image_591.png";
import img_102 from "./assets/images/image_592.png";
import img_103 from "./assets/images/image_593.png";
import img_104 from "./assets/images/image_594.png";
import img_105 from "./assets/images/image_595.png";
import img_106 from "./assets/images/image_596.png";
import img_107 from "./assets/images/image_597.png";
import img_108 from "./assets/images/image_598.png";
import img_109 from "./assets/images/image_599.png";
import img_110 from "./assets/images/image_600.png";
import img_111 from "./assets/images/image_601.png";
import img_112 from "./assets/images/image_602.png";
import img_113 from "./assets/images/image_603.png";
import img_bg from "./assets/images/image_29.png";
const Slide35: React.FC = () => {
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
  return <div id="slide-35" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-35" style={{
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
            color: "#f2f2f2"
          }}>{"35"}</span></p></div><img key={1} src={img_1} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 4" style={{
        position: "absolute",
        left: "1095.08px",
        top: "160.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={2} src={img_2} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 6" style={{
        position: "absolute",
        left: "1051.55px",
        top: "160.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={3} src={img_3} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 12" style={{
        position: "absolute",
        left: "1008.01px",
        top: "160.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={4} src={img_4} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 16" style={{
        position: "absolute",
        left: "964.47px",
        top: "160.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={5} src={img_5} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 18" style={{
        position: "absolute",
        left: "920.93px",
        top: "160.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={6} src={img_6} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 20" style={{
        position: "absolute",
        left: "877.4px",
        top: "160.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={7} src={img_7} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 22" style={{
        position: "absolute",
        left: "833.86px",
        top: "160.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={8} src={img_8} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 24" style={{
        position: "absolute",
        left: "790.32px",
        top: "160.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={9} src={img_9} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 26" style={{
        position: "absolute",
        left: "746.79px",
        top: "160.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={10} src={img_10} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 28" style={{
        position: "absolute",
        left: "703.25px",
        top: "160.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={11} src={img_11} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 30" style={{
        position: "absolute",
        left: "659.71px",
        top: "160.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={12} src={img_12} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 32" style={{
        position: "absolute",
        left: "616.17px",
        top: "160.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={13} src={img_13} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 34" style={{
        position: "absolute",
        left: "572.64px",
        top: "160.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={14} src={img_14} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 36" style={{
        position: "absolute",
        left: "529.1px",
        top: "160.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={15} src={img_15} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 38" style={{
        position: "absolute",
        left: "485.56px",
        top: "160.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={16} src={img_16} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 40" style={{
        position: "absolute",
        left: "442.02px",
        top: "160.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={17} src={img_17} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 42" style={{
        position: "absolute",
        left: "398.49px",
        top: "160.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={18} src={img_18} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 44" style={{
        position: "absolute",
        left: "354.95px",
        top: "160.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={19} src={img_19} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 46" style={{
        position: "absolute",
        left: "311.41px",
        top: "160.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={20} src={img_20} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 48" style={{
        position: "absolute",
        left: "224.34px",
        top: "160.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={21} src={img_21} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 50" style={{
        position: "absolute",
        left: "267.88px",
        top: "160.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={22} src={img_22} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 56" style={{
        position: "absolute",
        left: "180.8px",
        top: "160.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><div key={23} style={{
        position: "absolute",
        left: "434.16px",
        top: "108.93px",
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
          }}>{"\u041B\u043E\u043A\u0430\u0446\u0438\u044F"}</span></p></div><img key={24} src={img_23} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 59" style={{
        position: "absolute",
        left: "1095.08px",
        top: "262.07px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={25} src={img_24} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 61" style={{
        position: "absolute",
        left: "1029.69px",
        top: "262.07px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={26} src={img_25} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 986" style={{
        position: "absolute",
        left: "964.3px",
        top: "262.07px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={27} src={img_26} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 988" style={{
        position: "absolute",
        left: "898.9px",
        top: "262.07px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={28} src={img_27} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 990" style={{
        position: "absolute",
        left: "833.51px",
        top: "262.07px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={29} src={img_28} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 992" style={{
        position: "absolute",
        left: "768.12px",
        top: "262.07px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={30} src={img_29} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 994" style={{
        position: "absolute",
        left: "702.72px",
        top: "262.07px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={31} src={img_30} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 996" style={{
        position: "absolute",
        left: "637.33px",
        top: "262.07px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={32} src={img_31} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 998" style={{
        position: "absolute",
        left: "571.93px",
        top: "262.07px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={33} src={img_32} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1000" style={{
        position: "absolute",
        left: "506.54px",
        top: "262.07px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={34} src={img_33} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1002" style={{
        position: "absolute",
        left: "441.15px",
        top: "262.07px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={35} src={img_34} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1004" style={{
        position: "absolute",
        left: "375.75px",
        top: "262.07px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={36} src={img_35} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1006" style={{
        position: "absolute",
        left: "310.36px",
        top: "262.07px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={37} src={img_36} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1008" style={{
        position: "absolute",
        left: "244.97px",
        top: "262.07px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={38} src={img_37} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1010" style={{
        position: "absolute",
        left: "179.57px",
        top: "262.07px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><div key={39} style={{
        position: "absolute",
        left: "434.47px",
        top: "217.35px",
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
          }}>{"\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435"}</span></p></div><img key={40} src={img_38} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1013" style={{
        position: "absolute",
        left: "1095.08px",
        top: "408.37px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={41} src={img_39} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1015" style={{
        position: "absolute",
        left: "1041.23px",
        top: "408.37px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={42} src={img_40} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1017" style={{
        position: "absolute",
        left: "987.38px",
        top: "408.37px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={43} src={img_41} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1019" style={{
        position: "absolute",
        left: "933.52px",
        top: "408.37px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={44} src={img_42} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1021" style={{
        position: "absolute",
        left: "879.67px",
        top: "408.37px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={45} src={img_43} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 703" style={{
        position: "absolute",
        left: "825.82px",
        top: "408.37px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={46} src={img_44} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 705" style={{
        position: "absolute",
        left: "771.96px",
        top: "408.37px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={47} src={img_45} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1280" style={{
        position: "absolute",
        left: "718.11px",
        top: "408.37px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={48} src={img_46} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1282" style={{
        position: "absolute",
        left: "664.26px",
        top: "408.37px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={49} src={img_47} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1284" style={{
        position: "absolute",
        left: "610.4px",
        top: "408.37px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={50} src={img_48} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1286" style={{
        position: "absolute",
        left: "556.55px",
        top: "408.37px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={51} src={img_49} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1288" style={{
        position: "absolute",
        left: "502.7px",
        top: "408.37px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={52} src={img_50} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1290" style={{
        position: "absolute",
        left: "448.84px",
        top: "408.37px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={53} src={img_51} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1292" style={{
        position: "absolute",
        left: "394.99px",
        top: "408.37px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={54} src={img_52} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1294" style={{
        position: "absolute",
        left: "341.13px",
        top: "408.37px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={55} src={img_53} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1296" style={{
        position: "absolute",
        left: "287.28px",
        top: "408.37px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={56} src={img_54} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1298" style={{
        position: "absolute",
        left: "233.43px",
        top: "408.37px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={57} src={img_55} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1300" style={{
        position: "absolute",
        left: "179.57px",
        top: "408.37px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><div key={58} style={{
        position: "absolute",
        left: "434.13px",
        top: "366.54px",
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
          }}>{"\u041F\u0440\u0438\u0440\u043E\u0434\u0430"}</span></p></div><img key={59} src={img_56} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 975" style={{
        position: "absolute",
        left: "180.8px",
        top: "308.94px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={60} src={img_57} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 977" style={{
        position: "absolute",
        left: "246.24px",
        top: "308.94px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={61} src={img_58} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 979" style={{
        position: "absolute",
        left: "311.68px",
        top: "308.94px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={62} src={img_59} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 981" style={{
        position: "absolute",
        left: "377.11px",
        top: "308.94px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={63} src={img_60} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 983" style={{
        position: "absolute",
        left: "442.55px",
        top: "308.94px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={64} src={img_61} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 985" style={{
        position: "absolute",
        left: "507.99px",
        top: "308.94px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={65} src={img_62} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 993" style={{
        position: "absolute",
        left: "573.42px",
        top: "308.94px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={66} src={img_63} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 997" style={{
        position: "absolute",
        left: "638.86px",
        top: "308.94px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={67} src={img_64} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1001" style={{
        position: "absolute",
        left: "704.3px",
        top: "308.94px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={68} src={img_65} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1005" style={{
        position: "absolute",
        left: "769.73px",
        top: "308.94px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={69} src={img_66} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1009" style={{
        position: "absolute",
        left: "835.17px",
        top: "308.94px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={70} src={img_67} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1018" style={{
        position: "absolute",
        left: "900.61px",
        top: "308.94px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={71} src={img_68} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 706" style={{
        position: "absolute",
        left: "966.04px",
        top: "308.94px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={72} src={img_69} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 708" style={{
        position: "absolute",
        left: "1031.48px",
        top: "308.94px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={73} src={img_70} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 710" style={{
        position: "absolute",
        left: "1096.92px",
        top: "308.94px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={74} src={img_71} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 732" style={{
        position: "absolute",
        left: "179.57px",
        top: "450.98px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={75} src={img_72} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 734" style={{
        position: "absolute",
        left: "240.12px",
        top: "450.98px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={76} src={img_73} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 736" style={{
        position: "absolute",
        left: "300.66px",
        top: "450.98px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={77} src={img_74} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 740" style={{
        position: "absolute",
        left: "361.2px",
        top: "453.51px",
        width: "26.94px",
        height: "26.94px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={78} src={img_75} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 746" style={{
        position: "absolute",
        left: "416.68px",
        top: "453.51px",
        width: "26.94px",
        height: "26.94px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={79} src={img_76} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 748" style={{
        position: "absolute",
        left: "472.16px",
        top: "452.46px",
        width: "29.04px",
        height: "29.04px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={80} src={img_77} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 750" style={{
        position: "absolute",
        left: "529.74px",
        top: "452.46px",
        width: "29.04px",
        height: "29.04px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={81} src={img_78} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 752" style={{
        position: "absolute",
        left: "587.33px",
        top: "452.46px",
        width: "29.04px",
        height: "29.04px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={82} src={img_79} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 754" style={{
        position: "absolute",
        left: "644.91px",
        top: "452.46px",
        width: "29.04px",
        height: "29.04px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={83} src={img_80} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 756" style={{
        position: "absolute",
        left: "702.5px",
        top: "452.46px",
        width: "29.04px",
        height: "29.04px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={84} src={img_81} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 758" style={{
        position: "absolute",
        left: "760.08px",
        top: "452.46px",
        width: "29.04px",
        height: "29.04px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={85} src={img_82} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 760" style={{
        position: "absolute",
        left: "817.67px",
        top: "453.94px",
        width: "26.07px",
        height: "26.07px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={86} src={img_83} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 762" style={{
        position: "absolute",
        left: "872.28px",
        top: "453.94px",
        width: "26.07px",
        height: "26.07px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={87} src={img_84} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 764" style={{
        position: "absolute",
        left: "926.9px",
        top: "452.46px",
        width: "29.04px",
        height: "29.04px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={88} src={img_85} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 766" style={{
        position: "absolute",
        left: "984.48px",
        top: "453.94px",
        width: "26.07px",
        height: "26.07px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={89} src={img_86} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1281" style={{
        position: "absolute",
        left: "1039.1px",
        top: "453.94px",
        width: "26.07px",
        height: "26.07px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={90} src={img_87} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1285" style={{
        position: "absolute",
        left: "1093.71px",
        top: "452.46px",
        width: "29.04px",
        height: "29.04px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={91} src={img_88} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1291" style={{
        position: "absolute",
        left: "1095.24px",
        top: "548.93px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={92} src={img_89} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1293" style={{
        position: "absolute",
        left: "1057.93px",
        top: "548.93px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={93} src={img_90} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1295" style={{
        position: "absolute",
        left: "1020.63px",
        top: "548.93px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={94} src={img_91} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1297" style={{
        position: "absolute",
        left: "983.32px",
        top: "548.93px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={95} src={img_92} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1299" style={{
        position: "absolute",
        left: "946.02px",
        top: "548.93px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={96} src={img_93} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1302" style={{
        position: "absolute",
        left: "908.71px",
        top: "548.93px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={97} src={img_94} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1304" style={{
        position: "absolute",
        left: "871.41px",
        top: "548.93px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={98} src={img_95} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1306" style={{
        position: "absolute",
        left: "834.1px",
        top: "548.93px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={99} src={img_96} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1308" style={{
        position: "absolute",
        left: "796.8px",
        top: "548.93px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={100} src={img_97} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1310" style={{
        position: "absolute",
        left: "759.49px",
        top: "548.93px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={101} src={img_98} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1312" style={{
        position: "absolute",
        left: "722.19px",
        top: "548.93px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={102} src={img_99} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1314" style={{
        position: "absolute",
        left: "684.88px",
        top: "548.93px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={103} src={img_100} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1316" style={{
        position: "absolute",
        left: "647.58px",
        top: "548.93px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={104} src={img_101} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1317" style={{
        position: "absolute",
        left: "610.27px",
        top: "548.93px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={105} src={img_102} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1319" style={{
        position: "absolute",
        left: "572.96px",
        top: "548.93px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={106} src={img_103} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1321" style={{
        position: "absolute",
        left: "535.66px",
        top: "548.93px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={107} src={img_104} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1323" style={{
        position: "absolute",
        left: "498.35px",
        top: "548.93px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={108} src={img_105} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1325" style={{
        position: "absolute",
        left: "461.05px",
        top: "548.93px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={109} src={img_106} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1327" style={{
        position: "absolute",
        left: "423.74px",
        top: "548.93px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={110} src={img_107} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1329" style={{
        position: "absolute",
        left: "386.44px",
        top: "548.93px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={111} src={img_108} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1331" style={{
        position: "absolute",
        left: "349.13px",
        top: "548.93px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={112} src={img_109} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1333" style={{
        position: "absolute",
        left: "311.83px",
        top: "548.93px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={113} src={img_110} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1335" style={{
        position: "absolute",
        left: "274.52px",
        top: "548.93px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={114} src={img_111} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1337" style={{
        position: "absolute",
        left: "237.22px",
        top: "548.93px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={115} src={img_112} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1339" style={{
        position: "absolute",
        left: "199.91px",
        top: "548.93px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={116} src={img_113} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1342" style={{
        position: "absolute",
        left: "162.61px",
        top: "548.93px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><div key={117} style={{
        position: "absolute",
        left: "511.21px",
        top: "505.59px",
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
          }}>{"\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430"}</span></p></div><div key={118} style={{
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
export default Slide35;
