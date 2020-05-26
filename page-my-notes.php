<?php
if (!is_user_logged_in()) {
    wp_redirect(site_url('/'));
}

get_header();
while (have_posts()) {
    the_post();
    pageBanner();

    ?>


<div class="container container--narrow page-section">
    <div class="create-note">
        <h2 class="headline headline--medium">Create New Note</h2>
        <input placeholder="Title" type="text" class="new-note-title" >
        <textarea placeholder="Your Note Here ..." class="new-note-body"></textarea>
        <span class="submit-note">Create Note</span>
    </div>
    <hr>
    <ul class="min-list link-list" id="my-notes">
        <?php
$userNotes = new WP_Query(array(
        'post_type' => 'note',
        'posts_per_page' =>-1 ,
        'author' => get_current_user_id(),

    ));

    while ($userNotes->have_posts()) {
        # code...
        $userNotes->the_post();
        ?>
        <li data-id="<?php the_ID()?>">
            <input readonly type="text" value="<?php echo esc_attr(get_the_title()) ?>" class="note-title-field">
            <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i>Edit</span>
            <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i>Delete</span>

            <textarea readonly class="note-body-field"><?php echo esc_attr(get_the_excerpt()) ?></textarea>

            <span class="update-note btn btn--blue btn--small"><i class="fa fa-arrow-right"
                    aria-hidden="true"></i>Save</span>

        </li>
        <?php }
   /*  echo paginate_links(); */
    ?>
    </ul>

</div>
<hr>
<?php
}
get_footer();
?>