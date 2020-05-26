<?php get_header();
pageBanner(array(
    'title'=>'All Events',
    'subtitle'=>'See All Event this Page'
));
?>

<div class="container container--narrow page-section">
    <?php
    
while (have_posts()) {
    the_post();
    get_template_part('template-part/content-event');
     }
echo paginate_links();
?>
    <hr class="section-break">
    <p>Looking for arecap og past events ?<a href="<?php echo site_url('/past-event')?>"> Check Out our past event
            archive</a></p>
</div>


<?php get_footer();?>

