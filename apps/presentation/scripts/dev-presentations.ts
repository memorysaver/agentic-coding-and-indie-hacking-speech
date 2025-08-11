#!/usr/bin/env tsx
import { spawn } from 'node:child_process'
import { discoverPresentations, findPresentation, getPresentationConfig } from './discover-presentations.js'

interface DevOptions {
	presentation?: string
	port?: number
	open?: boolean
	verbose?: boolean
}

/**
 * Main development function
 */
async function devPresentations(options: DevOptions = {}) {
	const { presentation, port, open = true, verbose = false } = options

	if (presentation) {
		// Develop single presentation
		await devSinglePresentation(presentation, port, open, verbose)
	} else {
		// Develop all presentations
		await devAllPresentations(open, verbose)
	}
}

/**
 * Develop a single presentation
 */
async function devSinglePresentation(presentationId: string, port?: number, open?: boolean, verbose?: boolean) {
	const presentation = findPresentation(presentationId)
	
	if (!presentation) {
		console.error(`❌ Presentation "${presentationId}" not found`)
		process.exit(1)
	}

	const config = getPresentationConfig(presentation, port || 3001)
	
	console.log(`🚀 Starting development server for: ${presentation.title}`)
	console.log(`📡 Server: http://localhost:${config.devPort}`)

	// Start Slidev dev server
	const args = [
		'slides.md',
		'--port', config.devPort.toString(),
		'--remote', 
		'--bind', '0.0.0.0'
	]

	if (open) {
		args.push('--open')
	}

	const slidev = spawn('npx', ['slidev', ...args], {
		cwd: presentation.path,
		stdio: 'inherit'
	})

	// Handle process termination
	process.on('SIGINT', () => {
		console.log('\n👋 Shutting down development server...')
		slidev.kill()
		process.exit(0)
	})

	// Wait for process to complete
	return new Promise<void>((resolve, reject) => {
		slidev.on('close', (code) => {
			if (code === 0) {
				resolve()
			} else {
				reject(new Error(`Development server exited with code ${code}`))
			}
		})
	})
}

/**
 * Develop all presentations (start multiple dev servers)
 */
async function devAllPresentations(open?: boolean, verbose?: boolean) {
	const presentations = discoverPresentations()
	
	if (presentations.length === 0) {
		console.log('ℹ️ No presentations found')
		return
	}

	console.log('🚀 Starting development servers for all presentations...')
	console.log(`📦 Found ${presentations.length} presentation(s):`)

	const servers: any[] = []
	let startPort = 3001

	// Start dev server for each presentation
	for (const [index, presentation] of presentations.entries()) {
		const config = getPresentationConfig(presentation, startPort + index)
		
		console.log(`  - ${presentation.id}: http://localhost:${config.devPort}`)

		// Start Slidev dev server
		const args = [
			'slides.md',
			'--port', config.devPort.toString(),
			'--remote',
			'--bind', '0.0.0.0'
		]

		// Only open first presentation
		if (open && index === 0) {
			args.push('--open')
		}

		const slidev = spawn('npx', ['slidev', ...args], {
			cwd: presentation.path,
			stdio: verbose ? 'inherit' : 'pipe'
		})

		servers.push({
			process: slidev,
			presentation,
			port: config.devPort
		})

		// Handle individual server output
		if (!verbose) {
			slidev.stdout?.on('data', (data) => {
				const output = data.toString().trim()
				if (output) {
					console.log(`[${presentation.id}] ${output}`)
				}
			})

			slidev.stderr?.on('data', (data) => {
				const output = data.toString().trim()
				if (output) {
					console.error(`[${presentation.id}] ${output}`)
				}
			})
		}
	}

	console.log('\n📡 All development servers started!')
	console.log('📖 Presentation URLs:')
	servers.forEach(({ presentation, port }) => {
		console.log(`  - ${presentation.title}: http://localhost:${port}`)
	})
	console.log('\n💡 Press Ctrl+C to stop all servers')

	// Handle process termination
	process.on('SIGINT', () => {
		console.log('\n👋 Shutting down all development servers...')
		servers.forEach(server => server.process.kill())
		process.exit(0)
	})

	// Wait for all servers (they run indefinitely)
	await new Promise(() => {}) // Keep process alive
}

/**
 * Parse command line arguments
 */
function parseArgs(): DevOptions {
	const args = process.argv.slice(2)
	const options: DevOptions = {}

	for (let i = 0; i < args.length; i++) {
		const arg = args[i]
		const next = args[i + 1]
		
		if (arg === '--port' || arg === '-p') {
			if (next && !next.startsWith('-')) {
				options.port = parseInt(next, 10)
				i++ // Skip next arg
			}
		} else if (arg === '--no-open') {
			options.open = false
		} else if (arg === '--verbose' || arg === '-v') {
			options.verbose = true
		} else if (arg === '--help' || arg === '-h') {
			printUsage()
			process.exit(0)
		} else if (!arg.startsWith('-')) {
			options.presentation = arg
		}
	}

	return options
}

/**
 * Print usage information
 */
function printUsage() {
	console.log(`
Usage: dev-presentations.ts [presentation] [options]

Arguments:
  presentation    Develop only the specified presentation (optional)

Options:
  --port, -p      Port for development server (default: 3001)
  --no-open       Don't open browser automatically
  --verbose, -v   Show detailed server output
  --help, -h      Show this help message

Examples:
  tsx dev-presentations.ts                           # Start all presentation servers
  tsx dev-presentations.ts claude-code-configuration # Start specific presentation
  tsx dev-presentations.ts --port 4000               # Use custom port
  tsx dev-presentations.ts --verbose                 # Show all server output
`)
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
	const options = parseArgs()
	devPresentations(options).catch(error => {
		console.error('❌ Development server failed:', error.message)
		process.exit(1)
	})
}

export { devPresentations }