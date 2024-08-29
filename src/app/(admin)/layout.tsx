import AdminPanelLayout from "@/components/layouts/AdminPanelLayout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
