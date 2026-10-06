import { useState } from "react";
import { HandCoinsIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RequestMoneyForm } from "./RequestMoneyForm";

export function RequestMoneyDialog() {
  const { t } = useTranslation("wallet");
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <HandCoinsIcon data-icon="inline-start" aria-hidden="true" />
          {t("requests.open")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("requests.createTitle")}</DialogTitle>
          <DialogDescription>
            {t("requests.createDescription")}
          </DialogDescription>
        </DialogHeader>
        <RequestMoneyForm
          onSuccess={() => {
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
