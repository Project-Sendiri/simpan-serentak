import { NavLink } from "react-router-dom";
import { LayoutDashboard, UserCircle2, Users, Package, RotateCcw, Store, Settings, LogOut } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard/profil", label: "Profil", icon: UserCircle2 },
  { to: "/dashboard/pengguna", label: "Pengguna", icon: Users },
  { to: "/dashboard/data", label: "Data", icon: Package },
  { to: "/dashboard/pengembalian", label: "Pengembalian", icon: RotateCcw },
  { to: "/dashboard/vendor", label: "Vendor", icon: Store },
  { to: "/dashboard/pengaturan", label: "Pengaturan", icon: Settings },
];

const AdminSidebar = () => {
  return (
    <aside className="hidden md:flex md:w-64 lg:w-72 flex-col gap-6 bg-primary text-primary-foreground min-h-screen px-5 py-6 sticky top-0">
      <div className="px-1">
        <BrandLogo />
      </div>
      <nav className="flex-1 space-y-1" aria-label="Sidebar">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 transition ${
                isActive
                  ? "bg-primary-foreground/10 text-primary-foreground"
                  : "hover:bg-primary-foreground/10/50"
              }`
            }
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm font-medium">{label}</span>
          </NavLink>
        ))}
        <a href="/" className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-primary-foreground/10 transition">
          <LogOut className="h-5 w-5" aria-hidden="true" />
          <span className="text-sm font-medium">Keluar</span>
        </a>
      </nav>
      <div className="text-xs text-primary-foreground/70 px-1">© {new Date().getFullYear()} Titipsini.Com</div>
    </aside>
  );
};

export default AdminSidebar;
