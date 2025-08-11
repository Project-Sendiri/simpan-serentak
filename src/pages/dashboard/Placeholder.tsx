import AdminLayout from "@/components/layout/AdminLayout";

const Placeholder = ({ title }: { title: string }) => {
  return (
    <AdminLayout>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground">Halaman {title} akan segera hadir. Ini adalah tampilan demo untuk navigasi.</p>
      </div>
    </AdminLayout>
  );
};

export default Placeholder;
