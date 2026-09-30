import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0a192f",
  width: "device-width",
  initialScale: 1,
};

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://pudo-academy.edu.vn";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "PUDO Academy | Nền Tảng Kỹ Thuật Điện Lạnh & Điều Hòa Không Khí (HVAC/R)",
    template: "%s | PUDO Academy",
  },
  description:
    "Hệ thống kiến thức kỹ thuật điện lạnh mở, tra cứu mã lỗi điều hòa Inverter, sơ đồ nguyên lý mạch điện tử, nhiệt động học kỹ thuật và công cụ tính toán hiện trường chuẩn công nghiệp.",
  keywords: [
    "kỹ thuật điện lạnh",
    "điều hòa inverter",
    "mã lỗi điều hòa",
    "sơ đồ mạch điện tử",
    "áp suất ga lạnh",
    "nhiệt động học kỹ thuật",
    "chọn cỡ cáp điện cadivi",
    "chu trình log p-h",
    "hvac r",
    "tính ống đồng điều hòa",
    "bẫy dầu oil trap",
    "đo kiểm vom cat iii",
    "pudo academy",
  ],
  authors: [{ name: "PUDO Academy" }],
  creator: "PUDO Academy",
  publisher: "PUDO Academy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PUDO Academy | Nền Tảng Kỹ Thuật Điện Lạnh & Điều Hòa Không Khí",
    description:
      "Tài liệu kỹ thuật mở, tra cứu mã lỗi Inverter, sơ đồ mạch điện tử và công cụ đo kiểm hiện trường chuẩn công nghiệp HVAC/R.",
    url: appUrl,
    siteName: "PUDO Academy",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/logo/pudo_emblem_round.png",
        width: 512,
        height: 512,
        alt: "PUDO Academy Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PUDO Academy | Nền Tảng Kỹ Thuật Điện Lạnh & Điều Hòa Không Khí",
    description:
      "Hệ thống kiến thức kỹ thuật điện lạnh, tra cứu mã lỗi Inverter và công cụ tính toán hiện trường.",
    images: ["/logo/pudo_emblem_round.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/logo/pudo_emblem_round.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/logo/pudo_emblem_round.png",
  },
};

// Neutral Schema.org JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${appUrl}/#website`,
      url: appUrl,
      name: "PUDO Academy",
      description: "Nền tảng kiến thức và công cụ tính toán kỹ thuật điện lạnh HVAC/R",
      inLanguage: "vi",
    },
    {
      "@type": "EducationalOrganization",
      "@id": `${appUrl}/#organization`,
      name: "PUDO Academy",
      url: appUrl,
      logo: `${appUrl}/logo/pudo_emblem_round.png`,
      description: "Nền tảng học tập tiền đề và tra cứu kỹ thuật điện lạnh độc lập",
    },
    {
      "@type": "Course",
      "@id": `${appUrl}/#course`,
      name: "Chương Trình Huấn Luyện Kỹ Thuật Điện Lạnh & Điều Hòa Không Khí",
      description: "Chương trình đào tạo 6 học kỳ từ Điện cơ bản, Inverter, đến Hệ thống VRV/VRF công nghiệp.",
      provider: {
        "@type": "EducationalOrganization",
        name: "PUDO Academy",
        url: appUrl,
      },
      educationalLevel: "Hệ đào tạo kỹ thuật chính quy",
      inLanguage: "vi",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-neutral-900">
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
