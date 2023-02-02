<?php

/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Holy_Cupcakes
 */

get_header();
?>

<div id="primary" class="content-area">
	<main id="main" class="site-main">
		<!-- grid container for page contents -->
		<div class="grid-container">
			<!-- condition to only show page title if the page is NOT about/contact/cart -->
			<?php if (get_the_title() != 'About Us' && get_the_title() != 'Contact Us' & get_the_title() != 'Cart') {
			?> <h1> <?php echo get_the_title(); ?> </h1>
				<hr class="eSeparator">
			<?php
			}
			?>

			<?php
			while (have_posts()) :
				the_post();

				// loading page contents
				get_template_part('template-parts/content', 'page');

				// If comments are open or we have at least one comment, load up the comment template.
				if (comments_open() || get_comments_number()) :
					comments_template();
				endif;

			endwhile; // End of the loop.

			?>
		</div><!-- .grid-container -->

	</main><!-- #main -->
</div><!-- #primary -->

<?php
// get_sidebar();
get_footer();
