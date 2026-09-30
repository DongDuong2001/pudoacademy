"use client";

import React from "react";

interface DiagramProps {
  className?: string;
}

/**
 * DL-101: Sơ đồ đấu nối tủ điện an toàn 1 pha + Tiếp địa PE
 * Bản vẽ kỹ thuật điện chuẩn DIN/IEC: Đường nét sắc nét, độ tương phản cao, chuyển động êm dịu
 */
export const DiagramElectricalSafety: React.FC<DiagramProps> = ({ className }) => (
  <div className={`w-full overflow-x-auto border border-neutral-300 bg-white p-3.5 min-w-0 ${className || ""}`}>
    <div className="text-[9px] font-mono text-neutral-400 sm:hidden pb-1 text-right">
      ⟵ Vuốt ngang để xem toàn bộ sơ đồ ⟶
    </div>
    <div className="min-w-[640px]">
      <div className="text-[11px] font-mono font-bold text-neutral-800 mb-2.5 uppercase flex items-center justify-between border-b border-neutral-200 pb-1.5">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-900 rounded-full"></span>
          SƠ ĐỒ 1.1: ĐẤU NỐI NGUỒN CẤP ĐIỀU HÒA, APTOMAT CHỐNG GIẬT RCBO & TIẾP ĐỊA PE
        </span>
        <span className="text-[10px] text-blue-950 bg-blue-50 border border-blue-300 px-2 py-0.5 font-bold">
          BẢN VẼ KỸ THUẬT AN TOÀN
        </span>
      </div>
      <svg viewBox="0 0 700 230" className="w-full h-auto text-neutral-900 font-mono text-xs select-none">
        <defs>
          {/* Arrowhead markers */}
          <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#dc2626" />
          </marker>
          <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#2563eb" />
          </marker>
        </defs>

        {/* Nguồn lưới AC 220V */}
        <rect x="20" y="30" width="130" height="150" fill="#f8fafc" stroke="#1e293b" strokeWidth="1.5" />
        <text x="30" y="55" fontWeight="bold" fontSize="11" fill="#0f172a">NGUỒN LƯỚI 220V</text>
        <text x="32" y="85" fontSize="10" fontWeight="bold" fill="#dc2626">Pha Nóng (L - 220V)</text>
        <text x="32" y="125" fontSize="10" fontWeight="bold" fill="#2563eb">Pha Nguội (N - 0V)</text>
        <text x="32" y="165" fontSize="10" fontWeight="bold" fill="#16a34a">Tiếp địa (PE - 0V)</text>

        {/* Aptomat RCBO */}
        <rect x="210" y="35" width="150" height="120" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
        <rect x="210" y="35" width="150" height="24" fill="#0f172a" />
        <text x="220" y="51" fontWeight="bold" fontSize="11" fill="#ffffff">APTOMAT RCBO 2P</text>
        <text x="220" y="78" fontSize="9.5" fill="#334155" fontWeight="bold">Định mức tải: 20A / 220V</text>
        <text x="220" y="98" fontSize="9.5" fontWeight="bold" fill="#dc2626">Dòng rò ngắt: IΔn ≤ 30mA</text>
        <text x="220" y="118" fontSize="9" fill="#0f172a">Thời gian cắt: t &lt; 0.03s</text>
        <text x="220" y="138" fontSize="8.5" fill="#475569">Cuộn ZCT cảm ứng vi sai</text>

        {/* Thiết bị điều hòa */}
        <rect x="440" y="30" width="235" height="150" fill="#ffffff" stroke="#1e293b" strokeWidth="1.5" />
        <text x="450" y="55" fontWeight="bold" fontSize="11" fill="#0f172a">ĐIỀU HÒA KHÔNG KHÍ INVERTER</text>
        
        <rect x="450" y="70" width="95" height="90" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.5" />
        <text x="460" y="90" fontSize="10" fontWeight="bold" fill="#0369a1">DÀN LẠNH</text>
        <text x="460" y="112" fontSize="9" fill="#334155">Cầu đấu: 1 - 2 - 3</text>
        <text x="460" y="132" fontSize="8.5" fill="#64748b">Sensor & Quạt</text>

        <rect x="560" y="70" width="105" height="90" fill="#fff5f5" stroke="#e11d48" strokeWidth="1.5" />
        <text x="570" y="90" fontSize="10" fontWeight="bold" fill="#be123c">DÀN NÓNG</text>
        <text x="570" y="112" fontSize="9" fill="#334155">Khung vỏ kim loại</text>
        <text x="570" y="132" fontSize="8.5" fill="#64748b">Lốc nén & IPM</text>

        {/* Dây dẫn Pha Nóng (L - Đỏ) - Tĩnh với mũi tên */}
        <line x1="150" y1="80" x2="210" y2="80" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#arrow-red)" />
        <line x1="360" y1="80" x2="450" y2="80" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#arrow-red)" />

        {/* Dây dẫn Pha Nguội (N - Xanh) - Tĩnh với mũi tên */}
        <line x1="150" y1="120" x2="210" y2="120" stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#arrow-blue)" />
        <line x1="360" y1="120" x2="450" y2="120" stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#arrow-blue)" />

        {/* Dây Tiếp Địa PE (Xanh lá - Không giật rung) */}
        <line x1="150" y1="160" x2="665" y2="160" stroke="#16a34a" strokeWidth="2.5" />
        <circle cx="665" cy="160" r="4" fill="#16a34a" />
        <line x1="665" y1="160" x2="665" y2="200" stroke="#16a34a" strokeWidth="2.5" />

        {/* Ký hiệu đất chuẩn DIN/IEC */}
        <line x1="650" y1="200" x2="680" y2="200" stroke="#16a34a" strokeWidth="3" />
        <line x1="655" y1="205" x2="675" y2="205" stroke="#16a34a" strokeWidth="2.5" />
        <line x1="660" y1="210" x2="670" y2="210" stroke="#16a34a" strokeWidth="2" />
        <text x="460" y="208" fontSize="9.5" fontWeight="bold" fill="#15803d">
          Cọc tiếp địa an toàn: R_đất ≤ 4 Ω
        </text>
      </svg>
    </div>
  </div>
);

