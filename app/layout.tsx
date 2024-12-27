import type { Metadata } from "next";
import "@/styles/globals.scss";
import { ReactLenis } from "lenis/react";
import { fonts } from "@/data/fonts.data";
import CanvasContainer from "@/features/carousel/components/CanvasContainer";

export const metadata: Metadata = {
  title: "Vision in Motion",
  description: "Vision in Motion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactLenis root>
        <body className={`${fonts} antialiased`}>
          <CanvasContainer />
          {children}
        </body>
      </ReactLenis>
    </html>
  );
}
