import "./globals.css";
// import ClientEffects from "@/components/effects/ClientEffects";

export const metadata = {
  title: "GSAP Next Landing",
  description: "AI Intelligence Landing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <ClientEffects /> */}
        {children}
      </body>
    </html>
  );
}
