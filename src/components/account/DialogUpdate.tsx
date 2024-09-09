import { TOKEN } from "@/constants";
import Cookies from "js-cookie";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface DialogUpdateProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
}

export const DialogUpdate = ({
  title,
  description,
  isOpen,
  onClose,
}: DialogUpdateProps) => {
  const [countdown, setCountdown] = useState(3);

  const router = useRouter();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      onClose();
      router.replace("/sign-in");
      Cookies.remove(TOKEN);
    }
    return () => clearTimeout(timer);
  }, [isOpen, countdown, onClose, router]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="h-6 w-6" />
            {title}
          </DialogTitle>
          <DialogDescription className="pt-2 text-center text-base">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center py-4">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <DialogFooter className="text-center sm:justify-center">
          <p className="text-sm text-gray-500">
            Vuelve a ingresar al sistema en {countdown} segundos
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
