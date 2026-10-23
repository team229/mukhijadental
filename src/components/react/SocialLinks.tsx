import { socialLinks } from "../../data/site";
import { socialIconPaths } from "../icons/socialPaths";

interface Props {
  variant?: "light" | "dark";
  size?: "sm" | "md";
  className?: string;
}

export default function SocialLinks({ variant = "dark", size = "sm", className = "" }: Props) {
  const linkClasses = variant === "light"
    ? "bg-white/10 text-white ring-1 ring-inset ring-white/15 hover:bg-white hover:text-brand"
    : "bg-brand/5 text-brand ring-1 ring-inset ring-brand/10 hover:bg-brand hover:text-white";
  const sizeClasses = size === "md" ? "h-9 w-9" : "h-8 w-8";
  const iconClasses = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";

  return (
    <div className={`flex items-center gap-2 ${className}`} role="group" aria-label="Follow us">
      {socialLinks.map((social) => (
        <a
          key={social.href}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          title={social.label}
          className={`inline-flex items-center justify-center rounded-full transition-all duration-200 hover:-translate-y-0.5 ${sizeClasses} ${linkClasses}`}
        >
          <svg className={iconClasses} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d={socialIconPaths[social.icon]} />
          </svg>
        </a>
      ))}
    </div>
  );
}
