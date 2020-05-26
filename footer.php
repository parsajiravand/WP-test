<footer class="site-footer">

    <div class="site-footer__inner container container--narrow">

        <div class="group">

            <div class="site-footer__col-one">
                <h1 class="school-logo-text school-logo-text--alt-color"><a href="#"><strong>Fictionalgu</strong>
                        University</a></h1>
                <p><a class="site-footer__link" href="#">555.555.5555</a></p>
            </div>

            <div class="site-footer__col-two-three-group">
                <div class="site-footer__col-two">
                    <h3 class="headline headline--small">Explore</h3>
                    <nav class="nav-list">
                        <ul>
                            <?php
                                wp_nav_menu(array(
                                    'theme_location' => 'footerLocationOne',
                                ))
                                ?>
                            <!--      <li><a href="<?php echo site_url('/about-us') ?>">About Us</a></li>
            <li><a href="#">Programs</a></li>
            <li><a href="#">Events</a></li>
            <li><a href="#">Campuses</a></li> -->
                        </ul>
                    </nav>
                </div>

                <div class="site-footer__col-three">
                    <h3 class="headline headline--small">Learn</h3>
                    <nav class="nav-list">
                        <ul>
                            <?php
                                wp_nav_menu(array(
                                    'theme_location' => 'footerLocationTwo',
                                ))
                                ?>
                            <!--   <li><a href="#">Legal</a></li>
            <li><a href="<?php echo site_url('/privacy-policy') ?>">Privacy</a></li>
            <li><a href="#">Careers</a></li> -->
                        </ul>
                    </nav>
                </div>
            </div>

            <div class="site-footer__col-four">
                <h3 class="headline headline--small">Connect With Us</h3>
                <nav>
                    <ul class="min-list social-icons-list group">
                        <li><a href="#" class="social-color-facebook"><i class="fa fa-facebook"
                                    aria-hidden="true"></i></a></li>
                        <li><a href="#" class="social-color-twitter"><i class="fa fa-twitter"
                                    aria-hidden="true"></i></a></li>
                        <li><a href="#" class="social-color-youtube"><i class="fa fa-youtube"
                                    aria-hidden="true"></i></a></li>
                        <li><a href="#" class="social-color-linkedin"><i class="fa fa-linkedin"
                                    aria-hidden="true"></i></a></li>
                        <li><a href="#" class="social-color-instagram"><i class="fa fa-instagram"
                                    aria-hidden="true"></i></a></li>
                    </ul>
                </nav>
            </div>
        </div>

    </div>
</footer>

<!-- <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script> -->
<?php wp_footer();?>
</body>

</html>