import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Build React App
console.log('Building React App...');
try {
    execSync('npm run build', { stdio: 'inherit', cwd: rootDir });
} catch (e) {
    console.error("Build failed:", e);
    process.exit(1);
}

// 2. Prepare WordPress Theme Directory
const themeDir = path.join(rootDir, 'ms-paint-theme');
if (fs.existsSync(themeDir)) {
  fs.rmSync(themeDir, { recursive: true, force: true });
}
fs.mkdirSync(themeDir);
fs.mkdirSync(path.join(themeDir, 'assets'));

// 3. Copy Assets
const distDir = path.join(rootDir, 'dist');
const distAssetsDir = path.join(distDir, 'assets');
const themeAssetsDir = path.join(themeDir, 'assets');

if (!fs.existsSync(distAssetsDir)) {
    console.error("Assets directory not found in dist. Build might have failed or Vite config is different.");
    process.exit(1);
}

// Copy assets and find filenames
const files = fs.readdirSync(distAssetsDir);
let jsFile = '';
let cssFile = '';

files.forEach(file => {
  fs.copyFileSync(path.join(distAssetsDir, file), path.join(themeAssetsDir, file));
  if (file.endsWith('.js')) jsFile = file;
  if (file.endsWith('.css')) cssFile = file;
});

console.log(`Found JS: ${jsFile}`);
console.log(`Found CSS: ${cssFile}`);

// 4. Create WordPress Files

// style.css
const styleContent = `/*
Theme Name: MS Paint Portfolio
Theme URI: https://anoircherif.com
Author: Anoir Cherif
Author URI: https://anoircherif.com
Description: A retro MS Paint style portfolio theme.
Version: 1.0
*/
`;
fs.writeFileSync(path.join(themeDir, 'style.css'), styleContent);

// index.php
const indexContent = `<!doctype html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Anoir Cherif - Visual Creator</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Courier+New&display=swap" rel="stylesheet">
    <?php wp_head(); ?>
  </head>
  <body <?php body_class(); ?>>
    <div id="root"></div>
    <?php wp_footer(); ?>
  </body>
</html>
`;
fs.writeFileSync(path.join(themeDir, 'index.php'), indexContent);

// functions.php
const functionsContent = `<?php
function ms_paint_scripts() {
    $theme_version = wp_get_theme()->get( 'Version' );

    wp_enqueue_style( 'ms-paint-style', get_template_directory_uri() . '/assets/${cssFile}', array(), $theme_version );
    wp_enqueue_script( 'ms-paint-script', get_template_directory_uri() . '/assets/${jsFile}', array(), $theme_version, true );
}
add_action( 'wp_enqueue_scripts', 'ms_paint_scripts' );
?>
`;
fs.writeFileSync(path.join(themeDir, 'functions.php'), functionsContent);

console.log('WordPress theme created successfully at:', themeDir);
console.log('You can compress this folder into a .zip file and upload it to WordPress.');