/**
 * DL-102: Chu trình nén hơi 4 thiết bị & Đo Superheat
 * Đường ống màu sắc phân vùng áp suất rõ ràng, sơ đồ tĩnh chuẩn giáo trình LaTeX
 */
export const DiagramRefrigerationCycle: React.FC<DiagramProps> = ({ className }) => (
  <div className={`w-full overflow-x-auto border border-neutral-300 bg-white p-3.5 min-w-0 ${className || ""}`}>
    <div className="text-[9px] font-mono text-neutral-400 sm:hidden pb-1 text-right">
      ⟵ Vuốt ngang để xem toàn bộ sơ đồ ⟶
    </div>
    <div className="min-w-[660px]">
      <div className="text-[11px] font-mono font-bold text-neutral-800 mb-2.5 uppercase flex items-center justify-between border-b border-neutral-200 pb-1.5">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-900 rounded-full"></span>
          SƠ ĐỒ 1.2: CHU TRÌNH NÉN HƠI 4 THIẾT BỊ CHÍNH (ĐỘ TƯƠNG PHẢN ÁP SUẤT CAO / THẤP)
        </span>
        <span className="text-[10px] text-blue-950 bg-blue-50 border border-blue-300 px-2 py-0.5 font-bold">
          CHU TRÌNH CARNOT THỰC TẾ
        </span>
      </div>
      <svg viewBox="0 0 720 260" className="w-full h-auto text-neutral-900 font-mono text-xs select-none">
        {/* Vùng Áp Suất Cao (Đỏ) */}
        <rect x="20" y="20" width="330" height="225" fill="#fef2f2" stroke="#f87171" strokeWidth="1.5" />
        <text x="30" y="40" fontSize="10.5" fontWeight="bold" fill="#dc2626">
          VÙNG ÁP SUẤT CAO (DÀN NÓNG • 350 - 450 PSI)
        </text>

        {/* Vùng Áp Suất Thấp (Xanh) */}
        <rect x="370" y="20" width="330" height="225" fill="#f0f9ff" stroke="#60a5fa" strokeWidth="1.5" />
        <text x="380" y="40" fontSize="10.5" fontWeight="bold" fill="#0284c7">
          VÙNG ÁP SUẤT THẤP (DÀN LẠNH • 125 - 150 PSI)
        </text>

        {/* 1. Máy nén (Compressor) */}
        <circle cx="360" cy="70" r="36" fill="#ffffff" stroke="#09090b" strokeWidth="2.5" />
        <text x="325" y="65" fontSize="10.5" fontWeight="bold" fill="#09090b">MÁY NÉN</text>
        <text x="325" y="80" fontSize="8.5" fill="#52525b">COMPRESSOR</text>

        {/* 2. Dàn Ngưng Tụ (Condenser) */}
        <rect x="60" y="70" width="145" height="70" fill="#ffffff" stroke="#dc2626" strokeWidth="2" />
        <text x="75" y="95" fontSize="10.5" fontWeight="bold" fill="#dc2626">DÀN NGƯNG TỤ</text>
        <text x="72" y="115" fontSize="9" fill="#475569">Tỏa nhiệt ra ngoài trời</text>
        <text x="72" y="128" fontSize="8" fill="#991b1b">Khí ngưng thành Lỏng</text>

        {/* 3. Tiết Lưu (EEV / Ống mao) */}
        <polygon points="360,185 345,200 375,200" fill="#ffffff" stroke="#09090b" strokeWidth="2" />
        <polygon points="360,215 345,200 375,200" fill="#ffffff" stroke="#09090b" strokeWidth="2" />
        <text x="315" y="235" fontSize="10" fontWeight="bold" fill="#09090b">VAN TIẾT LƯU (EEV)</text>

        {/* 4. Dàn Bay Hơi (Evaporator) */}
        <rect x="515" y="70" width="145" height="70" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
        <text x="530" y="95" fontSize="10.5" fontWeight="bold" fill="#0284c7">DÀN BAY HƠI</text>
        <text x="530" y="115" fontSize="9" fill="#475569">Hút nhiệt trong phòng</text>
        <text x="530" y="128" fontSize="8" fill="#0369a1">Lỏng sôi thành Hơi</text>

        {/* ĐƯỜNG ỐNG ĐỒNG TĨNH CHUẨN KỸ THUẬT */}
        {/* Máy nén -> Dàn ngưng: Hơi áp cao nóng (Đỏ) */}
        <path d="M 324 70 L 205 70" fill="none" stroke="#b91c1c" strokeWidth="3" />
        <text x="215" y="62" fontSize="9.5" fontWeight="bold" fill="#b91c1c">Hơi nóng 85°C ➔</text>

        {/* Dàn ngưng -> Tiết lưu: Lỏng áp cao */}
        <path d="M 132 140 L 132 200 L 345 200" fill="none" stroke="#dc2626" strokeWidth="2.5" />
        <text x="145" y="193" fontSize="9.5" fill="#dc2626">Lỏng cao áp 45°C ➔</text>

        {/* Tiết lưu -> Dàn lạnh: Giảm áp sôi */}
        <path d="M 375 200 L 588 200 L 588 140" fill="none" stroke="#0284c7" strokeWidth="2.5" />
        <text x="420" y="193" fontSize="9.5" fill="#0284c7">Sôi giảm áp 2°C - 5°C ➔</text>

        {/* Dàn lạnh -> Máy nén: Hơi quá nhiệt */}
        <path d="M 515 70 L 396 70" fill="none" stroke="#1d4ed8" strokeWidth="3" />
        <text x="415" y="62" fontSize="9.5" fontWeight="bold" fill="#1d4ed8">➔ Hơi quá nhiệt về lốc</text>

        {/* Điểm đo Superheat sắc nét, tĩnh */}
        <circle cx="455" cy="70" r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
        <text x="415" y="98" fontSize="9.5" fontWeight="bold" fill="#b45309">ĐIỂM ĐO SUPERHEAT</text>
        <text x="415" y="112" fontSize="8.5" fill="#18181b">T_ống - T_sôi = 5°C ~ 7°C</text>
      </svg>
    </div>
  </div>
);

