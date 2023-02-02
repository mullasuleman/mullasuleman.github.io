<?php

/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Holy_Cupcakes
 */

get_header();
?>

<div id="primary" class="content-area">
	<main id="main" class="site-main">
		<div class="grid-container">
			<div class="grid-x">
				<!-- sidebar box -->
				<div class="cell large-4 grid-margin-x show-for-large sidebar-box">
					<?php
					get_sidebar();
					?>
				</div>

				<?php
				if (have_posts()) :
				?>
					<!-- .page-header -->
					<div class="cell large-8 medium-12 align-justify recipe-posts-box">
						<div class="grid-x">
						<header class="cell large-12 medium-12 small-12">
							<h1 class="page-title screen-reader-text">Recipes</h1>
							<hr class="blogHr">
						</header>

						<?php
						/* Start the Loop */
						while (have_posts()) :
							the_post();
						?>
						<!-- individual recipe cards -->
							<div class="cell card large-5 medium-5 small-10 recipeCard">
								<?php
								if (has_post_thumbnail()) {
								?>
								<!-- recipe featured image -->
									<div class="thumbnail-img">
										<img src="<?php echo get_the_post_thumbnail_url(); ?>" alt="<?php the_post_thumbnail_caption(); ?>" />
									</div>
								<?php
								} ?>
								<!-- recipe title -->
								<div class="card-section recipeExcerpt">
									<h3><?php the_title(); ?> </h3>
										<!-- recipe excerpt -->
										<?php
										the_excerpt();
										?>
									<!-- button linking to recipe -->
									<a class="recipeBtn" href="<?php echo get_post_permalink(); ?>">start baking</a>
								</div>
							</div>
					<?php

						endwhile;

						the_posts_navigation();
						?>
						<div>
					</div><!-- cell large-8 -->
				<?php
				else :

					get_template_part('template-parts/content', 'none');

				endif;
				?>
			</div><!-- .grid-x -->
		</div><!-- .grid-container -->
	</main><!-- #main -->
</div><!-- #primary -->

<?php
get_sidebar();
get_footer();
