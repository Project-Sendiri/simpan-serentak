import { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 min-w-0">
          <div className="container py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
