<?php

require get_theme_file_path('./inc/search-route.php');
//import css styles and script
function new_test_files()
{

    wp_enqueue_script('main-new-test-js', get_theme_file_uri('/js/scripts-bundled.js'), null, '1.0', true);
    wp_localize_script('main-new-test-js', 'newTestData', array(
        'root_url' => get_site_url(),
        'nonce' => wp_create_nonce('wp_rest'),//For Secure WordPress And Get Nonce Number To You

    ));
    wp_enqueue_style('custom-google-fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
    wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
    wp_enqueue_style('new_test_main_styles', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'new_test_files');

//add restAPI For Author
function new_test_custom_rest()
{
    register_rest_field('post', 'authorName', array(
        'get_callback' => function () {
            return get_the_author();
        },
    ));
}
add_action('rest_api_init', 'new_test_custom_rest');

//Page Banner
function pageBanner($args = null)
{
    if (!$args['title']) {
        $args['title'] = get_the_title();
    }
    if (!$args['subtitle']) {
        $args['subtitle'] = get_field('page_banner_subtitle');
    }
    if (!$args['photo']) {
        if (get_field('page_banner_background_image')) {
            $args['photo'] = get_field('page_banner_background_image')['sizes']['pageBanner'];
        } else {
            $args['photo'] = get_theme_file_uri('/images/ocean.jpg');
        }
    }
    ?>
<div class="page-banner">
    <div class="page-banner__bg-image" style="background-image: url(<?php
echo $args['photo'];
    ?>);">

    </div>
    <div class="page-banner__content container container--narrow">
        <h1 class="page-banner__title"><?php echo $args['title'] ?></h1>
        <div class="page-banner__intro">
            <p><?php echo $args['subtitle'] ?></p>
        </div>
    </div>
</div>
<?php }

//Create Menu and add custom fields for theme
function university_features()
{
    register_nav_menu('headerMenuLocation', 'Header Menu Location'); //ORG Menu
    register_nav_menu('footerLocationOne', 'Footer Location One');
    register_nav_menu('footerLocationTwo', 'Footer Location Two');

    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_image_size('professorLandscape', 400, 260, true); //In Another Page Can See professor PIC
    add_image_size('professorProtait', 480, 650, true); //In Proffesor Single Page
    add_image_size('pageBanner', 1500, 300, true); //for All Banners In Pages
}
add_action('after_setup_theme', 'university_features');

//query in database for programPage And EventPage
function new_theme_queries($query)
{
    $today = date('Ymd');

    if (!is_admin() and is_post_type_archive('program') and $query->is_main_query()) {
        $query->set('orederby', 'title');
        $query->set('order', 'ASC');
        $query->set('posts_per_page', -1); //Infitie POST can see in page

    }
    if (!is_admin() and is_post_type_archive('event') and $query->is_main_query()) {
        $query->set('meta_key', 'event_date'); //for custom fields should Import MetaKey
        $query->set('orderby', 'meta_value_num');
        $query->set('order', 'ASC');
        $query->set('meta_query', array(
            array(
                //Create Options For Display Event on today and future
                'key' => 'event_date',
                'compare' => '>=',
                'value' => $today,
                'type' => 'numeric',
            ),
        ));
    }

}
add_action('pre_get_posts', 'new_theme_queries');

//redirect subcriber account out of admin and onto home page
add_action('admin_init', 'redirectSubsToFrontend');
function redirectSubsToFrontend()
{
    $ourCurrentUser = wp_get_current_user();

    if (count($ourCurrentUser->roles) == 1 and $ourCurrentUser->roles[0] == 'subscriber') {
        wp_redirect(site_url('/'));
        exit;
    }
}

add_action('wp_loaded', 'noSubsAdminBar');
function noSubsAdminBar()
{
    $ourCurrentUser = wp_get_current_user();

    if (count($ourCurrentUser->roles) == 1 and $ourCurrentUser->roles[0] == 'subscriber') {
        show_admin_bar(false);
    }
}

//Customize Login Screen
add_filter('login_headerurl', 'ourHeaderUrl');

function ourHeaderUrl()
{
    return esc_url(site_url('/'));
}

add_action('login_enqueue_scripts', 'ourLoginCss');
function ourLoginCss()
{
    wp_enqueue_style('new_test_main_styles', get_stylesheet_uri());

}

add_filter('login_headertitle', 'ourLoginTitle');
function ourLoginTitle()
{
    return get_bloginfo('name');
}