/**
 * DL-103: Tiêu chuẩn mặt cắt kỹ thuật đầu loe lệch tâm 45°
 * Bản vẽ tĩnh rõ ràng, chính xác tỷ lệ, không giật lắc
 */
export const DiagramCopperFlaring: React.FC<DiagramProps> = ({ className }) => (
  <div className={`w-full overflow-x-auto border border-neutral-300 bg-white p-3.5 min-w-0 ${className || ""}`}>
    <div className="text-[9px] font-mono text-neutral-400 sm:hidden pb-1 text-right">
      ⟵ Vuốt ngang để xem toàn bộ sơ đồ ⟶
    </div>
    <div className="min-w-[640px]">
      <div className="text-[11px] font-mono font-bold text-neutral-800 mb-2.5 uppercase flex items-center justify-between border-b border-neutral-200 pb-1.5">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-900 rounded-full"></span>
          SƠ ĐỒ 1.3: TIÊU CHUẨN MẶT CẮT KỸ THUẬT ĐẦU LOE LỆCH TÂM 45° (ĐẠT CHUẨN VS LỖI)
        </span>
        <span className="text-[10px] text-blue-950 bg-blue-50 border border-blue-300 px-2 py-0.5 font-bold">
          BẢN VẼ MẶT CẮT KỸ THUẬT
        </span>
      </div>
      <svg viewBox="0 0 680 185" className="w-full h-auto text-neutral-900 font-mono text-xs select-none">
        {/* Hình A: ĐẦU LOE CHUẨN */}
        <g transform="translate(30, 15)">
          <rect x="0" y="0" width="190" height="155" fill="#fcfcfc" stroke="#15803d" strokeWidth="1.5" />
          <rect x="0" y="0" width="190" height="24" fill="#15803d" />
          <text x="10" y="16" fontWeight="bold" fontSize="10.5" fill="#ffffff">A. ĐẠT CHUẨN (PASS)</text>
          
          {/* Cặp kẹp loe */}
          <rect x="35" y="85" width="40" height="55" fill="#475569" stroke="#1e293b" />
          <rect x="115" y="85" width="40" height="55" fill="#475569" stroke="#1e293b" />
          <text x="40" y="115" fontSize="7.5" fill="#ffffff">Vam</text>
          <text x="120" y="115" fontSize="7.5" fill="#ffffff">Vam</text>
          
          {/* Thân ống đồng */}
          <rect x="75" y="85" width="40" height="55" fill="#d97706" stroke="#b45309" />
          <text x="80" y="115" fontSize="8" fontWeight="bold" fill="#ffffff">Ống Cu</text>
          
          {/* Miệng loe 45 độ chuẩn */}
          <polygon points="60,60 75,85 115,85 130,60" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />

          {/* Mũi côn vam lệch tâm (Tĩnh, rõ nét) */}
          <polygon points="95,58 75,28 115,28" fill="#334155" stroke="#0f172a" strokeWidth="1.5" />
          <line x1="95" y1="28" x2="95" y2="15" stroke="#0f172a" strokeWidth="3" />

          <text x="15" y="75" fontSize="8.5" fontWeight="bold" fill="#15803d">Góc loe 45° bóng mịn</text>
          <text x="15" y="145" fontSize="8.5" fill="#0f172a" fontWeight="bold">Cữ nhô chuẩn: 1.0 - 1.2mm</text>
        </g>

        {/* Hình B: LỖI NỨT MÉP */}
        <g transform="translate(245, 15)">
          <rect x="0" y="0" width="190" height="155" fill="#fff5f5" stroke="#b91c1c" strokeWidth="1.5" />
          <rect x="0" y="0" width="190" height="24" fill="#b91c1c" />
          <text x="10" y="16" fontWeight="bold" fontSize="10.5" fill="#ffffff">B. LỖI: NỨT MẶT LOE</text>
          
          <rect x="35" y="85" width="40" height="55" fill="#475569" />
          <rect x="115" y="85" width="40" height="55" fill="#475569" />
          <rect x="75" y="85" width="40" height="55" fill="#d97706" />
          
          {/* Loe quá to và nứt */}
          <polygon points="50,55 75,85 115,85 140,55" fill="#f59e0b" stroke="#b91c1c" strokeWidth="1.5" />
          <line x1="56" y1="58" x2="68" y2="72" stroke="#b91c1c" strokeWidth="2.5" />
          <line x1="134" y1="58" x2="122" y2="72" stroke="#b91c1c" strokeWidth="2.5" />
          
          <text x="12" y="48" fontSize="8.5" fontWeight="bold" fill="#b91c1c">Ống nhô quá cao (&gt; 2mm)</text>
          <text x="12" y="145" fontSize="8.5" fill="#b91c1c" fontWeight="bold">➔ Xì gas sau 24h chạy máy</text>
        </g>

        {/* Hình C: LỖI BAVIA */}
        <g transform="translate(460, 15)">
          <rect x="0" y="0" width="190" height="155" fill="#fff5f5" stroke="#b91c1c" strokeWidth="1.5" />
          <rect x="0" y="0" width="190" height="24" fill="#b91c1c" />
          <text x="10" y="16" fontWeight="bold" fontSize="10.5" fill="#ffffff">C. LỖI: CHƯA NẠO BAVIA</text>
          
          <rect x="35" y="85" width="40" height="55" fill="#475569" />
          <rect x="115" y="85" width="40" height="55" fill="#475569" />
          <rect x="75" y="85" width="40" height="55" fill="#d97706" />
          
          <polygon points="65,65 75,85 115,85 125,65" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
          {/* Ba via cộm nham nhở */}
          <circle cx="68" cy="67" r="3.5" fill="#09090b" />
          <circle cx="122" cy="67" r="3.5" fill="#09090b" />
          
          <text x="12" y="48" fontSize="8.5" fontWeight="bold" fill="#b91c1c">Mạt đồng kênh rắc-co</text>
          <text x="12" y="145" fontSize="8.5" fill="#b91c1c" fontWeight="bold">➔ Kênh xì & tắc bẩn lốc</text>
        </g>
      </svg>
    </div>
  </div>
);

