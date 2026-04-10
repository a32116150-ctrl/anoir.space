<?php
function ms_paint_scripts() {
    $theme_version = wp_get_theme()->get( 'Version' );

    wp_enqueue_style( 'ms-paint-style', get_template_directory_uri() . '/assets/index-C7LeuDu_.css', array(), $theme_version );
    wp_enqueue_script( 'ms-paint-script', get_template_directory_uri() . '/assets/index-DQvE5mqh.js', array(), $theme_version, true );
}
add_action( 'wp_enqueue_scripts', 'ms_paint_scripts' );
?>
