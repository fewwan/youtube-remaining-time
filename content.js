function getFormattedTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        throw new Error("Input must be a non-negative number.");
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
  
    const padWithZero = (num) => (num < 10 ? `0${num}` : num);

    if (hours > 0) {
        return `${hours}:${padWithZero(minutes)}:${padWithZero(remainingSeconds)}`;
    } else {
        return `${minutes}:${padWithZero(remainingSeconds)}`;
    }
}


function initializeRemainingTime() {
    const video = document.querySelector("video");
    const display = document.querySelector(".ytp-time-display.notranslate");

    if (!display || !video) return;

    let remaining = document.getElementById("remainingTime");

    if (!remaining) {
        remaining = document.createElement("span");
        remaining.id = "remainingTime";
        remaining.classList.add("ytp-time-duration");
        display.insertBefore(remaining, display.children[3]);
    }

    function updateRemainingTime() {
        const formattedTime = getFormattedTime(video.duration - video.currentTime);
        remaining.innerText = ` | -${formattedTime}`;
    }

    video.addEventListener("timeupdate", updateRemainingTime);
    updateRemainingTime();
}

initializeRemainingTime();
