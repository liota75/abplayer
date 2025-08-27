// app/layout.tsx
export const metadata = {
  title: "JK AB Player (Web Service)",
  description: "JP↔KR 트랙 플레이어 (serverless)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial" }}>
        {children}
      </body>
    </html>
  );
}
