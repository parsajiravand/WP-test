<?php get_header();
pageBanner(array(
    'title' => 'Search Results',
    'subtitle' => 'You Search for &ldquo;' . esc_html(get_search_query(false)) . '&rdquo;',
))
?>

<div class="container container--narrow page-section">
    <?php
    if(have_posts()){
        while (have_posts()) {
            the_post();
            get_template_part('template-part/content', get_post_type());
          }
       echo paginate_links();
    } else {
        echo '<h2 class="headline headline--small-plus"> No Results Match that Search</h2>';
        get_search_form();
    }

?>
</div>


<?php get_footer();?>