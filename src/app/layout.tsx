import Provider from "./provider";

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
        </Provider>
      </body>
    </html>
  );
}
