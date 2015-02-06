<?php

/*
	Template Name: Buildings & Sites
*/

?>

<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/html-header', 'parts/shared/header' ) ); ?>

<?php the_post(); ?>
<div id="main">
	<div class="secondarymaincontent maincontent grid grid-pad">
		<h2><?php the_title(); ?></h2>
		<?php the_content(); ?>
	</div>

	<div id="slectorprepend" class="maincontent grid grid-pad">
		<h3>Properties</h3>
		<div id="propertieswrapper">
			<?php
			$property_posts = get_posts( array(
				'post_type' => 'properties',
				'posts_per_page' => -1, // Unlimited posts
				'orderby' => 'title', // Order alphabetically by name
			) );
			if ( $property_posts ):
				foreach ( $property_posts as $post ): 
				setup_postdata($post);
			?>

			<div data-prop-type="All, <?php the_field('type_of_property'); ?>" class="property grid">
				<div class="col-1-3">
					<?php
					// Get WP attachment ID in order to use cropped thumbs for uniform layout
					$attachment_id = get_field('main_picture');
					$image = wp_get_attachment_image_src( $attachment_id, 'propthumb' );
					?>
					<img src="<?php 
					if( !empty($image[0]) ) {
						echo $image[0];
					} else {
						echo get_stylesheet_directory_uri();
						echo '/images/property-placeholder.jpg';
					}
					 ?>" />
				</div>

				<div class="col-2-3">
					<h4 class="h3"><?php the_title(); ?></h4>
					<?php the_excerpt(); ?>
					<?php //Type of Property
					$values = get_field('type_of_property'); 
					if($values) { 
						echo '<p class="proptype">Type of Property: <strong>';
						foreach($values as $key=>$value) {
							echo $value;
							if (sizeof($values) !== $key+1) {
								echo " | ";
							};
						}
						echo '</strong></p>'; ?>
					<?php } ?>
					<a class="button" href="<?php the_permalink(); ?>">View Property Details</a>
				</div>
			</div>
				<?php endforeach; ?>
			<?php endif; ?>
		</div>
	</div>
</div> <?php // End $main div ?>
<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/footer','parts/shared/html-footer' ) ); ?>