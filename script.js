const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

const toggleButton = () => {
  button.disabled = !button.disabled;
};

// Passing Joke to VoiceRSS API
function JokeToVoice(joke) {
  VoiceRSS.speech({
    key: "5e72ff2c9c3a471d8c975b6dc58625ec",
    src: joke,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

async function getJokesFromApi() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    JokeToVoice(joke);
    toggleButton();
  } catch (error) {}
}

button.addEventListener("click", getJokesFromApi);
audioElement.addEventListener("ended", toggleButton);
