#!/usr/bin/env tsx
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { discoverPresentations, findPresentation, getPresentationConfig } from './discover-presentations.js'
import { generatePresentationData } from './generate-presentation-data.js'

interface BuildOptions {
	presentation?: string
	parallel?: boolean
	verbose?: boolean
}

/**
 * Main build function
 */
async function buildPresentations(options: BuildOptions = {}) {
	const { presentation, parallel = true, verbose = false } = options

	console.log('🎯 Building presentations...')

	// Generate presentation data for worker
	generatePresentationData()

	// Get presentations to build
	const presentations = presentation 
		? [findPresentation(presentation)].filter(Boolean)
		: discoverPresentations()

	if (presentations.length === 0) {
		if (presentation) {
			console.error(`❌ Presentation "${presentation}" not found`)
			process.exit(1)
		} else {
			console.log('ℹ️ No presentations found')
			return
		}
	}

	console.log(`📦 Found ${presentations.length} presentation(s):`)
	presentations.forEach(p => console.log(`  - ${p.id}: ${p.title}`))

	// Build presentations
	if (parallel && presentations.length > 1) {
		await buildInParallel(presentations, verbose)
	} else {
		await buildSequentially(presentations, verbose)
	}

	console.log('✅ All presentations built successfully!')
}

/**
 * Build presentations in parallel
 */
async function buildInParallel(presentations: any[], verbose: boolean) {
	console.log('🚀 Building presentations in parallel...')
	
	const buildPromises = presentations.map(presentation => 
		buildSinglePresentation(presentation, verbose)
	)

	const results = await Promise.allSettled(buildPromises)
	
	// Check for failures
	const failures = results
		.map((result, index) => result.status === 'rejected' ? presentations[index].id : null)
		.filter(Boolean)

	if (failures.length > 0) {
		console.error(`❌ Failed to build: ${failures.join(', ')}`)
		process.exit(1)
	}
}

/**
 * Build presentations sequentially
 */
async function buildSequentially(presentations: any[], verbose: boolean) {
	for (const presentation of presentations) {
		await buildSinglePresentation(presentation, verbose)
	}
}

/**
 * Build a single presentation
 */
async function buildSinglePresentation(presentation: any, verbose: boolean): Promise<void> {
	const config = getPresentationConfig(presentation)
	
	console.log(`📦 Building ${presentation.id}...`)

	// Ensure output directory exists
	const outputDir = resolve(process.cwd(), config.outputDir)
	mkdirSync(dirname(outputDir), { recursive: true })

	// Build with Slidev
	const args = [
		'build',
		'slides.md',
		'--base', config.baseUrl,
		'--out', `../${config.outputDir}`
	]

	return new Promise((resolve, reject) => {
		const slidev = spawn('npx', ['slidev', ...args], {
			cwd: presentation.path,
			stdio: verbose ? 'inherit' : 'pipe'
		})

		let output = ''
		if (!verbose) {
			slidev.stdout?.on('data', (data) => output += data.toString())
			slidev.stderr?.on('data', (data) => output += data.toString())
		}

		slidev.on('close', (code) => {
			if (code === 0) {
				console.log(`  ✅ ${presentation.id} built successfully`)
				resolve()
			} else {
				console.error(`  ❌ ${presentation.id} build failed`)
				if (!verbose && output) {
					console.error(output)
				}
				reject(new Error(`Build failed for ${presentation.id}`))
			}
		})
	})
}

/**
 * Parse command line arguments
 */
function parseArgs(): BuildOptions {
	const args = process.argv.slice(2)
	const options: BuildOptions = {}

	for (let i = 0; i < args.length; i++) {
		const arg = args[i]
		
		if (arg === '--parallel') {
			options.parallel = true
		} else if (arg === '--sequential') {
			options.parallel = false
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
Usage: build-presentations.ts [presentation] [options]

Arguments:
  presentation    Build only the specified presentation (optional)

Options:
  --parallel      Build presentations in parallel (default)
  --sequential    Build presentations one by one
  --verbose, -v   Show detailed build output
  --help, -h      Show this help message

Examples:
  tsx build-presentations.ts                           # Build all presentations
  tsx build-presentations.ts claude-code-configuration # Build specific presentation
  tsx build-presentations.ts --verbose                 # Build with detailed output
`)
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
	const options = parseArgs()
	buildPresentations(options).catch(error => {
		console.error('❌ Build failed:', error.message)
		process.exit(1)
	})
}

export { buildPresentations }