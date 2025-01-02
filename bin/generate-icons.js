#!/usr/bin/env node

import { Command } from 'commander';
import generateIcons from '../dist/index.js';

const program = new Command();

program
  .name('generate-icons')
  .description('Generate PNG icons from Iconify icon sets')
  .version('1.0.0')
  .requiredOption('-s, --icon-set <set>', 'Icon set prefix (e.g., ph for Phosphor)')
  .requiredOption('-n, --icon-name <name>', 'Name of the icon')
  .option('-o, --output-dir <dir>', 'Output directory', 'icons')
  .option('-z, --sizes <sizes>', 'Comma-separated list of sizes', '16,32,48,128')
  .option('-c, --color <color>', 'Icon color (e.g., #000000)', 'currentColor')
  .action(async (options) => {
    try {
      const sizes = options.sizes.split(',').map(size => parseInt(size.trim(), 10));
      
      const files = await generateIcons({
        iconSet: options.iconSet,
        iconName: options.iconName,
        outputDir: options.outputDir,
        sizes,
        color: options.color
      });

      console.log('Generated icons:');
      files.forEach(file => console.log(`- ${file}`));
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program.parse(); 