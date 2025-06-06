import { ThemeProvider } from "@/contexts/Theme";
import { TopBar, Sidebar } from "@/components/layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <TopBar />
      <Sidebar>
        <main className="w-full flex justify-center py-6 px-4">{children}</main>
      </Sidebar>
    </ThemeProvider>
  );
}
