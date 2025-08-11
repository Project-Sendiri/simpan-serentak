import { useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const metrics = [
  { label: "Mitra Aktif", value: 128 },
  { label: "Tersuspend", value: 7 },
  { label: "Cabang Terdaftar", value: 341 },
  { label: "Transaksi Hari Ini", value: 213 },
];

const trendData = [
  { day: "Sen", trx: 120 },
  { day: "Sel", trx: 145 },
  { day: "Rab", trx: 160 },
  { day: "Kam", trx: 180 },
  { day: "Jum", trx: 210 },
  { day: "Sab", trx: 175 },
  { day: "Min", trx: 195 },
];

const reminders = [
  { title: "3 mitra H-3 menuju jatuh tempo iuran", type: "iuran" },
  { title: "2 pendaftaran mitra menunggu verifikasi", type: "verifikasi" },
  { title: "1 cabang terindikasi tidak valid", type: "audit" },
];

const AdminDashboard = () => {
  useEffect(() => {
    document.title = "Dashboard Admin • Titipsini.Com";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Dashboard Admin Titipsini.Com – ringkasan operasional, transaksi harian, dan pengingat sistem.");
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = window.location.href;
  }, []);

  return (
    <AdminLayout>
      <h1 className="sr-only">Dashboard Admin Titipsini</h1>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-6">
        {metrics.map((m) => (
          <Card key={m.label} className="login-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">{m.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{m.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 login-card">
          <CardHeader>
            <CardTitle>Transaksi 7 Hari</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTrx" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} width={40} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                <Area type="monotone" dataKey="trx" stroke="hsl(var(--primary))" fill="url(#colorTrx)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="login-card">
          <CardHeader>
            <CardTitle>Pengingat Sistem</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {reminders.map((r, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Badge variant="secondary" className="capitalize">{r.type}</Badge>
                  <div className="flex-1">{r.title}</div>
                </li>
              ))}
            </ul>
            <Separator className="my-4" />
            <div className="text-sm text-muted-foreground">Data di atas adalah demo untuk keperluan pratinjau UI.</div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
