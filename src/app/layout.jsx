import ThemeProvider from "@/shared/config/theme/ThemeProvider";

export const metadata = {
  title: "Dashboard Platform",
  description: "Next.js + MUI + FSD",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
