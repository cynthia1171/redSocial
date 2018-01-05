/** contador de posteos */
var contPost = 0;
/** contador de comentarios */
var contComment = 0;
/** contador de likes */
var contLike = 0;


/** funcion registrar */
function registrar(){
  window.location = 'noticias.html';
  return false;
}

/** funcion iniciar sesion */
function iniciar() {
  window.location = 'noticias.html';
  return false;
}

$('#cerrar-sesion').click(function(){
  alert("Su sesion ha sido cerrada");
  window.location = 'index.html';
  return false;
})

$(document).ready(function () {

  /* funcion para tooltip */
  $('[data-toggle="tooltip"]').tooltip();
});

/** funcion modales */
/** funcion modal enviar mensaje */
$('#modalMensaje').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('usuario') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-title').text('New message to ' + recipient)
  modal.find('.modal-body input').val(recipient)

  $('#myCarousel').carousel({
    interval: 5000
  });

  //Handles the carousel thumbnails
  $('[id^=carousel-selector-]').click(function () {
    var id_selector = $(this).attr("id");
    try {
      var id = /-(\d+)$/.exec(id_selector)[1];
      console.log(id_selector, id);
      jQuery('#myCarousel').carousel(parseInt(id));
    } catch (e) {
      console.log('Regex failed!', e);
    }
  });
  // When the carousel slides, auto update the text
  $('#myCarousel').on('slid.bs.carousel', function (e) {
    var id = $('.item.active').data('slide-number');
    $('#carousel-text').html($('#slide-content-' + id).html());
  });
})

var imagenesSubidas = [];
/** funcion para contar likes */
$('#numLikes').click(function () {
  contLike++;
  $('#contador-likes').replace(contLike);
})
$(document).ready(function () {
  $("#img-file").change(function () {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      // Great success! All the File APIs are supported.
      // podemos mostrar la imagen
      //document.getElementById('img-file').addEventListener('change', handleFileSelect, false);
    } else {
      alert('El navegador no es compatible para chaucsnlsamdlkjlkjñlk');
    }
  });
});
document.getElementById('img-file').addEventListener('change', handleFileSelect, false);
function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object

  // Loop through the FileList and render image files as thumbnails.
  for (var i = 0, f; f = files[i]; i++) {
    // Only process image files.
    if (!f.type.match('image.*')) {
      continue;
    }

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function (theFile) {
      return function (e) {
        imagenesSubidas.push(e);
        // Render thumbnail.
        var span = document.createElement('span');
        span.innerHTML = ['<img class="thumb img-anadida" src="', e.target.result,
          '" title="', escape(theFile.name), '"/>'].join('');
        document.getElementById('list').insertBefore(span, null);
      };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
  }
}

/** funcion para mostrar los posteos en el muro */
function ingresarPosteo() {

  /** muestra las imagenes en la publicacion */
  var imagenes = '';
  for (var i = 0; i < imagenesSubidas.length; i++) {
    imagenes += '<img class="img-anadida" src="' + imagenesSubidas[i].target.result + '"> ';
  }
  posteo = $("#txt-comentario").val();
  $('#posteos-noticias').append('<div id="post_' + contPost + '" class="panel panel-default post">' +
    '<div class= "panel-body" >' +
    '<div class="row">' +
    '<div class="col-sm-2">' +
    '<a href="perfil.html" class="post-avatar thumbnail">' +
    '<img src="assets/images/user.png" alt="">' +
    '<div class="text-center">Nombre usuario</div>' +
    '</a>' +
    '<div class="likes text-center">' +
    '<p id=contador-likes>0</p> ' +
    '<button id="numLikes" class="glyphicon glyphicon-heart"> Likes</button>' +
    '</div>' +
    '</div>' +
    '<div class="col-sm-10">' +
    '<div class="bubble">' +
    '<div class="img-publicada"> ' + imagenes +
    '</div> ' +
    '<div class="pointer">' +
    '<p>' + posteo + '</p>' +
    '</div>' +
    '<div class="pointer-border"></div>' +
    '</div>' +
    '<p class="post-action">' +
    '<a href="#">Like</a> - <a href="#">Compartir</a>' +
    '</p>' +
    '<div class="comment-form">' +
    '<form action="javascript:agregarComentario()" class="form-inline">' +
    '<div class="form-group">' +
    '<input id="txt-comentarioAgregado" type="text" class="form-control" placeholder="Escribe tu comentario">' +
    '</div>' +
    '<button id="enviar-comentario" type="submit" class="btn btn-default"><span class="glyphicon glyphicon-ok"></span></button>' +
    '</form>' +
    '</div>' +
    '<div class="clearfix"></div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="comentarios-posteo"' +
    '</div> ' +
    '</div>'
  );
  contPost++;
}




/** funcion para agregar comentario a las publicaciones */
function agregarComentario() {
  comentario = $('#txt-comentarioAgregado').val();
  $('.comentarios-posteo').append('<div id="comments_' + contComment + '"> ' +
    '<div class="comment"> ' +
    '<a href="#" class="comment-avatar pull-left"> ' +
    '<img src="assets/images/user.png" alt=""> ' +
    '</a> ' +
    '<div class="comment-text"> ' +
    '<p>' + comentario + '</p> ' +
    '</div> ' +
    '</div> ' +
    '<div class="clearfix"></div> '


  );
  contComment++;
}


