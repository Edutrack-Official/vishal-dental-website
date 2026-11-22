import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-[0.95rem] font-semibold transition-[transform,translate,scale,rotate,box-shadow,border-color,color] duration-300 ease-out-expo active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink shadow-[0_10px_26px_-12px_var(--accent)] hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-12px_var(--accent)]",
  secondary:
    "border border-fg/15 bg-surface/60 text-fg hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent",
};

/** Lighter second tone that wipes across a primary button on hover. */
function Sheen() {
  return (
    <span
      aria-hidden
      className="absolute inset-0 -translate-x-[102%] bg-linear-to-r from-accent to-accent-2 transition-transform duration-500 ease-out-expo group-hover:translate-x-0"
    />
  );
}

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonProps = CommonProps &
  (
    | ({ href: string; external?: boolean } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">)
    | ({ href?: undefined; ref?: React.Ref<HTMLButtonElement> } & Omit<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        "className" | "children"
      >)
  );

export function Button(props: ButtonProps) {
  const { variant = "primary", className, children } = props;
  const classes = cn(base, variants[variant], className);
  const content = (
    <>
      {variant === "primary" && <Sheen />}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (props.href !== undefined) {
    const { href, external, variant: _v, className: _c, children: _ch, ...rest } = props;
    if (external || /^(https?:|mailto:|tel:)/.test(href)) {
      const newTab = href.startsWith("http");
      return (
        <a
          href={href}
          className={classes}
          {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...rest}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  const { variant: _v, className: _c, children: _ch, href: _h, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}
