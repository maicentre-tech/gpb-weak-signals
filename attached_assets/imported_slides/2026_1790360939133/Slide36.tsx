import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_604.png";
import img_2 from "./assets/images/image_605.png";
import img_3 from "./assets/images/image_606.png";
import img_4 from "./assets/images/image_607.png";
import img_5 from "./assets/images/image_608.png";
import img_6 from "./assets/images/image_609.png";
import img_7 from "./assets/images/image_610.png";
import img_8 from "./assets/images/image_611.png";
import img_9 from "./assets/images/image_612.png";
import img_10 from "./assets/images/image_613.png";
import img_11 from "./assets/images/image_614.png";
import img_12 from "./assets/images/image_615.png";
import img_13 from "./assets/images/image_616.png";
import img_14 from "./assets/images/image_617.png";
import img_15 from "./assets/images/image_618.png";
import img_16 from "./assets/images/image_619.png";
import img_17 from "./assets/images/image_620.png";
import img_18 from "./assets/images/image_621.png";
import img_19 from "./assets/images/image_622.png";
import img_20 from "./assets/images/image_623.png";
import img_21 from "./assets/images/image_624.png";
import img_22 from "./assets/images/image_625.png";
import img_23 from "./assets/images/image_626.png";
import img_24 from "./assets/images/image_627.png";
import img_25 from "./assets/images/image_628.png";
import img_26 from "./assets/images/image_629.png";
import img_27 from "./assets/images/image_630.png";
import img_28 from "./assets/images/image_631.png";
import img_29 from "./assets/images/image_632.png";
import img_30 from "./assets/images/image_633.png";
import img_31 from "./assets/images/image_634.png";
import img_32 from "./assets/images/image_635.png";
import img_33 from "./assets/images/image_636.png";
import img_34 from "./assets/images/image_637.png";
import img_35 from "./assets/images/image_638.png";
import img_36 from "./assets/images/image_639.png";
import img_37 from "./assets/images/image_640.png";
import img_38 from "./assets/images/image_641.png";
import img_39 from "./assets/images/image_642.png";
import img_40 from "./assets/images/image_643.png";
import img_41 from "./assets/images/image_644.png";
import img_42 from "./assets/images/image_645.png";
import img_43 from "./assets/images/image_646.png";
import img_44 from "./assets/images/image_647.png";
import img_45 from "./assets/images/image_648.png";
import img_46 from "./assets/images/image_649.png";
import img_47 from "./assets/images/image_650.png";
import img_48 from "./assets/images/image_651.png";
import img_49 from "./assets/images/image_652.png";
import img_50 from "./assets/images/image_653.png";
import img_51 from "./assets/images/image_654.png";
import img_52 from "./assets/images/image_655.png";
import img_53 from "./assets/images/image_656.png";
import img_54 from "./assets/images/image_657.png";
import img_55 from "./assets/images/image_658.png";
import img_56 from "./assets/images/image_659.png";
import img_57 from "./assets/images/image_660.png";
import img_58 from "./assets/images/image_661.png";
import img_59 from "./assets/images/image_662.png";
import img_60 from "./assets/images/image_663.png";
import img_61 from "./assets/images/image_664.png";
import img_62 from "./assets/images/image_665.png";
import img_63 from "./assets/images/image_666.png";
import img_64 from "./assets/images/image_667.png";
import img_65 from "./assets/images/image_668.png";
import img_66 from "./assets/images/image_669.png";
import img_67 from "./assets/images/image_670.png";
import img_68 from "./assets/images/image_671.png";
import img_69 from "./assets/images/image_672.png";
import img_70 from "./assets/images/image_673.png";
import img_71 from "./assets/images/image_674.png";
import img_72 from "./assets/images/image_675.png";
import img_73 from "./assets/images/image_676.png";
import img_74 from "./assets/images/image_677.png";
import img_75 from "./assets/images/image_678.png";
import img_76 from "./assets/images/image_679.png";
import img_77 from "./assets/images/image_680.png";
import img_78 from "./assets/images/image_681.png";
import img_79 from "./assets/images/image_682.png";
import img_80 from "./assets/images/image_683.png";
import img_81 from "./assets/images/image_684.png";
import img_82 from "./assets/images/image_685.png";
import img_83 from "./assets/images/image_686.png";
import img_84 from "./assets/images/image_687.png";
import img_85 from "./assets/images/image_688.png";
import img_86 from "./assets/images/image_689.png";
import img_87 from "./assets/images/image_690.png";
import img_88 from "./assets/images/image_691.png";
import img_89 from "./assets/images/image_692.png";
import img_90 from "./assets/images/image_693.png";
import img_91 from "./assets/images/image_694.png";
import img_92 from "./assets/images/image_695.png";
import img_93 from "./assets/images/image_696.png";
import img_94 from "./assets/images/image_697.png";
import img_95 from "./assets/images/image_698.png";
import img_96 from "./assets/images/image_699.png";
import img_97 from "./assets/images/image_700.png";
import img_98 from "./assets/images/image_701.png";
import img_99 from "./assets/images/image_702.png";
import img_100 from "./assets/images/image_703.png";
import img_101 from "./assets/images/image_704.png";
import img_102 from "./assets/images/image_598.png";
import img_103 from "./assets/images/image_705.png";
import img_104 from "./assets/images/image_706.png";
import img_105 from "./assets/images/image_707.png";
import img_106 from "./assets/images/image_708.png";
import img_107 from "./assets/images/image_709.png";
import img_108 from "./assets/images/image_710.png";
import img_109 from "./assets/images/image_711.png";
import img_110 from "./assets/images/image_712.png";
import img_111 from "./assets/images/image_713.png";
import img_112 from "./assets/images/image_714.png";
import img_113 from "./assets/images/image_715.png";
import img_114 from "./assets/images/image_716.png";
import img_115 from "./assets/images/image_717.png";
import img_116 from "./assets/images/image_718.png";
import img_117 from "./assets/images/image_719.png";
import img_118 from "./assets/images/image_720.png";
import img_119 from "./assets/images/image_721.png";
import img_120 from "./assets/images/image_722.png";
import img_121 from "./assets/images/image_723.png";
import img_122 from "./assets/images/image_724.png";
import img_123 from "./assets/images/image_725.png";
import img_124 from "./assets/images/image_726.png";
import img_125 from "./assets/images/image_727.png";
import img_126 from "./assets/images/image_728.png";
import img_127 from "./assets/images/image_729.png";
import img_128 from "./assets/images/image_730.png";
import img_129 from "./assets/images/image_731.png";
import img_130 from "./assets/images/image_732.png";
import img_131 from "./assets/images/image_733.png";
import img_132 from "./assets/images/image_734.png";
import img_133 from "./assets/images/image_735.png";
import img_134 from "./assets/images/image_736.png";
import img_135 from "./assets/images/image_737.png";
import img_136 from "./assets/images/image_738.png";
import img_137 from "./assets/images/image_739.png";
import img_138 from "./assets/images/image_740.png";
import img_139 from "./assets/images/image_741.png";
import img_140 from "./assets/images/image_742.png";
import img_141 from "./assets/images/image_743.png";
import img_142 from "./assets/images/image_744.png";
import img_143 from "./assets/images/image_745.png";
import img_144 from "./assets/images/image_746.png";
import img_145 from "./assets/images/image_747.png";
import img_146 from "./assets/images/image_748.png";
import img_147 from "./assets/images/image_749.png";
import img_148 from "./assets/images/image_750.png";
import img_149 from "./assets/images/image_751.png";
import img_150 from "./assets/images/image_752.png";
import img_151 from "./assets/images/image_753.png";
import img_152 from "./assets/images/image_754.png";
import img_153 from "./assets/images/image_755.png";
import img_154 from "./assets/images/image_756.png";
import img_155 from "./assets/images/image_757.png";
import img_156 from "./assets/images/image_758.png";
import img_157 from "./assets/images/image_759.png";
import img_158 from "./assets/images/image_760.png";
import img_159 from "./assets/images/image_761.png";
import img_160 from "./assets/images/image_762.png";
import img_161 from "./assets/images/image_763.png";
import img_162 from "./assets/images/image_764.png";
import img_163 from "./assets/images/image_765.png";
import img_164 from "./assets/images/image_766.png";
import img_165 from "./assets/images/image_767.png";
import img_166 from "./assets/images/image_768.png";
import img_167 from "./assets/images/image_769.png";
import img_168 from "./assets/images/image_770.png";
import img_169 from "./assets/images/image_771.png";
import img_170 from "./assets/images/image_772.png";
import img_171 from "./assets/images/image_773.png";
import img_172 from "./assets/images/image_774.png";
import img_173 from "./assets/images/image_775.png";
import img_174 from "./assets/images/image_776.png";
import img_175 from "./assets/images/image_777.png";
import img_176 from "./assets/images/image_778.png";
import img_177 from "./assets/images/image_779.png";
import img_178 from "./assets/images/image_780.png";
import img_179 from "./assets/images/image_781.png";
import img_180 from "./assets/images/image_782.png";
import img_181 from "./assets/images/image_783.png";
import img_182 from "./assets/images/image_784.png";
import img_183 from "./assets/images/image_785.png";
import img_184 from "./assets/images/image_786.png";
import img_185 from "./assets/images/image_787.png";
import img_186 from "./assets/images/image_788.png";
import img_187 from "./assets/images/image_789.png";
import img_188 from "./assets/images/image_790.png";
import img_189 from "./assets/images/image_791.png";
import img_190 from "./assets/images/image_792.png";
import img_191 from "./assets/images/image_793.png";
import img_192 from "./assets/images/image_794.png";
import img_193 from "./assets/images/image_795.png";
import img_194 from "./assets/images/image_796.png";
import img_195 from "./assets/images/image_797.png";
import img_196 from "./assets/images/image_798.png";
import img_197 from "./assets/images/image_799.png";
import img_198 from "./assets/images/image_800.png";
import img_199 from "./assets/images/image_801.png";
import img_200 from "./assets/images/image_802.png";
import img_201 from "./assets/images/image_803.png";
import img_202 from "./assets/images/image_804.png";
import img_203 from "./assets/images/image_805.png";
import img_204 from "./assets/images/image_806.png";
import img_205 from "./assets/images/image_807.png";
import img_206 from "./assets/images/image_808.png";
import img_207 from "./assets/images/image_809.png";
import img_208 from "./assets/images/image_810.png";
import img_209 from "./assets/images/image_811.png";
import img_210 from "./assets/images/image_812.png";
import img_211 from "./assets/images/image_813.png";
import img_212 from "./assets/images/image_814.png";
import img_213 from "./assets/images/image_815.png";
import img_214 from "./assets/images/image_816.png";
import img_215 from "./assets/images/image_817.png";
import img_216 from "./assets/images/image_818.png";
import img_217 from "./assets/images/image_819.png";
import img_218 from "./assets/images/image_820.png";
import img_219 from "./assets/images/image_821.png";
import img_220 from "./assets/images/image_822.png";
import img_221 from "./assets/images/image_823.png";
import img_222 from "./assets/images/image_824.png";
import img_bg from "./assets/images/image_29.png";
const Slide36: React.FC = () => {
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
  return <div id="slide-36" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-36" style={{
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
          }}>{"36"}</span></p></div><img key={1} src={img_1} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 970" style={{
        position: "absolute",
        left: "420.39px",
        top: "261.23px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={2} src={img_2} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 971" style={{
        position: "absolute",
        left: "380.57px",
        top: "261.23px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={3} src={img_3} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 972" style={{
        position: "absolute",
        left: "340.75px",
        top: "261.23px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={4} src={img_4} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 973" style={{
        position: "absolute",
        left: "300.93px",
        top: "261.23px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={5} src={img_5} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 974" style={{
        position: "absolute",
        left: "261.11px",
        top: "261.23px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={6} src={img_6} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 975" style={{
        position: "absolute",
        left: "221.29px",
        top: "261.23px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={7} src={img_7} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 976" style={{
        position: "absolute",
        left: "181.47px",
        top: "261.23px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={8} src={img_8} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 977" style={{
        position: "absolute",
        left: "141.65px",
        top: "261.23px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={9} src={img_9} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 978" style={{
        position: "absolute",
        left: "1097.32px",
        top: "211.64px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={10} src={img_10} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 979" style={{
        position: "absolute",
        left: "1058.98px",
        top: "211.64px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={11} src={img_11} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 980" style={{
        position: "absolute",
        left: "1020.65px",
        top: "211.64px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={12} src={img_12} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 981" style={{
        position: "absolute",
        left: "982.32px",
        top: "211.64px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={13} src={img_13} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 982" style={{
        position: "absolute",
        left: "943.98px",
        top: "211.64px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={14} src={img_14} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 983" style={{
        position: "absolute",
        left: "905.65px",
        top: "211.64px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={15} src={img_15} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 984" style={{
        position: "absolute",
        left: "867.32px",
        top: "211.64px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={16} src={img_16} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 985" style={{
        position: "absolute",
        left: "828.98px",
        top: "211.64px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={17} src={img_17} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 986" style={{
        position: "absolute",
        left: "790.65px",
        top: "211.64px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={18} src={img_18} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 988" style={{
        position: "absolute",
        left: "752.32px",
        top: "211.64px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={19} src={img_19} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 990" style={{
        position: "absolute",
        left: "713.98px",
        top: "211.64px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={20} src={img_20} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 992" style={{
        position: "absolute",
        left: "675.65px",
        top: "211.64px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={21} src={img_21} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 994" style={{
        position: "absolute",
        left: "637.32px",
        top: "211.64px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={22} src={img_22} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 996" style={{
        position: "absolute",
        left: "601.65px",
        top: "212.97px",
        width: "29.33px",
        height: "29.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={23} src={img_23} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 998" style={{
        position: "absolute",
        left: "563.32px",
        top: "211.64px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={24} src={img_24} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1000" style={{
        position: "absolute",
        left: "524.99px",
        top: "211.64px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={25} src={img_25} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1001" style={{
        position: "absolute",
        left: "486.65px",
        top: "211.64px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={26} src={img_26} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1002" style={{
        position: "absolute",
        left: "448.32px",
        top: "211.64px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={27} src={img_27} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1003" style={{
        position: "absolute",
        left: "409.99px",
        top: "211.64px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={28} src={img_28} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1004" style={{
        position: "absolute",
        left: "371.65px",
        top: "211.64px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={29} src={img_29} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1005" style={{
        position: "absolute",
        left: "333.32px",
        top: "211.64px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={30} src={img_30} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1006" style={{
        position: "absolute",
        left: "294.99px",
        top: "211.64px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={31} src={img_31} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1007" style={{
        position: "absolute",
        left: "256.65px",
        top: "211.64px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={32} src={img_32} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1008" style={{
        position: "absolute",
        left: "218.32px",
        top: "211.64px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={33} src={img_33} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1009" style={{
        position: "absolute",
        left: "179.99px",
        top: "211.64px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={34} src={img_34} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1010" style={{
        position: "absolute",
        left: "141.65px",
        top: "211.64px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={35} src={img_35} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1011" style={{
        position: "absolute",
        left: "745.29px",
        top: "307.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={36} src={img_36} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1012" style={{
        position: "absolute",
        left: "705.05px",
        top: "307.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={37} src={img_37} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1013" style={{
        position: "absolute",
        left: "664.81px",
        top: "307.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={38} src={img_38} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1014" style={{
        position: "absolute",
        left: "624.56px",
        top: "307.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={39} src={img_39} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1015" style={{
        position: "absolute",
        left: "584.32px",
        top: "307.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={40} src={img_40} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1016" style={{
        position: "absolute",
        left: "544.08px",
        top: "307.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={41} src={img_41} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1017" style={{
        position: "absolute",
        left: "503.84px",
        top: "307.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={42} src={img_42} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1018" style={{
        position: "absolute",
        left: "463.59px",
        top: "307.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={43} src={img_43} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1019" style={{
        position: "absolute",
        left: "423.35px",
        top: "307.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={44} src={img_44} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1020" style={{
        position: "absolute",
        left: "383.11px",
        top: "307.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={45} src={img_45} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1021" style={{
        position: "absolute",
        left: "342.87px",
        top: "307.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={46} src={img_46} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1022" style={{
        position: "absolute",
        left: "302.62px",
        top: "307.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={47} src={img_47} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1023" style={{
        position: "absolute",
        left: "262.38px",
        top: "307.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={48} src={img_48} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1024" style={{
        position: "absolute",
        left: "222.14px",
        top: "307.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={49} src={img_49} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1025" style={{
        position: "absolute",
        left: "181.9px",
        top: "307.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={50} src={img_50} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1026" style={{
        position: "absolute",
        left: "141.65px",
        top: "307.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={51} src={img_51} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1027" style={{
        position: "absolute",
        left: "1097.32px",
        top: "261.23px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={52} src={img_52} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1028" style={{
        position: "absolute",
        left: "1057.5px",
        top: "261.23px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={53} src={img_53} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1029" style={{
        position: "absolute",
        left: "1017.68px",
        top: "261.23px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={54} src={img_54} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1030" style={{
        position: "absolute",
        left: "977.86px",
        top: "261.23px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={55} src={img_55} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1031" style={{
        position: "absolute",
        left: "938.04px",
        top: "261.23px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={56} src={img_56} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1032" style={{
        position: "absolute",
        left: "898.22px",
        top: "261.23px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={57} src={img_57} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1033" style={{
        position: "absolute",
        left: "858.4px",
        top: "261.23px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={58} src={img_58} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1034" style={{
        position: "absolute",
        left: "818.58px",
        top: "261.23px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={59} src={img_59} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1035" style={{
        position: "absolute",
        left: "778.76px",
        top: "261.23px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={60} src={img_60} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1036" style={{
        position: "absolute",
        left: "738.94px",
        top: "261.23px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={61} src={img_61} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1037" style={{
        position: "absolute",
        left: "699.12px",
        top: "261.23px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={62} src={img_62} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1038" style={{
        position: "absolute",
        left: "659.3px",
        top: "261.23px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={63} src={img_63} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1039" style={{
        position: "absolute",
        left: "619.49px",
        top: "261.23px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={64} src={img_64} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1040" style={{
        position: "absolute",
        left: "579.67px",
        top: "261.23px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={65} src={img_65} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1041" style={{
        position: "absolute",
        left: "539.85px",
        top: "261.23px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={66} src={img_66} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1042" style={{
        position: "absolute",
        left: "500.03px",
        top: "261.23px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={67} src={img_67} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1043" style={{
        position: "absolute",
        left: "460.21px",
        top: "261.23px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={68} src={img_68} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1044" style={{
        position: "absolute",
        left: "661.37px",
        top: "350.22px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={69} src={img_69} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1045" style={{
        position: "absolute",
        left: "621.39px",
        top: "350.22px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={70} src={img_70} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1046" style={{
        position: "absolute",
        left: "581.41px",
        top: "350.22px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={71} src={img_71} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1047" style={{
        position: "absolute",
        left: "541.43px",
        top: "350.22px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={72} src={img_72} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1048" style={{
        position: "absolute",
        left: "501.45px",
        top: "350.22px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={73} src={img_73} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1049" style={{
        position: "absolute",
        left: "461.48px",
        top: "350.22px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={74} src={img_74} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1050" style={{
        position: "absolute",
        left: "421.5px",
        top: "350.22px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={75} src={img_75} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1051" style={{
        position: "absolute",
        left: "381.52px",
        top: "350.22px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={76} src={img_76} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1052" style={{
        position: "absolute",
        left: "341.54px",
        top: "350.22px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={77} src={img_77} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1053" style={{
        position: "absolute",
        left: "301.56px",
        top: "350.22px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={78} src={img_78} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1054" style={{
        position: "absolute",
        left: "261.59px",
        top: "350.22px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={79} src={img_79} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1055" style={{
        position: "absolute",
        left: "221.61px",
        top: "350.22px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={80} src={img_80} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1056" style={{
        position: "absolute",
        left: "181.63px",
        top: "350.22px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={81} src={img_81} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1057" style={{
        position: "absolute",
        left: "141.65px",
        top: "350.22px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={82} src={img_82} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1058" style={{
        position: "absolute",
        left: "1099.48px",
        top: "307.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={83} src={img_83} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1059" style={{
        position: "absolute",
        left: "1059.23px",
        top: "307.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={84} src={img_84} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1060" style={{
        position: "absolute",
        left: "1018.99px",
        top: "307.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={85} src={img_85} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1061" style={{
        position: "absolute",
        left: "978.75px",
        top: "307.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={86} src={img_86} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1062" style={{
        position: "absolute",
        left: "938.51px",
        top: "307.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={87} src={img_87} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1063" style={{
        position: "absolute",
        left: "898.26px",
        top: "307.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={88} src={img_88} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1064" style={{
        position: "absolute",
        left: "858.02px",
        top: "307.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={89} src={img_89} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1065" style={{
        position: "absolute",
        left: "817.78px",
        top: "307.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={90} src={img_90} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1066" style={{
        position: "absolute",
        left: "785.54px",
        top: "308.54px",
        width: "24px",
        height: "29.33px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={91} src={img_91} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1067" style={{
        position: "absolute",
        left: "433.93px",
        top: "394.33px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={92} src={img_92} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1068" style={{
        position: "absolute",
        left: "392.23px",
        top: "394.33px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={93} src={img_93} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1069" style={{
        position: "absolute",
        left: "350.53px",
        top: "394.33px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={94} src={img_94} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1070" style={{
        position: "absolute",
        left: "308.83px",
        top: "394.33px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={95} src={img_95} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1071" style={{
        position: "absolute",
        left: "267.13px",
        top: "394.33px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={96} src={img_96} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1072" style={{
        position: "absolute",
        left: "225.43px",
        top: "394.33px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={97} src={img_97} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1073" style={{
        position: "absolute",
        left: "183.73px",
        top: "394.33px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={98} src={img_98} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1074" style={{
        position: "absolute",
        left: "142.03px",
        top: "394.33px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={99} src={img_99} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1075" style={{
        position: "absolute",
        left: "1101.12px",
        top: "350.22px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={100} src={img_100} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1076" style={{
        position: "absolute",
        left: "1061.14px",
        top: "350.22px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={101} src={img_101} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1077" style={{
        position: "absolute",
        left: "1021.17px",
        top: "350.22px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={102} src={img_102} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1078" style={{
        position: "absolute",
        left: "981.19px",
        top: "350.22px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={103} src={img_103} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1079" style={{
        position: "absolute",
        left: "941.21px",
        top: "350.22px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={104} src={img_104} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1080" style={{
        position: "absolute",
        left: "901.23px",
        top: "350.22px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={105} src={img_105} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1081" style={{
        position: "absolute",
        left: "861.25px",
        top: "350.22px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={106} src={img_106} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1083" style={{
        position: "absolute",
        left: "821.28px",
        top: "350.22px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={107} src={img_107} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1085" style={{
        position: "absolute",
        left: "781.3px",
        top: "350.22px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={108} src={img_108} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 703" style={{
        position: "absolute",
        left: "741.32px",
        top: "350.22px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={109} src={img_109} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 705" style={{
        position: "absolute",
        left: "701.34px",
        top: "350.22px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={110} src={img_110} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 706" style={{
        position: "absolute",
        left: "1101.12px",
        top: "394.33px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={111} src={img_111} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 707" style={{
        position: "absolute",
        left: "1059.42px",
        top: "394.33px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={112} src={img_112} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 708" style={{
        position: "absolute",
        left: "1017.72px",
        top: "394.33px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={113} src={img_113} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 709" style={{
        position: "absolute",
        left: "976.02px",
        top: "394.33px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={114} src={img_114} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 710" style={{
        position: "absolute",
        left: "934.32px",
        top: "394.33px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={115} src={img_115} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 711" style={{
        position: "absolute",
        left: "892.62px",
        top: "394.33px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={116} src={img_116} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 712" style={{
        position: "absolute",
        left: "850.92px",
        top: "394.33px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={117} src={img_117} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 713" style={{
        position: "absolute",
        left: "809.23px",
        top: "394.33px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={118} src={img_118} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 714" style={{
        position: "absolute",
        left: "769.54px",
        top: "394.33px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={119} src={img_119} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 715" style={{
        position: "absolute",
        left: "725.83px",
        top: "394.33px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={120} src={img_120} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 716" style={{
        position: "absolute",
        left: "684.13px",
        top: "394.33px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={121} src={img_121} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 717" style={{
        position: "absolute",
        left: "642.43px",
        top: "394.33px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={122} src={img_122} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 718" style={{
        position: "absolute",
        left: "600.73px",
        top: "394.33px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={123} src={img_123} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 719" style={{
        position: "absolute",
        left: "559.03px",
        top: "394.33px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={124} src={img_124} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 720" style={{
        position: "absolute",
        left: "517.33px",
        top: "394.33px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={125} src={img_125} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 721" style={{
        position: "absolute",
        left: "475.63px",
        top: "394.33px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><div key={126} style={{
        position: "absolute",
        left: "560.54px",
        top: "152.68px",
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
          }}>{"\u0420"}</span><span style={{
            fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
            fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
            color: "#E4EAE9"
          }}>{"\u0430\u0437\u043D\u043E\u0435"}</span></p></div><img key={127} src={img_126} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 724" style={{
        position: "absolute",
        left: "267.53px",
        top: "487.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={128} src={img_127} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 726" style={{
        position: "absolute",
        left: "225.76px",
        top: "487.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={129} src={img_128} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 728" style={{
        position: "absolute",
        left: "183.98px",
        top: "487.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={130} src={img_129} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 730" style={{
        position: "absolute",
        left: "142.21px",
        top: "487.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={131} src={img_130} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 732" style={{
        position: "absolute",
        left: "1101.57px",
        top: "441.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={132} src={img_131} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 734" style={{
        position: "absolute",
        left: "1059.84px",
        top: "441.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={133} src={img_132} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 740" style={{
        position: "absolute",
        left: "1018.1px",
        top: "441.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={134} src={img_133} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 744" style={{
        position: "absolute",
        left: "976.37px",
        top: "441.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={135} src={img_134} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 746" style={{
        position: "absolute",
        left: "934.63px",
        top: "441.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={136} src={img_135} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 748" style={{
        position: "absolute",
        left: "892.89px",
        top: "441.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={137} src={img_136} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 750" style={{
        position: "absolute",
        left: "851.16px",
        top: "441.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={138} src={img_137} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 752" style={{
        position: "absolute",
        left: "809.42px",
        top: "441.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={139} src={img_138} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 754" style={{
        position: "absolute",
        left: "767.69px",
        top: "441.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={140} src={img_139} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 756" style={{
        position: "absolute",
        left: "725.95px",
        top: "441.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={141} src={img_140} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 760" style={{
        position: "absolute",
        left: "684.22px",
        top: "441.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={142} src={img_141} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 762" style={{
        position: "absolute",
        left: "642.48px",
        top: "441.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={143} src={img_142} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 764" style={{
        position: "absolute",
        left: "600.75px",
        top: "441.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={144} src={img_143} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 766" style={{
        position: "absolute",
        left: "559.01px",
        top: "441.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={145} src={img_144} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1282" style={{
        position: "absolute",
        left: "517.27px",
        top: "441.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={146} src={img_145} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1286" style={{
        position: "absolute",
        left: "475.54px",
        top: "441.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={147} src={img_146} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1290" style={{
        position: "absolute",
        left: "433.8px",
        top: "441.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={148} src={img_147} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1294" style={{
        position: "absolute",
        left: "392.07px",
        top: "441.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={149} src={img_148} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1297" style={{
        position: "absolute",
        left: "350.33px",
        top: "441.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={150} src={img_149} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1299" style={{
        position: "absolute",
        left: "308.6px",
        top: "441.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={151} src={img_150} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1301" style={{
        position: "absolute",
        left: "266.86px",
        top: "441.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={152} src={img_151} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1303" style={{
        position: "absolute",
        left: "225.12px",
        top: "441.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={153} src={img_152} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1305" style={{
        position: "absolute",
        left: "183.39px",
        top: "441.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={154} src={img_153} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1307" style={{
        position: "absolute",
        left: "141.65px",
        top: "441.78px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={155} src={img_154} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1309" style={{
        position: "absolute",
        left: "631.64px",
        top: "377.82px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={156} src={img_155} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1324" style={{
        position: "absolute",
        left: "477.18px",
        top: "569.74px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={157} src={img_156} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1326" style={{
        position: "absolute",
        left: "435.24px",
        top: "569.74px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={158} src={img_157} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1328" style={{
        position: "absolute",
        left: "393.3px",
        top: "569.74px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={159} src={img_158} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1330" style={{
        position: "absolute",
        left: "1106.28px",
        top: "569.74px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={160} src={img_159} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1332" style={{
        position: "absolute",
        left: "1064.34px",
        top: "569.74px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={161} src={img_160} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1334" style={{
        position: "absolute",
        left: "1022.4px",
        top: "569.74px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={162} src={img_161} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1336" style={{
        position: "absolute",
        left: "980.46px",
        top: "569.74px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={163} src={img_162} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1338" style={{
        position: "absolute",
        left: "938.52px",
        top: "569.74px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={164} src={img_163} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1340" style={{
        position: "absolute",
        left: "896.58px",
        top: "569.74px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={165} src={img_164} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1342" style={{
        position: "absolute",
        left: "854.64px",
        top: "569.74px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={166} src={img_165} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1344" style={{
        position: "absolute",
        left: "812.7px",
        top: "569.74px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={167} src={img_166} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1346" style={{
        position: "absolute",
        left: "770.76px",
        top: "569.74px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={168} src={img_167} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1348" style={{
        position: "absolute",
        left: "728.82px",
        top: "569.74px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={169} src={img_168} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1350" style={{
        position: "absolute",
        left: "686.88px",
        top: "569.74px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={170} src={img_169} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1352" style={{
        position: "absolute",
        left: "644.94px",
        top: "569.74px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={171} src={img_170} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1354" style={{
        position: "absolute",
        left: "603px",
        top: "569.74px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={172} src={img_171} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1356" style={{
        position: "absolute",
        left: "561.06px",
        top: "569.74px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={173} src={img_172} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1358" style={{
        position: "absolute",
        left: "519.12px",
        top: "569.74px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={174} src={img_173} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1360" style={{
        position: "absolute",
        left: "351.36px",
        top: "569.74px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={175} src={img_174} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1362" style={{
        position: "absolute",
        left: "309.41px",
        top: "569.74px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={176} src={img_175} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1370" style={{
        position: "absolute",
        left: "267.47px",
        top: "569.74px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={177} src={img_176} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1372" style={{
        position: "absolute",
        left: "225.53px",
        top: "569.74px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={178} src={img_177} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1374" style={{
        position: "absolute",
        left: "183.59px",
        top: "569.74px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={179} src={img_178} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1376" style={{
        position: "absolute",
        left: "141.65px",
        top: "569.74px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={180} src={img_179} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1378" style={{
        position: "absolute",
        left: "1106.28px",
        top: "526.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={181} src={img_180} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1380" style={{
        position: "absolute",
        left: "1064.34px",
        top: "526.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={182} src={img_181} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1382" style={{
        position: "absolute",
        left: "1022.4px",
        top: "526.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={183} src={img_182} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1384" style={{
        position: "absolute",
        left: "980.46px",
        top: "526.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={184} src={img_183} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1386" style={{
        position: "absolute",
        left: "938.52px",
        top: "526.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={185} src={img_184} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1388" style={{
        position: "absolute",
        left: "896.58px",
        top: "526.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={186} src={img_185} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1390" style={{
        position: "absolute",
        left: "854.64px",
        top: "526.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={187} src={img_186} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1392" style={{
        position: "absolute",
        left: "812.7px",
        top: "526.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={188} src={img_187} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1394" style={{
        position: "absolute",
        left: "770.76px",
        top: "526.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={189} src={img_188} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1396" style={{
        position: "absolute",
        left: "728.82px",
        top: "526.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={190} src={img_189} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1398" style={{
        position: "absolute",
        left: "686.88px",
        top: "526.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={191} src={img_190} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1400" style={{
        position: "absolute",
        left: "644.94px",
        top: "526.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={192} src={img_191} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1402" style={{
        position: "absolute",
        left: "603px",
        top: "526.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={193} src={img_192} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1404" style={{
        position: "absolute",
        left: "561.06px",
        top: "526.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={194} src={img_193} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1406" style={{
        position: "absolute",
        left: "519.12px",
        top: "526.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={195} src={img_194} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1408" style={{
        position: "absolute",
        left: "477.18px",
        top: "526.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={196} src={img_195} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1410" style={{
        position: "absolute",
        left: "435.24px",
        top: "526.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={197} src={img_196} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1412" style={{
        position: "absolute",
        left: "393.3px",
        top: "526.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={198} src={img_197} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1414" style={{
        position: "absolute",
        left: "351.36px",
        top: "526.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={199} src={img_198} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1416" style={{
        position: "absolute",
        left: "309.41px",
        top: "526.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={200} src={img_199} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1418" style={{
        position: "absolute",
        left: "267.47px",
        top: "526.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={201} src={img_200} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1420" style={{
        position: "absolute",
        left: "225.53px",
        top: "526.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={202} src={img_201} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1422" style={{
        position: "absolute",
        left: "183.59px",
        top: "526.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={203} src={img_202} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1424" style={{
        position: "absolute",
        left: "141.65px",
        top: "526.21px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={204} src={img_203} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1426" style={{
        position: "absolute",
        left: "1103.01px",
        top: "487.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={205} src={img_204} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1428" style={{
        position: "absolute",
        left: "1061.23px",
        top: "487.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={206} src={img_205} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1430" style={{
        position: "absolute",
        left: "1019.46px",
        top: "487.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={207} src={img_206} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1432" style={{
        position: "absolute",
        left: "977.69px",
        top: "487.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={208} src={img_207} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1434" style={{
        position: "absolute",
        left: "935.91px",
        top: "487.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={209} src={img_208} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1436" style={{
        position: "absolute",
        left: "894.14px",
        top: "487.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={210} src={img_209} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1438" style={{
        position: "absolute",
        left: "852.36px",
        top: "487.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={211} src={img_210} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1440" style={{
        position: "absolute",
        left: "810.59px",
        top: "487.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={212} src={img_211} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1442" style={{
        position: "absolute",
        left: "768.82px",
        top: "487.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={213} src={img_212} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1444" style={{
        position: "absolute",
        left: "727.04px",
        top: "487.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={214} src={img_213} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1446" style={{
        position: "absolute",
        left: "685.27px",
        top: "487.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={215} src={img_214} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1448" style={{
        position: "absolute",
        left: "643.5px",
        top: "487.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={216} src={img_215} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1450" style={{
        position: "absolute",
        left: "601.72px",
        top: "487.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={217} src={img_216} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1452" style={{
        position: "absolute",
        left: "559.95px",
        top: "487.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={218} src={img_217} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1454" style={{
        position: "absolute",
        left: "518.17px",
        top: "487.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={219} src={img_218} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1456" style={{
        position: "absolute",
        left: "476.4px",
        top: "487.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={220} src={img_219} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1458" style={{
        position: "absolute",
        left: "434.63px",
        top: "487.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={221} src={img_220} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1460" style={{
        position: "absolute",
        left: "392.85px",
        top: "487.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={222} src={img_221} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1462" style={{
        position: "absolute",
        left: "351.08px",
        top: "487.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={223} src={img_222} alt="\u0420\u0438\u0441\u0443\u043D\u043E\u043A 1464" style={{
        position: "absolute",
        left: "309.3px",
        top: "487.09px",
        width: "32px",
        height: "32px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><div key={224} style={{
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
export default Slide36;
