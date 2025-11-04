import type { Metadata } from "next";
import { NEXT_APP_ORIGIN_URL } from "@/lib/env";
import Provider from "./provider";
import { Analytics } from "@vercel/analytics/next";

const APP_NAME = "Vault App";
const APP_DESCRIPTION =
  "Discover, manage, and secure everything in your Vault with seamless checkout and cart management.";

export const metadata: Metadata = {
  metadataBase: new URL(NEXT_APP_ORIGIN_URL),
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: [
    "vault app",
    "digital vault",
    "secure checkout",
    "shopping cart",
    "finance tools",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: NEXT_APP_ORIGIN_URL,
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
  },
  alternates: {
    canonical: NEXT_APP_ORIGIN_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body>
        <Provider>
          <div id="modal" className="z-999"></div>
          {children}
          <Analytics />
        </Provider>
      </body>
    </html>
  );
}
