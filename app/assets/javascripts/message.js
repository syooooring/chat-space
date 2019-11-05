$(function(){
  function buildHTML(message){
    img = message.image ? `<img src= ${message.image}>` : "";
    var html = `<div class="wrapper__chat-main__message__messages" data-message-id="${message.id}">
                  <div class="wrapper__chat-main__message__messages__upper-info">
                    <p class="wrapper__chat-main__message__messages__upper-info__talker">
                    ${message.user_name}
                    </p>
                    <p class="wrapper__chat-main__message__messages__upper-info__date">
                    ${message.date}
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
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(){
      $('.wrapper__form__submit').prop('disabled', false);
    });
  })
  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.wrapper__chat-main__message__messages:last').data("message-id"); 
      // var group_id = $(".group").data("group-id");

      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {last_id: last_message_id}
      })
      .done(function (messages) { //通信成功したら、controllerから受け取ったデータ（messages)を引数にとって以下のことを行う
        var insertHTML = '';//追加するHTMLの入れ物を作る
        messages.forEach(function (message) {
          insertHTML = buildHTML(message);
          $('.wrapper__chat-main__message').append(insertHTML);
        })
        $('.wrapper__chat-main__message').animate({scrollTop: $('.wrapper__chat-main__message')[0].scrollHeight}, 'fast');//最新のメッセージが一番下に表示されようにスクロールする。
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});




  