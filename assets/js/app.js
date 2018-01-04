/** contador de posteos */
var contPost = 0;
/** contador de comentarios */
var contComment = 0;
/** contador de likes */
var contLike = 0;


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


/** funcion para contar likes */
$('#numLikes').click(function(){
  contLike++;
  $('#contador-likes').replace(contLike);
})


/** funcion para mostrar los posteos en el muro */
function ingresarPosteo(){
  posteo = $("#txt-comentario").val();
  $('#posteos-noticias').append('<div id="post_' + contPost +'" class="panel panel-default post">' +
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
function agregarComentario(){
  comentario = $('#txt-comentarioAgregado').val();
  $('.comentarios-posteo').append('<div id="comments_' + contComment +'"> ' +
                                    '<div class="comment"> ' +
                                      '<a href="#" class="comment-avatar pull-left"> ' +
                                        '<img src="assets/images/user.png" alt=""> ' +
                                      '</a> ' +
                                      '<div class="comment-text"> ' +
                                        '<p>' + comentario +'</p> ' +
                                      '</div> ' +
                                    '</div> ' +
                                  '<div class="clearfix"></div> ' 
                                 
  
  );
  contComment++;
}

/** funcion para mostrar imagenes */