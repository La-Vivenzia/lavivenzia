import type { SVGProps } from "react";

/**
 * Bespoke hairline icon set for La Vivenzia.
 * Drawn on a 24px grid with fine strokes and currentColor, so they inherit
 * the surrounding gold/ivory palette like the Lucide icons they replace.
 */
type IconProps = SVGProps<SVGSVGElement> & { strokeWidth?: number };

function base({ strokeWidth = 1, ...props }: IconProps): SVGProps<SVGSVGElement> {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    focusable: false,
    ...props,
  };
}

/** Navigator's compass — bezel, eight ticks and a single half-inked needle. */
export function CompassRoseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="12" cy="12" r="7.25" opacity="0.45" />
      <path d="M12 2.5v1.6M12 19.9v1.6M2.5 12h1.6M19.9 12h1.6" />
      <path d="M5.3 5.3l.9.9M17.8 17.8l.9.9M18.7 5.3l-.9.9M6.2 17.8l-.9.9" opacity="0.55" />
      <path d="M12 5.6 13.6 12 12 18.4 10.4 12Z" />
      <path d="M12 5.6 13.6 12h-3.2Z" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Armillary sphere — the celestial instrument of foresight, on a fine stand. */
export function ArmillarySphereIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="10.5" r="8" />
      <ellipse cx="12" cy="10.5" rx="8" ry="2.9" transform="rotate(-18 12 10.5)" />
      <ellipse cx="12" cy="10.5" rx="2.9" ry="8" opacity="0.6" />
      <path d="M5.2 6.3c3.9 1.6 9.7 1.6 13.6 0" opacity="0.4" />
      <circle cx="12" cy="10.5" r="0.9" fill="currentColor" stroke="none" />
      <path d="M12 18.5v2.6M8.8 21.6h6.4" />
    </svg>
  );
}

/** Architectural arch — a framed portal, echoing the brand's hero window. */
export function ArchPortalIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 21V10a7 7 0 0 1 14 0v11" />
      <path d="M8.2 21v-9.6a3.8 3.8 0 0 1 7.6 0V21" opacity="0.55" />
      <path d="M3.5 21h17" />
      <path d="M12 3v1.4" opacity="0.55" />
    </svg>
  );
}

/** Serif "LV" monogram set within a double hairline ring. */
export function MonogramEmblem(props: IconProps) {
  const { strokeWidth = 0.8, ...rest } = props;
  return (
    <svg {...base({ strokeWidth, ...rest })} viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="15" />
      <circle cx="16" cy="16" r="12.6" opacity="0.45" />
      <text
        x="16"
        y="16.4"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="currentColor"
        stroke="none"
        fontSize="11"
        letterSpacing="0.6"
        style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
      >
        LV
      </text>
    </svg>
  );
}
