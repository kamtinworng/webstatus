import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Inter } from "next/font/google";
import { MantineProvider } from "@mantine/core";
import theme from "./theme";
import { Notifications } from "@mantine/notifications";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "web status",
  description: "web for check status of website",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
