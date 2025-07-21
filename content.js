function getFormattedTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        throw new RangeError("Seconds must be a non-negative number.");
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const pad = (n) => n < 10 ? `0${n}` : n;

    return hours > 0
        ? `${hours}:${pad(minutes)}:${pad(remainingSeconds)}`
        : `${minutes}:${pad(remainingSeconds)}`;
}

function initializeRemainingTime() {
    const video = document.querySelector("video");
    const durationSpan = document.querySelector(".ytp-time-duration");

    if (!video || !durationSpan || !durationSpan.parentElement) return false;

    if (durationSpan.parentElement.querySelector(".ytp-time-remaining")) return true;
    const durationColor = window.getComputedStyle(durationSpan).color;

    const separator = document.createElement("span");
    separator.className = "ytp-time-remaining-separator";
    separator.style.color = durationColor;
    separator.innerText = " | ";

    const remainingSpan = document.createElement("span");
    remainingSpan.className = "ytp-time-remaining";
    remainingSpan.style.color = durationColor;

    durationSpan.parentElement.append(separator, remainingSpan);

    function updateRemainingTime() {
        const remainingSeconds = video.duration - video.currentTime;
        const formatted = getFormattedTime(Math.max(remainingSeconds, 0));
        remainingSpan.innerText = `-${formatted}`;
    }

    video.addEventListener("timeupdate", updateRemainingTime);
    updateRemainingTime();

    return true;
}

function observeForVideoUI() {
    const observer = new MutationObserver(() => {
        initializeRemainingTime();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}

initializeRemainingTime();
observeForVideoUI();
