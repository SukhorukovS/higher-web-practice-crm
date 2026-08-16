// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { getCookie, removeCookie, setCookie } from './cookies'

describe('cookies', () => {
  beforeEach(() => {
    document.cookie = ''
  })

  afterEach(() => {
    document.cookie = ''
  })

  it('sets and reads a cookie', () => {
    setCookie('theme', 'dark')
    expect(getCookie('theme')).toBe('dark')
  })

  it('encodes and decodes special characters', () => {
    setCookie('token', 'a b&c=1')
    expect(getCookie('token')).toBe('a b&c=1')
  })

  it('returns null for a missing cookie', () => {
    expect(getCookie('missing')).toBeNull()
  })

  it('removes a cookie', () => {
    setCookie('theme', 'dark')
    removeCookie('theme')
    expect(getCookie('theme')).toBeNull()
  })

  it('overwrites an existing cookie', () => {
    setCookie('theme', 'dark')
    setCookie('theme', 'light')
    expect(getCookie('theme')).toBe('light')
  })
})
