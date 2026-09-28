import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_363.png";
import img_2 from "./assets/images/image_364.png";
import img_3 from "./assets/images/image_365.png";
import img_4 from "./assets/images/image_366.png";
import img_5 from "./assets/images/image_367.png";
import img_6 from "./assets/images/image_368.png";
import img_7 from "./assets/images/image_369.png";
import img_8 from "./assets/images/image_370.png";
import img_9 from "./assets/images/image_371.png";
import img_10 from "./assets/images/image_372.png";
import img_11 from "./assets/images/image_373.png";
import img_12 from "./assets/images/image_374.png";
import img_13 from "./assets/images/image_375.png";
import img_14 from "./assets/images/image_376.png";
import img_15 from "./assets/images/image_377.png";
import img_16 from "./assets/images/image_378.png";
import img_17 from "./assets/images/image_379.png";
import img_18 from "./assets/images/image_380.png";
import img_19 from "./assets/images/image_381.png";
import img_20 from "./assets/images/image_382.png";
import img_21 from "./assets/images/image_383.png";
import img_22 from "./assets/images/image_384.png";
import img_23 from "./assets/images/image_385.png";
import img_24 from "./assets/images/image_232.png";
import img_25 from "./assets/images/image_386.png";
import img_26 from "./assets/images/image_387.png";
import img_27 from "./assets/images/image_388.png";
import img_28 from "./assets/images/image_389.png";
import img_29 from "./assets/images/image_390.png";
import img_30 from "./assets/images/image_391.png";
import img_31 from "./assets/images/image_392.png";
import img_32 from "./assets/images/image_393.png";
import img_33 from "./assets/images/image_394.png";
import img_34 from "./assets/images/image_395.png";
import img_35 from "./assets/images/image_396.png";
import img_36 from "./assets/images/image_397.png";
import img_37 from "./assets/images/image_398.png";
import img_38 from "./assets/images/image_399.png";
import img_39 from "./assets/images/image_400.png";
import img_40 from "./assets/images/image_401.png";
import img_41 from "./assets/images/image_402.png";
import img_42 from "./assets/images/image_403.png";
import img_43 from "./assets/images/image_404.png";
import img_44 from "./assets/images/image_405.png";
import img_45 from "./assets/images/image_406.png";
import img_46 from "./assets/images/image_407.png";
import img_47 from "./assets/images/image_408.png";
import img_48 from "./assets/images/image_409.png";
import img_49 from "./assets/images/image_410.png";
import img_50 from "./assets/images/image_411.png";
import img_51 from "./assets/images/image_412.png";
import img_52 from "./assets/images/image_413.png";
import img_53 from "./assets/images/image_414.png";
import img_54 from "./assets/images/image_415.png";
import img_55 from "./assets/images/image_416.png";
import img_56 from "./assets/images/image_417.png";
import img_57 from "./assets/images/image_418.png";
import img_58 from "./assets/images/image_419.png";
import img_59 from "./assets/images/image_420.png";
import img_60 from "./assets/images/image_421.png";
import img_61 from "./assets/images/image_422.png";
import img_62 from "./assets/images/image_423.png";
import img_63 from "./assets/images/image_424.png";
import img_64 from "./assets/images/image_425.png";
import img_65 from "./assets/images/image_426.png";
import img_66 from "./assets/images/image_427.png";
import img_67 from "./assets/images/image_428.png";
import img_68 from "./assets/images/image_429.png";
import img_69 from "./assets/images/image_430.png";
import img_70 from "./assets/images/image_431.png";
import img_71 from "./assets/images/image_432.png";
import img_72 from "./assets/images/image_433.png";
import img_73 from "./assets/images/image_434.png";
import img_74 from "./assets/images/image_435.png";
import img_75 from "./assets/images/image_436.png";
import img_76 from "./assets/images/image_437.png";
import img_77 from "./assets/images/image_438.png";
import img_78 from "./assets/images/image_439.png";
import img_79 from "./assets/images/image_440.png";
import img_80 from "./assets/images/image_441.png";
import img_81 from "./assets/images/image_442.png";
import img_82 from "./assets/images/image_443.png";
import img_83 from "./assets/images/image_444.png";
import img_84 from "./assets/images/image_445.png";
import img_85 from "./assets/images/image_446.png";
import img_86 from "./assets/images/image_447.png";
import img_87 from "./assets/images/image_448.png";
import img_88 from "./assets/images/image_449.png";
import img_89 from "./assets/images/image_450.png";
import img_90 from "./assets/images/image_451.png";
import img_91 from "./assets/images/image_452.png";
import img_92 from "./assets/images/image_453.png";
import img_93 from "./assets/images/image_454.png";
import img_94 from "./assets/images/image_455.png";
import img_95 from "./assets/images/image_456.png";
import img_96 from "./assets/images/image_457.png";
import img_97 from "./assets/images/image_458.png";
import img_98 from "./assets/images/image_459.png";
import img_99 from "./assets/images/image_460.png";
import img_100 from "./assets/images/image_461.png";
import img_101 from "./assets/images/image_462.png";
import img_102 from "./assets/images/image_463.png";
import img_103 from "./assets/images/image_464.png";
import img_104 from "./assets/images/image_465.png";
import img_105 from "./assets/images/image_466.png";
import img_106 from "./assets/images/image_467.png";
import img_107 from "./assets/images/image_468.png";
import img_108 from "./assets/images/image_469.png";
import img_109 from "./assets/images/image_470.png";
import img_110 from "./assets/images/image_471.png";
import img_111 from "./assets/images/image_472.png";
import img_112 from "./assets/images/image_473.png";
import img_113 from "./assets/images/image_474.png";
import img_114 from "./assets/images/image_475.png";
import img_115 from "./assets/images/image_476.png";
import img_116 from "./assets/images/image_477.png";
import img_117 from "./assets/images/image_478.png";
import img_118 from "./assets/images/image_479.png";
import img_119 from "./assets/images/image_480.png";
import img_120 from "./assets/images/image_481.png";
import img_121 from "./assets/images/image_482.png";
import img_122 from "./assets/images/image_483.png";
import img_123 from "./assets/images/image_484.png";
import img_124 from "./assets/images/image_485.png";
import img_125 from "./assets/images/image_486.png";
import img_126 from "./assets/images/image_487.png";
import img_127 from "./assets/images/image_488.png";
import img_128 from "./assets/images/image_489.png";
import img_129 from "./assets/images/image_490.png";
import img_bg from "./assets/images/image_29.png";
const Slide34: React.FC = () => {
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
  return <div id="slide-34" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-34" style={{
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
          }}>{"34"}</span></p></div><img key={1} src={img_1} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1317" style={{
        position: "absolute",
        left: "781.53px",
        top: "324.12px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={2} src={img_2} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1329" style={{
        position: "absolute",
        left: "947.94px",
        top: "324.12px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={3} src={img_3} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1331" style={{
        position: "absolute",
        left: "1114.35px",
        top: "324.12px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={4} src={img_4} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1333" style={{
        position: "absolute",
        left: "1072.75px",
        top: "324.12px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={5} src={img_5} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1337" style={{
        position: "absolute",
        left: "615.12px",
        top: "324.12px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={6} src={img_6} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1349" style={{
        position: "absolute",
        left: "1031.15px",
        top: "324.12px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={7} src={img_7} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1351" style={{
        position: "absolute",
        left: "989.54px",
        top: "324.12px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={8} src={img_8} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1355" style={{
        position: "absolute",
        left: "906.34px",
        top: "324.12px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={9} src={img_9} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1357" style={{
        position: "absolute",
        left: "864.74px",
        top: "324.12px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={10} src={img_10} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1359" style={{
        position: "absolute",
        left: "823.13px",
        top: "324.12px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={11} src={img_11} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1363" style={{
        position: "absolute",
        left: "739.93px",
        top: "324.12px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={12} src={img_12} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1365" style={{
        position: "absolute",
        left: "698.33px",
        top: "324.12px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={13} src={img_13} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1367" style={{
        position: "absolute",
        left: "656.72px",
        top: "324.12px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={14} src={img_14} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1371" style={{
        position: "absolute",
        left: "573.52px",
        top: "324.12px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={15} src={img_15} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1373" style={{
        position: "absolute",
        left: "531.92px",
        top: "324.12px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={16} src={img_16} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1375" style={{
        position: "absolute",
        left: "490.32px",
        top: "324.12px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={17} src={img_17} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1377" style={{
        position: "absolute",
        left: "448.71px",
        top: "324.12px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={18} src={img_18} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1379" style={{
        position: "absolute",
        left: "407.11px",
        top: "324.12px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={19} src={img_19} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1381" style={{
        position: "absolute",
        left: "365.51px",
        top: "324.12px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={20} src={img_20} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1383" style={{
        position: "absolute",
        left: "323.91px",
        top: "324.12px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={21} src={img_21} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1385" style={{
        position: "absolute",
        left: "282.3px",
        top: "324.12px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={22} src={img_22} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1387" style={{
        position: "absolute",
        left: "240.7px",
        top: "324.12px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={23} src={img_23} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1389" style={{
        position: "absolute",
        left: "199.1px",
        top: "324.12px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={24} src={img_24} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1391" style={{
        position: "absolute",
        left: "157.5px",
        top: "324.12px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><div key={25} style={{
        position: "absolute",
        left: "425.34px",
        top: "277.62px",
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
          }}>{"\u0420\u0430\u0441\u0441\u044B\u043B\u043A\u0430"}</span></p></div><div key={26} style={{
        position: "absolute",
        left: "526.6px",
        top: "120.51px",
        width: "236.44px",
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
          }}>{"\u041C\u0435\u0434\u0438\u0446\u0438\u043D\u0430"}</span></p></div><img key={27} src={img_25} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 4" style={{
        position: "absolute",
        left: "1110.46px",
        top: "215.5px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={28} src={img_26} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 5" style={{
        position: "absolute",
        left: "1068.84px",
        top: "215.5px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={29} src={img_27} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 6" style={{
        position: "absolute",
        left: "1027.22px",
        top: "215.5px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={30} src={img_28} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 7" style={{
        position: "absolute",
        left: "985.6px",
        top: "215.5px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={31} src={img_29} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 8" style={{
        position: "absolute",
        left: "943.98px",
        top: "215.5px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={32} src={img_30} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 9" style={{
        position: "absolute",
        left: "902.36px",
        top: "215.5px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={33} src={img_31} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 10" style={{
        position: "absolute",
        left: "860.74px",
        top: "215.5px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={34} src={img_32} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 11" style={{
        position: "absolute",
        left: "819.12px",
        top: "215.5px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={35} src={img_33} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 12" style={{
        position: "absolute",
        left: "777.5px",
        top: "215.5px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={36} src={img_34} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 13" style={{
        position: "absolute",
        left: "735.89px",
        top: "215.5px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={37} src={img_35} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 15" style={{
        position: "absolute",
        left: "694.27px",
        top: "215.5px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={38} src={img_36} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 17" style={{
        position: "absolute",
        left: "652.65px",
        top: "215.5px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={39} src={img_37} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 18" style={{
        position: "absolute",
        left: "611.03px",
        top: "215.5px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={40} src={img_38} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 19" style={{
        position: "absolute",
        left: "569.41px",
        top: "215.5px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={41} src={img_39} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 21" style={{
        position: "absolute",
        left: "527.79px",
        top: "215.5px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={42} src={img_40} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 23" style={{
        position: "absolute",
        left: "486.17px",
        top: "215.5px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={43} src={img_41} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 25" style={{
        position: "absolute",
        left: "444.55px",
        top: "215.5px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={44} src={img_42} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 27" style={{
        position: "absolute",
        left: "402.93px",
        top: "215.5px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={45} src={img_43} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 29" style={{
        position: "absolute",
        left: "361.31px",
        top: "215.5px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={46} src={img_44} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 30" style={{
        position: "absolute",
        left: "319.69px",
        top: "215.5px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={47} src={img_45} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 31" style={{
        position: "absolute",
        left: "278.07px",
        top: "215.5px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={48} src={img_46} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 32" style={{
        position: "absolute",
        left: "236.45px",
        top: "215.5px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={49} src={img_47} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 33" style={{
        position: "absolute",
        left: "194.84px",
        top: "215.5px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={50} src={img_48} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 34" style={{
        position: "absolute",
        left: "153.22px",
        top: "215.5px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={51} src={img_49} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 35" style={{
        position: "absolute",
        left: "1110.46px",
        top: "165.42px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={52} src={img_50} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 37" style={{
        position: "absolute",
        left: "1072.18px",
        top: "165.42px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={53} src={img_51} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 39" style={{
        position: "absolute",
        left: "1033.89px",
        top: "165.42px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={54} src={img_52} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 41" style={{
        position: "absolute",
        left: "995.61px",
        top: "165.42px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={55} src={img_53} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 42" style={{
        position: "absolute",
        left: "957.32px",
        top: "165.42px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={56} src={img_54} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 43" style={{
        position: "absolute",
        left: "919.04px",
        top: "165.42px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={57} src={img_55} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 45" style={{
        position: "absolute",
        left: "880.76px",
        top: "165.42px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={58} src={img_56} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 46" style={{
        position: "absolute",
        left: "842.47px",
        top: "165.42px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={59} src={img_57} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 47" style={{
        position: "absolute",
        left: "804.19px",
        top: "165.42px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={60} src={img_58} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 49" style={{
        position: "absolute",
        left: "765.91px",
        top: "165.42px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={61} src={img_59} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 51" style={{
        position: "absolute",
        left: "727.62px",
        top: "165.42px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={62} src={img_60} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 53" style={{
        position: "absolute",
        left: "689.34px",
        top: "165.42px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={63} src={img_61} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 55" style={{
        position: "absolute",
        left: "651.06px",
        top: "165.42px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={64} src={img_62} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 56" style={{
        position: "absolute",
        left: "612.77px",
        top: "165.42px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={65} src={img_63} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 57" style={{
        position: "absolute",
        left: "574.49px",
        top: "165.42px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={66} src={img_64} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 59" style={{
        position: "absolute",
        left: "536.2px",
        top: "165.42px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={67} src={img_65} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 60" style={{
        position: "absolute",
        left: "497.92px",
        top: "165.42px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={68} src={img_66} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 61" style={{
        position: "absolute",
        left: "459.64px",
        top: "165.42px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={69} src={img_67} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1343" style={{
        position: "absolute",
        left: "421.35px",
        top: "165.42px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={70} src={img_68} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1344" style={{
        position: "absolute",
        left: "383.07px",
        top: "165.42px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={71} src={img_69} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1345" style={{
        position: "absolute",
        left: "344.79px",
        top: "165.42px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={72} src={img_70} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1346" style={{
        position: "absolute",
        left: "306.5px",
        top: "165.42px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={73} src={img_71} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1347" style={{
        position: "absolute",
        left: "268.22px",
        top: "165.42px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={74} src={img_72} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1348" style={{
        position: "absolute",
        left: "229.93px",
        top: "165.42px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={75} src={img_73} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1350" style={{
        position: "absolute",
        left: "191.65px",
        top: "165.42px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={76} src={img_74} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1352" style={{
        position: "absolute",
        left: "153.37px",
        top: "165.42px",
        width: "39.79px",
        height: "39.79px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={77} src={img_75} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1353" style={{
        position: "absolute",
        left: "155.39px",
        top: "418.95px",
        width: "25.8px",
        height: "25.8px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={78} src={img_76} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1354" style={{
        position: "absolute",
        left: "209.37px",
        top: "417.87px",
        width: "27.95px",
        height: "27.95px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={79} src={img_77} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1356" style={{
        position: "absolute",
        left: "265.51px",
        top: "417.91px",
        width: "27.87px",
        height: "27.87px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={80} src={img_78} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1358" style={{
        position: "absolute",
        left: "321.56px",
        top: "417.33px",
        width: "29.03px",
        height: "29.03px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={81} src={img_79} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1360" style={{
        position: "absolute",
        left: "378.77px",
        top: "418.01px",
        width: "27.68px",
        height: "27.68px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={82} src={img_80} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1361" style={{
        position: "absolute",
        left: "434.64px",
        top: "417.63px",
        width: "28.43px",
        height: "28.43px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={83} src={img_81} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1362" style={{
        position: "absolute",
        left: "491.25px",
        top: "418.04px",
        width: "27.61px",
        height: "27.61px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={84} src={img_82} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1364" style={{
        position: "absolute",
        left: "547.04px",
        top: "418.97px",
        width: "25.76px",
        height: "25.76px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={85} src={img_83} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1366" style={{
        position: "absolute",
        left: "600.98px",
        top: "417.69px",
        width: "28.31px",
        height: "28.31px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={86} src={img_84} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1368" style={{
        position: "absolute",
        left: "657.47px",
        top: "416.87px",
        width: "29.96px",
        height: "29.96px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={87} src={img_85} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1369" style={{
        position: "absolute",
        left: "715.61px",
        top: "417.69px",
        width: "28.31px",
        height: "28.31px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={88} src={img_86} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1370" style={{
        position: "absolute",
        left: "772.11px",
        top: "417.72px",
        width: "28.26px",
        height: "28.26px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={89} src={img_87} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1372" style={{
        position: "absolute",
        left: "828.55px",
        top: "417.72px",
        width: "28.26px",
        height: "28.26px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={90} src={img_88} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1374" style={{
        position: "absolute",
        left: "885px",
        top: "417.72px",
        width: "28.26px",
        height: "28.26px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={91} src={img_89} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1376" style={{
        position: "absolute",
        left: "941.44px",
        top: "416.87px",
        width: "29.96px",
        height: "29.96px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={92} src={img_90} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1378" style={{
        position: "absolute",
        left: "999.58px",
        top: "418.29px",
        width: "27.12px",
        height: "27.12px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={93} src={img_91} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1380" style={{
        position: "absolute",
        left: "1054.88px",
        top: "417.69px",
        width: "28.31px",
        height: "28.31px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={94} src={img_92} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1382" style={{
        position: "absolute",
        left: "1055.05px",
        top: "461.98px",
        width: "28.31px",
        height: "28.31px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={95} src={img_93} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1384" style={{
        position: "absolute",
        left: "1111.38px",
        top: "417.69px",
        width: "28.31px",
        height: "28.31px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={96} src={img_94} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1386" style={{
        position: "absolute",
        left: "1112.45px",
        top: "461.23px",
        width: "29.8px",
        height: "29.8px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={97} src={img_95} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1388" style={{
        position: "absolute",
        left: "156.92px",
        top: "463.23px",
        width: "25.8px",
        height: "25.8px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={98} src={img_96} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1390" style={{
        position: "absolute",
        left: "211.82px",
        top: "462.69px",
        width: "26.88px",
        height: "26.88px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={99} src={img_97} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1393" style={{
        position: "absolute",
        left: "267.79px",
        top: "463.5px",
        width: "25.27px",
        height: "25.27px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={100} src={img_98} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1394" style={{
        position: "absolute",
        left: "322.15px",
        top: "462.16px",
        width: "27.94px",
        height: "27.94px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={101} src={img_99} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1395" style={{
        position: "absolute",
        left: "379.18px",
        top: "462.95px",
        width: "26.37px",
        height: "26.37px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={102} src={img_100} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1396" style={{
        position: "absolute",
        left: "434.64px",
        top: "464.13px",
        width: "24.02px",
        height: "24.02px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={103} src={img_101} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1397" style={{
        position: "absolute",
        left: "487.75px",
        top: "463.54px",
        width: "25.18px",
        height: "25.18px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={104} src={img_102} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1398" style={{
        position: "absolute",
        left: "542.03px",
        top: "462.99px",
        width: "26.29px",
        height: "26.29px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={105} src={img_103} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1399" style={{
        position: "absolute",
        left: "597.41px",
        top: "463.54px",
        width: "25.18px",
        height: "25.18px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={106} src={img_104} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1400" style={{
        position: "absolute",
        left: "651.69px",
        top: "461.1px",
        width: "30.08px",
        height: "30.08px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={107} src={img_105} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1401" style={{
        position: "absolute",
        left: "710.86px",
        top: "461.65px",
        width: "28.96px",
        height: "28.96px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={108} src={img_106} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1403" style={{
        position: "absolute",
        left: "768.91px",
        top: "461.65px",
        width: "28.96px",
        height: "28.96px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={109} src={img_107} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1405" style={{
        position: "absolute",
        left: "826.97px",
        top: "459.15px",
        width: "33.97px",
        height: "33.97px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={110} src={img_108} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1407" style={{
        position: "absolute",
        left: "890.03px",
        top: "462.15px",
        width: "27.97px",
        height: "27.97px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={111} src={img_109} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1408" style={{
        position: "absolute",
        left: "947.1px",
        top: "463.69px",
        width: "24.88px",
        height: "24.88px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={112} src={img_110} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1409" style={{
        position: "absolute",
        left: "1001.07px",
        top: "463.69px",
        width: "24.88px",
        height: "24.88px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><div key={113} style={{
        position: "absolute",
        left: "434.22px",
        top: "381.99px",
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
          }}>{"\u0415\u0434\u0430"}</span></p></div><img key={114} src={img_111} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1412" style={{
        position: "absolute",
        left: "1112.45px",
        top: "558.96px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={115} src={img_112} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1413" style={{
        position: "absolute",
        left: "1059.28px",
        top: "558.96px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={116} src={img_113} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1414" style={{
        position: "absolute",
        left: "1006.11px",
        top: "558.96px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={117} src={img_114} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1415" style={{
        position: "absolute",
        left: "952.94px",
        top: "558.96px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={118} src={img_115} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1416" style={{
        position: "absolute",
        left: "899.77px",
        top: "558.96px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={119} src={img_116} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1417" style={{
        position: "absolute",
        left: "846.6px",
        top: "558.96px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={120} src={img_117} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1418" style={{
        position: "absolute",
        left: "793.43px",
        top: "558.96px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={121} src={img_118} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1419" style={{
        position: "absolute",
        left: "740.26px",
        top: "558.96px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={122} src={img_119} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1420" style={{
        position: "absolute",
        left: "687.09px",
        top: "558.96px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={123} src={img_120} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1421" style={{
        position: "absolute",
        left: "633.92px",
        top: "558.96px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={124} src={img_121} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1422" style={{
        position: "absolute",
        left: "580.75px",
        top: "558.96px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={125} src={img_122} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1423" style={{
        position: "absolute",
        left: "527.58px",
        top: "558.96px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={126} src={img_123} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1424" style={{
        position: "absolute",
        left: "474.41px",
        top: "558.96px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={127} src={img_124} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1425" style={{
        position: "absolute",
        left: "421.24px",
        top: "558.96px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={128} src={img_125} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1426" style={{
        position: "absolute",
        left: "368.07px",
        top: "558.96px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={129} src={img_126} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1427" style={{
        position: "absolute",
        left: "314.9px",
        top: "558.96px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={130} src={img_127} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1428" style={{
        position: "absolute",
        left: "261.73px",
        top: "558.96px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={131} src={img_128} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1429" style={{
        position: "absolute",
        left: "208.56px",
        top: "558.96px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={132} src={img_129} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1430" style={{
        position: "absolute",
        left: "155.39px",
        top: "558.96px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><div key={133} style={{
        position: "absolute",
        left: "434.22px",
        top: "516.97px",
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
          }}>{"\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430"}</span></p></div><div key={134} style={{
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
export default Slide34;
