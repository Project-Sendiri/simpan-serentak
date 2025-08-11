import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import BrandLogo from "@/components/BrandLogo";
import loginIllustration from "@/assets/login-illustration.png";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login Super Admin • Titipsini.Com";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Login Super Admin Titipsini.Com – platform kemitraan penitipan barang dengan kasir, nota QR, dan pengingat otomatis.");
    // canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = window.location.href;
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Masuk", description: "Demo UI: autentikasi belum dihubungkan." });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen">
      <header className="container py-6">
        <BrandLogo />
      </header>
      <h1 className="sr-only">Login Super Admin Titipsini.Com</h1>
      <main className="container grid lg:grid-cols-2 gap-8 items-center pb-12">
        <section className="hidden lg:block">
          <div className="rounded-2xl overflow-hidden bg-gear-pattern p-6">
            <img
              src={loginIllustration}
              alt="Ilustrasi kurir Titipsini mengantar paket dengan skuter di depan pola roda gigi"
              loading="lazy"
              className="w-full h-auto"
            />
          </div>
        </section>
        <section aria-labelledby="login-title">
          <Card className="login-card max-w-md mx-auto">
            <CardHeader>
              <CardTitle id="login-title" className="text-2xl font-bold">
                <span className="brand-gradient-text">Login Super Admin</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={onSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" required placeholder="admin@titipsini.com" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Kata Sandi</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="password" type={showPassword ? "text" : "password"} required className="pl-10 pr-10" />
                    <button
                      type="button"
                      aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <div className="flex justify-end">
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Lupa kata sandi?</a>
                  </div>
                </div>
                <Button type="submit" className="w-full">Masuk</Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Index;
