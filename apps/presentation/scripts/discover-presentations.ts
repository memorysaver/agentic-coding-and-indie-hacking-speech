import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { parse as parseYaml } from 'yaml'

export interface PresentationMetadata {
	id: string
	title: string
	description?: string
	author?: string
	keywords?: string
	theme?: string
	path: string
	slidesPath: string
}

export interface PresentationConfig {
	baseUrl: string
	outputDir: string
	devPort: number
}

/**
 * Discovers all presentations in the src/presentations directory
 */
export function discoverPresentations(): PresentationMetadata[] {
	const presentationsDir = resolve(process.cwd(), 'src/presentations')
	
	if (!existsSync(presentationsDir)) {
		console.warn('No presentations directory found at:', presentationsDir)
		return []
	}

	const presentations: PresentationMetadata[] = []
	const entries = readdirSync(presentationsDir, { withFileTypes: true })

	for (const entry of entries) {
		if (!entry.isDirectory()) continue
		if (entry.name === 'shared') continue // Skip shared directory

		const presentationPath = join(presentationsDir, entry.name)
		const slidesPath = join(presentationPath, 'slides.md')

		if (!existsSync(slidesPath)) {
			console.warn(`No slides.md found in ${entry.name}, skipping...`)
			continue
		}

		try {
			const slidesContent = readFileSync(slidesPath, 'utf-8')
			const metadata = extractMetadata(entry.name, slidesContent, presentationPath, slidesPath)
			presentations.push(metadata)
		} catch (error) {
			console.error(`Error reading slides.md for ${entry.name}:`, error)
			continue
		}
	}

	return presentations.sort((a, b) => a.id.localeCompare(b.id))
}

/**
 * Finds a specific presentation by ID
 */
export function findPresentation(id: string): PresentationMetadata | null {
	const presentations = discoverPresentations()
	return presentations.find(p => p.id === id) || null
}

/**
 * Extracts metadata from slides.md frontmatter
 */
function extractMetadata(
	id: string,
	content: string,
	presentationPath: string,
	slidesPath: string
): PresentationMetadata {
	// Extract YAML frontmatter
	const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
	let frontmatter: any = {}
	
	if (frontmatterMatch) {
		try {
			frontmatter = parseYaml(frontmatterMatch[1])
		} catch (error) {
			console.warn(`Error parsing frontmatter for ${id}:`, error)
		}
	}

	// Extract title from first heading if not in frontmatter
	let title = frontmatter.title || frontmatter.info?.title
	if (!title) {
		const titleMatch = content.match(/^#\s+(.+)$/m)
		title = titleMatch?.[1] || id
	}

	return {
		id,
		title,
		description: frontmatter.info || frontmatter.description,
		author: frontmatter.author,
		keywords: frontmatter.keywords,
		theme: frontmatter.theme || 'default',
		path: presentationPath,
		slidesPath
	}
}

/**
 * Generates presentation configuration
 */
export function getPresentationConfig(presentation: PresentationMetadata, port?: number): PresentationConfig {
	return {
		baseUrl: `/talks/${presentation.id}/`,
		outputDir: `dist/presentations/${presentation.id}`,
		devPort: port || 3001
	}
}