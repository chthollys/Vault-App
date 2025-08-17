import Provider from "./provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
