const button = document.getElementById('button')
const audioElement = document.getElementById('audio')
const jokeDisplay = document.getElementById('jokeDisplay')


// disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

// passing joke to voiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: '9c976a17b881488793f85023a9a67f9a',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`
        } else {
            joke = data.joke;
        }
        // text-to-speech
        jokeDisplay.hidden = false;
        jokeDisplay.innerHTML = joke;
        tellMe(joke)
        // disable button
        toggleButton();
    } catch(error) {
        console.log('Error: ',error);
    }
}

// event listeners
button.addEventListener('click', () => {
    getJokes()
});

audioElement.addEventListener('ended', toggleButton)