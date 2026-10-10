import { Mail, MapPin } from "lucide-react";
import { useState, type FormEvent } from "react";
import { contactCopy, profile } from "../data/profile.ts";
import { deliverContact, isEmailJsConfigured, validateContact, type ContactDraft, type ContactErrors, type DeliveryResult } from "../lib/contact.ts";
import { isConfiguredEmail, isConfiguredUrl } from "../lib/utils.ts";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons.tsx";
import { Section, SectionHeading } from "./Section.tsx";

const emptyDraft: ContactDraft = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function deliveryMessage(result: DeliveryResult): string {
  if (result.type === "sent") return "Your message was sent. I will get back to you.";
  if (result.type === "opened") {
    return "Your email app opened with this message prepared. It has not been delivered until you send it from there.";
  }
  return result.message;
}

export function Contact() {
  const [draft, setDraft] = useState<ContactDraft>(emptyDraft);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [result, setResult] = useState<DeliveryResult | null>(null);
  const [sending, setSending] = useState(false);
  const emailConfigured = isConfiguredEmail(profile.email);
  const linkedinConfigured = isConfiguredUrl(profile.linkedinUrl);
  const githubConfigured = isConfiguredUrl(profile.githubUrl);
  const emailJs = isEmailJsConfigured();

  function update(field: keyof ContactDraft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContact(draft);
    setErrors(nextErrors);
    setResult(null);

    const firstInvalid = (Object.keys(nextErrors) as Array<keyof ContactDraft>).find((field) => nextErrors[field]);
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setSending(true);
    const delivery = await deliverContact(draft, profile.email);
    setSending(false);
    setResult(delivery);
    if (delivery.type === "sent") setDraft(emptyDraft);
  }

  return (
    <Section id="contact" className="band">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <SectionHeading number="06" eyebrow="Contact" title={contactCopy.headline} description={contactCopy.summary} />
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="font-semibold text-ink">Email</p>
                {emailConfigured ? (
                  <a className="text-muted underline decoration-line underline-offset-4" href={`mailto:${profile.email}`}>
                    {profile.email}
                  </a>
                ) : (
                  <p className="text-muted">[ADD PROFESSIONAL EMAIL]</p>
                )}
              </div>
            </li>
            <li className="flex items-start gap-3">
              <LinkedInIcon className="mt-0.5 size-4 shrink-0 text-accent" />
              <div>
                <p className="font-semibold text-ink">LinkedIn</p>
                {linkedinConfigured ? (
                  <a className="break-all text-muted underline decoration-line underline-offset-4" href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                    {profile.linkedinUrl}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <p className="text-muted">[ADD LINKEDIN URL]</p>
                )}
              </div>
            </li>
            <li className="flex items-start gap-3">
              <GitHubIcon className="mt-0.5 size-4 shrink-0 text-accent" />
              <div>
                <p className="font-semibold text-ink">GitHub</p>
                {githubConfigured ? (
                  <a className="break-all text-muted underline decoration-line underline-offset-4" href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
                    {profile.githubUrl}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <p className="text-muted">[ADD GITHUB PROFILE URL]</p>
                )}
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="font-semibold text-ink">Location</p>
                <p className="text-muted">{profile.location}</p>
              </div>
            </li>
          </ul>
        </div>

        <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              id="contact-name"
              label="Name"
              value={draft.name}
              error={errors.name}
              autoComplete="name"
              onChange={(value) => update("name", value)}
            />
            <Field
              id="contact-email"
              label="Email"
              type="email"
              value={draft.email}
              error={errors.email}
              autoComplete="email"
              onChange={(value) => update("email", value)}
            />
          </div>
          <div className="mt-4">
            <Field
              id="contact-subject"
              label="Subject"
              value={draft.subject}
              error={errors.subject}
              autoComplete="off"
              onChange={(value) => update("subject", value)}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="contact-message" className="text-sm font-semibold text-ink">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              value={draft.message}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              aria-required="true"
              onChange={(event) => update("message", event.target.value)}
              className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 text-ink"
            />
            {errors.message ? (
              <p id="contact-message-error" className="mt-2 text-sm text-danger">
                {errors.message}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={sending}
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-accent-foreground disabled:opacity-70"
          >
            {sending ? "Sending…" : emailJs ? "Send message" : "Open email app"}
          </button>

          <p className="mt-3 text-sm leading-relaxed text-muted">
            {emailJs
              ? "Messages are delivered through EmailJS. A success note appears only after the service accepts the message."
              : emailConfigured
                ? "This form opens your email application with the message ready to send. Nothing is delivered until you send it from there."
                : "Add your professional email above, or configure EmailJS, before this form can deliver a message."}
          </p>

          {result ? (
            <p role="status" className={`mt-4 text-sm leading-relaxed ${result.type === "error" ? "text-danger" : "text-ink"}`}>
              {deliveryMessage(result)}
            </p>
          ) : null}
        </form>
      </div>
    </Section>
  );
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete: string;
}) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        aria-required="true"
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 text-ink"
      />
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
