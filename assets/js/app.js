/** contador de posteos */
var contPost = 0;
/** contador de comentarios */
var contComment = 0;
/** contador de likes */
var contLike = 0;

/** funcion para subir imagen */
!function (e) { var t = function (t, n) { this.$element = e(t), this.type = this.$element.data("uploadtype") || (this.$element.find(".thumbnail").length > 0 ? "image" : "file"), this.$input = this.$element.find(":file"); if (this.$input.length === 0) return; this.name = this.$input.attr("name") || n.name, this.$hidden = this.$element.find('input[type=hidden][name="' + this.name + '"]'), this.$hidden.length === 0 && (this.$hidden = e('<input type="hidden" />'), this.$element.prepend(this.$hidden)), this.$preview = this.$element.find(".fileupload-preview"); var r = this.$preview.css("height"); this.$preview.css("display") != "inline" && r != "0px" && r != "none" && this.$preview.css("line-height", r), this.original = { exists: this.$element.hasClass("fileupload-exists"), preview: this.$preview.html(), hiddenVal: this.$hidden.val() }, this.$remove = this.$element.find('[data-dismiss="fileupload"]'), this.$element.find('[data-trigger="fileupload"]').on("click.fileupload", e.proxy(this.trigger, this)), this.listen() }; t.prototype = { listen: function () { this.$input.on("change.fileupload", e.proxy(this.change, this)), e(this.$input[0].form).on("reset.fileupload", e.proxy(this.reset, this)), this.$remove && this.$remove.on("click.fileupload", e.proxy(this.clear, this)) }, change: function (e, t) { if (t === "clear") return; var n = e.target.files !== undefined ? e.target.files[0] : e.target.value ? { name: e.target.value.replace(/^.+\\/, "") } : null; if (!n) { this.clear(); return } this.$hidden.val(""), this.$hidden.attr("name", ""), this.$input.attr("name", this.name); if (this.type === "image" && this.$preview.length > 0 && (typeof n.type != "undefined" ? n.type.match("image.*") : n.name.match(/\.(gif|png|jpe?g)$/i)) && typeof FileReader != "undefined") { var r = new FileReader, i = this.$preview, s = this.$element; r.onload = function (e) { i.html('<img src="' + e.target.result + '" ' + (i.css("max-height") != "none" ? 'style="max-height: ' + i.css("max-height") + ';"' : "") + " />"), s.addClass("fileupload-exists").removeClass("fileupload-new") }, r.readAsDataURL(n) } else this.$preview.text(n.name), this.$element.addClass("fileupload-exists").removeClass("fileupload-new") }, clear: function (e) { this.$hidden.val(""), this.$hidden.attr("name", this.name), this.$input.attr("name", ""); if (navigator.userAgent.match(/msie/i)) { var t = this.$input.clone(!0); this.$input.after(t), this.$input.remove(), this.$input = t } else this.$input.val(""); this.$preview.html(""), this.$element.addClass("fileupload-new").removeClass("fileupload-exists"), e && (this.$input.trigger("change", ["clear"]), e.preventDefault()) }, reset: function (e) { this.clear(), this.$hidden.val(this.original.hiddenVal), this.$preview.html(this.original.preview), this.original.exists ? this.$element.addClass("fileupload-exists").removeClass("fileupload-new") : this.$element.addClass("fileupload-new").removeClass("fileupload-exists") }, trigger: function (e) { this.$input.trigger("click"), e.preventDefault() } }, e.fn.fileupload = function (n) { return this.each(function () { var r = e(this), i = r.data("fileupload"); i || r.data("fileupload", i = new t(this, n)), typeof n == "string" && i[n]() }) }, e.fn.fileupload.Constructor = t, e(document).on("click.fileupload.data-api", '[data-provides="fileupload"]', function (t) { var n = e(this); if (n.data("fileupload")) return; n.fileupload(n.data()); var r = e(t.target).closest('[data-dismiss="fileupload"],[data-trigger="fileupload"]'); r.length > 0 && (r.trigger("click.fileupload"), t.preventDefault()) }) }(window.jQuery)

/* funcion para tooltip */ 
$(document).ready(function () {
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