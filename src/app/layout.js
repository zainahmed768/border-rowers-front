"use client";
import "./globals.css";
import { Syne, Poppins } from "next/font/google";
import { ConfigProvider } from "antd";
import ReduxProvider from "../provider/ReduxProvider";
import NextTopLoader from "nextjs-toploader";

const syneFont = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: "normal",
  variable: "--syne-font",
  display: "swap",
  adjustFontFallback: false,
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: "normal",
  variable: "--poppins-font",
  display: "swap",
  adjustFontFallback: false,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <style jsx global>{`
        :root {
          --syne-font: ${syneFont.style.fontFamily};
          --poppins-font: ${poppins.style.fontFamily};
        }
      `}</style>
      <title>Border Rowers</title>
      <body>
        <NextTopLoader
          height={5}
          speed={200}
          showSpinner={false}
          shadow="0 0 10px #2299DD,0 0 5px #fff"
          color="#f6cd3b"
        />
        <ReduxProvider>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#052148",
                  fontFamily: "var(--poppins-font)",
                },
                // components : {
                //   Pagination : {
                //     itemActiveBg : '#052148',
                //     itemActiveColorDisabled : '#fff'
                //   }
                // }
              }}
            >
              <main>{children}</main>
            </ConfigProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
