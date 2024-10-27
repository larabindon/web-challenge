"use client";
import { Provider } from "../components/ui/provider";
import { Paytone_One } from "next/font/google";
import { Comfortaa } from "next/font/google";

import client from "../apollo-client";
import { ApolloProvider } from "@apollo/client";
import "./styles/globals.css";

const paytone_one = Paytone_One({
  weight: "400",
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-paytone_one",
});
const comfortaa = Comfortaa({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-comfortaa",
});

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${paytone_one.variable} ${comfortaa.variable} font-sans`}
      >
        <ApolloProvider client={client}>
          <Provider>
            {children}
          </Provider>
        </ApolloProvider>
      </body>
    </html>
  );
}

export default RootLayout;
