import { ShieldCheck } from "lucide-react";

const BrandLogo = () => {
  return (
    <div className="flex items-center gap-3 select-none" aria-label="Titipsini.Com">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary shadow-sm">
        <ShieldCheck className="h-6 w-6" aria-hidden="true" />
      </div>
      <div className="leading-tight">
        <div className="font-bold text-xl tracking-tight">
          Titipsini
          <span className="text-primary">•</span>
          Com
        </div>
        <div className="text-sm text-muted-foreground">
          Tempat aman untuk barang berharga Anda
        </div>
      </div>
    </div>
  );
};

export default BrandLogo;
