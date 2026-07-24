import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

/**
 * Underlined-minimalist form primitives per the brief: transparent fields,
 * hairline base border, gold focus with a soft glow. Usable from server or
 * client components.
 */

const fieldBase =
  "w-full bg-transparent border-0 border-b border-white/15 px-0 py-3 text-[15px] text-white " +
  "placeholder:text-white/25 transition-[border-color,box-shadow] duration-300 " +
  "focus:border-gold focus:outline-none focus:shadow-[0_16px_28px_-20px_rgba(212,175,55,0.55)]";

export function Label({
  children,
  htmlFor,
}: {
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="overline-label block text-[10px] text-white/45">
      {children}
    </label>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props;
  return <input {...rest} className={`${fieldBase} ${className}`} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className = "", rows = 5, ...rest } = props;
  return <textarea {...rest} rows={rows} className={`${fieldBase} resize-none ${className}`} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  const { className = "", children, ...rest } = props;
  return (
    <select {...rest} className={`${fieldBase} cursor-pointer appearance-none bg-background ${className}`}>
      {children}
    </select>
  );
}

export function Field({
  label,
  htmlFor,
  children,
  error,
  className = "",
}: {
  label: string;
  htmlFor?: string;
  children: ReactNode;
  error?: string;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? <p className="text-xs text-error">{error}</p> : null}
    </div>
  );
}
