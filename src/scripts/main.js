/* global $ */
$(function() {
  // show larger images
  $("#work .btn").on("click", function(e) {
    if (/images/.test(this.href)) {
      e.preventDefault();
      cs.modal(this);
    } else {
      $(this).attr("target", "_blank");
    }
  });

  //  remove larger images
  $("#placeholder, #close").on("click", function() {
    cs.destroyModal();
  });

  // esc key removes larger images too
  $("body").on("keyup", function(e) {
    if (e.keyCode === 27) {
      cs.destroyModal();
    }
  });

  // open social links in new window
  $("a[href^='http://']").attr("target", "_blank");

  // slide panel over thumbnails
  $(".work-list > li").hoverIntent(function() {
    $(this).addClass("active");
  }, function() {
    $(this).removeClass("active");
  });
});


// namespaced functions to be called at ones leisure
var cs = {
  modal: function(elem) {

    var $placeholder = $("#placeholder");
    var $closeBtn = $('<div id="close">&times;</div>');

    // add loading spinner
    $(elem).parent().append("<div class='spinner'>");

    $placeholder.empty();

    $placeholder.append('<figure><img src="' + elem.href + '"></figure>');

    $("figure", $placeholder).css({
      display: "inline-block",
      position: "relative",
      maxWidth: "95%",
      boxShadow: "2px 2px 2px rgba(0,0,0,.2)"
    });


    $closeBtn.appendTo($placeholder).css({
      "position": "absolute",
      "top": "18px",
      "right": "18px",
      "width": "36px",
      "height": "36px",
      "border-radius": "50%",
      "background-color": "#000",
      "color": "#fff",
      "font-size": "30px",
      "font-weight": "bold",
      "text-align": "center",
      "line-height": 1,
      "cursor": "pointer"
    });

    // when image is loaded
    $placeholder
      .imagesLoaded()
      .done(function() {

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
        }, 800);
      });
  },
  destroyModal: function() {
    var scrollPositionY = $("#work").offset().top;

    $("#placeholder").empty().hide();
    $("html, body").animate({
      scrollTop: scrollPositionY
    });
  }
};
