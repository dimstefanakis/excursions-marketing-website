"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle, 
  Menu,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Company", href: "/company" },
  { label: "Services", href: "/services" },
  { label: "Destinations", href: "/destinations" },
  { label: "Contact", href: "/contact" },
];

const wrap = "w-full px-[24px] sm:px-[40px] lg:px-[60px] 2xl:px-[80px]";

const greekPorts = [
  'Piraeus (Athens)',
  'Thessaloniki',
  'Heraklion',
  'Corfu',
  'Santorini',
  'Mykonos',
  'Rhodes',
  'Katakolo',
  'Chania',
  'Volos',
  'Multiple Ports'
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast.success("Inquiry Submitted Successfully!", {
      description: "We'll respond within 24 hours with a detailed proposal.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] selection:bg-[#96e0d9] selection:text-[#33305e] font-[var(--font-manrope)]">
        <Card className="max-w-md mx-4 text-center border-none shadow-2xl rounded-none p-8">
          <CardHeader>
            <div className="w-20 h-20 bg-[#33305e] rounded-sm flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-[#51d2c6]" />
            </div>
            <CardTitle className="font-[var(--font-syne)] text-3xl font-bold text-[#33305e] mb-4">Thank You!</CardTitle>
            <CardDescription className="text-lg text-[#33305e]/70 leading-relaxed">
              Your inquiry has been submitted successfully. Our team will review your requirements 
              and respond within 24 hours with a detailed proposal.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="bg-[#33305e] text-white hover:bg-[#51d2c6] transition-all duration-500 h-[56px] px-8 font-bold rounded-none"
            >
              Submit Another Inquiry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-white text-[#33305e] selection:bg-[#96e0d9] selection:text-[#33305e] font-[var(--font-manrope)]">
      {/* Header / Nav */}
      <header className={cn(wrap, "flex items-center justify-between py-6 lg:py-8")}>
        <Link href="/" className="block">
          <img
            src="/images/figma/logo-landscape.svg"
            alt="Excursions Greece"
            className="h-[52px] w-auto max-w-[210px] object-contain sm:h-[64px] sm:max-w-[260px] lg:h-[92px] lg:max-w-[360px]"
          />
        </Link>

        <nav className="hidden items-center gap-[40px] xl:gap-[60px] text-[16px] font-medium lg:flex lg:text-[18px]">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "relative py-2 transition-colors hover:text-[#51d2c6]",
                "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#51d2c6] after:transition-all after:duration-300 hover:after:w-full",
                item.label === "Contact"
                  ? "font-bold text-[#51d2c6]"
                  : "text-[#33305e]"
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
            <Link href="/contact">Get Quote</Link>
          </Button>
        </nav>

        {/* Mobile Menu */}
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
            {navItems.map((item) => (
              <DropdownMenuItem
                key={item.label}
                asChild
                className="p-3 text-base"
              >
                <Link href={item.href}>{item.label}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Hero Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className={wrap}>
          <div className="max-w-4xl mx-auto text-center motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-8 motion-safe:duration-700">
            <span className="font-[var(--font-sulphur)] text-[14px] uppercase tracking-[0.2em] text-[#51d2c6] mb-6 block font-bold">
              Get in Touch
            </span>
            <h1 className="font-[var(--font-syne)] text-[48px] sm:text-[64px] lg:text-[80px] font-bold text-[#33305e] mb-8 leading-[1.05] tracking-tight">
              Let&apos;s Create Something <br />
              <span className="text-[#51d2c6]">Extraordinary</span>
            </h1>
            <p className="text-[20px] lg:text-[24px] text-[#33305e]/70 leading-relaxed max-w-3xl mx-auto font-light">
              Ready to offer your guests unforgettable Greek experiences? 
              Contact us for custom proposals and partnership opportunities.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f9fa] py-24 lg:py-32">
        <div className={wrap}>
          <div className="grid lg:grid-cols-3 gap-16 lg:gap-24">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-none shadow-2xl rounded-none p-4 lg:p-8 bg-white">
                <CardHeader className="px-0 pt-0 pb-10 border-b border-[#33305e]/10 mb-10">
                  <CardTitle className="font-[var(--font-syne)] text-3xl font-bold text-[#33305e]">Partnership Inquiry</CardTitle>
                  <CardDescription className="text-[#33305e]/60 text-lg mt-2 font-light">
                    Tell us about your requirements and we&apos;ll create a custom proposal for you.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-[#33305e] font-bold uppercase tracking-widest text-[12px]">Full Name *</Label>
                        <Input id="name" placeholder="Your full name" required className="rounded-none border-[#33305e]/10 focus:border-[#51d2c6] focus:ring-0 h-[56px] bg-white" />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="company" className="text-[#33305e] font-bold uppercase tracking-widest text-[12px]">Company</Label>
                        <Input id="company" placeholder="Your company name" className="rounded-none border-[#33305e]/10 focus:border-[#51d2c6] focus:ring-0 h-[56px] bg-white" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-[#33305e] font-bold uppercase tracking-widest text-[12px]">Email Address *</Label>
                        <Input id="email" type="email" placeholder="your@email.com" required className="rounded-none border-[#33305e]/10 focus:border-[#51d2c6] focus:ring-0 h-[56px] bg-white" />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="phone" className="text-[#33305e] font-bold uppercase tracking-widest text-[12px]">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="rounded-none border-[#33305e]/10 focus:border-[#51d2c6] focus:ring-0 h-[56px] bg-white" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="ports" className="text-[#33305e] font-bold uppercase tracking-widest text-[12px]">Ports of Interest *</Label>
                      <Select required>
                        <SelectTrigger className="rounded-none border-[#33305e]/10 focus:border-[#51d2c6] focus:ring-0 h-[56px] bg-white text-[#33305e]/70">
                          <SelectValue placeholder="Select Greek ports" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none border-[#33305e]/10">
                          {greekPorts.map((port) => (
                            <SelectItem key={port} value={port.toLowerCase().replace(/\s+/g, '-')} className="rounded-none">
                              {port}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label htmlFor="dates" className="text-[#33305e] font-bold uppercase tracking-widest text-[12px]">Preferred Dates</Label>
                        <Input id="dates" placeholder="e.g., Summer 2026" className="rounded-none border-[#33305e]/10 focus:border-[#51d2c6] focus:ring-0 h-[56px] bg-white" />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="guests" className="text-[#33305e] font-bold uppercase tracking-widest text-[12px]">Expected Guest Count</Label>
                        <Input id="guests" placeholder="e.g., 200-500 guests" className="rounded-none border-[#33305e]/10 focus:border-[#51d2c6] focus:ring-0 h-[56px] bg-white" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="message" className="text-[#33305e] font-bold uppercase tracking-widest text-[12px]">Additional Details</Label>
                      <Textarea 
                        id="message"
                        placeholder="Tell us about your specific requirements, budget considerations, or any special requests..."
                        rows={6}
                        className="rounded-none border-[#33305e]/10 focus:border-[#51d2c6] focus:ring-0 bg-white resize-none p-4"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-[64px] bg-[#33305e] text-white hover:bg-[#51d2c6] transition-all duration-500 shadow-xl font-bold rounded-none text-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Submitting...</>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-3" />
                          Request Proposal
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-12">
              <div className="space-y-10">
                <div className="space-y-4">
                  <h3 className="font-[var(--font-syne)] text-2xl font-bold text-[#33305e]">Contact Information</h3>
                  <div className="h-1 w-12 bg-[#51d2c6]"></div>
                </div>

                <div className="space-y-8">
                  <div className="flex items-start space-x-6">
                    <div className="flex h-12 w-12 items-center justify-center bg-[#33305e] border border-[#33305e]/5 shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-[var(--font-syne)] font-bold text-[#33305e] mb-1 text-lg">Head Office</div>
                      <div className="text-[#33305e]/70 leading-relaxed font-light">
                        Akti Miaouli 81 Pireas 185 38
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex h-12 w-12 items-center justify-center bg-[#33305e] border border-[#33305e]/5 shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-[var(--font-syne)] font-bold text-[#33305e] mb-1 text-lg">Phone</div>
                      <a href="tel:+302104519867" className="text-[#33305e]/70 hover:text-[#51d2c6] transition-colors font-light">
                        21 0451 9867
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex h-12 w-12 items-center justify-center bg-[#33305e] border border-[#33305e]/5 shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-[var(--font-syne)] font-bold text-[#33305e] mb-1 text-lg">Email</div>
                      <a href="mailto:operations@excursionsgreece.com" className="text-[#33305e]/70 hover:text-[#51d2c6] transition-colors font-light">
                        operations@excursionsgreece.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="flex h-12 w-12 items-center justify-center bg-[#33305e] border border-[#33305e]/5 shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-[var(--font-syne)] font-bold text-[#33305e] mb-1 text-lg">Business Hours</div>
                      <div className="text-[#33305e]/70 leading-relaxed font-light">
                        Mon - Fri: 8:00 AM - 6:00 PM EET<br />
                        Sat: 9:00 AM - 2:00 PM EET
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-10 bg-[#33305e] text-white rounded-none shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#51d2c6]/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <h3 className="font-[var(--font-syne)] text-2xl font-bold mb-4">Emergency Support</h3>
                  <p className="text-white/70 mb-8 font-light leading-relaxed">
                    24/7 assistance for urgent operational needs and immediate support.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Phone className="w-5 h-5 text-[#96e0d9]" />
                      <span className="font-bold">21 0451 9867</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Mail className="w-5 h-5 text-[#96e0d9]" />
                      <span className="font-medium text-white/80">operations@excursionsgreece.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#33305e] text-white">
        <div className={wrap}>
          <div className="py-24 grid gap-16 lg:grid-cols-[2fr_1fr_1fr] lg:gap-32">
            {/* Contact Info */}
            <div className="space-y-10">
              <img
                src="/images/figma/logo-landscape-footer.svg"
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
                  <span className="leading-snug">
                    Akti Miaouli 81 Pireas 185 38
                  </span>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h3 className="font-[var(--font-syne)] text-[22px] font-bold text-[#96e0d9] mb-8">
                Company
              </h3>
              <ul className="space-y-5">
                <li><Link href="/company" className="text-[18px] text-white/80 transition-colors hover:text-[#96e0d9]">About Us</Link></li>
                <li><Link href="/company" className="text-[18px] text-white/80 transition-colors hover:text-[#96e0d9]">Our Team</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-[var(--font-syne)] text-[22px] font-bold text-[#96e0d9] mb-8">
                Services
              </h3>
              <ul className="space-y-5">
                <li><Link href="/services" className="text-[18px] text-white/80 transition-colors hover:text-[#96e0d9]">Shore Excursions</Link></li>
                <li><Link href="/services" className="text-[18px] text-white/80 transition-colors hover:text-[#96e0d9]">VIP Services</Link></li>
                <li><Link href="/services" className="text-[18px] text-white/80 transition-colors hover:text-[#96e0d9]">Group Tours</Link></li>
                <li><Link href="/services" className="text-[18px] text-white/80 transition-colors hover:text-[#96e0d9]">Private Transfers</Link></li>
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
              ><Facebook className="h-5 w-5" /></a>
              <a
                href="https://www.instagram.com/excursiongreece/?hl=en"
                target="_blank"
                rel="noreferrer"
                aria-label="Excursions Greece on Instagram"
                className="hover:text-[#96e0d9] transition-colors"
              ><Instagram className="h-5 w-5" /></a>
              <a
                href="https://www.linkedin.com/company/excursions-greece/"
                target="_blank"
                rel="noreferrer"
                aria-label="Excursions Greece on LinkedIn"
                className="hover:text-[#96e0d9] transition-colors"
              ><Linkedin className="h-5 w-5" /></a>
            </div>

            <div className="flex gap-8">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
