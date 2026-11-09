const jokeElement = document.getElementById("joke");
const button = document.getElementById("btn");

async function getjoke() {
    button.disabled = true;
    button.textContent = "Finding a joke...";
    jokeElement.textContent = "";

    try {
        const response = await fetch(
            "https://official-joke-api.appspot.com/random_joke"
        );

        if (!response.ok) {
            throw new Error("Could not fetch a joke.");
        }

        const data = await response.json();

        jokeElement.textContent = data.setup;

        const punchline = document.createElement("span");
        punchline.className = "punchline";
        punchline.textContent = data.punchline;

        jokeElement.appendChild(punchline);
    } catch (error) {
        jokeElement.textContent =
            "Unable to load a joke. Please try again.";
        console.error(error);
    } finally {
        button.disabled = false;
        button.textContent = "Generate Another Joke";
    }
}

button.addEventListener("click", getjoke);