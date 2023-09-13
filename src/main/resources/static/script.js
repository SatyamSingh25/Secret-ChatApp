var stompClient = null;


function connect(){
    let socket = new SockJS("/server1");
    stompClient = Stomp.over(socket);

    stompClient.connect({} , function(frame){
        console.log("connected: " + frame);

        $("#name-from").addClass('d-none')
        $("#chat-room").removeClass('d-none')

        //subscribe
        stompClient.subscribe("/topic/returnTo", function(res){
            showMessage(JSON.parse(res.body))
        })
    });
}

function showMessage(message){
    $("#message-container-table").prepend(`<tr><td><b>${message.name} :</b> ${message.content}</td></tr>`)
}

function sendMessage(){
    let jsonObj = {
          name: localStorage.getItem("name"),
          content: $("#message-value").val()
          }
    stompClient.send("/app/message", {}, JSON.stringify(jsonObj));
    const content = document.getElementById("message-value");
    console.log(content.value);
    content.value = "";

}

$(document).ready((e) => {

    $("#login").click(() => {
//        alert("test");
          let name = $("#name-value").val();
          localStorage.setItem("name", name);
          $("#name-title").text(name);
          connect();
    })

    $("#send-btn").click(() => {
        sendMessage();
    })

    $("#logout").click(()=>{

        localStorage.removeItem("name")
        if(stompClient!==null)
        {
                stompClient.disconnect()

             $("#name-from").removeClass('d-none')
             $("#chat-room").addClass('d-none')
             console.log(stompClient)
        }

    })

})