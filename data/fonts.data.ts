import { Roboto_Flex, Philosopher } from "next/font/google";

const philosopher = Philosopher({
  subsets: ["latin"],
  variable: "--font-philosopher",
  weight: ["400", "700"],
});
const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
  weight: ["100", "200", "300", "400", "500"],
});

export const fonts = `${philosopher.variable} ${robotoFlex.variable}`;
