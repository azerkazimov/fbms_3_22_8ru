import { useTranslations } from "next-intl";
import { MailForm } from "./mail-form";

export default function Mail() {
  const t = useTranslations("HomePage.mail");
  return (
    <section className="container mx-auto py-10 px-4 md:px-6">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">{t("title")}</h1>
        <p className="text-muted-foreground mb-8 text-center">{t("description")}</p>
        <MailForm />
      </div>
    </section>
  );
}
