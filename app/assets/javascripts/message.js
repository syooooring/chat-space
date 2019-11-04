$(function(){
  function buildHTML(message){
    img = message.image ? `<img src= ${message.image}>` : "";
    var html = `<div class="wrapper__chat-main__message__messages">
                  <div class="wrapper__chat-main__message__messages__upper-info">
                    <p class="wrapper__chat-main__message__messages__upper-info__talker">
                    ${message.user_name}
                    </p>
                    <p class="wrapper__chat-main__message__messages__upper-info__date">
                    ${message.created_at}
                    </p>
                  </div>
                  <div class="wrapper__chat-main__message__messages__text">
                  ${message.content}
                  </div>
                  <p></p>
                  ${img}
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,  
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.wrapper__chat-main__message').append(html);
      $('.wrapper__chat-main__message').animate({ scrollTop: $('.wrapper__chat-main__message')[0].scrollHeight });
    })
    .fail(function(){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(){
      $('.wrapper__form__submit').prop('disabled', false);
    });
  })
});




  