
/* Commented  because error occure on home page(added new brandpotion layout)
/*$(function() {
  $('li:last-child').addClass('last');
  $('.ui-tabs-nav').tabs({ fx: { opacity: 'toggle' } });
  $('a[rel="external"]').click( function() { $( this ).attr( 'target','_blank' ); });
  $('#locale-dropdown').change(function() { window.location = 'http://' + $(this).val() + '.brandpotion.com/' });
  $('.toolbar input[type="text"]').toggleVal({ populateFrom: "label", removeLabels: true });
  $('#header input[type="text"]').toggleVal({ populateFrom: "label", removeLabels: true });
  $('#header input[type="password"]').toggleVal({ removeLabels: true });
  $('a[rel^="prettyPhoto"]').prettyPhoto();
  $('ul.drawers').accordion({header: 'a.drawer-handle',selectedClass: 'open',event: 'mousedown'});
  //$('#locale-dropdown').selectbox();
  
  overlays();
  hints();
  $(document).pngFix();
  
});
*/
function hints() {
  $('<span class="hint-pointer"></span>').appendTo('.hint');
  $('.field input, .field textarea, .field select').focus(function() {
    $(this).parent().find('.hint').show();
  }).blur(function() {
    $(this).parent().find('.hint').hide();
  });
}

function overlays() {
  $('.thumb').livequery(function() {
    var link = $(this).children('a:first').attr('href');
    
    // Add a link on the whole overlay
    // only if it an ad
    if (this.className.indexOf('small') == -1) {
      $('.overlay', this).click(function() {
        window.location.href = link;
      });
    }
    $(this).hover(function() { 
      $('.overlay', this).fadeIn('fast');
    }, function() { 
      $('.overlay', this).fadeOut('fast');
    }); 
  }, function() {
    $(this).unbind('mouseover').unbind('mouseout'); 
  });
}

function ZPVideo( id, flashvars, params, attributes ) {
  if (swfobject != undefined) {
    swfobject.embedSWF('/players/zplayer_video.swf', id, 450, 338, "9.0.0", " /swf/expressInstall.swf", flashvars, params, attributes );
  }
}

function ZPPrint( id, flashvars, params, attributes ) {
  if (swfobject != undefined) {
    swfobject.embedSWF( '/players/zplayer_print.swf', id, 450, 338, "9.0.0", " /swf/expressInstall.swf", flashvars, params, attributes );
  }
}

function ZPRadio( id, flashvars, params, attributes ) {
  if (swfobject != undefined) {
    swfobject.embedSWF( '/players/zplayer_radio.swf', id, 450, 338, "9.0.0", " /swf/expressInstall.swf", flashvars, params, attributes );
  }
}

function ZPBanner( id, flashvars, params, attributes ) {
  if (swfobject != undefined) {
    swfobject.embedSWF( '/players/zplayer_banner.swf', id, 450, 338, "9.0.0", " /swf/expressInstall.swf", flashvars, params, attributes );
  }
}

function paginationLoading(element) {
  var container = $('#' + element );
  if (container.size() == 0) return;
  
  // Fades the container
  container.fadeTo( 'fast', .1 );
  
  // Calculate the coords of the spinner
  var left = ( container.width() - 32 ) / 2 | 0;
  var top = ( container.height() - 32 ) / 2 | 0;
  
  // Insert the spinner in the middle of the container
  var par = container.parent();
  par.css('position', 'relative');
  var spinner = par.createPrepend( 'img', {
    src: '/images/shared/spinner.gif',
    id: 'pagination-spinner',
    style: { 'position': 'absolute', 'left': left + 'px', 'top': top + 'px' }
  });
}

function paginationComplete(element) {
  var container = $('#' + element );
  if (container.size() == 0) return;
  
  $('#pagination-spinner').remove();
  container.fadeTo( 'fast', 1 );
}

/*this method not define in brandpotion
$.ajaxSetup({ 
  'beforeSend': function(xhr) { xhr.setRequestHeader("Accept", "text/javascript") }
});
*/

//channel features activation page display note when admin modified channel feature
function show_message(e1)
{
document.getElementById(e1).style.display = "inline";
}

function hide_message(e1)
{
document.getElementById(e1).style.display = "none";
}

//show spinner and hide spinner
function show_hide(e1,e2)
{
document.getElementById(e1).style.display = "inline";
document.getElementById(e2).style.display = "none";
}

function select_deselect_all( obj, tag ){
  var elements = document.getElementsByTagName(tag); 
  if(obj.checked){ checked = true; } else { checked = false; } 
  for(var i=0;i<elements.length;i++){ elements[i].checked = checked; }
}

function validate_delete( tag ){
       var elements = document.getElementsByTagName(tag);
        var flag=0;
        for(var i=0;i<elements.length;i++){ 
              if(elements[i].checked){ flag=1; break;} else{ continue;}
        }
        return flag;
}

function highlight ( e ) {
        e.focus();
        e.style.background = "lightyellow";
}

function validate_submit( tag ){
       var elements = document.getElementsByTagName(tag);
       var flag=0;
       for(var i=0;i<elements.length;i++){ 
               if(elements[i].value == ""){ highlight(elements[i]); alert('Highlighted field cannot be blank.'); flag=1; break;} else{ elements[i].style.background = "white"; continue;}
             }
       return flag;
}


function validate_attachment( tag, id ){
       var s = document.getElementById(id);              
       var elements = s.getElementsByTagName( tag );              
       var flag=0;
       for(var i=0;i<elements.length;i++){               
               if(elements[i].value == ""){flag=1; break;}
             }
       return flag;
}

function toggle_inline(id) {
    element = document.getElementById(id);              
    if( element.style.display != 'none') {
        element.style.display = 'none';
    }
    else {
        element.style.display = '';
    }
}

function set_column_size() 
  {     
     if( $('.boxes').height() + 205 >= $('.tab-content').height() )
    {                  
      newH= parseInt($('.boxes').height() +205);          
        $('.tab-content').css('min-height',newH);      
    }	    
    else{
      newH= parseInt($('.boxes').height() +205);    
      $('.tab-content').css('min-height',newH);      
    }
  }
  
   function check_blank_comment( id ){
      var elements = document.getElementById(id);       
      flag = 0;
      if(elements.value == ""){ alert("Comment can't be blank."); flag=1; return flag;} else{ return flag;}              
    }