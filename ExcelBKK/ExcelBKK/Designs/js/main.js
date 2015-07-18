  

// Function Call Tab Content
  $(function () {
    $('#loopin-popular-tab a:first').tab('show');
    $("#login a:first").tab("show");
    $("#loopin-purchased a:first").tab("show");
    
  });


// Function Gallery Slide
   $(function() {
        $('#thumbs .thumb a').each(function(i) {
          $(this).addClass( 'itm'+i );
          $(this).click(function() {
              $('#images').trigger('slideTo', [i, 0, true]);
              $('#thumbs a').removeClass('selected');
              $(this).addClass('selected');
            return false;
          });
        });
        $('#thumbs a.itm0').addClass( 'selected' );
        $('#images').carouFredSel({
          direction: 'left',
          circular: false,
          infinite: false,
          items: 1,
          auto: false, // set true for auto slide
          scroll: {
            fx: 'directscroll'
          }
        });
        $('#thumbs').carouFredSel({
          direction: 'left',
          circular: false,
          infinite: false,
          items: 7,
          align: false,
          auto: false,
          prev: '#prev',
          next: '#next'
        });
   });
  // Function Upcomming Slide Images 
//  Scrolled by user interaction
  
  $("#trendy").carouFredSel({
  circular: false,
  infinite: false,
  auto  : false,
  prev  : { 
    button  : "#trendy-prev",
    key   : "left"
  },
  next  : { 
    button  : "#trendy-next",
    key   : "right"
  },
  pagination  : "#trendy-page",
  mousewheel: true,
          swipe: {
            onMouse: true,
            onTouch: true
          }
  });
  
  $("#arrivals").carouFredSel({
  circular: false,
  infinite: false,
  auto  : false,
  prev  : { 
    button  : "#arrivals-prev",
    key   : "left"
  },
  next  : { 
    button  : "#arrivals-next",
    key   : "right"
  },
  pagination  : "#arrivals-page",
  mousewheel: true,
          swipe: {
            onMouse: true,
            onTouch: true
          }
  });
  
  $("#popular").carouFredSel({
  circular: false,
  infinite: false,
  auto  : false,
  prev  : { 
    button  : "#popular-prev",
    key   : "left"
  },
  next  : { 
    button  : "#popular-next",
    key   : "right"
  },
  pagination  : "#popular-page",
  mousewheel: true,
          swipe: {
            onMouse: true,
            onTouch: true
          }
  });

  $("#highlight").carouFredSel({
  circular: false,
  infinite: false,
  auto  : false,
  prev  : { 
    button  : "#highlight-prev",
    key   : "left"
  },
  next  : { 
    button  : "#highlight-next",
    key   : "right"
  },
  pagination  : "#highlight-page",
  mousewheel: true,
          swipe: {
            onMouse: true,
            onTouch: true
          }
  });
  $("#area-slide").carouFredSel({
  circular: true,
  infinite: false,
  auto  : false,
  prev  : { 
    button  : "#highlight-prev",
    key   : "left"
  },
  next  : { 
    button  : "#highlight-next",
    key   : "right"
  },
  pagination  : "#area-slide-page",
  });

  $("#eat").carouFredSel({
  circular: false,
  infinite: false,
  auto  : false,
  prev  : { 
    button  : "#eat-prev",
    key   : "left"
  },
  next  : { 
    button  : "#eat-next",
    key   : "right"
  },
  pagination  : "#eat-page",
  mousewheel: true,
          swipe: {
            onMouse: true,
            onTouch: true
          }
  });

  $("#live").carouFredSel({
  circular: false,
  infinite: false,
  auto  : false,
  prev  : { 
    button  : "#live-prev",
    key   : "left"
  },
  next  : { 
    button  : "#live-next",
    key   : "right"
  },
  pagination  : "#live-page",
  });

  $("#play").carouFredSel({
  circular: false,
  infinite: false,
  auto  : false,
  prev  : { 
    button  : "#play-prev",
    key   : "left"
  },
  next  : { 
    button  : "#play-next",
    key   : "right"
  },
  pagination  : "#play-page",
  });

  $("#stay").carouFredSel({
  circular: false,
  infinite: false,
  auto  : false,
  prev  : { 
    button  : "#stay-prev",
    key   : "left"
  },
  next  : { 
    button  : "#stay-next",
    key   : "right"
  },
  pagination  : "#stay-page",
  });

  // Function Check Browser
  if ( $.browser.msie ) {
    var version = $.browser.version

    if(version==7.0){
      $(".chk-browser").html( "<span>Please Update Browser "+$.browser.version +"</span>" );
    }
  //alert( $.browser.version );
  }

  // Function collapse
  $(".myCollapsible").collapse();
  
  // Function Custom Select box
   //jQuery(function($) {
   // $("select").selectBoxIt({
   //   showEffect: "fadeIn",
   //     // Sets the jQuery 'fadeIn' effect speed to 400 milleseconds
   //   showEffectSpeed: 400,

   //   // Uses the jQuery 'fadeOut' effect when closing the drop down
   //   hideEffect: "fadeOut",

   //   // Sets the jQuery 'fadeOut' effect speed to 400 milleseconds
   //   hideEffectSpeed: 400
   // });
        
   //});
   // Function Show Content Image Hover
   $('.thumbnail').hover(
        function(){
            $(this).children('.contenthover').fadeIn(200);
            $(this).children('.loopin-ribbon-price').fadeOut(200);
            //$("#deal-list .loopin-ribbon-price").fadeOut(200);
        },
        function(){
            $(this).children('.contenthover').fadeOut(200);
            $(this).children('.loopin-ribbon-price').fadeIn(200);
            $('[data-toggle="dropdown tooltip"]').parent().removeClass('open');
        }
  ); 
  // Function Show Content Image Hover Event
   $('.event-list').hover(
        function(){
            $(this).children('.content-event').fadeIn(100);
            $(this).children('.caption-event').fadeOut(100);
            $(this).children('.date-event').fadeOut(100);
            //$("#deal-list .loopin-ribbon-price").fadeOut(200);
        },
        function(){
            $(this).children('.content-event').fadeOut(100);
            $(this).children('.caption-event').fadeIn(100);
            $(this).children('.date-event').fadeIn(100);
            //$('[data-toggle="dropdown tooltip"]').parent().removeClass('open');
        }
  ); 
      // Function Show Content Image Hover
   $('.list-content').hover(
        function(){
         // alert();
            $(this).children('.action').fadeIn(200);
            //$(this).children('.loopin-ribbon-price').fadeOut(200);
            //$("#deal-list .loopin-ribbon-price").fadeOut(200);
        },
        function(){
            $(this).children('.action').fadeOut(200);
           // $(this).children('.loopin-ribbon-price').fadeIn(200);
           // $('[data-toggle="dropdown tooltip"]').parent().removeClass('open');
        }
  );
