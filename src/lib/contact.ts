import { isConfiguredEmail } from "./utils.ts";

export interface ContactDraft {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactField = keyof ContactDraft;
export type ContactErrors = Partial<Record<ContactField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readEnv(value: string | undefined): string {
  return (value ?? "").trim();
}

export function isEmailJsConfigured(): boolean {
  return Boolean(
    readEnv(import.meta.env.VITE_EMAILJS_SERVICE_ID) &&
      readEnv(import.meta.env.VITE_EMAILJS_TEMPLATE_ID) &&
      readEnv(import.meta.env.VITE_EMAILJS_PUBLIC_KEY),
  );
}

export function validateContact(draft: ContactDraft): ContactErrors {
  const errors: ContactErrors = {};

  if (draft.name.trim().length < 2) {
    errors.name = "Enter your name.";
  }

  if (!EMAIL_PATTERN.test(draft.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (draft.subject.trim().length < 3) {
    errors.subject = "Enter a subject.";
  }

  if (draft.message.trim().length < 10) {
    errors.message = "Enter a message of at least 10 characters.";
  }

  return errors;
}

export function buildMailto(to: string, draft: ContactDraft): string {
  const subject = `Portfolio enquiry: ${draft.subject.trim()}`;
  const body = `Name: ${draft.name.trim()}\nEmail: ${draft.email.trim()}\n\n${draft.message.trim()}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export type DeliveryResult = { type: "sent" } | { type: "opened" } | { type: "error"; message: string };

export async function deliverContact(draft: ContactDraft, recipient: string): Promise<DeliveryResult> {
  if (isEmailJsConfigured()) {
    try {
      const emailjs = await import("@emailjs/browser");
      const result = await emailjs.send(
        readEnv(import.meta.env.VITE_EMAILJS_SERVICE_ID),
        readEnv(import.meta.env.VITE_EMAILJS_TEMPLATE_ID),
        {
          from_name: draft.name.trim(),
          reply_to: draft.email.trim(),
          subject: draft.subject.trim(),
          message: draft.message.trim(),
        },
        { publicKey: readEnv(import.meta.env.VITE_EMAILJS_PUBLIC_KEY) },
      );

      if (result.status !== 200) {
        return {
          type: "error",
          message: "The message was not accepted. Please try again, or email me directly.",
        };
      }

      return { type: "sent" };
    } catch {
      return {
        type: "error",
        message: "The message could not be sent. Please try again, or email me directly.",
      };
    }
  }

  if (!isConfiguredEmail(recipient)) {
    return {
      type: "error",
      message: "A contact email has not been added yet. Add one beside the form, or configure EmailJS.",
    };
  }

  const href = buildMailto(recipient, draft);
  if (href.length > 1800) {
    return {
      type: "error",
      message: "This message is too long to open in an email app. Shorten it, or email me directly once an address is listed.",
    };
  }

  window.location.href = href;
  return { type: "opened" };
}
