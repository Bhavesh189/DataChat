// voice to text
const micbtn = document.getElementById("micbtn")
const chatingZone = document.getElementById("chatingZone")
const listen = window.SpeechRecognition || window.webkitSpeechRecognition;
const listener = new listen();
listener.continuous = false;
listener.lang = "en-US";
micbtn.addEventListener("click", () => {
    micbtn.style.background = "red"
    listener.start()
});
    chatingZone.value = "";
listener.onresult = (event) => {
    const result = event.results[0][0].transcript;
    chatingZone.value = result;
}

// sending message
const chatShows = document.getElementById("chats")
const sendbtn = document.getElementById("sendbtn")
const fileInput = document.getElementById("fileUplod");

sendbtn.addEventListener("click", () => {
    const userMessage = chatingZone.value.trim();
    if (userMessage === "") return;

    const userMessageNew = document.createElement("div");
    userMessageNew.classList.add("message", "user");
    userMessageNew.innerText = userMessage;
    chatShows.appendChild(userMessageNew);
    DataChatReply(userMessage)
    chatShows.style.justifyContent = "flex-start";
    chatingZone.value="";
    fileInput.value = "";
  
    chatShows.scrollTop = chatShows.scrollHeight;
});
chatingZone.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        sendbtn.click();
    }
})
function DataChatReply(message) {
    let reply = "";
    if (message.toLowerCase() === "hi") {
        reply = "hello i am data chat";
    }
    else 

        
        {
            reply="soory i dont know";
        }

    const DataChatMessage = document.createElement("div")
    DataChatMessage.classList.add("message", "dataChat");
    DataChatMessage.innerText = reply;
    chatShows.appendChild(DataChatMessage);
    

}


//sidebar
let sidebar = document.querySelector(".sidebar")
let threedots = document.querySelector(".toggle-btn")
threedots.addEventListener("click", () => {
    sidebar.classList.toggle("active")
});
//google login on click event
const account = document.querySelector(".account")
const googleLogin = document.getElementById("googleLogin")
account.addEventListener("click", () => {
    googleLogin.classList.toggle("active")
});
//logout logic
const logoutBar = document.querySelector(".logoutBar")

const logoutOptions = document.querySelector(".logout")
logoutBar.addEventListener("click", () => {
    logoutOptions.classList.toggle("active")
});
