<?php 
/**
 * Register a custom post type called "recipe".
 *
 * @see get_post_type_labels() for label keys.
 */
function holy_cupcakes_init_post_types() {
    // Recipe
    $labels = array(
        'name'                  => esc_html_x( 'Recipes', 'Post type general name', 'holy_cupcakes' ),
        'singular_name'         => esc_html_x( 'Recipe', 'Post type singular name', 'holy_cupcakes' ),
        'menu_name'             => esc_html_x( 'Recipes', 'Admin Menu text', 'holy_cupcakes' ),
        'name_admin_bar'        => esc_html_x( 'Recipe', 'Add New on Toolbar', 'holy_cupcakes' ),
        'add_new'               => esc_html__( 'Add New', 'holy_cupcakes' ),
        'add_new_item'          => esc_html__( 'Add New Recipe', 'holy_cupcakes' ),
        'new_item'              => esc_html__( 'New Recipe', 'holy_cupcakes' ),
        'edit_item'             => esc_html__( 'Edit Recipe', 'holy_cupcakes' ),
        'view_item'             => esc_html__( 'View Recipe', 'holy_cupcakes' ),
        'all_items'             => esc_html__( 'All Recipes', 'holy_cupcakes' ),
        'search_items'          => esc_html__( 'Search Recipes', 'holy_cupcakes' ),
        'parent_item_colon'     => esc_html__( 'Parent Recipes:', 'holy_cupcakes' ),
        'not_found'             => esc_html__( 'No recipes found.', 'holy_cupcakes' ),
        'not_found_in_trash'    => esc_html__( 'No recipes found in Trash.', 'holy_cupcakes' ),
        'featured_image'        => esc_html_x( 'Recipe Cover Image', 'Overrides the “Featured Image” phrase for this post type. Added in 4.3', 'holy_cupcakes' ),
        'set_featured_image'    => esc_html_x( 'Set cover image', 'Overrides the “Set featured image” phrase for this post type. Added in 4.3', 'holy_cupcakes' ),
        'remove_featured_image' => esc_html_x( 'Remove cover image', 'Overrides the “Remove featured image” phrase for this post type. Added in 4.3', 'holy_cupcakes' ),
        'use_featured_image'    => esc_html_x( 'Use as cover image', 'Overrides the “Use as featured image” phrase for this post type. Added in 4.3', 'holy_cupcakes' ),
        'archives'              => esc_html_x( 'Recipe archives', 'The post type archive label used in nav menus. Default “Post Archives”. Added in 4.4', 'holy_cupcakes' ),
        'insert_into_item'      => esc_html_x( 'Insert into Recipe', 'Overrides the “Insert into post”/”Insert into page” phrase (used when inserting media into a post). Added in 4.4', 'holy_cupcakes' ),
        'uploaded_to_this_item' => esc_html_x( 'Uploaded to this Recipe', 'Overrides the “Uploaded to this post”/”Uploaded to this page” phrase (used when viewing media attached to a post). Added in 4.4', 'holy_cupcakes' ),
        'filter_items_list'     => esc_html_x( 'Filter recipes list', 'Screen reader text for the filter links heading on the post type listing screen. Default “Filter posts list”/”Filter pages list”. Added in 4.4', 'holy_cupcakes' ),
        'items_list_navigation' => esc_html_x( 'Recipes list navigation', 'Screen reader text for the pagination heading on the post type listing screen. Default “Posts list navigation”/”Pages list navigation”. Added in 4.4', 'holy_cupcakes' ),
        'items_list'            => esc_html_x( 'Recipes list', 'Screen reader text for the items list heading on the post type listing screen. Default “Posts list”/”Pages list”. Added in 4.4', 'holy_cupcakes' ),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array( 'slug' => 'recipes' ),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => null,
        'menu_icon'          => 'dashicons-buddicons-community',
        'show_in_rest'       => true,
        'supports'           => array( 'title', 'author', 'editor', 'thumbnail', 'excerpt', 'ingredients', 'instructions', 'comments' ),
    );

    register_post_type( 'holy_cupcakes_recipe', $args );
    
}

add_action( 'init', 'holy_cupcakes_init_post_types' );