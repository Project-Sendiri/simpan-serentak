import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowDownLeft, ArrowUpRight, Wallet2 } from "lucide-react";

// Helper formatter
const idr = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });

// Demo data generators
const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"] as const;
const months = [
  "Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"
] as const;

type TimeRange = "minggu" | "bulan" | "tahun";

type Tx = { id: string; title: string; date: string; type: "in" | "out"; amount: number };

const seedTransactions: Tx[] = [
  { id: "t1", title: "Komisi Vendor", date: "2025-04-06", type: "out", amount: 200_000 },
  { id: "t2", title: "Penitipan Barang", date: "2025-04-05", type: "in", amount: 240_000 },
  { id: "t3", title: "Komisi Barang", date: "2025-04-05", type: "out", amount: 450_000 },
  { id: "t4", title: "Penitipan Kendaraan", date: "2025-04-05", type: "in", amount: 760_000 },
  { id: "t5", title: "Komisi Vendor", date: "2025-04-04", type: "out", amount: 540_000 },
  { id: "t6", title: "Penitipan Barang", date: "2025-04-03", type: "in", amount: 300_000 },
  { id: "t7", title: "Penitipan Kendaraan", date: "2025-04-02", type: "in", amount: 500_000 },
  { id: "t8", title: "Biaya Operasional", date: "2025-04-02", type: "out", amount: 180_000 },
];

function buildWeeklySeries() {
  return days.map((d, i) => ({
    day: d,
    barang: 800 + (i * 90) % 400,
    bangunan: 600 + (i * 60) % 500,
    kendaraan: 700 + (i * 120) % 600,
  }));
}

function buildMonthlySeries() {
  return months.slice(0, 9).map((m, i) => ({
    month: m,
    barang: 900 + (i * 130) % 2000,
    bangunan: 700 + (i * 160) % 1800,
    kendaraan: 800 + (i * 110) % 2200,
  }));
}

