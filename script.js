// ---------- ELEMENTS ----------

const screens = document.querySelectorAll(".screen");

const yes1 = document.getElementById("yes1");
const no1 = document.getElementById("no1");
const message1 = document.getElementById("message1");

const continueBtn = document.getElementById("continueBtn");

const yesA = document.getElementById("yesA");
const yesB = document.getElementById("yesB");

const revealBtn = document.getElementById("revealBtn");

const terminalText = document.getElementById("terminalText");

const claimReward = document.getElementById("claimReward");

const noSound = document.getElementById("noSound");
const yesSound = document.getElementById("yesSound");

const confetti = document.getElementById("confetti");


// ---------- HELPERS ----------

function showScreen(id){

    screens.forEach(screen=>{
        screen.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");

}

function playYes(){

    yesSound.currentTime = 0;
    yesSound.play();

}

function playNo(){

    noSound.currentTime = 0;
    noSound.play();

}


// ---------- SCREEN 1 ----------

yes1.addEventListener("click",()=>{

    playYes();

    setTimeout(()=>{

        showScreen("screen2");

    },300);

});

no1.addEventListener("click",()=>{

    playNo();

    message1.textContent="Hmm... I don't think that's right. 🤨";

});


// ---------- SCREEN 2 ----------

continueBtn.addEventListener("click",()=>{

    playYes();

    setTimeout(()=>{

        showScreen("screen3");

    },300);

});


// ---------- SCREEN 3 ----------

yesA.addEventListener("click",()=>{

    playYes();

    setTimeout(()=>{

        showScreen("screen4");

    },300);

});

yesB.addEventListener("click",()=>{

    playYes();

    setTimeout(()=>{

        showScreen("screen4");

    },300);

});


// ---------- SCREEN 4 ----------

revealBtn.addEventListener("click",()=>{

    playYes();

    showScreen("screen5");

    startTyping();

});


// ---------- TERMINAL ----------

const lines=[

"Connecting...\n",

"██████░░░░░\n",

"Access granted.\n",

"Searching database...\n",

"Checking FBI records...\n",

"Finding suspect...\n",

"Match found.\n\n",

"Identity unlocked."

];

function startTyping(){

    terminalText.textContent="";

    let line=0;

    let char=0;

    function type(){

        if(line>=lines.length){

            setTimeout(()=>{

                showScreen("screen6");

            },700);

            return;

        }

        if(char<lines[line].length){

            terminalText.textContent+=lines[line][char];

            char++;

            setTimeout(type,35);

        }

        else{

            line++;

            char=0;

            setTimeout(type,300);

        }

    }

    type();

}// ---------- FINAL BUTTON ----------

claimReward.addEventListener("click",()=>{

    playYes();

    createConfetti();

    setTimeout(()=>{

        showScreen("screen7");

    },1000);

});


// ---------- CONFETTI ----------

function createConfetti(){

    const colors=[
        "#ff4d6d",
        "#ffd166",
        "#06d6a0",
        "#118ab2",
        "#ffffff",
        "#b388ff"
    ];

    for(let i=0;i<180;i++){

        const piece=document.createElement("div");

        piece.className="confetti";

        piece.style.left=Math.random()*100+"vw";

        piece.style.background=colors[Math.floor(Math.random()*colors.length)];

        piece.style.animationDuration=(Math.random()*2+2)+"s";

        piece.style.transform=`rotate(${Math.random()*360}deg)`;

        confetti.appendChild(piece);

        setTimeout(()=>{

            piece.remove();

        },4500);

    }

}


// ---------- ENTER KEY ----------

document.addEventListener("keydown",(e)=>{

    if(e.key!=="Enter") return;

    const active=document.querySelector(".screen.active");

    if(!active) return;

    switch(active.id){

        case "screen1":
            yes1.click();
            break;

        case "screen2":
            continueBtn.click();
            break;

        case "screen3":
            yesA.click();
            break;

        case "screen4":
            revealBtn.click();
            break;

        case "screen6":
            claimReward.click();
            break;

    }

});


// ---------- PRELOAD AUDIO ----------

window.addEventListener("load",()=>{

    noSound.load();
    yesSound.load();

});