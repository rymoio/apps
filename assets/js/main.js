// @codekit-prepend "../../bower_components/jquery/dist/jquery.js", "../../bower_components/bootstrap/dist/js/bootstrap.js", "../../bower_components/offline/offline.min.js", "../../bower_components/store.js/store.js";

// Wrap in self-invoking anonymous function:
(function($){

    // Check if element is a child of a div:
    $.extend($.expr[':'],{
        childOfDiv: function(a) {
            return $(a).parents('div').size();
        }
    });
})(jQuery);

(function() {
    // Check if a new cache is available on page load.
    window.addEventListener('load', function(e) {

        window.applicationCache.addEventListener('updateready', function(e) {
            if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
                // Browser downloaded a new app cache.
                if (confirm('A new version of this site is available. Load it?')) {
                    window.location.reload();
                }
            } else {
                // Manifest didn't change. Nothing new to serve.
            }
        }, false);

    }, false);
})();

$(function() {
    // determine issue count
    var ghUrl = 'https://api.github.com/repos/rymoio/apps.rymo.io/issues?state=open',
        issCount = '';
    $.get(ghUrl, function (data) {
        issCount = (data && data.length > 0) ? data.length : '';
        if (issCount) {
            $('#github-issues').append('<span id="gh-issue-count" class="navbar-unread">' + issCount + '</span>');
        } else {
            if ($('#gh-issue-count')) {
                $('#gh-issue-count').remove();
            }
        }

    });

    // toggle menu icon
    $('.navbar-toggle').on('click', function () {
        $('.navbar-toggle i').toggleClass('fa-chevron-down fa-chevron-up');
    });

    //Check to see if the window is top if not then display button
    $(window).scroll(function(){
        if ($(this).scrollTop() > 200) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    //Click event to scroll to top
    $('.scrollToTop').click(function(){
        $('html, body').animate({scrollTop : 0}, 800);
        return false;
    });

});