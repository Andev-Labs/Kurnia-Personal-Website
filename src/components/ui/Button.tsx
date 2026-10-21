import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

import { cn } from '#/lib/cn'

export type ButtonVariant = 'primary' | 'secondary'

const BASE_CLASS =
  'lift inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3.5 font-heading text-[15px] leading-none font-semibold shadow-soft-sm'

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-violet text-white hover:bg-violet-deep hover:text-white',
  secondary: 'border-2 border-lavender-200 bg-white text-violet hover:border-lavender hover:text-violet',
}

interface CommonProps {
  variant?: ButtonVariant
}

type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type ButtonAsLink = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export function buttonClassName(variant: ButtonVariant = 'primary', className?: string) {
  return cn(BASE_CLASS, variantClass[variant], className)
}

/** Pill button; renders an `<a>` when `href` is given. */
export function Button(props: ButtonAsButton | ButtonAsLink) {
  if (props.href !== undefined) {
    const { variant, className, ...rest } = props
    return <a className={buttonClassName(variant, className)} {...rest} />
  }
  const { variant, className, type = 'button', ...rest } = props
  return <button type={type} className={buttonClassName(variant, className)} {...rest} />
}
