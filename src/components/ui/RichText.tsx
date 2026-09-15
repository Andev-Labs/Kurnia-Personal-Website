import { ParaglideMessage } from '@inlang/paraglide-js-react'
import type { MessageLike } from '@inlang/paraglide-js-react'
import type { ReactNode } from 'react'

import type { Locale } from '#/paraglide/runtime.js'

/** A message without inputs whose translators mark emphasis with `{#b}…{/b}`. */
export type RichMessage = MessageLike<
  object,
  { locale?: Locale },
  { b: { options: Record<string, never>; attributes: Record<string, never>; children: true } }
>

const MARKUP = {
  b: ({ children }: { children?: ReactNode }) => <strong>{children}</strong>,
}

export function RichText({ message }: { message: RichMessage }) {
  return <ParaglideMessage message={message} markup={MARKUP} />
}
