import { HelpCircle } from "lucide-react";

const infoBussiness = {
  url: "https://chaqchao.com",
  email: "chaqchao@gmail.com",
};
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 flex h-auto flex-col items-center sm:h-14 sm:justify-between md:mx-8 md:flex-row">
        <div className="mb-4 text-sm text-muted-foreground md:mb-0">
          © {currentYear}{" "}
          <a
            href={infoBussiness.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Chaqchao
          </a>
          . All rights reserved.
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:justify-end">
          <a
            href={`email:${infoBussiness.email}`}
            className="flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <HelpCircle className="mr-1 h-4 w-4" />
            Help & Support
          </a>
        </div>
      </div>
    </div>
  );
}
