function getFormattedTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        throw new RangeError("Seconds must be a non-negative number.");
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
    const timeDisplay = document.querySelector(".ytp-time-display.notranslate > span:nth-child(2)");
    if (!video || !timeDisplay) return;

    let timeRemainingSpan = timeDisplay.querySelector("span.ytp-time-remaining");

    if (!timeRemainingSpan) {
        const timeRemainingSeparatorSpan = document.createElement("span");
        timeRemainingSeparatorSpan.classList.add("ytp-time-remaining-separator");
        timeRemainingSeparatorSpan.innerText = " | ";

        timeRemainingSpan = document.createElement("span");
        timeRemainingSpan.classList.add("ytp-time-remaining");

        timeDisplay.append(timeRemainingSeparatorSpan);
        timeDisplay.append(timeRemainingSpan);
    }

    function updateRemainingTime() {
        const remainingSeconds = video.duration - video.currentTime;
        const formattedTime = getFormattedTime(remainingSeconds > 0 ? remainingSeconds : 0);
        timeRemainingSpan.innerText = `-${formattedTime}`;
    }

    video.addEventListener("timeupdate", updateRemainingTime);
    updateRemainingTime();
}

initializeRemainingTime();
