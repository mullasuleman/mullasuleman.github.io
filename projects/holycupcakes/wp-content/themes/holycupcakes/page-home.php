<?php

/**
 * The template for displaying the home page
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

<section id="primary" class="content-area">
	<main id="main" class="site-main">
		<!-- container for home page contents -->
		<div class="grid-container">
			<?php

			/* Start the Loop */
			while (have_posts()) :
				the_post();

				get_template_part('template-parts/content', 'page');

				// If comments are open or we have at least one comment, load up the comment template.
				if (comments_open() || get_comments_number()) {
					comments_template();
				}

			endwhile; // End of the loop.
			?>
		</div><!-- .grid-container -->
	</main><!-- #main -->
</section><!-- #primary -->

<?php
get_footer();
