import "./globals.css";
import CustomThemeProvider from "../theme/ThemeContext";
import { ReduxProvider } from "./provider";
import Header from "@/components/Header";
import { Box } from "@mui/material";
import Footer from "@/components/Footer";
import App from "@/components/App";
import RedirectUrl from "@/components/RedirectUrl";
import { Suspense } from "react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <CustomThemeProvider>
            <Suspense fallback={<div />}>
              <RedirectUrl />
              <App />
              <Header />
              <Box mt={10}>{children}</Box>
              <Footer />
            </Suspense>
          </CustomThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
