"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DiagramElectricalSafety } from "@/features/docs-reader/components/TechnicalDiagrams";
import {
  GraduationCap,
  Award,
  Sparkles,
  CheckCircle,
  BookOpen,
  ChevronRight,
  Profile,
} from "reicon-react";
import Image from "next/image";

interface LandingPageProps {
  onNavigate: (view: "CURRICULUM" | "LESSON" | "QUIZ" | "EXAM" | "CHEATSHEET", subjectCode?: string) => void;
  onOpenProfile: () => void;
  onOpenAuth?: (tab: "LOGIN" | "REGISTER") => void;
  onEnterDashboard: () => void;
  studentName?: string;
  readinessPercent?: number;
  isLoggedIn?: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenProfile,
  onOpenAuth,
  onEnterDashboard,
  studentName = "Học viên Pudo",
  readinessPercent = 0,
  isLoggedIn = false,
}) => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans flex flex-col">
      {/* ============================================================== */}
      {/* 0. DEDICATED LANDING TOPBAR NAVIGATION */}
      {/* ============================================================== */}
      <nav className="sticky top-0 z-40 w-full h-14 sm:h-15 bg-white/95 backdrop-blur-xs border-b border-neutral-300 flex items-center justify-between px-3 sm:px-8 gap-2 select-none">
        {/* Brand with Circular Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-neutral-300 overflow-hidden bg-white shrink-0 p-0.5 shadow-xs flex items-center justify-center">
            <Image
              src="/logo/pudo_academy_logo_round.png"
              alt="PUDO ACADEMY"
              width={40}
              height={40}
              className="w-full h-full object-cover rounded-full"
              priority
            />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-black text-xs sm:text-sm tracking-wider text-neutral-950 uppercase leading-none truncate">
                PUDO ACADEMY
              </span>
              <span className="hidden sm:inline-block text-[9px] px-1 py-0.2 bg-amber-100 text-amber-900 border border-amber-300 font-mono font-bold leading-none shrink-0">
                CAO ĐẲNG 3 NĂM
              </span>
            </div>
            <span className="hidden sm:block text-[10px] font-mono text-neutral-500 uppercase tracking-tight mt-0.5 truncate">
              Cẩm nang tiền đề • Kỹ thuật Điện - Điện Lạnh
            </span>
          </div>
        </div>

        {/* Anchor Links */}
        <div className="hidden lg:flex items-center gap-5 text-xs font-mono font-bold text-neutral-700">
          <a href="#lo-trinh-3-nam" className="hover:text-blue-950 transition-colors">
            1. LỘ TRÌNH 3 NĂM
          </a>
          <a href="#so-do-nguyen-ly" className="hover:text-blue-950 transition-colors">
            2. BẢN VẼ SƠ ĐỒ MẠCH
          </a>
          <a href="#he-thong-thi" className="hover:text-blue-950 transition-colors">
            3. THI HẾT MÔN & TOÁN
          </a>
          <a href="#flashcard" className="hover:text-blue-950 transition-colors">
            4. FLASHCARD
          </a>
          <a href="#cheatsheet-so-tay" className="hover:text-blue-950 text-blue-900 transition-colors">
            5. SỔ TAY CHEATSHEET
          </a>
        </div>

        {/* Right Auth / Dashboard CTAs */}
        <div className="flex items-center gap-2 shrink-0">
          {!isLoggedIn ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onOpenAuth?.("LOGIN")}
                className="font-mono text-xs border-neutral-400 text-neutral-800 hidden sm:inline-flex"
              >
                ĐĂNG NHẬP
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onOpenAuth?.("REGISTER")}
                className="font-mono text-xs border-neutral-900 text-neutral-950 font-bold hidden sm:inline-flex"
              >
                ĐĂNG KÝ
              </Button>
            </>
          ) : (
            <button
              type="button"
              onClick={onOpenProfile}
              className="flex items-center gap-2 border border-neutral-300 bg-neutral-50 p-1 sm:px-2.5 sm:py-1 font-mono text-left cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-blue-950 text-white flex items-center justify-center font-bold text-[10px]">
                {studentName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block text-xs">
                <span className="font-bold text-neutral-950">{studentName}</span>
                <span className="text-[10px] text-emerald-700 ml-1.5 font-bold">({readinessPercent}%)</span>
              </div>
            </button>
          )}

          <Button
            variant="primary"
            size="sm"
            onClick={onEnterDashboard}
            className="font-mono text-xs font-bold bg-blue-950 hover:bg-neutral-900 text-white flex items-center gap-1.5 shadow-xs"
          >
            <span>VÀO HỌC NGAY</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </nav>

      {/* Main Landing Body */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-16">
        {/* ============================================================== */}
        {/* 1. HERO BANNER: TỔNG QUAN HÀNH TRANG TIỀN ĐỀ */}
        {/* ============================================================== */}
        <section className="border-2 border-neutral-900 bg-white p-4 sm:p-8 md:p-10 relative overflow-hidden">
          <div className="relative z-10 space-y-4 sm:space-y-5 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] sm:text-xs font-black bg-blue-950 text-white px-2 py-0.5 sm:px-2.5 sm:py-1 uppercase tracking-wider">
                PUDO REFRIGERATION ACADEMY
              </span>
              <Badge variant="warning" size="sm">
                TIỀN ĐỀ CHÍNH QUY • CAO ĐẲNG 3 NĂM
              </Badge>
              {isLoggedIn && (
                <span className="font-mono text-xs bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                  TÀI KHOẢN ĐÃ ĐĂNG NHẬP
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-neutral-950 uppercase tracking-tight leading-tight break-words">
              Xây Dựng Nền Móng Kỹ Thuật Điện Lạnh Vững Chắc Trước Khi Vào Giảng Đường
            </h1>

            <p className="text-xs sm:text-base text-neutral-700 leading-relaxed max-w-3xl">
              Không phải là một khóa học hình thức, <strong>Pudo Academy</strong> được thiết kế như một cẩm nang rèn luyện thực chiến tại gia cho học viên chuẩn bị bước vào <strong>Hệ Cao Đẳng Kỹ thuật Nhiệt - Điện Lạnh chính quy 3 năm (6 Học kỳ)</strong>. Nắm chắc bản chất vật lý nhiệt động học, sơ đồ bo mạch biến tần và an toàn đo kiểm hiện trường trước khi bước vào trường nghề.
            </p>

            {/* Student Quick Status Card */}
            <div className="p-3 sm:p-3.5 bg-neutral-100 border border-neutral-300 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-950 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {studentName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <span className="text-neutral-500 uppercase text-[10px] sm:text-xs">HỌC VIÊN:</span>
                  <span className="font-black text-neutral-950 ml-1.5 truncate">{studentName}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="text-[11px] sm:text-xs">
                  <span className="text-neutral-500">SẴN SÀNG:</span>
                  <span className="font-black text-blue-950 ml-1.5 text-xs sm:text-sm">{readinessPercent}%</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onOpenProfile}
                  className="h-7 text-[10px] sm:text-[11px] font-mono border-neutral-400"
                >
                  HỒ SƠ
                </Button>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={onEnterDashboard}
                className="font-mono text-xs sm:text-sm font-bold flex items-center justify-center gap-2 bg-blue-950 hover:bg-neutral-900 w-full sm:w-auto"
              >
                <GraduationCap className="w-4 h-4" />
                <span>VÀO HỌC NGAY (BẢN ĐỒ 6 HỌC KỲ) ➔</span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  onEnterDashboard();
                  onNavigate("EXAM", "dl-101");
                }}
                className="font-mono text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-neutral-900 w-full sm:w-auto"
              >
                <Award className="w-4 h-4 text-amber-500" />
                <span>LÀM ĐỀ THI HẾT MÔN (TOÁN & MẠCH)</span>
              </Button>

              {!isLoggedIn && (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => onOpenAuth?.("REGISTER")}
                  className="font-mono text-xs sm:text-sm flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <Profile className="w-4 h-4" />
                  <span>ĐĂNG KÝ TÀI KHOẢN HỌC VIÊN</span>
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 2. VALUE PROPOSITION: TẠI SAO CẦN ÔN LUYỆN TRƯỚC */}
        {/* ============================================================== */}
        <section className="space-y-4">
          <div className="border-b-2 border-neutral-900 pb-2">
            <span className="font-mono text-xs font-bold bg-neutral-900 text-white px-2 py-0.5">
              MỤC TIÊU HUẤN LUYỆN
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 uppercase mt-1">
              Học Thật - Hiểu Bản Chất - Không Học Vẹt
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white border border-neutral-300 space-y-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-bold text-sm text-neutral-950 uppercase">
                Bản Chất Vật Lý & Toán Kỹ Thuật
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Biết cách tính dòng định mức theo công suất điện, tính dòng đề ba khởi động và độ quá nhiệt Superheat để nạp gas đúng kỹ thuật chuẩn xác.
              </p>
            </div>

            <div className="p-4 bg-white border border-neutral-300 space-y-2">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-bold text-sm text-neutral-950 uppercase">
                Đọc Bản Vẽ Sơ Đồ Bo Mạch Inverter
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Phân tích đường đi dòng điện AC 220V, khối chỉnh lưu tụ lọc 300V DC, mạch giao tiếp Data 3 dây (Lỗi U4 Daikin) và chân điều khiển IPM.
              </p>
            </div>

            <div className="p-4 bg-white border border-neutral-300 space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-bold text-sm text-neutral-950 uppercase">
                An Toàn Nghề Nghiệp Tuyệt Đối
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Nắm chắc kỹ thuật đo VOM an toàn (không nổ que đo), lắp đặt cọc tiếp địa PE tiêu chuẩn điện trở đất R_đất ≤ 4 Ω và nguyên lý ngắt RCBO 30mA.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 3. INTERACTIVE TECHNICAL BLUEPRINT PREVIEW */}
        {/* ============================================================== */}
        <section id="so-do-nguyen-ly" className="space-y-4">
          <div className="border-b-2 border-neutral-900 pb-2 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="font-mono text-xs font-bold bg-neutral-900 text-white px-2 py-0.5">
                TRỰC QUAN HÓA BẢN VẼ
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 uppercase mt-1">
                Sơ Đồ Nguyên Lý Điện Lạnh Cao Độ Tương Phản
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onEnterDashboard();
                onNavigate("LESSON");
              }}
              className="font-mono text-xs"
            >
              VÀO XEM TOÀN BỘ SƠ ĐỒ ➔
            </Button>
          </div>

          <p className="text-xs text-neutral-600 leading-relaxed">
            Các sơ đồ được vẽ theo phong cách bản vẽ kỹ thuật điện tử công nghiệp: Độ tương phản cao, phân biệt rõ dây Nóng (Đỏ), Trung tính (Xanh), Tiếp địa PE (Xanh lá) và đường truyền xung Data (Cam).
          </p>

          <div className="space-y-4">
            <DiagramElectricalSafety />
          </div>
        </section>

        {/* ============================================================== */}
        {/* 4. LỘ TRÌNH ĐÀO TẠO 3 NĂM (6 HỌC KỲ) */}
        {/* ============================================================== */}
        <section id="lo-trinh-3-nam" className="space-y-5">
          <div className="border-b-2 border-neutral-900 pb-2">
            <span className="font-mono text-xs font-bold bg-neutral-900 text-white px-2 py-0.5">
              CHƯƠNG TRÌNH CAO ĐẲNG CHÍNH QUY (3 NĂM)
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 uppercase mt-1">
              Phân Bổ Môn Học Hợp Lý Cho 3 Năm Học Tập
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* YEAR 1 */}
            <div className="border-2 border-neutral-900 bg-white p-4 space-y-3">
              <div className="border-b border-neutral-300 pb-2">
                <span className="font-mono text-[11px] font-black bg-blue-950 text-white px-2 py-0.5 uppercase">
                  NĂM THỨ NHẤT
                </span>
                <h3 className="text-sm font-black text-neutral-950 uppercase mt-1.5">
                  ĐẶT MÓNG NỀN TẢNG KỸ THUẬT
                </h3>
                <p className="text-[11px] text-neutral-600 mt-1">
                  Nắm vững bản chất điện gia dụng, chu trình nhiệt và cơ khí gia công ống
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-2.5 bg-neutral-50 border border-neutral-200 space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-[11px] font-bold text-neutral-900">
                    <span>HỌC KỲ 1 (ĐIỆN & CƠ SỞ)</span>
                    <span className="text-blue-950">3 MÔN</span>
                  </div>
                  <ul className="text-xs space-y-1 text-neutral-700">
                    <li>• <strong>DL-101:</strong> An toàn điện & Thiết bị đóng cắt RCBO</li>
                    <li>• <strong>DL-102:</strong> Nhiệt động lực học & Chu trình Carnot</li>
                    <li>• <strong>DL-103:</strong> Gia công ống đồng, Loe & Hàn hơi Oxy-Gas</li>
                  </ul>
                </div>

                <div className="p-2.5 bg-neutral-50 border border-neutral-200 space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-[11px] font-bold text-neutral-900">
                    <span>HỌC KỲ 2 (KHÍ CỤ & MÁY ĐIỆN)</span>
                    <span className="text-blue-950">3 MÔN</span>
                  </div>
                  <ul className="text-xs space-y-1 text-neutral-700">
                    <li>• <strong>DL-104:</strong> Khí cụ điện: Contactor, Rơ le nhiệt, Timer</li>
                    <li>• <strong>DL-105:</strong> Động cơ 1 pha: Cọc lốc C-R-S & Tụ ngậm</li>
                    <li>• <strong>DL-106:</strong> Môi chất lạnh R32, R410A, R600a & Bảng P-T</li>
                  </ul>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onEnterDashboard();
                  onNavigate("CURRICULUM");
                }}
                className="w-full text-xs font-mono font-bold border-blue-950 text-blue-950"
              >
                KHÁM PHÁ NĂM 1 ➔
              </Button>
            </div>

            {/* YEAR 2 */}
            <div className="border-2 border-neutral-900 bg-white p-4 space-y-3">
              <div className="border-b border-neutral-300 pb-2">
                <span className="font-mono text-[11px] font-black bg-amber-600 text-white px-2 py-0.5 uppercase">
                  NĂM THỨ HAI
                </span>
                <h3 className="text-sm font-black text-neutral-950 uppercase mt-1.5">
                  THIẾT BỊ DÂN DỤNG & BO BIẾN TẦN
                </h3>
                <p className="text-[11px] text-neutral-600 mt-1">
                  Làm chủ thiết bị gia dụng và chinh phục mạch Inverter chuyên sâu
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-2.5 bg-neutral-50 border border-neutral-200 space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-[11px] font-bold text-neutral-900">
                    <span>HỌC KỲ 3 (TỦ LẠNH & ĐIỆN TỬ)</span>
                    <span className="text-blue-950">3 MÔN</span>
                  </div>
                  <ul className="text-xs space-y-1 text-neutral-700">
                    <li>• <strong>DL-201:</strong> Tủ lạnh xả đá & Cân cáp R600a</li>
                    <li>• <strong>DL-202:</strong> Lắp đặt điều hòa Mono & Bẫy dầu</li>
                    <li>• <strong>DL-203:</strong> Điện tử cơ bản: Diode, Opto, Triac</li>
                  </ul>
                </div>

                <div className="p-2.5 bg-neutral-50 border border-neutral-200 space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-[11px] font-bold text-neutral-900">
                    <span>HỌC KỲ 4 (BO INVERTER & SKYAIR)</span>
                    <span className="text-blue-950">3 MÔN</span>
                  </div>
                  <ul className="text-xs space-y-1 text-neutral-700">
                    <li>• <strong>DL-204:</strong> Khối công suất IPM & Nguồn xung</li>
                    <li>• <strong>DL-205:</strong> Mạch giao tiếp Data 3 dây (Lỗi U4)</li>
                    <li>• <strong>DL-206:</strong> Điều hòa SkyAir & Multi-Split</li>
                  </ul>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onEnterDashboard();
                  onNavigate("CURRICULUM");
                }}
                className="w-full text-xs font-mono font-bold border-amber-600 text-amber-900"
              >
                KHÁM PHÁ NĂM 2 ➔
              </Button>
            </div>

            {/* YEAR 3 */}
            <div className="border-2 border-neutral-900 bg-white p-4 space-y-3">
              <div className="border-b border-neutral-300 pb-2">
                <span className="font-mono text-[11px] font-black bg-emerald-700 text-white px-2 py-0.5 uppercase">
                  NĂM THỨ BA
                </span>
                <h3 className="text-sm font-black text-neutral-950 uppercase mt-1.5">
                  VRV/VRF, KHO LẠNH & ĐỒ ÁN TỐT NGHIỆP
                </h3>
                <p className="text-[11px] text-neutral-600 mt-1">
                  Cấp độ kỹ sư công trình: Hệ thống tòa nhà, BMS & Đồ án thực chiến
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-2.5 bg-neutral-50 border border-neutral-200 space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-[11px] font-bold text-neutral-900">
                    <span>HỌC KỲ 5 (VRV & KHO LẠNH BMS)</span>
                    <span className="text-blue-950">3 MÔN</span>
                  </div>
                  <ul className="text-xs space-y-1 text-neutral-700">
                    <li>• <strong>DL-301:</strong> Điều hòa trung tâm VRV / VRF</li>
                    <li>• <strong>DL-302:</strong> Kho lạnh công nghiệp & Chiller</li>
                    <li>• <strong>DL-303:</strong> Tự động hóa BMS Modbus/BACnet</li>
                  </ul>
                </div>

                <div className="p-2.5 bg-neutral-50 border border-neutral-200 space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-[11px] font-bold text-neutral-900">
                    <span>HỌC KỲ 6 (DỰ TOÁN & ĐỒ ÁN)</span>
                    <span className="text-blue-950">3 MÔN</span>
                  </div>
                  <ul className="text-xs space-y-1 text-neutral-700">
                    <li>• <strong>DL-304:</strong> Thu hồi gas & Bóc tách dự toán MEP</li>
                    <li>• <strong>DL-305:</strong> Thực tập thực tế tại doanh nghiệp</li>
                    <li>• <strong>DL-306:</strong> Đồ án tốt nghiệp thiết kế HVAC</li>
                  </ul>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onEnterDashboard();
                  onNavigate("CURRICULUM");
                }}
                className="w-full text-xs font-mono font-bold border-emerald-700 text-emerald-900"
              >
                KHÁM PHÁ NĂM 3 ➔
              </Button>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 5. CÁC TÍNH NĂNG TƯƠNG TÁC ĐẶC TRƯNG */}
        {/* ============================================================== */}
        <section id="he-thong-thi" className="space-y-4">
          <div className="border-b-2 border-neutral-900 pb-2">
            <span className="font-mono text-xs font-bold bg-neutral-900 text-white px-2 py-0.5">
              CÔNG CỤ HỌC TẬP THỰC CHIẾN
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 uppercase mt-1">
              Đề Thi Chuẩn Chỉnh, Toán Kỹ Thuật & Flashcard Phản Xạ
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Feature 1 */}
            <div className="p-5 bg-white border border-neutral-300 space-y-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-sm text-neutral-950 uppercase">
                  Đề Thi Hết Môn Đầy Đủ 3 Phần & Sinh Đề Random
                </h3>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Mỗi môn học có đề thi chuẩn chỉnh:
                <br />• <strong>Trắc nghiệm:</strong> Xử lý tình huống hiện trường (chấm điểm tự động).
                <br />• <strong>Toán Kỹ thuật Tự luận:</strong> Tính dòng định mức, dòng đề ba, độ quá nhiệt Superheat, thời gian xả tụ <span className="font-mono font-bold bg-neutral-100 px-1 py-0.5 border border-neutral-300">τ = R · C</span>.
                <br />• <strong>Sơ đồ mạch điện:</strong> Phân tích đường đi dòng điện và bắt pan trên mạch thật.
                <br />• Hỗ trợ nút <strong>&quot;SINH ĐỀ THI MỚI (RANDOM)&quot;</strong> để luyện tập không giới hạn.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onEnterDashboard();
                  onNavigate("EXAM", "dl-101");
                }}
                className="font-mono text-xs font-bold"
              >
                LÀM THỬ ĐỀ THI MÔN DL-101 ➔
              </Button>
            </div>

            {/* Feature 2 */}
            <div id="flashcard" className="p-5 bg-white border border-neutral-300 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-sm text-neutral-950 uppercase">
                  Flashcard Nhớ Nhanh & Trắc Nghiệm Tình Huống
                </h3>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Phương pháp <strong>Active Recall</strong> giúp học viên thuộc lòng các thông số cốt lõi:
                <br />• Giá trị điện trở tiếp địa an toàn chuẩn (<span className="font-mono font-bold bg-neutral-100 px-1 py-0.5 border border-neutral-300">R_đất ≤ 4 Ω</span>).
                <br />• Áp suất hút làm việc của gas R32 (135 - 150 PSI).
                <br />• Thứ tự chân cọc lốc máy nén C - R - S và cách đo điện trở.
                <br />• Điện áp Test Point tại chân 2-3 mạch giao tiếp Inverter (15 - 55V DC).
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onEnterDashboard();
                  onNavigate("QUIZ");
                }}
                className="font-mono text-xs font-bold"
              >
                LUYỆN FLASHCARD NGAY ➔
              </Button>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 5B. SỔ TAY CHEATSHEET TRA CỨU HIỆN TRƯỜNG                     */}
        {/* ============================================================== */}
        <section id="cheatsheet-so-tay" className="space-y-6">
          <div className="border-b border-neutral-300 pb-3">
            <span className="font-mono text-xs text-blue-900 font-bold uppercase tracking-wider">
              CÔNG CỤ TRA CỨU NHANH TRỰC CHIẾN
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 uppercase mt-1">
              Sổ Tay Kỹ Thuật Cheatsheet - Chuẩn Hóa Thông Số Nghề
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Tổng hợp nhanh các bảng thông số chuẩn nhà sản xuất và TCVN, không cần phải lục tìm sách vở khi đang đứng trước máy móc hiện trường.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Gas Specs */}
            <div className="p-4 bg-white border border-neutral-300 space-y-2 hover:border-blue-950 transition-colors">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black bg-blue-950 text-white px-1.5 py-0.5">GAS</span>
                <h4 className="font-bold text-xs uppercase text-neutral-900">Áp Suất Gas Lạnh</h4>
              </div>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                Áp suất tĩnh, áp suất hút, áp suất đẩy của R32, R410A, R22, R134a, R600a. Chuẩn nạp lỏng/hơi và dầu bôi trơn POE/PAG/Khoáng.
              </p>
              <div className="pt-1 font-mono text-[10px] text-blue-900 font-bold">
                • R32 Hút: 135 - 150 PSI
              </div>
            </div>

            {/* Card 2: Formulas */}
            <div className="p-4 bg-white border border-neutral-300 space-y-2 hover:border-blue-950 transition-colors">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black bg-amber-500 text-neutral-950 px-1.5 py-0.5">MATH</span>
                <h4 className="font-bold text-xs uppercase text-neutral-900">Công Thức Điện Lạnh</h4>
              </div>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                Tính dòng Iđm 1 pha/3 pha, dòng đề ba LRA, chọn tiết diện dây Cadivi S = I/J, chọn Aptomat MCB Curve C, tính Superheat & Subcooling.
              </p>
              <div className="pt-1 font-mono text-[10px] text-amber-800 font-bold">
                • S = I / J (J = 4 ~ 6 A/mm²)
              </div>
            </div>

            {/* Card 3: Sensor Specs */}
            <div className="p-4 bg-white border border-neutral-300 space-y-2 hover:border-blue-950 transition-colors">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black bg-emerald-700 text-white px-1.5 py-0.5">SENSOR</span>
                <h4 className="font-bold text-xs uppercase text-neutral-900">Trị Số Cảm Biến Các Hãng</h4>
              </div>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                Tra cứu giá trị kΩ tại 25°C và 30°C của Daikin, Panasonic, Toshiba, Mitsubishi, LG, Casper. Cảm biến phòng, ống đồng và đầu đẩy.
              </p>
              <div className="pt-1 font-mono text-[10px] text-emerald-800 font-bold">
                • Daikin: 10k / 20k / 200k
              </div>
            </div>

            {/* Card 4: Pipes & Torque */}
            <div className="p-4 bg-white border border-neutral-300 space-y-2 hover:border-blue-950 transition-colors">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black bg-purple-700 text-white px-1.5 py-0.5">TORQUE</span>
                <h4 className="font-bold text-xs uppercase text-neutral-900">Loe Ống & Cờ Lê Lực</h4>
              </div>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                Độ dày thành ống, cữ nhô ép loe (1.0 - 1.2mm), lực siết cờ lê lực (N·m) chuẩn từng cỡ ống Ø6.35 đến Ø19.05 chống xé mép loe.
              </p>
              <div className="pt-1 font-mono text-[10px] text-purple-800 font-bold">
                • 1/4&quot;: 14 ~ 18 N·m | 3/8&quot;: 34 ~ 42 N·m
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-neutral-50 border border-neutral-300">
            <div className="space-y-0.5">
              <span className="font-mono font-bold text-xs text-neutral-950 uppercase">
                Cần tra nhanh thông số khi đang làm đồ án hoặc thực tập hiện trường?
              </span>
              <p className="text-xs text-neutral-600">
                Sổ tay tích hợp tìm kiếm tức thì, phân loại 6 chuyên đề, hỗ trợ copy công thức và in ấn DIN A4.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onEnterDashboard();
                onNavigate("CHEATSHEET");
              }}
              className="bg-blue-950 hover:bg-neutral-900 text-white font-mono text-xs font-bold"
            >
              MỞ SỔ TAY CHEATSHEET NGAY ➔
            </Button>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 6. LỜI NHẮN NHỦ GIA ĐÌNH & CAM KẾT VỮNG VÀNG */}
        {/* ============================================================== */}
        <section className="p-6 bg-blue-950 text-white border-2 border-neutral-900 space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-amber-300">
            <BookOpen className="w-4 h-4" />
            <span>LỜI TÂM HUYẾT DÀNH CHO EM</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
            Học nghề không chỉ là học tháo lắp cơ bắp, mà là làm chủ tư duy kỹ thuật công nghệ
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl">
            Nghề điện lạnh hôm nay đã gắn liền với vi điều khiển, mạch biến tần Inverter, cảm biến và hệ thống điều hòa thông minh trung tâm. Hãy kiên trì rèn luyện từng môn từ <strong>DL-101</strong> đến <strong>DL-306</strong>, làm chủ các công thức toán và quy trình đo VOM. Khi bước vào cổng trường Cao đẳng, em sẽ là người vững vàng và tự tin nhất!
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={onEnterDashboard}
              className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-mono text-xs font-bold"
            >
              VÀO HỌC NGAY (BẢN ĐỒ 6 HỌC KỲ) ➔
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={onOpenProfile}
              className="border-neutral-400 text-white hover:bg-white/10 font-mono text-xs"
            >
              CÀI ĐẶT HỒ SƠ HỌC VIÊN
            </Button>
          </div>
        </section>
      </div>

      {/* Professional Technical Academy Footer */}
      <footer className="border-t-2 border-neutral-900 bg-neutral-950 text-neutral-200 mt-16 select-none">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Col 1: Brand & Purpose */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black bg-blue-700 text-white px-2 py-0.5 uppercase tracking-wider">
                  PUDO ACADEMY
                </span>
                <span className="font-mono text-[10px] text-amber-400 font-bold border border-amber-400/40 px-1.5 py-0.2">
                  HVAC/R
                </span>
              </div>
              <h3 className="font-bold text-white text-sm uppercase tracking-wide">
                Học Viện Tiền Đề Kỹ Thuật Điện Lạnh
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Nền tảng trang bị tư duy giải mạch điện tử, nguyên lý nhiệt động học và kỹ năng đo kiểm an toàn trước khi bước vào giảng đường Cao đẳng chính quy.
              </p>
              <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400 pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Hệ thống học tập thực chiến trực tuyến</span>
              </div>
            </div>

            {/* Col 2: Curriculum Structure */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold text-neutral-300 uppercase tracking-wider border-b border-neutral-800 pb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                <span>Lộ Trình Đào Tạo 3 Năm</span>
              </h4>
              <ul className="text-xs space-y-2 text-neutral-400 font-mono">
                <li className="hover:text-white transition-colors">
                  <span className="text-neutral-500 mr-1">• Năm 1:</span> Điện Cơ Bản & Kỹ Thuật Lạnh Cơ Bản (DL-101 ➔ DL-102)
                </li>
                <li className="hover:text-white transition-colors">
                  <span className="text-neutral-500 mr-1">• Năm 2:</span> Điều Hòa Không Khí & Mạch Biến Tần Inverter (DL-203 ➔ DL-204)
                </li>
                <li className="hover:text-white transition-colors">
                  <span className="text-neutral-500 mr-1">• Năm 3:</span> Hệ Thống Lạnh Công Nghiệp & VRV Trung Tâm (DL-305 ➔ DL-306)
                </li>
              </ul>
            </div>

            {/* Col 3: Practical Tools & Features */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold text-neutral-300 uppercase tracking-wider border-b border-neutral-800 pb-1.5 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Công Cụ Huấn Luyện</span>
              </h4>
              <ul className="text-xs space-y-2 text-neutral-400">
                <li>
                  <button
                    type="button"
                    onClick={onEnterDashboard}
                    className="hover:text-white transition-colors text-left font-sans cursor-pointer"
                  >
                    ➔ Bản đồ kiến thức phân bổ 6 Học kỳ
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      onEnterDashboard();
                      onNavigate("EXAM", "dl-101");
                    }}
                    className="hover:text-white transition-colors text-left font-sans cursor-pointer"
                  >
                    ➔ Phòng thi hết môn (Tự luận tư duy & Trắc nghiệm)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      onEnterDashboard();
                      onNavigate("QUIZ", "dl-101");
                    }}
                    className="hover:text-white transition-colors text-left font-sans cursor-pointer"
                  >
                    ➔ Flashcard phản xạ mã lỗi & điểm đo Test Points
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onEnterDashboard}
                    className="hover:text-white transition-colors text-left font-sans cursor-pointer"
                  >
                    ➔ Mô phỏng mạch điện tương tác & chu trình Log p-h
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      onEnterDashboard();
                      onNavigate("CHEATSHEET");
                    }}
                    className="hover:text-amber-300 text-amber-400 font-mono font-bold transition-colors text-left cursor-pointer"
                  >
                    ➔ Sổ tay Cheatsheet tra cứu hiện trường (Gas, Sensor, Lực siết, VOM)
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Safety & Technical Standards */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold text-neutral-300 uppercase tracking-wider border-b border-neutral-800 pb-1.5 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tiêu Chuẩn Kỹ Thuật Nghề</span>
              </h4>
              <ul className="text-xs space-y-1.5 text-neutral-400 font-mono text-[11px]">
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-400 font-bold">IEC 60335:</span>
                  <span>An toàn điện lạnh gia dụng & ga cháy A2L</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-400 font-bold">&lt; 500 Micron:</span>
                  <span>Chuẩn hút chân không sâu chống ẩm dầu</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-400 font-bold">Góc loe 45°:</span>
                  <span>Gia công ống đồng không nứt mép rò rỉ ga</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-400 font-bold">VOM CAT III:</span>
                  <span>Quy trình đo DC 300V & UVW Inverter an toàn</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 font-mono">
            <p>
              © 2026 Pudo Refrigeration Academy. Nền tảng học tập tiền đề Kỹ thuật Điện Lạnh.
            </p>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="text-neutral-400">Thiết kế chuẩn kỹ thuật công nghiệp</span>
              <span>•</span>
              <span className="text-neutral-400">Không quảng cáo</span>
              <span>•</span>
              <span className="text-neutral-400">Học tập độc lập</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
