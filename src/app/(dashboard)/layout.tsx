import { ThemeProvider } from "@/contexts/Theme";
import { TopBar, Sidebar } from "@/components/layout";
import ProfileBar from "@/components/layout/ProfileBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <TopBar />
      <Sidebar>
        <div className="flex mx-auto w-full pt-16">
          <main className="w-full flex justify-center py-4 md:py-8 pr-4 md:pr-8 pl-4 md:pl-64">
            {children}
          </main>
          {/* hide on mobile */}
          <div className="my-8 md:mr-8 hidden md:block">
            <ProfileBar />
          </div>
        </div>
      </Sidebar>
    </ThemeProvider>
  );
}