function buildYearlySeries() {
  return months.map((m, i) => ({
    month: m,
    barang: 2000 + (i * 310) % 5000,
    bangunan: 1500 + (i * 260) % 4500,
    kendaraan: 1800 + (i * 290) % 5200,
  }));
}

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("bulan");
  const [legend, setLegend] = useState({ barang: true, bangunan: true, kendaraan: true });

  useEffect(() => {
    document.title = "Dashboard Admin • Titipsini.Com";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Dashboard Admin Titipsini.Com – ringkasan operasional, transaksi, dan grafik interaktif.");
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = window.location.href;
  }, []);

  const chartData = useMemo(() => {
    if (timeRange === "minggu") return buildWeeklySeries();
    if (timeRange === "tahun") return buildYearlySeries();
    return buildMonthlySeries();
  }, [timeRange]);

  const filteredTx = useMemo(() => {
    const now = new Date("2025-04-06"); // anchor date for demo deterministic UI
    return seedTransactions.filter((t) => {
      const dt = new Date(t.date);
      const diffDays = (now.getTime() - dt.getTime()) / (1000 * 60 * 60 * 24);
      if (timeRange === "minggu") return diffDays <= 7;
      if (timeRange === "bulan") return dt.getMonth() === now.getMonth();
      return dt.getFullYear() === now.getFullYear();
    });
  }, [timeRange]);

  const totalIn = filteredTx.filter((t) => t.type === "in").reduce((a, b) => a + b.amount, 0);
  const totalOut = filteredTx.filter((t) => t.type === "out").reduce((a, b) => a + b.amount, 0);
  const saldo = 3_000_000 + totalIn - totalOut;

  const metrics = [
    { label: "Mitra Aktif", value: 128 },
    { label: "Tersuspend", value: 7 },
    { label: "Cabang Terdaftar", value: 341 },
    { label: "Transaksi Hari Ini", value: filteredTx.length },
  ];

  const RangeButtons = (
    <div className="flex gap-2">
      {(["minggu", "bulan", "tahun"] as TimeRange[]).map((r) => (
        <Button key={r} size="sm" variant={timeRange === r ? "default" : "secondary"} onClick={() => setTimeRange(r)}>
          {r[0].toUpperCase() + r.slice(1)}
        </Button>
      ))}
    </div>
  );

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Ringkasan</p>
        </div>
        {/* placeholder user */}
        <div className="hidden md:flex items-center gap-3">
          <div className="text-right">
            <div className="font-medium">Yusuf Siregar</div>
            <div className="text-xs text-muted-foreground">Finance</div>
          </div>
          <img src="/placeholder.svg" alt="avatar" className="h-10 w-10 rounded-full" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="login-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-primary">
                  <Wallet2 className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Saldo</div>
                  <div className="text-2xl font-bold">{idr.format(saldo)}</div>
                </div>
                <div className="ml-auto">{RangeButtons}</div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Catatan Keuangan</h2>
            <Select value={timeRange} onValueChange={(v: TimeRange) => setTimeRange(v)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Pilih Waktu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minggu">Minggu</SelectItem>
                <SelectItem value="bulan">Bulan</SelectItem>
                <SelectItem value="tahun">Tahun</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="login-card">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary">
                    <ArrowDownLeft className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm text-muted-foreground">Transaksi Masuk</div>
                    <div className="text-xl font-bold">{idr.format(totalIn)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="login-card">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm text-muted-foreground">Transaksi Keluar</div>
                    <div className="text-xl font-bold">{idr.format(totalOut)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="login-card">
            <CardHeader className="pb-4">
              <CardTitle>Statistik Pembayaran</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex items-center gap-2 mb-3">
                {(["barang", "bangunan", "kendaraan"] as const).map((k) => (
                  <Badge
                    key={k}
                    variant={legend[k] ? "secondary" : "outline"}
                    className="cursor-pointer capitalize"
                    onClick={() => setLegend((s) => ({ ...s, [k]: !s[k] }))}
                  >
                    {k}
                  </Badge>
                ))}
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="c1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="c2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--accent-foreground))" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(var(--accent-foreground))" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="c3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--ring))" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(var(--ring))" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                  <XAxis dataKey={"day" in chartData[0] ? "day" : "month"} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} width={40} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                  {legend.barang && (
                    <Area type="monotone" dataKey="barang" name="P.Barang" stroke="hsl(var(--primary))" fill="url(#c1)" strokeWidth={2} />
                  )}
                  {legend.bangunan && (
                    <Area type="monotone" dataKey="bangunan" name="P.Bangunan" stroke="hsl(var(--accent-foreground))" fill="url(#c2)" strokeWidth={2} />
                  )}
                  {legend.kendaraan && (
                    <Area type="monotone" dataKey="kendaraan" name="P.Kendaraan" stroke="hsl(var(--ring))" fill="url(#c3)" strokeWidth={2} />
                  )}
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-4">
            {metrics.map((m) => (
              <Card key={m.label} className="login-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">{m.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{m.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right column - Transactions */}
        <div className="space-y-4">
          <Card className="login-card">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Transaksi</CardTitle>
              <Select value={timeRange} onValueChange={(v: TimeRange) => setTimeRange(v)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Pilih Waktu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minggu">Minggu</SelectItem>
                  <SelectItem value="bulan">Bulan</SelectItem>
                  <SelectItem value="tahun">Tahun</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {filteredTx.map((t) => (
                  <li key={t.id} className="flex items-center gap-3">
                    <span className={`inline-flex h-8 w-8 items-center justify-center rounded-md ${t.type === "in" ? "bg-secondary text-primary" : "bg-destructive/10 text-destructive"}`}>
                      {t.type === "in" ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                    </span>
                    <div className="flex-1">
                      <div className="font-medium">{t.title}</div>
                      <div className="text-xs text-muted-foreground">{new Date(t.date).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}</div>
                    </div>
                    <div className={`font-semibold ${t.type === "in" ? "text-primary" : "text-destructive"}`}>{idr.format(t.amount)}</div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
