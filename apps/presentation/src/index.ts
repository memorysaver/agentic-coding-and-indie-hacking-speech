import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { useWorkersLogger } from 'workers-tagged-logger'

import { useNotFound, useOnError } from '@repo/hono-helpers'
import { presentations } from './generated-presentations'

import type { App } from './context'

const app = new Hono<App>()
	.use(
		'*',
		// middleware
		(c, next) =>
			useWorkersLogger(c.env.NAME, {
				environment: c.env.ENVIRONMENT,
				release: c.env.SENTRY_RELEASE,
			})(c, next)
	)

	.onError(useOnError())
	.notFound(useNotFound())

	// Root page - presentation list
	.get('/', async (c) => {
		const presentationCards = presentations.map(p => `
			<div class="presentation">
				<h2><a href="${p.url}">${p.title}</a></h2>
				${p.description ? `<p>${p.description}</p>` : ''}
				${p.author ? `<div class="meta">Author: ${p.author}</div>` : ''}
				${p.topics.length > 0 ? `<div class="meta">Topics: ${p.topics.join(', ')}</div>` : ''}
			</div>
		`).join('')

		return c.html(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Presentations</title>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<style>
					body { font-family: system-ui; max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
					.presentation { border: 1px solid #ddd; border-radius: 8px; padding: 1.5rem; margin: 1rem 0; }
					.presentation h2 { margin-top: 0; color: #333; }
					.presentation a { color: #0066cc; text-decoration: none; }
					.presentation a:hover { text-decoration: underline; }
					.meta { color: #666; font-size: 0.9em; margin-top: 0.5rem; }
				</style>
			</head>
			<body>
				<h1>🎯 Presentations</h1>
				<p>Available presentations and talks (${presentations.length} total):</p>
				${presentationCards}
				<footer style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #eee; color: #666; text-align: center;">
					<p>Built with <a href="https://sli.dev" target="_blank">Slidev</a> and <a href="https://hono.dev" target="_blank">Hono</a></p>
				</footer>
			</body>
			</html>
		`)
	})

	// API endpoint for presentations list
	.get('/api/presentations', async (c) => {
		return c.json({ presentations })
	})

// Dynamically create routes for all presentations
presentations.forEach(presentation => {
	app.get(`/talks/${presentation.id}/*`, serveStatic({ 
		root: `./dist/presentations/${presentation.id}/` 
	}))
})

export default app
