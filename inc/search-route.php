<?php
//Create New API Address(CUSTOM)
add_action('rest_api_init', 'newTestSearch');
function newTestSearch()
{
    register_rest_route('newTest/v1', 'search', array(
        'methods' => WP_REST_SERVER::READABLE,
        'callback' => 'newTestSearchResults',
    ));
}

function newTestSearchResults($data)
{
    $mainQuery = new WP_Query(array(
        'post_type' => array('posts', 'page', 'professor', 'program', 'campus', 'event'),
        's' => sanitize_text_field($data['term']), //s Use For Search
    ));
    $results = array(
        'generalInfo' => array(),
        'professors' => array(),
        'programs' => array(),
        'events' => array(),
        'campuses' => array(),
    );
    //create while loop And  Pusht To Array
    while ($mainQuery->have_posts()) {
        $mainQuery->the_post();
        if (get_post_type() == 'post' or get_post_type() == 'page') {
            array_push($results['generalInfo'], array(
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
                'postType' => get_post_type(),
                'authorName' => get_author_name(),

            ));
        }
        if (get_post_type() == 'professor') {
            array_push($results['professors'], array(
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
                'image' => get_the_post_thumbnail_url(0, 'professorLandscape'),
            ));
        }

        if (get_post_type() == 'program') {
            array_push($results['programs'], array(
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
                'id' => get_the_ID(),
            ));
        }

        if (get_post_type() == 'campus') {
            array_push($results['campuses'], array(
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
            ));
        }

        if (get_post_type() == 'event') {
            $eventDate = new DateTime(get_field('event_date'));
            $description = null;
            if (has_excerpt()) {
                $description = get_the_excerpt();
            } else {
                $description = wp_trim_words(get_the_content(), 18);
            }

            array_push($results['events'], array(
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
                'month' => $eventDate->format('M'),
                'day' => $eventDate->format('d'),
                'description' => $description,
            ));
        }

    }
    if ($results['programs']) {
        $programsMetaQuery = array('relation' => 'OR');
        foreach ($results['programs'] as $item) {
            # code...
            array_push($programsMetaQuery, array(
                'key' => 'related_programs',
                'compare' => 'LIKE',
                'value' => '"' . $item['id'] . '"',
            ), );
        }

        //query for Relation between post_type
        $programRelationshipQuery = new WP_Query(array(
            'post_type' => array('professor','event'),
            'meta_query' => $programsMetaQuery,
        ));
        while ($programRelationshipQuery->have_posts()) {
            # code...
            $programRelationshipQuery->the_post();

            if (get_post_type() == 'professor') {

                array_push($results['professors'], array(
                    'title' => get_the_title(),
                    'permalink' => get_the_permalink(),
                    'image' => get_the_post_thumbnail_url(0, 'professorLandscape'),
                ));
            }
            if (get_post_type() == 'event') {
                $eventDate = new DateTime(get_field('event_date'));
                $description = null;
                if (has_excerpt()) {
                    $description = get_the_excerpt();
                } else {
                    $description = wp_trim_words(get_the_content(), 18);
                }
    
                array_push($results['events'], array(
                    'title' => get_the_title(),
                    'permalink' => get_the_permalink(),
                    'month' => $eventDate->format('M'),
                    'day' => $eventDate->format('d'),
                    'description' => $description,
                ));
            }
        }
        $results['professors'] = array_values(array_unique($results['professors'], SORT_REGULAR));
        $results['events'] = array_values(array_unique($results['events'], SORT_REGULAR));

    }

    return $results;
}
