import { writeFile, mkdir, readFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Resvg } from '@resvg/resvg-js';

export interface IconConfig {
  /** The icon set prefix (e.g., 'ph' for Phosphor) */
  iconSet: string;
  /** The name of the icon (e.g., 'detective') */
  iconName: string;
  /** Relative path to output directory from workspace root */
  outputDir?: string;
  /** Array of sizes to generate */
  sizes?: number[];
  /** Color of the icon */
  color?: string;
}

/**
 * Get SVG data for an icon from the Iconify JSON data
 * @param iconSet - The icon set prefix
 * @param iconName - The name of the icon
 * @returns The SVG path data
 */
async function getIconSvgData(iconSet: string, iconName: string): Promise<string> {
  try {
    // Load the icon set data
    const iconSetPath = resolve(dirname(fileURLToPath(import.meta.url)), '../node_modules/@iconify/json/json', `${iconSet}.json`);
    const iconSetData = JSON.parse(await readFile(iconSetPath, 'utf-8'));
    
    // Get the icon data
    const iconData = iconSetData.icons[iconName];
    if (!iconData) {
      throw new Error(`Icon "${iconName}" not found in set "${iconSet}"`);
    }

    return iconData.body;
  } catch (error) {
    throw new Error(`Failed to load icon: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Generate PNG icons from the specified configuration
 * @param config - The icon generation configuration
 * @returns Array of generated file paths
 */
export async function generateIcons({
  iconSet,
  iconName,
  outputDir = 'icons',
  sizes = [16, 32, 48, 128],
  color = 'currentColor'
}: IconConfig): Promise<string[]> {
  try {
    // Get the SVG data for the icon
    const iconSvgData = await getIconSvgData(iconSet, iconName);

    // Ensure output directory exists
    const outputPath = resolve(process.cwd(), outputDir);
    await mkdir(outputPath, { recursive: true });

    const generatedFiles: string[] = [];

    // Generate PNG files for each size
    for (const size of sizes) {
      const svgContent = `
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="${size}" 
          height="${size}" 
          viewBox="0 0 256 256" 
          fill="${color}"
        >
          ${iconSvgData}
        </svg>
      `;

      const resvg = new Resvg(svgContent, {
        background: 'transparent',
        fitTo: {
          mode: 'width',
          value: size
        }
      });

      const pngData = resvg.render();
      const pngBuffer = pngData.asPng();

      const fileName = `icon${size}.png`;
      const filePath = resolve(outputPath, fileName);
      await writeFile(filePath, pngBuffer);
      generatedFiles.push(filePath);
    }

    return generatedFiles;
  } catch (error) {
    throw new Error(`Error generating icons: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export default generateIcons; 