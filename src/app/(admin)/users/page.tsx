import { Navbar } from "@/components/admin-panel/Navbar";

export default function PageUsers({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <>
      <Navbar title={title} />
      <div className="container px-4 pb-8 pt-8 sm:px-8">{children}</div>
    </>
  );
}