/**
 * DL-201: Sơ đồ xác định 3 chân cọc lốc C - R - S và mạch đấu tụ ngậm
 * Dòng điện đi rõ ràng, mạch đấu trực quan
 */
export const DiagramCompressorWiring: React.FC<DiagramProps> = ({ className }) => (
  <div className={`w-full overflow-x-auto border border-neutral-300 bg-white p-3.5 min-w-0 ${className || ""}`}>
    <div className="text-[9px] font-mono text-neutral-400 sm:hidden pb-1 text-right">
      ⟵ Vuốt ngang để xem toàn bộ sơ đồ ⟶
    </div>
    <div className="min-w-[640px]">
      <div className="text-[11px] font-mono font-bold text-neutral-800 mb-2.5 uppercase flex items-center justify-between border-b border-neutral-200 pb-1.5">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-900 rounded-full"></span>
          SƠ ĐỒ 1.5: TAM GIÁC ĐIỆN TRỞ C-R-S VÀ MẠCH ĐẤU TỤ NGẬM CHO MÁY NÉN MONO (DL-105)
        </span>
        <span className="text-[10px] text-blue-950 bg-blue-50 border border-blue-300 px-2 py-0.5 font-bold">
          QUY TẮC ĐO VOM VÀ ĐẤU DÂY
        </span>
      </div>
      <svg viewBox="0 0 680 200" className="w-full h-auto text-neutral-900 font-mono text-xs select-none">
        {/* Khối tam giác 3 chân lốc */}
        <g transform="translate(30, 15)">
          <rect x="0" y="0" width="280" height="170" fill="#f8fafc" stroke="#334155" strokeWidth="1.5" />
          <rect x="0" y="0" width="280" height="24" fill="#0f172a" />
          <text x="12" y="16" fontWeight="bold" fontSize="10" fill="#ffffff">
            1. NGUYÊN TẮC: R_CR + R_CS = R_RS
          </text>

          {/* Chân C ở đỉnh */}
          <circle cx="140" cy="58" r="14" fill="#1e3a8a" />
          <text x="135" y="63" fontWeight="bold" fill="#ffffff" fontSize="12">C</text>
          <text x="100" y="40" fontSize="9.5" fontWeight="bold" fill="#1e3a8a">Chung (Common)</text>

          {/* Chân R dưới trái */}
          <circle cx="70" cy="130" r="14" fill="#047857" />
          <text x="65" y="135" fontWeight="bold" fill="#ffffff" fontSize="12">R</text>
          <text x="45" y="155" fontSize="9.5" fontWeight="bold" fill="#047857">Chạy (Run)</text>

          {/* Chân S dưới phải */}
          <circle cx="210" cy="130" r="14" fill="#b91c1c" />
          <text x="206" y="135" fontWeight="bold" fill="#ffffff" fontSize="12">S</text>
          <text x="195" y="155" fontSize="9.5" fontWeight="bold" fill="#b91c1c">Đề (Start)</text>

          {/* Đường nối và điện trở mẫu */}
          <line x1="130" y1="68" x2="80" y2="120" stroke="#047857" strokeWidth="2" />
          <text x="65" y="90" fontSize="9.5" fontWeight="bold" fill="#047857">R_CR = 2.5 Ω</text>

          <line x1="150" y1="68" x2="200" y2="120" stroke="#b91c1c" strokeWidth="2" />
          <text x="180" y="90" fontSize="9.5" fontWeight="bold" fill="#b91c1c">R_CS = 4.0 Ω</text>

          <line x1="84" y1="130" x2="196" y2="130" stroke="#dc2626" strokeWidth="2.5" />
          <text x="105" y="125" fontSize="9.5" fontWeight="bold" fill="#dc2626">R_RS = 6.5 Ω (Cặp lớn nhất)</text>
        </g>

        {/* Khối mạch đấu tụ ngậm */}
        <g transform="translate(340, 15)">
          <rect x="0" y="0" width="310" height="170" fill="#ffffff" stroke="#334155" strokeWidth="1.5" />
          <rect x="0" y="0" width="310" height="24" fill="#0f172a" />
          <text x="12" y="16" fontWeight="bold" fontSize="10" fill="#ffffff">
            2. MẠCH ĐẤU TỤ NGẬM & RƠ-LE OLP
          </text>

          {/* Nguồn AC */}
          <text x="15" y="55" fontSize="10" fontWeight="bold" fill="#dc2626">PHA NÓNG (L)</text>
          <text x="15" y="135" fontSize="10" fontWeight="bold" fill="#2563eb">PHA NGUỘI (N)</text>

          {/* Rơ le nhiệt OLP */}
          <rect x="100" y="42" width="55" height="25" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
          <text x="106" y="58" fontSize="9.5" fontWeight="bold" fill="#854d0e">RƠ-LE OLP</text>

          {/* Nối từ L -> OLP -> Chân C */}
          <line x1="88" y1="55" x2="100" y2="55" stroke="#dc2626" strokeWidth="2.5" />
          <line x1="155" y1="55" x2="225" y2="55" stroke="#dc2626" strokeWidth="2.5" />
          <text x="230" y="59" fontSize="11" fontWeight="bold" fill="#1e3a8a">➔ Chân C</text>

          {/* Tụ Ngậm (Capacitor 35µF) */}
          <rect x="120" y="95" width="65" height="45" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
          <text x="128" y="115" fontSize="9.5" fontWeight="bold" fill="#0369a1">TỤ NGẬM</text>
          <text x="128" y="130" fontSize="8.5" fill="#0369a1">35µF - 450V</text>

          {/* Dây N -> Chân R và 1 cực tụ */}
          <line x1="90" y1="135" x2="120" y2="135" stroke="#2563eb" strokeWidth="2.5" />
          <line x1="120" y1="135" x2="225" y2="135" stroke="#2563eb" strokeWidth="2.5" />
          <text x="230" y="139" fontSize="11" fontWeight="bold" fill="#047857">➔ Chân R</text>

          {/* Cực còn lại của tụ -> Chân S */}
          <line x1="185" y1="110" x2="225" y2="110" stroke="#b91c1c" strokeWidth="2.5" />
          <text x="230" y="114" fontSize="11" fontWeight="bold" fill="#b91c1c">➔ Chân S</text>
        </g>
      </svg>
    </div>
  </div>
);

