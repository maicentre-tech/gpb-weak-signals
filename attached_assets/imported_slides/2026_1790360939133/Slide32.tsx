import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_65.png";
import img_2 from "./assets/images/image_66.png";
import img_3 from "./assets/images/image_67.png";
import img_4 from "./assets/images/image_68.png";
import img_5 from "./assets/images/image_69.png";
import img_6 from "./assets/images/image_70.png";
import img_7 from "./assets/images/image_71.png";
import img_8 from "./assets/images/image_72.png";
import img_9 from "./assets/images/image_73.png";
import img_10 from "./assets/images/image_74.png";
import img_11 from "./assets/images/image_75.png";
import img_12 from "./assets/images/image_76.png";
import img_13 from "./assets/images/image_77.png";
import img_14 from "./assets/images/image_78.png";
import img_15 from "./assets/images/image_79.png";
import img_16 from "./assets/images/image_80.png";
import img_17 from "./assets/images/image_81.png";
import img_18 from "./assets/images/image_82.png";
import img_19 from "./assets/images/image_83.png";
import img_20 from "./assets/images/image_84.png";
import img_21 from "./assets/images/image_85.png";
import img_22 from "./assets/images/image_86.png";
import img_23 from "./assets/images/image_87.png";
import img_24 from "./assets/images/image_88.png";
import img_25 from "./assets/images/image_89.png";
import img_26 from "./assets/images/image_90.png";
import img_27 from "./assets/images/image_91.png";
import img_28 from "./assets/images/image_92.png";
import img_29 from "./assets/images/image_93.png";
import img_30 from "./assets/images/image_94.png";
import img_31 from "./assets/images/image_95.png";
import img_32 from "./assets/images/image_96.png";
import img_33 from "./assets/images/image_97.png";
import img_34 from "./assets/images/image_98.png";
import img_35 from "./assets/images/image_99.png";
import img_36 from "./assets/images/image_100.png";
import img_37 from "./assets/images/image_101.png";
import img_38 from "./assets/images/image_102.png";
import img_39 from "./assets/images/image_103.png";
import img_40 from "./assets/images/image_104.png";
import img_41 from "./assets/images/image_105.png";
import img_42 from "./assets/images/image_106.png";
import img_43 from "./assets/images/image_107.png";
import img_44 from "./assets/images/image_108.png";
import img_45 from "./assets/images/image_109.png";
import img_46 from "./assets/images/image_110.png";
import img_47 from "./assets/images/image_111.png";
import img_48 from "./assets/images/image_112.png";
import img_49 from "./assets/images/image_113.png";
import img_50 from "./assets/images/image_114.png";
import img_51 from "./assets/images/image_115.png";
import img_52 from "./assets/images/image_116.png";
import img_53 from "./assets/images/image_117.png";
import img_54 from "./assets/images/image_118.png";
import img_55 from "./assets/images/image_119.png";
import img_56 from "./assets/images/image_120.png";
import img_57 from "./assets/images/image_121.png";
import img_58 from "./assets/images/image_122.png";
import img_59 from "./assets/images/image_123.png";
import img_60 from "./assets/images/image_124.png";
import img_61 from "./assets/images/image_125.png";
import img_62 from "./assets/images/image_126.png";
import img_63 from "./assets/images/image_127.png";
import img_64 from "./assets/images/image_128.png";
import img_65 from "./assets/images/image_129.png";
import img_66 from "./assets/images/image_130.png";
import img_67 from "./assets/images/image_131.png";
import img_68 from "./assets/images/image_132.png";
import img_69 from "./assets/images/image_133.png";
import img_70 from "./assets/images/image_134.png";
import img_71 from "./assets/images/image_135.png";
import img_72 from "./assets/images/image_136.png";
import img_73 from "./assets/images/image_137.png";
import img_74 from "./assets/images/image_138.png";
import img_75 from "./assets/images/image_139.png";
import img_76 from "./assets/images/image_140.png";
import img_77 from "./assets/images/image_141.png";
import img_78 from "./assets/images/image_142.png";
import img_79 from "./assets/images/image_143.png";
import img_80 from "./assets/images/image_144.png";
import img_81 from "./assets/images/image_145.png";
import img_82 from "./assets/images/image_146.png";
import img_83 from "./assets/images/image_147.png";
import img_84 from "./assets/images/image_148.png";
import img_85 from "./assets/images/image_149.png";
import img_86 from "./assets/images/image_150.png";
import img_87 from "./assets/images/image_151.png";
import img_88 from "./assets/images/image_152.png";
import img_89 from "./assets/images/image_153.png";
import img_90 from "./assets/images/image_154.png";
import img_91 from "./assets/images/image_155.png";
import img_92 from "./assets/images/image_156.png";
import img_93 from "./assets/images/image_157.png";
import img_94 from "./assets/images/image_158.png";
import img_95 from "./assets/images/image_159.png";
import img_96 from "./assets/images/image_160.png";
import img_97 from "./assets/images/image_161.png";
import img_98 from "./assets/images/image_162.png";
import img_99 from "./assets/images/image_163.png";
import img_100 from "./assets/images/image_164.png";
import img_101 from "./assets/images/image_165.png";
import img_102 from "./assets/images/image_166.png";
import img_103 from "./assets/images/image_167.png";
import img_104 from "./assets/images/image_168.png";
import img_105 from "./assets/images/image_169.png";
import img_106 from "./assets/images/image_170.png";
import img_107 from "./assets/images/image_171.png";
import img_108 from "./assets/images/image_172.png";
import img_109 from "./assets/images/image_173.png";
import img_110 from "./assets/images/image_174.png";
import img_111 from "./assets/images/image_175.png";
import img_112 from "./assets/images/image_176.png";
import img_113 from "./assets/images/image_177.png";
import img_114 from "./assets/images/image_178.png";
import img_115 from "./assets/images/image_179.png";
import img_116 from "./assets/images/image_180.png";
import img_117 from "./assets/images/image_181.png";
import img_118 from "./assets/images/image_182.png";
import img_119 from "./assets/images/image_183.png";
import img_120 from "./assets/images/image_184.png";
import img_121 from "./assets/images/image_185.png";
import img_122 from "./assets/images/image_186.png";
import img_123 from "./assets/images/image_187.png";
import img_124 from "./assets/images/image_188.png";
import img_125 from "./assets/images/image_189.png";
import img_126 from "./assets/images/image_190.png";
import img_127 from "./assets/images/image_191.png";
import img_128 from "./assets/images/image_192.png";
import img_129 from "./assets/images/image_193.png";
import img_130 from "./assets/images/image_194.png";
import img_131 from "./assets/images/image_195.png";
import img_132 from "./assets/images/image_196.png";
import img_133 from "./assets/images/image_197.png";
import img_134 from "./assets/images/image_198.png";
import img_135 from "./assets/images/image_199.png";
import img_136 from "./assets/images/image_200.png";
import img_137 from "./assets/images/image_201.png";
import img_138 from "./assets/images/image_202.png";
import img_139 from "./assets/images/image_203.png";
import img_140 from "./assets/images/image_204.png";
import img_141 from "./assets/images/image_205.png";
import img_142 from "./assets/images/image_206.png";
import img_143 from "./assets/images/image_207.png";
import img_144 from "./assets/images/image_208.png";
import img_145 from "./assets/images/image_209.png";
import img_146 from "./assets/images/image_210.png";
import img_147 from "./assets/images/image_211.png";
import img_148 from "./assets/images/image_212.png";
import img_149 from "./assets/images/image_213.png";
import img_150 from "./assets/images/image_214.png";
import img_151 from "./assets/images/image_215.png";
import img_152 from "./assets/images/image_216.png";
import img_153 from "./assets/images/image_217.png";
import img_154 from "./assets/images/image_218.png";
import img_155 from "./assets/images/image_219.png";
import img_156 from "./assets/images/image_220.png";
import img_157 from "./assets/images/image_221.png";
import img_158 from "./assets/images/image_222.png";
import img_159 from "./assets/images/image_223.png";
import img_160 from "./assets/images/image_224.png";
import img_161 from "./assets/images/image_225.png";
import img_162 from "./assets/images/image_226.png";
import img_163 from "./assets/images/image_227.png";
import img_164 from "./assets/images/image_228.png";
import img_165 from "./assets/images/image_229.png";
import img_166 from "./assets/images/image_230.png";
import img_167 from "./assets/images/image_231.png";
import img_168 from "./assets/images/image_232.png";
import img_169 from "./assets/images/image_233.png";
import img_170 from "./assets/images/image_234.png";
import img_171 from "./assets/images/image_235.png";
import img_172 from "./assets/images/image_236.png";
import img_173 from "./assets/images/image_237.png";
import img_174 from "./assets/images/image_238.png";
import img_175 from "./assets/images/image_239.png";
import img_176 from "./assets/images/image_240.png";
import img_177 from "./assets/images/image_241.png";
import img_178 from "./assets/images/image_242.png";
import img_179 from "./assets/images/image_243.png";
import img_180 from "./assets/images/image_244.png";
import img_181 from "./assets/images/image_245.png";
import img_182 from "./assets/images/image_246.png";
import img_183 from "./assets/images/image_247.png";
import img_184 from "./assets/images/image_248.png";
import img_185 from "./assets/images/image_249.png";
import img_186 from "./assets/images/image_250.png";
import img_187 from "./assets/images/image_251.png";
import img_188 from "./assets/images/image_252.png";
import img_189 from "./assets/images/image_253.png";
import img_190 from "./assets/images/image_254.png";
import img_191 from "./assets/images/image_255.png";
import img_bg from "./assets/images/image_29.png";
const Slide32: React.FC = () => {
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
  return <div id="slide-32" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-32" style={{
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
        left: "555.97px",
        top: "117.66px",
        width: "168.06px",
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
          }}>{"\u0411\u0438\u0437\u043D\u0435\u0441"}</span></p></div><div key={1} style={{
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
          }}>{"32"}</span></p></div><img key={2} src={img_1} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 6" style={{
        position: "absolute",
        left: "295.26px",
        top: "207.81px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={3} src={img_2} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 8" style={{
        position: "absolute",
        left: "216.1px",
        top: "207.81px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={4} src={img_3} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 10" style={{
        position: "absolute",
        left: "176.51px",
        top: "207.81px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={5} src={img_4} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 12" style={{
        position: "absolute",
        left: "136.93px",
        top: "207.81px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={6} src={img_5} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 14" style={{
        position: "absolute",
        left: "1088.31px",
        top: "164.53px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={7} src={img_6} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 16" style={{
        position: "absolute",
        left: "1046.92px",
        top: "164.53px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={8} src={img_7} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 18" style={{
        position: "absolute",
        left: "1005.53px",
        top: "164.53px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={9} src={img_8} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 20" style={{
        position: "absolute",
        left: "964.14px",
        top: "164.53px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={10} src={img_9} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 22" style={{
        position: "absolute",
        left: "922.75px",
        top: "164.53px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={11} src={img_10} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 24" style={{
        position: "absolute",
        left: "881.36px",
        top: "164.53px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={12} src={img_11} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 26" style={{
        position: "absolute",
        left: "839.97px",
        top: "164.53px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={13} src={img_12} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 28" style={{
        position: "absolute",
        left: "798.58px",
        top: "164.53px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={14} src={img_13} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 30" style={{
        position: "absolute",
        left: "757.19px",
        top: "164.53px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={15} src={img_14} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 32" style={{
        position: "absolute",
        left: "715.8px",
        top: "164.53px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={16} src={img_15} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 34" style={{
        position: "absolute",
        left: "674.41px",
        top: "164.53px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={17} src={img_16} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 36" style={{
        position: "absolute",
        left: "633.02px",
        top: "164.53px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={18} src={img_17} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 38" style={{
        position: "absolute",
        left: "591.63px",
        top: "164.53px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={19} src={img_18} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 40" style={{
        position: "absolute",
        left: "550.24px",
        top: "164.53px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={20} src={img_19} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 44" style={{
        position: "absolute",
        left: "508.85px",
        top: "164.53px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={21} src={img_20} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 46" style={{
        position: "absolute",
        left: "467.46px",
        top: "164.53px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={22} src={img_21} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 48" style={{
        position: "absolute",
        left: "426.07px",
        top: "164.53px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={23} src={img_22} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 50" style={{
        position: "absolute",
        left: "384.69px",
        top: "164.53px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={24} src={img_23} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 52" style={{
        position: "absolute",
        left: "343.3px",
        top: "164.53px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={25} src={img_24} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 54" style={{
        position: "absolute",
        left: "301.91px",
        top: "164.53px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={26} src={img_25} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 56" style={{
        position: "absolute",
        left: "260.52px",
        top: "164.53px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={27} src={img_26} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 58" style={{
        position: "absolute",
        left: "219.13px",
        top: "164.53px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={28} src={img_27} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 60" style={{
        position: "absolute",
        left: "177.74px",
        top: "164.53px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={29} src={img_28} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 62" style={{
        position: "absolute",
        left: "136.35px",
        top: "164.53px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={30} src={img_29} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1103" style={{
        position: "absolute",
        left: "572.34px",
        top: "207.81px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={31} src={img_30} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1105" style={{
        position: "absolute",
        left: "611.92px",
        top: "207.81px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={32} src={img_31} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1113" style={{
        position: "absolute",
        left: "651.5px",
        top: "207.81px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={33} src={img_32} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1115" style={{
        position: "absolute",
        left: "691.08px",
        top: "207.81px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={34} src={img_33} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1117" style={{
        position: "absolute",
        left: "730.67px",
        top: "207.81px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={35} src={img_34} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1119" style={{
        position: "absolute",
        left: "770.25px",
        top: "207.81px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={36} src={img_35} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1121" style={{
        position: "absolute",
        left: "809.83px",
        top: "207.81px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={37} src={img_36} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1123" style={{
        position: "absolute",
        left: "849.41px",
        top: "207.81px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={38} src={img_37} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1125" style={{
        position: "absolute",
        left: "889px",
        top: "207.81px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={39} src={img_38} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1127" style={{
        position: "absolute",
        left: "928.58px",
        top: "207.81px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={40} src={img_39} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1129" style={{
        position: "absolute",
        left: "968.16px",
        top: "207.81px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={41} src={img_40} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1131" style={{
        position: "absolute",
        left: "1007.74px",
        top: "207.81px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={42} src={img_41} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1133" style={{
        position: "absolute",
        left: "1047.32px",
        top: "207.81px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={43} src={img_42} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1135" style={{
        position: "absolute",
        left: "1086.91px",
        top: "207.81px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={44} src={img_43} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1137" style={{
        position: "absolute",
        left: "134.02px",
        top: "255.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={45} src={img_44} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1139" style={{
        position: "absolute",
        left: "173.78px",
        top: "255.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={46} src={img_45} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1141" style={{
        position: "absolute",
        left: "213.54px",
        top: "255.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={47} src={img_46} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1143" style={{
        position: "absolute",
        left: "253.3px",
        top: "255.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={48} src={img_47} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1145" style={{
        position: "absolute",
        left: "532.75px",
        top: "207.81px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={49} src={img_48} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1147" style={{
        position: "absolute",
        left: "493.17px",
        top: "207.81px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={50} src={img_49} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1149" style={{
        position: "absolute",
        left: "453.59px",
        top: "207.81px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={51} src={img_50} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 703" style={{
        position: "absolute",
        left: "414.01px",
        top: "207.81px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={52} src={img_51} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 705" style={{
        position: "absolute",
        left: "374.43px",
        top: "207.81px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={53} src={img_52} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1152" style={{
        position: "absolute",
        left: "334.84px",
        top: "207.81px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={54} src={img_53} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1154" style={{
        position: "absolute",
        left: "255.68px",
        top: "207.81px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={55} src={img_54} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1156" style={{
        position: "absolute",
        left: "332.83px",
        top: "255.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={56} src={img_55} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1158" style={{
        position: "absolute",
        left: "293.07px",
        top: "255.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={57} src={img_56} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1160" style={{
        position: "absolute",
        left: "1088.31px",
        top: "255.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={58} src={img_57} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1168" style={{
        position: "absolute",
        left: "1048.55px",
        top: "255.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={59} src={img_58} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1170" style={{
        position: "absolute",
        left: "1008.78px",
        top: "255.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={60} src={img_59} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1174" style={{
        position: "absolute",
        left: "969.02px",
        top: "255.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={61} src={img_60} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1176" style={{
        position: "absolute",
        left: "929.26px",
        top: "255.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={62} src={img_61} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1178" style={{
        position: "absolute",
        left: "889.5px",
        top: "255.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={63} src={img_62} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1184" style={{
        position: "absolute",
        left: "849.73px",
        top: "255.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={64} src={img_63} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1186" style={{
        position: "absolute",
        left: "809.97px",
        top: "255.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={65} src={img_64} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1188" style={{
        position: "absolute",
        left: "770.21px",
        top: "255.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={66} src={img_65} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1190" style={{
        position: "absolute",
        left: "730.45px",
        top: "255.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={67} src={img_66} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1192" style={{
        position: "absolute",
        left: "690.69px",
        top: "255.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={68} src={img_67} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1194" style={{
        position: "absolute",
        left: "650.92px",
        top: "255.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={69} src={img_68} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1196" style={{
        position: "absolute",
        left: "611.16px",
        top: "255.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={70} src={img_69} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1198" style={{
        position: "absolute",
        left: "571.4px",
        top: "255.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={71} src={img_70} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1200" style={{
        position: "absolute",
        left: "531.64px",
        top: "255.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={72} src={img_71} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1202" style={{
        position: "absolute",
        left: "491.88px",
        top: "255.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={73} src={img_72} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1204" style={{
        position: "absolute",
        left: "452.11px",
        top: "255.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={74} src={img_73} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1206" style={{
        position: "absolute",
        left: "412.35px",
        top: "255.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={75} src={img_74} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1208" style={{
        position: "absolute",
        left: "372.59px",
        top: "255.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={76} src={img_75} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 2" style={{
        position: "absolute",
        left: "181.51px",
        top: "399.61px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={77} src={img_76} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 4" style={{
        position: "absolute",
        left: "136.01px",
        top: "399.61px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={78} src={img_77} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 5" style={{
        position: "absolute",
        left: "1091.57px",
        top: "355.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={79} src={img_78} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 7" style={{
        position: "absolute",
        left: "1048.13px",
        top: "355.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={80} src={img_79} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 9" style={{
        position: "absolute",
        left: "1004.7px",
        top: "355.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={81} src={img_80} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 11" style={{
        position: "absolute",
        left: "961.26px",
        top: "355.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={82} src={img_81} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 13" style={{
        position: "absolute",
        left: "917.83px",
        top: "355.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={83} src={img_82} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 15" style={{
        position: "absolute",
        left: "874.4px",
        top: "355.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={84} src={img_83} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 17" style={{
        position: "absolute",
        left: "830.96px",
        top: "355.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={85} src={img_84} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 19" style={{
        position: "absolute",
        left: "787.53px",
        top: "355.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={86} src={img_85} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 21" style={{
        position: "absolute",
        left: "744.09px",
        top: "355.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={87} src={img_86} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 23" style={{
        position: "absolute",
        left: "700.66px",
        top: "355.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={88} src={img_87} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 25" style={{
        position: "absolute",
        left: "657.22px",
        top: "355.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={89} src={img_88} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 27" style={{
        position: "absolute",
        left: "613.79px",
        top: "355.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={90} src={img_89} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 29" style={{
        position: "absolute",
        left: "570.35px",
        top: "355.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={91} src={img_90} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 31" style={{
        position: "absolute",
        left: "526.92px",
        top: "355.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={92} src={img_91} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 33" style={{
        position: "absolute",
        left: "483.48px",
        top: "355.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={93} src={img_92} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 35" style={{
        position: "absolute",
        left: "440.05px",
        top: "355.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={94} src={img_93} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 37" style={{
        position: "absolute",
        left: "396.61px",
        top: "355.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={95} src={img_94} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 39" style={{
        position: "absolute",
        left: "353.18px",
        top: "355.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={96} src={img_95} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 41" style={{
        position: "absolute",
        left: "309.74px",
        top: "355.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={97} src={img_96} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 42" style={{
        position: "absolute",
        left: "266.31px",
        top: "355.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={98} src={img_97} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 43" style={{
        position: "absolute",
        left: "222.88px",
        top: "355.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={99} src={img_98} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 45" style={{
        position: "absolute",
        left: "179.44px",
        top: "355.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={100} src={img_99} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 47" style={{
        position: "absolute",
        left: "136.01px",
        top: "355.45px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={101} src={img_100} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 49" style={{
        position: "absolute",
        left: "1091.57px",
        top: "399.61px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={102} src={img_101} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 51" style={{
        position: "absolute",
        left: "1046.07px",
        top: "399.61px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={103} src={img_102} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 53" style={{
        position: "absolute",
        left: "1000.56px",
        top: "399.61px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={104} src={img_103} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 55" style={{
        position: "absolute",
        left: "955.06px",
        top: "399.61px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={105} src={img_104} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 57" style={{
        position: "absolute",
        left: "909.56px",
        top: "399.61px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={106} src={img_105} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 59" style={{
        position: "absolute",
        left: "864.05px",
        top: "399.61px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={107} src={img_106} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 61" style={{
        position: "absolute",
        left: "818.55px",
        top: "399.61px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={108} src={img_107} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1343" style={{
        position: "absolute",
        left: "773.05px",
        top: "399.61px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={109} src={img_108} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1345" style={{
        position: "absolute",
        left: "727.55px",
        top: "399.61px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={110} src={img_109} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1347" style={{
        position: "absolute",
        left: "682.04px",
        top: "399.61px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={111} src={img_110} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1349" style={{
        position: "absolute",
        left: "636.54px",
        top: "399.61px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={112} src={img_111} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1351" style={{
        position: "absolute",
        left: "591.04px",
        top: "399.61px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={113} src={img_112} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1353" style={{
        position: "absolute",
        left: "545.53px",
        top: "399.61px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={114} src={img_113} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1355" style={{
        position: "absolute",
        left: "500.03px",
        top: "399.61px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={115} src={img_114} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1357" style={{
        position: "absolute",
        left: "454.53px",
        top: "399.61px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={116} src={img_115} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1359" style={{
        position: "absolute",
        left: "409.02px",
        top: "399.61px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={117} src={img_116} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1361" style={{
        position: "absolute",
        left: "363.52px",
        top: "399.61px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={118} src={img_117} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1363" style={{
        position: "absolute",
        left: "318.02px",
        top: "399.61px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={119} src={img_118} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1365" style={{
        position: "absolute",
        left: "272.52px",
        top: "399.61px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={120} src={img_119} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1367" style={{
        position: "absolute",
        left: "227.01px",
        top: "399.61px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><div key={121} style={{
        position: "absolute",
        left: "511.16px",
        top: "307.94px",
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
          }}>{"\u0413\u0440\u0430\u0444\u0438\u043A\u0438"}</span></p></div><img key={122} src={img_120} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1440" style={{
        position: "absolute",
        left: "1013.71px",
        top: "587.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={123} src={img_121} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1441" style={{
        position: "absolute",
        left: "1101.35px",
        top: "587.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={124} src={img_122} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1442" style={{
        position: "absolute",
        left: "1057.53px",
        top: "587.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={125} src={img_123} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1443" style={{
        position: "absolute",
        left: "739.69px",
        top: "493.73px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={126} src={img_124} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1444" style={{
        position: "absolute",
        left: "262.63px",
        top: "541.8px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={127} src={img_125} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1445" style={{
        position: "absolute",
        left: "220.73px",
        top: "541.8px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={128} src={img_126} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1446" style={{
        position: "absolute",
        left: "178.83px",
        top: "541.8px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={129} src={img_127} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1447" style={{
        position: "absolute",
        left: "969.9px",
        top: "587.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={130} src={img_128} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1449" style={{
        position: "absolute",
        left: "926.08px",
        top: "587.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={131} src={img_129} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1451" style={{
        position: "absolute",
        left: "882.27px",
        top: "587.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={132} src={img_130} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1453" style={{
        position: "absolute",
        left: "838.45px",
        top: "587.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={133} src={img_131} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1455" style={{
        position: "absolute",
        left: "794.63px",
        top: "587.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={134} src={img_132} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1457" style={{
        position: "absolute",
        left: "750.82px",
        top: "587.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={135} src={img_133} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1459" style={{
        position: "absolute",
        left: "707px",
        top: "587.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={136} src={img_134} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1461" style={{
        position: "absolute",
        left: "304.53px",
        top: "541.8px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={137} src={img_135} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1463" style={{
        position: "absolute",
        left: "663.18px",
        top: "587.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={138} src={img_136} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1465" style={{
        position: "absolute",
        left: "619.37px",
        top: "587.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={139} src={img_137} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1467" style={{
        position: "absolute",
        left: "575.55px",
        top: "587.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={140} src={img_138} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1469" style={{
        position: "absolute",
        left: "531.74px",
        top: "587.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={141} src={img_139} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1471" style={{
        position: "absolute",
        left: "487.92px",
        top: "587.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={142} src={img_140} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1473" style={{
        position: "absolute",
        left: "444.1px",
        top: "587.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={143} src={img_141} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1475" style={{
        position: "absolute",
        left: "400.29px",
        top: "587.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={144} src={img_142} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1477" style={{
        position: "absolute",
        left: "356.47px",
        top: "587.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={145} src={img_143} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1480" style={{
        position: "absolute",
        left: "312.66px",
        top: "587.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={146} src={img_144} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1481" style={{
        position: "absolute",
        left: "268.84px",
        top: "587.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={147} src={img_145} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1482" style={{
        position: "absolute",
        left: "225.02px",
        top: "587.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={148} src={img_146} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1483" style={{
        position: "absolute",
        left: "181.21px",
        top: "587.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={149} src={img_147} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1484" style={{
        position: "absolute",
        left: "137.39px",
        top: "587.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={150} src={img_148} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1485" style={{
        position: "absolute",
        left: "136.93px",
        top: "541.8px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={151} src={img_149} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1486" style={{
        position: "absolute",
        left: "1100.62px",
        top: "541.8px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={152} src={img_150} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1487" style={{
        position: "absolute",
        left: "1058.72px",
        top: "541.8px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={153} src={img_151} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1488" style={{
        position: "absolute",
        left: "1016.82px",
        top: "541.8px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={154} src={img_152} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1489" style={{
        position: "absolute",
        left: "974.92px",
        top: "541.8px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={155} src={img_153} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1490" style={{
        position: "absolute",
        left: "933.02px",
        top: "541.8px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={156} src={img_154} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1491" style={{
        position: "absolute",
        left: "891.12px",
        top: "541.8px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={157} src={img_155} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1492" style={{
        position: "absolute",
        left: "849.22px",
        top: "541.8px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={158} src={img_156} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1493" style={{
        position: "absolute",
        left: "807.32px",
        top: "541.8px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={159} src={img_157} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1494" style={{
        position: "absolute",
        left: "765.42px",
        top: "541.8px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={160} src={img_158} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1495" style={{
        position: "absolute",
        left: "723.52px",
        top: "541.8px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={161} src={img_159} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1496" style={{
        position: "absolute",
        left: "681.62px",
        top: "541.8px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={162} src={img_160} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1497" style={{
        position: "absolute",
        left: "639.72px",
        top: "541.8px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={163} src={img_161} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1498" style={{
        position: "absolute",
        left: "597.83px",
        top: "541.8px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={164} src={img_162} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1499" style={{
        position: "absolute",
        left: "555.93px",
        top: "541.8px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={165} src={img_163} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1500" style={{
        position: "absolute",
        left: "514.03px",
        top: "541.8px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={166} src={img_164} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1501" style={{
        position: "absolute",
        left: "472.13px",
        top: "541.8px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={167} src={img_165} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1502" style={{
        position: "absolute",
        left: "430.23px",
        top: "541.8px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={168} src={img_166} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1503" style={{
        position: "absolute",
        left: "388.33px",
        top: "541.8px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={169} src={img_167} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1504" style={{
        position: "absolute",
        left: "346.43px",
        top: "541.8px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={170} src={img_168} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1505" style={{
        position: "absolute",
        left: "1101.35px",
        top: "493.73px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={171} src={img_169} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1506" style={{
        position: "absolute",
        left: "1061.16px",
        top: "493.73px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={172} src={img_170} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1507" style={{
        position: "absolute",
        left: "1020.98px",
        top: "493.73px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={173} src={img_171} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1508" style={{
        position: "absolute",
        left: "980.79px",
        top: "493.73px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={174} src={img_172} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1509" style={{
        position: "absolute",
        left: "940.61px",
        top: "493.73px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={175} src={img_173} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1510" style={{
        position: "absolute",
        left: "900.43px",
        top: "493.73px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={176} src={img_174} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1511" style={{
        position: "absolute",
        left: "860.24px",
        top: "493.73px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={177} src={img_175} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1512" style={{
        position: "absolute",
        left: "820.06px",
        top: "493.73px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={178} src={img_176} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1513" style={{
        position: "absolute",
        left: "779.87px",
        top: "493.73px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={179} src={img_177} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1514" style={{
        position: "absolute",
        left: "699.51px",
        top: "493.73px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={180} src={img_178} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1515" style={{
        position: "absolute",
        left: "659.32px",
        top: "493.73px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={181} src={img_179} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1516" style={{
        position: "absolute",
        left: "619.14px",
        top: "493.73px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={182} src={img_180} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1517" style={{
        position: "absolute",
        left: "578.95px",
        top: "493.73px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={183} src={img_181} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1518" style={{
        position: "absolute",
        left: "538.77px",
        top: "493.73px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={184} src={img_182} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1519" style={{
        position: "absolute",
        left: "498.59px",
        top: "493.73px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={185} src={img_183} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1520" style={{
        position: "absolute",
        left: "458.4px",
        top: "493.73px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={186} src={img_184} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1521" style={{
        position: "absolute",
        left: "418.22px",
        top: "493.73px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={187} src={img_185} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1522" style={{
        position: "absolute",
        left: "378.04px",
        top: "493.73px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={188} src={img_186} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1523" style={{
        position: "absolute",
        left: "337.85px",
        top: "493.73px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={189} src={img_187} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1524" style={{
        position: "absolute",
        left: "297.67px",
        top: "493.73px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={190} src={img_188} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1525" style={{
        position: "absolute",
        left: "257.48px",
        top: "493.73px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={191} src={img_189} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1526" style={{
        position: "absolute",
        left: "217.3px",
        top: "493.73px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={192} src={img_190} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1527" style={{
        position: "absolute",
        left: "177.12px",
        top: "493.73px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={193} src={img_191} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1528" style={{
        position: "absolute",
        left: "136.93px",
        top: "493.73px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><div key={194} style={{
        position: "absolute",
        left: "430.76px",
        top: "446.69px",
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
          }}>{"\u041C\u0443\u043B\u044C\u0442\u0438\u043C\u0435\u0434\u0438\u0430"}</span></p></div><div key={195} style={{
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
export default Slide32;
