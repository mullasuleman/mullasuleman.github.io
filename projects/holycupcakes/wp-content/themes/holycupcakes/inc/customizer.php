<?php
/**
 * Holy Cupcakes Theme Customizer
 *
 * @package Holy_Cupcakes
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function holy_cupcakes_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';

	if ( isset( $wp_customize->selective_refresh ) ) {
		$wp_customize->selective_refresh->add_partial( 'blogname', array(
			'selector'        => '.site-title a',
			'render_callback' => 'holy_cupcakes_customize_partial_blogname',
		) );
		$wp_customize->selective_refresh->add_partial( 'blogdescription', array(
			'selector'        => '.site-description',
			'render_callback' => 'holy_cupcakes_customize_partial_blogdescription',
		) );
	}

	// panels
		// For Dynamic Social Media 
	$wp_customize->add_panel( 'holy_cupcakes_social_media_panel', array(
		'title' => esc_html__( 'Social Media', 'holy_cupcakes' ),
		'capability' => 'edit_theme_options',
	) );

		// for Dynamic Address for footer
	$wp_customize->add_panel( 'holy_cupcakes_address_panel', array(
		'title' => esc_html__( 'Store Info', 'holy_cupcakes' ),
		'capability' => 'edit_theme_options',
	) );

	// Sections
		// For Dynamic Social Media (facebook)
	$wp_customize->add_section( 'holy_cupcakes_facebook_section', array(
		'title' => esc_html__( 'Facebook', 'holy_cupcakes' ),
		'capability' => 'edit_theme_options',
		'panel' => 'holy_cupcakes_social_media_panel'
	) );	
		// For Dynamic Social Media (instagram)
	$wp_customize->add_section( 'holy_cupcakes_instagram_section', array(
		'title' => esc_html__( 'Instagram', 'holy_cupcakes' ),
		'capability' => 'edit_theme_options',
		'panel' => 'holy_cupcakes_social_media_panel'
	) );
		// For Dynamic Social Media (twitter)
	$wp_customize->add_section( 'holy_cupcakes_twitter_section', array(
		'title' => esc_html__( 'Twitter', 'holy_cupcakes' ),
		'capability' => 'edit_theme_options',
		'panel' => 'holy_cupcakes_social_media_panel'
	) );
		// For Dynamic Contact Info (Phone Number)
	$wp_customize->add_section( 'holy_cupcakes_phone_section', array(
		'title' => esc_html__( 'Phone Number' , 'holy_cupcakes' ),
		'capability' => 'edit_theme_options',
		'panel' => 'holy_cupcakes_address_panel'
	) );
		// For Dynamic Contact Info (Email)
	$wp_customize->add_section( 'holy_cupcakes_email_section', array(
		'title' => esc_html__( 'Email' , 'holy_cupcakes' ),
		'capability' => 'edit_theme_options',
		'panel' => 'holy_cupcakes_address_panel'
	) );
		// For Dynamic Address for footer
	$wp_customize->add_section( 'holy_cupcakes_address_section', array(
		'title' => esc_html__( 'Address', 'holy_cupcakes' ),
		'capability' => 'edit_theme_options',
		'panel' => 'holy_cupcakes_address_panel'
	) );

	// settings
		// For Dynamic Social Media (facebook)
	$wp_customize->add_setting( 'holy_cupcakes_facebook_url', array(
		'transport' => 'refresh',
		'default' => '',
		'sanitize_callback' => 'esc_url_raw',
	));
		// For Dynamic Social Media (instagram)
	$wp_customize->add_setting( 'holy_cupcakes_instagram_url', array(
		'transport' => 'refresh',
		'default' => '',
		'sanitize_callback' => 'esc_url_raw',
	));
		// For Dynamic Social Media (twitter)
	$wp_customize->add_setting( 'holy_cupcakes_twitter_url', array(
		'transport' => 'refresh',
		'default' => '',
		'sanitize_callback' => 'esc_url_raw',
	));
		// For Dynamic Contact Info (Phone)
	$wp_customize->add_setting( 'holy_cupcakes_phone_number', array(
		'transport' => 'refresh',
		'default' => '',
		'sanitize_callback' => 'wp_filter_nohtml_kses',
	));
		// For Dynamic Contact Info (Email)
	$wp_customize->add_setting( 'holy_cupcakes_email_address', array(
		'transport' => 'refresh',
		'default' => '',
		'sanitize_callback' => 'sanitize_email',
	));
	
	// For Dynamic Address for Footer // Line 1
	$wp_customize->add_setting( 'holy_cupcakes_address_line1', array(
		'transport' => 'refresh',
		'default' => '',
		'sanitize_callback' => 'wp_filter_nohtml_kses',
	));
	
	// For Dynamic Address for Footer // Line 2
	$wp_customize->add_setting( 'holy_cupcakes_address_line2', array(
		'transport' => 'refresh',
		'default' => '',
		'sanitize_callback' => 'wp_filter_nohtml_kses',
	));
	
	// For Dynamic Address for Footer // City
	$wp_customize->add_setting( 'holy_cupcakes_address_city', array(
		'transport' => 'refresh',
		'default' => '',
		'sanitize_callback' => 'wp_filter_nohtml_kses',
	));

	// For Dynamic Address for Footer // Province
	$wp_customize->add_setting( 'holy_cupcakes_address_province', array(
		'transport' => 'refresh',
		'default' => '',
		'sanitize_callback' => 'wp_filter_nohtml_kses',
	));

	// For Dynamic Address for Footer // Postal Code
	$wp_customize->add_setting( 'holy_cupcakes_address_postal_code', array(
		'transport' => 'refresh',
		'default' => '',
		'sanitize_callback' => 'wp_filter_nohtml_kses',
	));
	


	// controls
		// For Dynamic Social Media (facebook)
	$wp_customize->add_control( 'holy_cupcakes_facebook_url', array(
		'label' => esc_html__( 'URL', 'holy_cupcakes' ),
		'description' => esc_html__( 'Add URL to display Facebook icon/link', 'holy_cupcakes' ),
		'section' => 'holy_cupcakes_facebook_section',
		'type' => 'input',
		'input_attrs' => array(
			'placeholder' => esc_html__( 'https://facebook.com', 'holy_cupcakes' )
		)
	) );
			// For Dynamic Social Media (instagram)
	$wp_customize->add_control( 'holy_cupcakes_instagram_url', array(
		'label' => esc_html__( 'URL', 'holy_cupcakes' ),
		'description' => esc_html__( 'Add URL to display Instagram icon/link', 'holy_cupcakes' ),
		'section' => 'holy_cupcakes_instagram_section',
		'type' => 'input',
		'input_attrs' => array(
			'placeholder' => esc_html__( 'https://instagram.com', 'holy_cupcakes' )
		)
	) );
			// For Dynamic Social Media (twitter)
	$wp_customize->add_control( 'holy_cupcakes_twitter_url', array(
		'label' => esc_html__( 'URL', 'holy_cupcakes' ),
		'description' => esc_html__( 'Add URL to display Twitter icon/link', 'holy_cupcakes' ),
		'section' => 'holy_cupcakes_twitter_section',
		'type' => 'input',
		'input_attrs' => array(
			'placeholder' => esc_html__( 'https://twitter.com', 'holy_cupcakes' )
		)
	) );
			// For Dynamic Contact Info (Phone)
	$wp_customize->add_control( 'holy_cupcakes_phone_number', array(
		'label' => esc_html__( 'Phone Number', 'holy_cupcakes' ),
		'description' => esc_html__( 'Add Phone Number', 'holy_cupcakes' ),
		'section' => 'holy_cupcakes_phone_section',
		'type' => 'input',
		'input_attrs' => array(
			'placeholder' => esc_html__( '123-456-7890', 'holy_cupcakes' )
		)
	) );
			// For Dynamic Contact Info (Email)
	$wp_customize->add_control( 'holy_cupcakes_email_address', array(
		'label' => esc_html__( 'Email Address', 'holy_cupcakes' ),
		'description' => esc_html__( 'Add Email Adress', 'holy_cupcakes' ),
		'section' => 'holy_cupcakes_email_section',
		'type' => 'input',
		'input_attrs' => array(
			'placeholder' => esc_html__( 'info@email.com', 'holy_cupcakes' )
		)
	) );

			// For Dynamic Address for Footer
	$wp_customize->add_control( 'holy_cupcakes_address_line1', array(
		'label' => esc_html__( 'Enter your address below', 'holy_cupcakes' ),
		'description' => esc_html__( 'Address Line 1', 'holy_cupcakes' ),
		'section' => 'holy_cupcakes_address_section',
		'type' => 'input',
		'input_attrs' => array(
			'placeholder' => esc_html__( 'Address Line 1', 'holy_cupcakes' )
		)
	) );
	$wp_customize->add_control( 'holy_cupcakes_address_line2', array(
		'description' => esc_html__( 'Address Line 2', 'holy_cupcakes' ),
		'section' => 'holy_cupcakes_address_section',
		'type' => 'input',
		'input_attrs' => array(
			'placeholder' => esc_html__( 'Address Line 2', 'holy_cupcakes' )
		)
	) );
	$wp_customize->add_control( 'holy_cupcakes_address_city', array(
		'description' => esc_html__( 'City', 'holy_cupcakes' ),
		'section' => 'holy_cupcakes_address_section',
		'type' => 'input',
		'input_attrs' => array(
			'placeholder' => esc_html__( 'City', 'holy_cupcakes' ),
		)
	) );
	$wp_customize->add_control( 'holy_cupcakes_address_province', array(
		'description' => esc_html__( 'Province', 'holy_cupcakes' ),
		'section' => 'holy_cupcakes_address_section',
		'type' => 'input',
		'input_attrs' => array(
			'placeholder' => esc_html__( 'Province', 'holy_cupcakes' )
		)
	) );
	$wp_customize->add_control( 'holy_cupcakes_address_postal_code', array(
		'description' => esc_html__( 'Postal Code', 'holy_cupcakes' ),
		'section' => 'holy_cupcakes_address_section',
		'type' => 'input',
		'input_attrs' => array(
			'placeholder' => esc_html__( 'Postal Code', 'holy_cupcakes' )
		)
	) );
	
}
add_action( 'customize_register', 'holy_cupcakes_customize_register' );

/**
 * Render the site title for the selective refresh partial.
 *
 * @return void
 */
function holy_cupcakes_customize_partial_blogname() {
	bloginfo( 'name' );
}

/**
 * Render the site tagline for the selective refresh partial.
 *
 * @return void
 */
function holy_cupcakes_customize_partial_blogdescription() {
	bloginfo( 'description' );
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function holy_cupcakes_customize_preview_js() {
	wp_enqueue_script( 'holycupcakes-customizer', get_template_directory_uri() . '/js/customizer.js', array( 'customize-preview' ), '20151215', true );
}
add_action( 'customize_preview_init', 'holy_cupcakes_customize_preview_js' );
