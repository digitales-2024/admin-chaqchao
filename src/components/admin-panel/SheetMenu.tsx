import { LogoChaqchao } from "@/assets/icons";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "../ui/button";
import { Menu } from "./Menu";

export const SheetMenu = () => {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full flex-col px-3 sm:w-72" side="left">
        <SheetHeader>
          <Button
            className="flex items-center justify-center bg-transparent pb-2 pt-1 hover:bg-transparent"
            asChild
          >
            <Link href="/" className="flex items-center gap-2">
              <LogoChaqchao className="size-8" />
              <SheetTitle className="whitespace-nowrap text-lg font-bold uppercase text-chaqchao-midning-green">
                Chaqchao
              </SheetTitle>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
};
