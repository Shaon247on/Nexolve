"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { ScrollAnimatedText } from "@/components/shared/ScrollAnimatedText";
import TitleSection from "@/components/element/TitleSection";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be at most 100 characters."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 characters.")
    .max(20, "Phone number must be at most 20 characters."),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(1000, "Message must be at most 1000 characters."),
});

type ContactFormValues = z.infer<typeof formSchema>;

const officeLocations = [
  {
    id: "office-1",
    title: "Office",
    address1: "205 North Michigan Avenue, Suite 810",
    address2: "Chicago, 60601, USA",
    phone: "+1234567890",
    email: "hello@orisa.com",
    icon: "house",
  },
  {
    id: "office-2",
    title: "Office",
    address1: "245 Fifth Avenue, Suite 1800",
    address2: "New York, NY 10016, USA",
    phone: "+2125557398",
    email: "sale@orisa.com",
    icon: "grid",
  },
] as const;

const socialLinks = [
  { label: "Twitter", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Linkedin", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Youtube", href: "#" },
] as const;

export default function ContactUsForm() {
  const sectionRef = React.useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 220]);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    toast("Message sent successfully", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-black p-4 text-white">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "999px",
      } as React.CSSProperties,
    });

    form.reset();
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden text-black">
      <div className="mx-auto w-full max-w-[1920px] px-5 py-12 sm:px-8 sm:py-14 md:px-10 lg:px-14 lg:py-16 xl:px-[56px] xl:py-[52px] 2xl:px-[72px]">
        <TitleSection
        scrollYProgress={scrollYProgress}
        title="Contact Us"
        className="text-6xl md:text-9xl lg:text-[10rem] xl:text-[13rem]"
        />
        <div className="grid grid-cols-1 gap-12 xl:grid-cols-[560px_minmax(0,1fr)] xl:gap-16 2xl:grid-cols-[620px_minmax(0,1fr)]">
          <div className="flex h-full flex-col">
            <ScrollAnimatedText
              title="Get in touch"
              className="text-5xl md:text-8xl lg:text-9xl xl:text-8xl"
            />

            <div className="mt-10 space-y-10 sm:mt-12 sm:space-y-12 lg:mt-14 lg:space-y-14">
              {officeLocations.map((office, index) => (
                <motion.div
                  key={office.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.55,
                    ease: "easeOut",
                    delay: 0.08 + index * 0.06,
                  }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center text-black">
                    {office.icon === "house" ? <HouseMark /> : <GridMark />}
                  </div>

                  <div>
                    <h3 className="mb-2 text-[24px] font-medium leading-none tracking-[-0.03em] text-black sm:text-[26px]">
                      {office.title}
                    </h3>

                    <div className="space-y-0.5 text-[18px] leading-[1.18] tracking-[-0.02em] text-black/58 sm:text-[19px]">
                      <p>{office.address1}</p>
                      <p>{office.address2}</p>
                      <p>
                        Phone:{" "}
                        <a
                          href={`tel:${office.phone}`}
                          className="transition-colors hover:text-black"
                        >
                          {office.phone}
                        </a>
                      </p>
                      <p>
                        Email:{" "}
                        <a
                          href={`mailto:${office.email}`}
                          className="transition-colors hover:text-black"
                        >
                          {office.email}
                        </a>
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
              className="mt-12 grid max-w-[360px] grid-cols-1 gap-y-5 sm:mt-14 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-6"
            >
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center gap-2 text-[18px] font-normal tracking-[-0.02em] text-black/85 transition-all duration-300 hover:translate-x-1 hover:text-black"
                >
                  <SocialDot />
                  <span>{item.label}</span>
                </a>
              ))}
            </motion.div>
          </div>

          <div className="relative">
            <motion.div
              style={{ rotate }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="absolute right-0 top-0 hidden origin-center xl:block"
            >
              <StarBurstIcon className="h-[92px] w-[92px] text-black 2xl:h-[110px] 2xl:w-[110px]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
              className="mx-auto max-w-[540px] pt-2 text-center xl:mr-0 xl:ml-auto xl:max-w-[520px] xl:pr-[28px] mt-40"
            >
              <p className="text-[24px] font-normal leading-[1.1] tracking-[-0.03em] text-black/62 2xl:text-[25px]">
                Start the conversation by sharing your vision.
                <br />
                Our team will respond within 1–2 business days.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
              className="mt-12 xl:mt-16"
            >
              <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup className="space-y-0">
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="contact-name" className="sr-only">
                          Your name
                        </FieldLabel>
                        <Input
                          {...field}
                          id="contact-name"
                          aria-invalid={fieldState.invalid}
                          placeholder="Your name *"
                          autoComplete="name"
                          className="h-[64px] rounded-none border-0 border-b border-black/75 bg-transparent px-0 text-[18px] tracking-[-0.02em] text-black placeholder:text-black/52 shadow-none outline-none ring-0 transition-colors duration-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="contact-email" className="sr-only">
                          Your email
                        </FieldLabel>
                        <Input
                          {...field}
                          id="contact-email"
                          type="email"
                          aria-invalid={fieldState.invalid}
                          placeholder="Your email *"
                          autoComplete="email"
                          className="h-[64px] rounded-none border-0 border-b border-black/75 bg-transparent px-0 text-[18px] tracking-[-0.02em] text-black placeholder:text-black/52 shadow-none outline-none ring-0 transition-colors duration-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="phone"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="contact-phone" className="sr-only">
                          Your phone
                        </FieldLabel>
                        <Input
                          {...field}
                          id="contact-phone"
                          type="tel"
                          aria-invalid={fieldState.invalid}
                          placeholder="Your phone *"
                          autoComplete="tel"
                          className="h-[64px] rounded-none border-0 border-b border-black/75 bg-transparent px-0 text-[18px] tracking-[-0.02em] text-black placeholder:text-black/52 shadow-none outline-none ring-0 transition-colors duration-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="message"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="contact-message"
                          className="sr-only"
                        >
                          Your message
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupTextarea
                            {...field}
                            id="contact-message"
                            placeholder="Your message *"
                            rows={6}
                            aria-invalid={fieldState.invalid}
                            className="min-h-[140px] resize-none rounded-none border-0 border-b border-black/75 bg-transparent px-0 py-4 text-[18px] tracking-[-0.02em] text-black placeholder:text-black/52 shadow-none outline-none ring-0 transition-colors duration-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </InputGroup>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>

                <div className="pt-8 sm:pt-10">
                  <Button
                    type="submit"
                    className="group h-[54px] rounded-full bg-[#171717] px-7 text-[17px] font-medium tracking-[-0.03em] text-white hover:bg-black"
                    disabled={form.formState.isSubmitting}
                  >
                    <span>
                      {form.formState.isSubmitting
                        ? "Sending..."
                        : "Send Message"}
                    </span>
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Button>

                  <p className="mt-5 text-[15px] leading-relaxed tracking-[-0.02em] text-black/55 sm:text-[16px]">
                    By submitting, you agree to our Terms and Privacy Policy.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StarBurstIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M50 6V94M6 50H94M18 18L82 82M82 18L18 82"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="square"
      />
    </svg>
  );
}

function HouseMark() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-11 w-11"
      fill="none"
      aria-hidden="true"
    >
      <path d="M6 24L24 6L42 24V42H6V24Z" fill="currentColor" />
      <path d="M24 6L42 24V42H24V6Z" fill="#ececec" opacity="0.96" />
      <path d="M24 6L42 24V42H24V6Z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function GridMark() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-11 w-11"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 7H19V19H7V7ZM29 7H41V19H29V7ZM7 29H19V41H7V29ZM29 29H41V41H29V29Z"
        fill="currentColor"
      />
      <path d="M19 19L29 29M29 19L19 29" stroke="#ececec" strokeWidth="3" />
    </svg>
  );
}

function SocialDot() {
  return (
    <span className="inline-block h-[15px] w-[15px] rounded-[2px] border border-black/85" />
  );
}
