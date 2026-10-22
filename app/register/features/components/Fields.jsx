"use client";
import { Root, Trigger, Value, Icon, Portal, Content, ScrollUpButton, Item, Viewport, ScrollDownButton, ItemIndicator, ItemText } from "@radix-ui/react-select";
import { AlertCircle, Check, ChevronDown, ChevronUp } from "lucide-react";

// Same family as the original form (purple border, glassy fill), a bit more refined.
export const inputClass = (error) =>
  `reg-input w-full rounded-lg border bg-white/[0.04] px-4 py-3 text-[15px] text-white outline-none transition-[border-color,background-color,box-shadow] duration-300 placeholder:text-white/40 focus:bg-white/[0.07] focus:ring-4 ${
    error ? "border-[#ff8a8a]/80 focus:border-[#ff8a8a] focus:ring-[#ff8a8a]/15" : "border-Main-500 hover:border-Main-400 focus:border-accent-400 focus:ring-accent-500/15"
  }`;

export function FieldError({ children, id }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-2 flex items-center gap-1.5 text-[13px] text-[#ff9a9a]">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {children}
    </p>
  );
}

export function Field({ label, required, optional, error, htmlFor, children, className = "" }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 flex items-center gap-1 font-futura_md_bt text-sm text-white/90">
        {label}
        {required && <span className="text-error-200">*</span>}
        {optional && <span className="ml-1 text-xs text-white/40">(optional)</span>}
      </label>
      {children}
      <FieldError id={htmlFor ? `${htmlFor}-error` : undefined}>{error}</FieldError>
    </div>
  );
}

/** Radix select styled like the inputs (same value/onValueChange API as before). */
export function SelectField({ id, placeholder, options, value, onValueChange, error }) {
  return (
    <Root value={value} onValueChange={onValueChange}>
      <Trigger id={id} aria-invalid={!!error} className={`${inputClass(error)} group flex items-center justify-between gap-2 text-left data-[placeholder]:text-white/40`} aria-label={placeholder}>
        <Value placeholder={placeholder} />
        <Icon>
          <ChevronDown className="h-4 w-4 text-white/60 transition-transform duration-300 group-data-[state=open]:rotate-180" />
        </Icon>
      </Trigger>
      <Portal>
        <Content position="popper" sideOffset={6} className="z-[100] max-h-[min(320px,var(--radix-select-content-available-height))] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-Main-500 bg-Main-700 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]">
          <ScrollUpButton className="flex items-center justify-center py-1 text-white/60">
            <ChevronUp className="h-4 w-4" />
          </ScrollUpButton>
          <Viewport className="p-1.5">
            {options.map((option) => (
              <Item
                key={option}
                value={option}
                className="relative flex cursor-pointer select-none items-center rounded-md py-2.5 pl-3 pr-9 text-sm text-neutral-200 outline-none data-[highlighted]:bg-accent-500 data-[highlighted]:text-white data-[state=checked]:font-futura_md_bt"
              >
                <ItemText>{option}</ItemText>
                <ItemIndicator className="absolute right-3">
                  <Check className="h-4 w-4" />
                </ItemIndicator>
              </Item>
            ))}
          </Viewport>
          <ScrollDownButton className="flex items-center justify-center py-1 text-white/60">
            <ChevronDown className="h-4 w-4" />
          </ScrollDownButton>
        </Content>
      </Portal>
    </Root>
  );
}

/** The original step header: the club's icon centred above the title. */
export function StepHeader({ icon, title, text }) {
  return (
    <div className="mb-8 text-center">
      <span className="relative mx-auto mb-4 grid h-[76px] w-[76px] place-items-center">
        <span className="absolute inset-0 rounded-full bg-Main-500/25 blur-xl" aria-hidden="true" />
        {typeof icon === "string" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={icon} alt="" className="relative h-16 w-16 md:h-[70px] md:w-[70px]" />
        ) : (
          <IconComp icon={icon} />
        )}
      </span>
      <h2 className="font-futura_bold text-2xl text-white md:text-[28px]">{title}</h2>
      {text && <p className="mx-auto mt-2 max-w-md text-sm text-white/55">{text}</p>}
    </div>
  );
}

function IconComp({ icon: I }) {
  return <I className="relative h-12 w-12 text-Main-200" />;
}
