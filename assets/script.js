const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
    {
        image: './assets/img/drink.jpg',
        text: "I'm Thirsty"
    },
    {
        image: './assets/img/food.jpg',
        text: "I'm Hungry"
    },
    {
        image: './assets/img/tired.jpg',
        text: "I'm Tired"
    },
    {
        image: './assets/img/hurt.jpg',
        text: "I'm Hurt"
    },
    {
        image: './assets/img/happy.jpg',
        text: "I'm Happy"
    },
    {
        image: './assets/img/angry.jpg',
        text: "I'm Angry"
    },
    {
        image: './assets/img/sad.jpg',
        text: "I'm Sad"
    },
    {
        image: './assets/img/scared.jpg',
        text: "I'm Scared"
    },
    {
        image: './assets/img/outside.jpg',
        text: 'I Want To Go Outside'
    },
    {
        image: './assets/img/home.jpg',
        text: 'I Want To Go Home'
    },
    {
        image: './assets/img/school.jpg',
        text: 'I Want To Go To School'
    },
    {
        image: './assets/img/grandma.jpg',
        text: 'I Want To Go To Grandmas'
    }
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
    const box = document.createElement('div');
    // pull image and text
    const {image, text} = item;
    box.classList.add('box');
    box.innerHTML = `
    <img src='${image}' alt='${text}' />
    <p class='info'>${text}</p>
    `;

    // speak event
    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();

        // Add active effect to clicked box
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800);
    })

    main.appendChild(box);
};

// Start speech synth
const message= new SpeechSynthesisUtterance();

// Array to store voice
let voice = [];

// get voice
function getVoices() {
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');

        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;

        voicesSelect.appendChild(option);
    })
}

// Set text to speak
function setTextMessage(text) {
    message.text = text;
}

// Speak text given
function speakText() {
    speechSynthesis.speak(message);
}

// set voice to selected options
function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value)
}

// Change voices
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));

// Toggle close btn
closeBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));

// change voice via select list
voicesSelect.addEventListener('change', setVoice);

// read typed text button
readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
})

// init voices
getVoices();
