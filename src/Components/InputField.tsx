"use client";

import { useId } from "react";
import type { ChangeEvent, CSSProperties } from "react";
import {
  Colors,
  CornerRoundness,
  FontFamily,
  FontSize,
  LetterSpacing,
  MotionDuration,
  Opacity,
  Spacing,
  withOpacity,
} from "@/DesignSystem";

type TokenStyle = CSSProperties & Record<`--${string}`, string>;

const FIELD_STYLE: TokenStyle = {
  "--field-bg": Colors.SurfaceContainerLow,
  "--field-fg": Colors.OnSurface,
  "--field-placeholder": withOpacity(Colors.OnSurfaceVariant, Opacity.Half),
  "--field-border": withOpacity(Colors.Primary, Opacity.Soft),
  "--field-border-focus": Colors.Primary,
  "--field-border-error": Colors.Error,
  "--field-px": Spacing.TwoUnits,
  "--field-py": Spacing.Unit,
  "--field-min-h": Spacing.MinTapTarget,
  "--field-radius": CornerRoundness.Small,
  "--field-font": FontFamily.Sans,
  "--field-fs": FontSize.BodyMedium,
  "--field-duration": MotionDuration.Standard,
};

const LABEL_STYLE: TokenStyle = {
  "--label-font": FontFamily.Mono,
  "--label-fs": FontSize.LabelExtraSmall,
  "--label-fg": Colors.OnSurfaceVariant,
  "--label-gap": Spacing.Unit,
  letterSpacing: LetterSpacing.WideMono,
};

const HINT_STYLE: TokenStyle = {
  "--hint-fs": FontSize.LabelSmall,
  "--hint-fg": Colors.OnSurfaceMuted,
  "--hint-error-fg": Colors.Error,
};

interface InputFieldProps {
  /** Görünen etiket; çağıran taraf dile göre (tr/en) verir */
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly type?: "text" | "email" | "search" | "url" | "tel";
  readonly name?: string;
  readonly placeholder?: string;
  readonly hint?: string;
  readonly error?: string;
  readonly required?: boolean;
  readonly autoComplete?: string;
}

/**
 * Etiketli metin alanı. Hata ve açıklama metnini ekran okuyucuya `aria-describedby` ile bağlar.
 * Görünüm değerlerinin hepsi DesignSystem enumlarından gelir.
 */
export default function InputField({
  label,
  value,
  onChange,
  type = "text",
  name,
  placeholder,
  hint,
  error,
  required = false,
  autoComplete,
}: InputFieldProps) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className="flex flex-col gap-(--label-gap)" style={LABEL_STYLE}>
      <label htmlFor={id} className="uppercase font-(family-name:--label-font) text-(length:--label-fs) text-(--label-fg)">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        style={FIELD_STYLE}
        className={
          "w-full border min-h-(--field-min-h) px-(--field-px) py-(--field-py) rounded-(--field-radius) " +
          "bg-(--field-bg) text-(--field-fg) placeholder:text-(--field-placeholder) " +
          "font-(family-name:--field-font) text-(length:--field-fs) transition-colors duration-(--field-duration) " +
          (error ? "border-(--field-border-error)" : "border-(--field-border) focus:border-(--field-border-focus)")
        }
      />
      {(error ?? hint) && (
        <p
          id={describedBy}
          style={HINT_STYLE}
          className={`text-(length:--hint-fs) ${error ? "text-(--hint-error-fg)" : "text-(--hint-fg)"}`}
          role={error ? "alert" : undefined}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
