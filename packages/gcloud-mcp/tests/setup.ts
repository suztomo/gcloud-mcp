import { vi } from 'vitest'

// Polyfill for process.listeners
if (!process.listeners) {
  process.listeners = vi.fn(() => []) as any
}
