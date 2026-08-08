import { Accordion } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/ui/section-heading";

export function FAQSection({
  faqs,
  title = "Frequently Asked Questions",
  subtitle,
}: {
  faqs: { question: string; answer: string }[];
  title?: string;
  subtitle?: string;
}) {
  if (faqs.length === 0) return null;
  return (
    <section id="faq" className="mt-16">
      <SectionHeading title={title} subtitle={subtitle} align="left" />
      <Accordion items={faqs} className="mt-6" />
    </section>
  );
}
