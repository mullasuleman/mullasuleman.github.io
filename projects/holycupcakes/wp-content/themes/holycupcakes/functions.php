<?php

/**
 * Holy Cupcakes functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Holy_Cupcakes
 */

if (!function_exists('holy_cupcakes_setup')) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function holy_cupcakes_setup()
	{
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on Holy Cupcakes, use a find and replace
		 * to change 'holycupcakes' to the name of your theme in all the template files.
		 */
		load_theme_textdomain('holycupcakes', get_template_directory() . '/languages');

		// Add default posts and comments RSS feed links to head.
		add_theme_support('automatic-feed-links');

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support('title-tag');

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support('post-thumbnails');

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus(array(
			'menu' => esc_html__('Primary', 'holycupcakes'),
		));

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support('html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		));

		/** 
		* Add support for block styles
		*/
		add_theme_support( 'wp-block-styles' );
		
		/** 
		* Add support for align-wide
		*/
		add_theme_support( 'align-wide' );
		
		// Add theme support for selective refresh for widgets.
		add_theme_support('customize-selective-refresh-widgets');
		
		// Add theme support for custom colours
		add_theme_support( 'editor-color-palette', array(
			array(
				'name' => esc_html__( 'Light Cream', 'holycupcakes' ),
				'slug' => 'lightcream',
				'color' => '#F9F6EC',
			),
			array(
				'name' => esc_html__( 'Cream', 'holycupcakes' ),
				'slug' => 'cream',
				'color' => '#FFEEAA',
			),
			array(
				'name' => esc_html__( 'Dark Brown', 'holycupcakes' ),
				'slug' => 'darkbrown',
				'color' => '#886248',
			),
			array(
				'name' => esc_html__( 'Light Brown', 'holycupcakes' ),
				'slug' => 'lightbrown',
				'color' => '#9B6F52',
			),
			array(
				'name' => esc_html__( 'White', 'holycupcakes' ),
				'slug' => 'white',
				'color' => '#FFFFFF',
			),
			array(
				'name' => esc_html__( 'Black', 'holycupcakes' ),
				'slug' => 'black',
				'color' => '#000000',
			),
		) );
		add_theme_support( 'disable-custom-colors' );
		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support('custom-logo', array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		));
		/**
 * Add support for custom font sizes
 */
add_theme_support( 'editor-font-sizes', array(
    array(
        'name' => __( 'Large', 'themeLangDomain' ),
        'size' => 24,
        'slug' => 'large'
	),
    array(
        'name' => __( 'Regular', 'themeLangDomain' ),
        'size' => 21,
        'slug' => 'regular'
	),
    array(
        'name' => __( 'Small', 'themeLangDomain' ),
        'size' => 18,
        'slug' => 'small'
	),
    )
);

	}
endif;
add_action('after_setup_theme', 'holy_cupcakes_setup');

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function holy_cupcakes_content_width()
{
	// This variable is intended to be overruled from themes.
	// Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
	$GLOBALS['content_width'] = apply_filters('holy_cupcakes_content_width', 640);
}
add_action('after_setup_theme', 'holy_cupcakes_content_width', 0);

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function holy_cupcakes_widgets_init()
{
	register_sidebar(array(
		'name'          => esc_html__('Sidebar', 'holycupcakes'),
		'id'            => 'sidebar-1',
		'description'   => esc_html__('Add widgets here.', 'holycupcakes'),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
		'after_title'  => '<hr class="eSeparator">',
	));
	register_sidebar( array(
		'name' => 'Footer Sidebar 1',
		'id' => 'footer-sidebar-1',
		'description' => 'Appears in the footer area',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget' => '</aside>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );
	register_sidebar( array(
		'name' => 'Footer Sidebar 2',
		'id' => 'footer-sidebar-2',
		'description' => 'Appears in the footer area',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget' => '</aside>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );
	register_sidebar( array(
		'name' => 'Footer Sidebar 3',
		'id' => 'footer-sidebar-3',
		'description' => 'Appears in the footer area',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget' => '</aside>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );
	register_sidebar( array(
		'name' => 'Header Widget',
		'id' => 'header-widget',
		'description' => 'Appears in the header',
		'before_widget' => '<p>',
		'after_widget' => '</p>',
		'before_title' => '<span>',
		'after_title' => '</span>',
	) );
	
}
add_action('widgets_init', 'holy_cupcakes_widgets_init');


/**
 * Enqueue scripts and styles.
 */
function holy_cupcakes_scripts()
{

	

	// enqueue foundation styles
	wp_enqueue_style('holycupcakes-foundation',get_template_directory_uri() . '/assets/css/vendors/foundation.min.css', null, '6.5.1');

	// adding what-input js
	wp_enqueue_script( 'holycupcakes-what-input', get_template_directory_uri() . '/assets/js/vendors/what-input.js', array('jquery'), '6.5.1', true );

	// adding holycupcakes foundation js
	wp_enqueue_script( 'holycupcakes-foundation', get_template_directory_uri() . '/assets/js/vendors/foundation.min.js', array('jquery', 'holycupcakes-what-input'), '6.5.1', true );
	
	// adding app.js
	wp_enqueue_script( 'holycupcakes-script', get_template_directory_uri() . '/assets/js/app.js', array('jquery', 'holycupcakes-foundation'), '6.5.1', true );

	// enqueue style.css
	wp_enqueue_style('holycupcakes-style', get_stylesheet_uri());
	

	// TODO: REMOVE ALL THE COMMENTED STYLE ENQUEUE FUNCTION BELOW IF STYLES ARE WORKING PROPERLY


	// enqueue custom styles
	// wp_enqueue_style(
	// 	'custom-style',
	// 	get_template_directory_uri() . '/assets/css/custom.css',
	// 	array()
	// );
	// // enqueue custom styles
	// wp_enqueue_style(
	// 	'custom-style',
	// 	get_template_directory_uri() . '/style.css',
	// );
	
	if (is_singular() && comments_open() && get_option('thread_comments')) {
		wp_enqueue_script('comment-reply');
	}
}
add_action('wp_enqueue_scripts', 'holy_cupcakes_scripts');

/**
 * Implement the Custom Header feature.
 */


/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-hooks.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if (defined('JETPACK__VERSION')) {
	require get_template_directory() . '/inc/jetpack.php';
}


// changing the excerpt length of blog posts
function holy_cupcakes_custom_excerpt_length( $length ) {
	if (is_front_page()) {return 30;}
	else return 20;
}
add_filter( 'excerpt_length', 'holy_cupcakes_custom_excerpt_length', 999 );

/**
 * WooCommerce
 */
require get_template_directory() . '/inc/woocommerce.php';
/**
 * Registering custom post types.
 */
require get_template_directory() . '/inc/post-types.php';
/** * Change number or products per row to 3
 */

if (!function_exists('loop_columns')) {
	function loop_columns() {
		return 3; // 3 products per row
	}
}
add_filter('loop_shop_columns', 'loop_columns', 999);