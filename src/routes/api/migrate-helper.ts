import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/migrate-helper')({
  server: {
    handlers: {
      GET: async () => {
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      },
    },
  },
})
