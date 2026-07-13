import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { copyText } from './copy-text.js'

describe('copyText', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('writes the value to the clipboard', async () => {
    await copyText('+972507148309')
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('+972507148309')
  })
})
