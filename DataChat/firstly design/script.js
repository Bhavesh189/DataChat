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
// replies discanatory
const DataChatReplyDisc =
{
    "hi": "hello",
    "data chat ko kisne banaya hai": "DataChat ko alwar mai padhne wale ek student Bhavesh Sharma ne banaya hai joki abhi laxmi devi institute of technology and engineering se Btech kr rhe h CSE branch se",
    "datachat ko kisne banaya hai": "DataChat ko alwar mai padhne wale ek student Bhavesh Sharma ne banaya hai joki abhi laxmi devi institute of technology and engineering se Btech kr rhe h CSE branch se",
    // Basic Loop Questions
    "what is a loop": "Loop ek aisa tarika hai jisme ek hi code baar baar chal sakta hai jab tak condition true hai.",
    "types of loops": "C language me mainly 3 loops hote hain: for loop, while loop aur do-while loop.",
    "why loops are used": "Loop use karte hain taaki ek hi code ko baar baar likhne ki zarurat na pade aur program efficient ho jaye.",

    // For Loop
    "for loop": "For loop tab use hota hai jab hume pehle se pata ho kitni baar code repeat karna hai.",
    "example of for loop": "Example: for(int i=0; i<5; i++){ printf('%d', i); } ye 0 se 4 tak number print karega.",
    "when to use for loop": "For loop tab use karo jab iterations ki exact count pehle se pata ho.",

    // While Loop
    "while loop": "While loop tab tak chalta hai jab tak condition true rehti hai.",
    "example of while loop": "Example: int i=0; while(i<5){ printf('%d', i); i++; } ye 0 se 4 tak number print karega.",
    "when to use while loop": "While loop use tab hota hai jab iterations ki exact count nahi pata aur condition ke hisaab se chalana ho.",

    // Do-While Loop
    "do while loop": "Do-while loop kam se kam ek baar zarur chalega chahe condition false ho.",
    "example of do while loop": "Example: int i=0; do{ printf('%d', i); i++; }while(i<5); ye 0 se 4 tak print karega.",

    // Difference Questions
    "difference between while and do while": "While loop condition check karke code chalata hai, lekin do-while loop ek baar code chalakar baad me condition check karta hai.",
    "difference between for and while": "For loop tab best hai jab iterations fixed ho, aur while loop tab use hota hai jab iterations unknown ho.",

    // Extra
    "nested loop": "Nested loop ka matlab hai ek loop ke andar dusra loop chalana.",
    "infinite loop": "Infinite loop tab hota hai jab condition kabhi false nahi hoti, jaise while(1){}."

};

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
    chatingZone.value = "";
    fileInput.value = "";

    chatShows.scrollTop = chatShows.scrollHeight;
});
chatingZone.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        sendbtn.click();
    }
})

// reply
function DataChatReply(message) {
    async function sendToBackend(message) {
        try {
            const res = await fetch("https://datachatbackend.onrender.com/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: message })
            });


            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log("Backend reply:", data);
            return data.reply;
        } catch (err) {
            console.error("Fetch error:", err);
            return "Sorry, something went wrong!";
        }
    }

    sendToBackend(message).then(reply => {
        const DataChatMessage = document.createElement("div");
        DataChatMessage.classList.add("message", "dataChat");
        DataChatMessage.innerText = reply;
        chatShows.appendChild(DataChatMessage);

        chatShows.scrollTop = chatShows.scrollHeight;
    });
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