import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "프로젝트 문의 및 협업 제안은 언제든지 환영합니다.",
};

export default function ContactPage() {
  return <ContactForm />;
}
