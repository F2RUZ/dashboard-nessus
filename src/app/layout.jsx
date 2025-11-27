import ThemeProvider from "@/shared/config/theme/ThemeProvider";
import StoreProvider from "@/shared/store/Provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
