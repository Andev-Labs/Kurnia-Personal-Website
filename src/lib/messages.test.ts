import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import { baseLocale, locales } from '#/paraglide/runtime.js'

const load = (locale: string): Record<string, string> => {
  const { $schema: _, ...messages } = JSON.parse(readFileSync(join(process.cwd(), 'messages', `${locale}.json`), 'utf8'))
  return messages
}

const markupTags = (message: string) => message.match(/\{[#/][a-z]+\}/g) ?? []

const base = load(baseLocale)

describe.each(locales.filter((locale) => locale !== baseLocale))('%s translations', (locale) => {
  const messages = load(locale)

  it('cover exactly the base locale keys', () => {
    expect(Object.keys(messages).sort()).toEqual(Object.keys(base).sort())
  })

  it.each(Object.keys(base))('keep balanced markup in %s', (key) => {
    const tags = markupTags(messages[key] ?? '')
    expect(tags.filter((tag) => tag.startsWith('{#')).length).toBe(tags.filter((tag) => tag.startsWith('{/')).length)
    expect(messages[key]?.trim()).not.toBe('')
  })
})
