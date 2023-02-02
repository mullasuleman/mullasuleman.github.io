<?php

/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Holy_Cupcakes
 */

get_header();
?>

<div id="primary" class="content-area">
	<main id="main" class="site-main">
		<div class="grid-container">
			<div class="grid-x">
				<!-- container for the sidebar -->
				<div class="large-4 grid-margin-x show-for-large sidebar-box">
					<?php
					// loading the sidebar
					get_sidebar();
					?>
				</div>
				<!-- container bor the blog post -->
				<section class="large-8 medium-12 grid-x align-justify blog">
					<?php
					while (have_posts()) :
						the_post();
					?>
						<h1><?php echo get_the_title(); ?></h1>
						<hr class="hSeparator">
						<?php get_template_part('template-parts/content', get_post_type()); ?>
							<?php
							// navigation for more posts next and previous
							the_post_navigation(array(
								'prev_text' => 'Previous: %title',
								'next_text' => 'Next: %title',
							));

					// If comments are open or we have at least one comment, load up the comment template.
					// if ( comments_open() || get_comments_number() ) :
					// 	comments_template();
					// endif;

					endwhile; // End of the loop.
					?>
				</section>
			</div><!-- .grid-x -->
		</div><!-- .grid-container -->
	</main><!-- #main -->
</div><!-- #primary -->

<?php
get_sidebar();
get_footer();