/**
 * DL-106: Sơ đồ trạm hút chân không sâu <500 Micron
 */
export const DiagramVacuumStation: React.FC<DiagramProps> = ({ className }) => (
  <div className={`w-full overflow-x-auto border border-neutral-300 bg-white p-3.5 min-w-0 ${className || ""}`}>
    <div className="text-[9px] font-mono text-neutral-400 sm:hidden pb-1 text-right">
      ⟵ Vuốt ngang để xem toàn bộ sơ đồ ⟶
    </div>
    <div className="min-w-[640px]">
      <div className="text-[11px] font-mono font-bold text-neutral-800 mb-2.5 uppercase flex items-center justify-between border-b border-neutral-200 pb-1.5">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-900 rounded-full"></span>
          SƠ ĐỒ 1.6: KẾT NỐI HỆ THỐNG HÚT CHÂN KHÔNG SÂU & ĐO MICRON GAUGE (DL-106)
        </span>
        <span className="text-[10px] text-blue-950 bg-blue-50 border border-blue-300 px-2 py-0.5 font-bold">
          TIÊU CHUẨN ĐỘ ẨM &lt; 500 MICRON
        </span>
      </div>
      <svg viewBox="0 0 680 185" className="w-full h-auto text-neutral-900 font-mono text-xs select-none">
        {/* Bơm hút chân không 2 cấp */}
        <rect x="30" y="35" width="135" height="95" fill="#f8fafc" stroke="#0f172a" strokeWidth="1.5" />
        <rect x="30" y="35" width="135" height="22" fill="#0f172a" />
        <text x="38" y="50" fontWeight="bold" fontSize="10" fill="#ffffff">BƠM CHÂN KHÔNG</text>
        <text x="40" y="78" fontSize="9.5" fill="#475569">2 Cấp (Dual Stage)</text>
        <text x="40" y="100" fontSize="9.5" fill="#15803d" fontWeight="bold">Hút sâu &lt; 50 Micron</text>

        {/* Khí xả ra khỏi bơm */}
        <path d="M 60 35 L 60 18" stroke="#64748b" strokeWidth="2" strokeDasharray="3 2" />
        <text x="70" y="24" fontSize="8.5" fill="#475569">Khí xả ra ➔</text>

        {/* Đồng hồ Micron Gauge */}
        <circle cx="230" cy="85" r="28" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
        <text x="210" y="80" fontSize="8.5" fontWeight="bold" fill="#2563eb">MICRON</text>
        <text x="210" y="96" fontSize="11" fontWeight="bold" fill="#b91c1c">450 µ</text>

        {/* Đồng hồ Manifold đôi */}
        <rect x="310" y="35" width="145" height="95" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
        <rect x="310" y="35" width="145" height="22" fill="#0f172a" />
        <text x="320" y="50" fontWeight="bold" fontSize="10" fill="#ffffff">ĐỒNG HỒ MANIFOLD</text>
        <circle cx="345" cy="92" r="18" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.5" />
        <text x="333" y="96" fontSize="8.5" fill="#0284c7" fontWeight="bold">ÁP THẤP</text>
        <circle cx="410" cy="92" r="18" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="401" y="96" fontSize="8.5" fill="#dc2626" fontWeight="bold">ÁP CAO</text>

        {/* Dàn nóng điều hòa */}
        <rect x="510" y="30" width="145" height="110" fill="#fefce8" stroke="#ca8a04" strokeWidth="1.5" />
        <rect x="510" y="30" width="145" height="22" fill="#ca8a04" />
        <text x="518" y="46" fontWeight="bold" fontSize="9.5" fill="#ffffff">DÀN NÓNG (VAN 3 NGẢ)</text>
        <circle cx="530" cy="85" r="6" fill="#1e3a8a" />
        <text x="545" y="88" fontSize="9.5" fill="#18181b">Đầu ti nạp Ø8</text>

        {/* Đường ống kết nối - Solid sạch sẽ */}
        <line x1="165" y1="85" x2="202" y2="85" stroke="#15803d" strokeWidth="2.5" />
        <line x1="258" y1="85" x2="310" y2="85" stroke="#15803d" strokeWidth="2.5" />
        <line x1="455" y1="85" x2="524" y2="85" stroke="#0284c7" strokeWidth="2.5" />

        <text x="130" y="165" fontSize="9.5" fontWeight="bold" fill="#15803d">
          * Tiêu chuẩn: Đồng hồ điện tử Micron &lt; 500 Micron và khóa van giữ áp 15 phút không tăng áp.
        </text>
      </svg>
    </div>
  </div>
);
