"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Building2,
  Briefcase,
  CheckCircle,
  Clock,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  Ship,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import { SiteLogoLockup } from "@/components/CertificationBadges";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FORM_PAGE_CONFIG, type FormKey, type SidebarIcon } from "@/lib/form-config";
import {
  companyFooterLinks,
  serviceFooterLinks,
  siteNavCta,
  siteNavItems,
} from "@/lib/site-links";
import { cn } from "@/lib/utils";

const wrap = "w-full px-[24px] sm:px-[40px] lg:px-[60px] 2xl:px-[80px]";
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

const iconMap: Record<SidebarIcon, typeof MapPin> = {
  "map-pin": MapPin,
  phone: Phone,
  mail: Mail,
  clock: Clock,
  users: Users,
  briefcase: Briefcase,
  globe: Globe,
  ship: Ship,
  building: Building2,
};

export function LeadFormPage({ pageKey }: { pageKey: FormKey }) {
  const config = FORM_PAGE_CONFIG[pageKey];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectValues, setSelectValues] = useState<Record<string, string>>({});
  const [resetKey, setResetKey] = useState(0);

  const initialSelectValues = useMemo(
    () =>
      config.fields
        .filter((field) => field.type === "select")
        .reduce<Record<string, string>>((acc, field) => {
          acc[field.name] = "";
          return acc;
        }, {}),
    [config.fields],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = new FormData(form);

    Object.entries(selectValues).forEach(([key, value]) => {
      if (value) {
        payload.set(key, value);
      }
    });

    const fileField = config.fields.find((field) => field.type === "file");
    if (fileField) {
      const rawFile = payload.get(fileField.name);
      if (rawFile instanceof File && rawFile.size > MAX_UPLOAD_BYTES) {
        toast.error("File too large", {
          description: "Please upload a CV that is 5 MB or smaller.",
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/forms/${pageKey}`, {
        method: "POST",
        body: payload,
      });

      const result = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        throw new Error(result?.error || "Submission failed");
      }

      setIsSubmitted(true);
      setSelectValues(initialSelectValues);
      setResetKey((current) => current + 1);
      form.reset();

      toast.success(config.toastTitle, {
        description: config.toastDescription,
      });
    } catch (error) {
      toast.error("Submission failed", {
        description:
          error instanceof Error
            ? error.message
            : "Please try again in a few moments.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] selection:bg-[#96e0d9] selection:text-[#33305e] font-[var(--font-manrope)]">
        <Card className="max-w-md mx-4 text-center border-none shadow-2xl rounded-none p-8">
          <CardHeader>
            <div className="w-20 h-20 bg-[#33305e] rounded-sm flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-[#51d2c6]" />
            </div>
            <CardTitle className="font-[var(--font-syne)] text-3xl font-bold text-[#33305e] mb-4">
              {config.successTitle}
            </CardTitle>
            <CardDescription className="text-lg text-[#33305e]/70 leading-relaxed">
              {config.successDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Button
              onClick={() => setIsSubmitted(false)}
              className="bg-[#33305e] text-white hover:bg-[#51d2c6] transition-all duration-500 h-[56px] px-8 font-bold rounded-none"
            >
              Submit Another Form
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-white text-[#33305e] selection:bg-[#96e0d9] selection:text-[#33305e] font-[var(--font-manrope)]">
      <header className={cn(wrap, "flex items-start justify-between gap-6 py-6 lg:py-8")}>
        <Link href="/" className="block">
          <SiteLogoLockup />
        </Link>

        <nav className="hidden items-center gap-[40px] xl:gap-[60px] text-[16px] font-medium lg:flex lg:text-[18px]">
          {siteNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "relative py-2 transition-colors hover:text-[#51d2c6]",
                "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#51d2c6] after:transition-all after:duration-300 hover:after:w-full",
                item.label === config.activeNavLabel
                  ? "font-bold text-[#51d2c6]"
                  : "text-[#33305e]",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button
            asChild
            variant="outline"
            className="h-[48px] border-[#33305e]/20 px-8 text-[16px] font-semibold text-[#33305e] transition-all hover:border-[#51d2c6] hover:bg-[#51d2c6] hover:text-white"
          >
            <Link href={siteNavCta.href}>{siteNavCta.label}</Link>
          </Button>
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-[#33305e]/20 lg:hidden"
            >
              <span className="sr-only">Menu</span>
              <Menu className="h-6 w-6 text-[#33305e]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-2">
            {siteNavItems.map((item) => (
              <DropdownMenuItem
                key={item.label}
                asChild
                className="p-3 text-base"
              >
                <Link href={item.href}>{item.label}</Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem asChild className="p-3">
              <Link href={siteNavCta.href} className="w-full font-bold text-[#51d2c6]">
                {siteNavCta.label}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <section className="py-24 lg:py-32 bg-white">
        <div className={wrap}>
          <div className="max-w-4xl mx-auto text-center motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-8 motion-safe:duration-700">
            <span className="font-[var(--font-sulphur)] text-[14px] uppercase tracking-[0.2em] text-[#51d2c6] mb-6 block font-bold">
              {config.eyebrow}
            </span>
            <h1 className="font-[var(--font-syne)] text-[48px] sm:text-[64px] lg:text-[80px] font-bold text-[#33305e] mb-8 leading-[1.05] tracking-tight">
              {config.title}
              <br />
              <span className="text-[#51d2c6]">{config.accent}</span>
            </h1>
            <p className="text-[20px] lg:text-[24px] text-[#33305e]/70 leading-relaxed max-w-3xl mx-auto font-light">
              {config.description}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f9fa] py-24 lg:py-32">
        <div className={wrap}>
          <div className="grid lg:grid-cols-3 gap-16 lg:gap-24">
            <div className="lg:col-span-2">
              <Card className="border-none shadow-2xl rounded-none p-4 lg:p-8 bg-white">
                <CardHeader className="px-0 pt-0 pb-10 border-b border-[#33305e]/10 mb-10">
                  <CardTitle className="font-[var(--font-syne)] text-3xl font-bold text-[#33305e]">
                    {config.formTitle}
                  </CardTitle>
                  <CardDescription className="text-[#33305e]/60 text-lg mt-2 font-light">
                    {config.formDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <form
                    key={resetKey}
                    onSubmit={handleSubmit}
                    className="grid md:grid-cols-2 gap-8"
                  >
                    {config.fields.map((field) => {
                      const fieldId = `${pageKey}-${field.name}`;
                      const isFullWidth = field.width !== "half";

                      return (
                        <div
                          key={field.name}
                          className={cn("space-y-3", isFullWidth ? "md:col-span-2" : "")}
                        >
                          <Label
                            htmlFor={fieldId}
                            className="text-[#33305e] font-bold uppercase tracking-widest text-[12px]"
                          >
                            {field.label}
                            {field.required ? " *" : ""}
                          </Label>

                          {field.type === "textarea" ? (
                            <Textarea
                              id={fieldId}
                              name={field.name}
                              required={field.required}
                              placeholder={field.placeholder}
                              rows={field.rows ?? 5}
                              className="rounded-none border-[#33305e]/10 focus:border-[#51d2c6] focus:ring-0 bg-white resize-none p-4"
                            />
                          ) : null}

                          {field.type === "select" ? (
                            <Select
                              value={selectValues[field.name] || ""}
                              onValueChange={(value) =>
                                setSelectValues((current) => ({
                                  ...current,
                                  [field.name]: value,
                                }))
                              }
                            >
                              <SelectTrigger className="rounded-none border-[#33305e]/10 focus:border-[#51d2c6] focus:ring-0 h-[56px] bg-white text-[#33305e]/70">
                                <SelectValue placeholder={field.placeholder} />
                              </SelectTrigger>
                              <SelectContent className="rounded-none border-[#33305e]/10">
                                {field.options?.map((option) => (
                                  <SelectItem
                                    key={option}
                                    value={option}
                                    className="rounded-none"
                                  >
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : null}

                          {field.type === "file" ? (
                            <Input
                              id={fieldId}
                              name={field.name}
                              type="file"
                              required={field.required}
                              accept={field.accept}
                              className="rounded-none border-[#33305e]/10 focus:border-[#51d2c6] focus:ring-0 h-[56px] bg-white file:mr-4 file:border-0 file:bg-[#33305e] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#51d2c6]"
                            />
                          ) : null}

                          {field.type === "text" ||
                          field.type === "email" ||
                          field.type === "tel" ? (
                            <Input
                              id={fieldId}
                              name={field.name}
                              type={field.type}
                              required={field.required}
                              placeholder={field.placeholder}
                              autoComplete={field.autoComplete}
                              className="rounded-none border-[#33305e]/10 focus:border-[#51d2c6] focus:ring-0 h-[56px] bg-white"
                            />
                          ) : null}

                          {field.helperText ? (
                            <p className="text-[13px] leading-relaxed text-[#33305e]/55">
                              {field.helperText}
                            </p>
                          ) : null}
                        </div>
                      );
                    })}

                    <div className="md:col-span-2">
                      <Button
                        type="submit"
                        className="w-full h-[64px] bg-[#33305e] text-white hover:bg-[#51d2c6] transition-all duration-500 shadow-xl font-bold rounded-none text-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Submitting..."
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-3" />
                            {config.submitLabel}
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-12">
              <div className="space-y-10">
                <div className="space-y-4">
                  <h3 className="font-[var(--font-syne)] text-2xl font-bold text-[#33305e]">
                    Helpful Context
                  </h3>
                  <div className="h-1 w-12 bg-[#51d2c6]"></div>
                </div>

                <div className="space-y-8">
                  {config.sidebarSections.map((section) => {
                    const Icon = iconMap[section.icon];
                    return (
                      <div key={section.title} className="flex items-start space-x-6">
                        <div className="flex h-12 w-12 items-center justify-center bg-[#33305e] border border-[#33305e]/5 shrink-0">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-[var(--font-syne)] font-bold text-[#33305e] mb-1 text-lg">
                            {section.title}
                          </div>
                          <div className="text-[#33305e]/70 leading-relaxed font-light whitespace-pre-line">
                            {section.body}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-10 bg-[#33305e] text-white rounded-none shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#51d2c6]/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <h3 className="font-[var(--font-syne)] text-2xl font-bold mb-4">
                    {config.highlightCard.title}
                  </h3>
                  <p className="text-white/70 mb-8 font-light leading-relaxed">
                    {config.highlightCard.description}
                  </p>
                  <div className="space-y-4">
                    {config.highlightCard.items.map((item) => {
                      const Icon = iconMap[item.icon];
                      const content = (
                        <div className="flex items-center space-x-4">
                          <Icon className="w-5 h-5 text-[#96e0d9]" />
                          <span className="font-medium text-white/80">{item.label}</span>
                        </div>
                      );

                      return item.href ? (
                        <a
                          key={item.label}
                          href={item.href}
                          className="block transition-colors hover:text-[#96e0d9]"
                        >
                          {content}
                        </a>
                      ) : (
                        <div key={item.label}>{content}</div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#33305e] text-white">
        <div className={wrap}>
          <div className="py-24 grid gap-16 lg:grid-cols-[2fr_1fr_1fr] lg:gap-32">
            <div className="space-y-10">
              <img
                src="/images/figma/logo-landscape.jpg"
                alt="Excursions Greece"
                className="h-[72px] w-auto max-w-[250px] object-contain sm:h-[80px] sm:max-w-[290px]"
              />
              <p className="max-w-md text-[18px] text-white/70 leading-relaxed">
                Leading the way in luxury shore excursions and destination
                management across Greece since 2013.
              </p>

              <div className="space-y-6">
                <a
                  href="mailto:operations@excursionsgreece.com"
                  className="flex items-center gap-5 text-[18px] font-medium transition-colors hover:text-[#96e0d9]"
                >
                  <div className="flex h-12 w-12 items-center justify-center bg-white/5 border border-white/10">
                    <Mail className="h-5 w-5" />
                  </div>
                  operations@excursionsgreece.com
                </a>
                <a
                  href="tel:+302104519867"
                  className="flex items-center gap-5 text-[18px] font-medium transition-colors hover:text-[#96e0d9]"
                >
                  <div className="flex h-12 w-12 items-center justify-center bg-white/5 border border-white/10">
                    <Phone className="h-5 w-5" />
                  </div>
                  21 0451 9867
                </a>
                <div className="flex items-start gap-5 text-[18px] font-medium">
                  <div className="flex h-12 w-12 items-center justify-center bg-white/5 border border-white/10 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="leading-snug">Akti Miaouli 81 Pireas 185 38</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-[var(--font-syne)] text-[22px] font-bold text-[#96e0d9] mb-8">
                Company
              </h3>
              <ul className="space-y-5">
                {companyFooterLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[18px] text-white/80 transition-colors hover:text-[#96e0d9]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-[var(--font-syne)] text-[22px] font-bold text-[#96e0d9] mb-8">
                Services
              </h3>
              <ul className="space-y-5">
                {serviceFooterLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[18px] text-white/80 transition-colors hover:text-[#96e0d9]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pb-12 flex flex-col items-center justify-between gap-8 border-t border-white/10 pt-10 sm:flex-row text-sm text-white/40">
            <span>© 2026 Excursions Greece. All rights reserved.</span>

            <div className="flex gap-6">
              <a
                href="https://www.facebook.com/share/1L4Kakk8Ds/?mibextid=wwXIfr"
                target="_blank"
                rel="noreferrer"
                aria-label="Excursions Greece on Facebook"
                className="hover:text-[#96e0d9] transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/excursiongreece/?hl=en"
                target="_blank"
                rel="noreferrer"
                aria-label="Excursions Greece on Instagram"
                className="hover:text-[#96e0d9] transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/excursions-greece/"
                target="_blank"
                rel="noreferrer"
                aria-label="Excursions Greece on LinkedIn"
                className="hover:text-[#96e0d9] transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>

            <div className="flex gap-8">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
