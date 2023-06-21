import React from "react";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import classNames from "classnames";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["cyrillic"],
  weight: "400",
});
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["cyrillic"],
  weight: "400",
});

export const metadata = {
  title: "Room Booking",
  description: "Innopolis University room booking service.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={classNames(ibmPlexSans.variable, ibmPlexMono.variable)}
    >
      <body>{children}</body>
    </html>
  );
}
