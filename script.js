import { pickRandomKey } from "./key-game.js";
import { ctx, chartData } from "./statistic-per-month.js";

const salesChart = new Chart(ctx, chartData);
console.log(salesChart);

const start = document.getElementById("start-game");
const restart = document.getElementById("restart");
const output = document.getElementById("output");
const allowedKeys = ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP"];
let isGameStarted = false;
let score = 0;
let rightKey = null;

start.addEventListener("click", () => {
    isGameStarted = true;
    rightKey = pickRandomKey(allowedKeys);
    console.log(rightKey);
});

document.addEventListener("keydown", (event) => {
    if (isGameStarted === true) {
        if (event.code === rightKey) {
            score += 1;
            PNotify.alert({
                text: `Right key pressed, SCORE: ${score}`,
                type: "success",
                delay: 2000
            });
            output.textContent = `Pressed - ${event.code}`;
            rightKey = pickRandomKey(allowedKeys);
        }
        else if (event.code === "Escape") {
            isGameStarted = false;
            score = 0;
            rightKey = null;
            PNotify.alert({
                text: "Game restarted",
                type: "info"
            });
            output.textContent = "";
        }
        else {
            PNotify.alert({
                text: `Wrong key pressed, SCORE: ${score}`,
                type: "error",
                delay: 2000
            });
            output.textContent = `Pressed - ${event.code}`;
        }
    };
});

restart.addEventListener("click", () => {
    isGameStarted = false;
    score = 0;
    rightKey = null;
    PNotify.alert({
        text: "Game restarted",
        type: "info"
    });
    output.textContent = "";
});