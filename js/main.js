

$(function() {
    // show larger images
    $("#work .btn").on("click", function(e) {
        cs.modal(this);
        return false // kill defalut and stop propagation
    });
    //  remove larger iamges
    $("#placeholder, #close").on("click", function(e) {
        cs.destroyModal();
    })
    // esc key removes larger images too
    $("body").on("keyup", function(e) {
        if ( e.keyCode == 27 ) {
            cs.destroyModal();
        }
    })
    // open social links in new window
    $("a[href^='http://']").attr("target","_blank");

    $(".work-list > li").hoverIntent(function(){
        $(this).addClass("active");
    }, function() {
        $(this).removeClass("active");
    })
});


// namespaced functions to be called at ones leisure
var cs = {
    modal: function(elem) {

        var $placeholder = $("#placeholder");

        // add loading spinner
        $(elem).parent().append("<div class='spinner'>");

        $placeholder.empty();

        $placeholder.append('<figure><img src="' + elem.href + '"></figure>');

        $("figure", $placeholder).css({
            display: "inline-block",
            position: "relative",
            maxWidth: "95%",
            boxShadow: "2px 2px 2px rgba(0,0,0,.2)"
        })


        $closeBtn = $('<div id="close">&times;</div>').appendTo($placeholder).css({
            "position": "absolute",
            "top": "18px",
            "right": "18px",
            "width": "36px",
            "height": "36px",
            "padding-left": "1px",
            "border-radius": "50%",
            "background-color": "#000",
            "color": "#fff",
            "font-size": "36px",
            "line-height": "1",
            "font-weight": "bold",
            "text-align": "center",
            "cursor": "pointer"
        })
        // when image is loaded
        $placeholder.imagesLoaded()
            .done( function( instance ) {

                $(".spinner").remove();

                $placeholder.css({
                    position: "relative",
                    padding: "100px 0",
                    clear: "both",
                    textAlign: "center",
                    backgroundColor: "#888"
                }).show();

                var scrollPositionY = $placeholder.offset().top;
                $("html, body").animate({
                    scrollTop: scrollPositionY
                },800)
            })
            // if image failed
            .fail( function( instance ) {
                alert("Something has gone horribly wrong. Panic.")
            })
    },
    destroyModal: function(e) {
        var scrollPositionY = $("#work").offset().top
        $("#placeholder").empty().hide();
        $("html, body").animate({
            scrollTop: scrollPositionY
        })
    }
};





















