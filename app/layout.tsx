import type { Metadata } from "next";
import "@/styles/globals.scss";
import { ReactLenis } from "lenis/react";
import { fonts } from "@/data/fonts.data";
import { Navbar, Footer, Loader } from "@/components";
import ReduxProvider from "@/lib/ReduxProvider";

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
      <ReduxProvider>
        <ReactLenis root>
          <body className={`${fonts} antialiased`}>
            <Loader />
            <Navbar />
            {children}
            <Footer />
          </body>
        </ReactLenis>
      </ReduxProvider>
    </html>
  );
}
