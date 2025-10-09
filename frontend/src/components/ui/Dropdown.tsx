import type { CSSProperties, ReactNode } from 'react';

export type DropdownOption = {
  value: string;
  label: string;
  disabled?: boolean;
  style?: CSSProperties;
};

type DropdownProps = {
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  wrapperClassName?: string;
  selectClassName?: string;
  value: string | number | undefined;
  placeholder?: string;
  options?: DropdownOption[];
  children?: ReactNode;
  onChange: (value: string) => void;
  disabled?: boolean;
  id?: string;
  name?: string;
  required?: boolean;
};

const baseWrapperClasses = 'relative inline-flex w-full items-center';
const baseSelectClasses =
  'w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-10 text-sm text-slate-700 shadow-sm transition-colors hover:border-slate-300 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-200 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400';

const chevron = (
  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
    <svg
      className="h-4 w-4 drop-shadow-sm"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 8L10 12L14 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

export function Dropdown({
  label,
  labelClassName,
  containerClassName,
  wrapperClassName,
  selectClassName,
  value,
  placeholder,
  options,
  children,
  onChange,
  disabled,
  id,
  name,
  required,
}: DropdownProps) {
  const containerClasses = ['flex w-full flex-col gap-1 text-sm text-slate-600', containerClassName]
    .filter(Boolean)
    .join(' ');
  const labelClasses = ['text-xs font-semibold uppercase tracking-wide text-slate-500', labelClassName]
    .filter(Boolean)
    .join(' ');
  const wrapperClasses = [baseWrapperClasses, wrapperClassName].filter(Boolean).join(' ');
  const selectClasses = [baseSelectClasses, selectClassName].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label ? (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      ) : null}
      <div className={wrapperClasses}>
        <select
          id={id}
          name={name}
          value={value ?? ''}
          onChange={(event) => onChange(event.target.value)}
          className={selectClasses}
          disabled={disabled}
          required={required}
        >
          {placeholder ? (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          ) : null}
          {options?.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              style={option.style}
            >
              {option.label}
            </option>
          ))}
          {children}
        </select>
        {chevron}
      </div>
    </div>
  );
}
