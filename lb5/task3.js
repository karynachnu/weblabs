function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById("clock").innerHTML = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock();

function setTimer() {
    const userTime = prompt("Введіть дату і час завершення (YYYY-MM-DD HH:MM:SS):");
    const endTime = new Date(userTime);
    if (isNaN(endTime)) {
        alert("Некоректний формат дати!");
        return;
    }
    
    function updateTimer() {
        const now = new Date();
        const diff = endTime - now;
        if (diff <= 0) {
            document.getElementById("countdown").innerHTML = "Час вийшов!";
            clearInterval(timerInterval);
            return;
        }
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        document.getElementById("countdown").innerHTML = `${hours}г ${minutes}хв ${seconds}с`;
    }
    
    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
}

function updateBirthday() {
    const input = document.getElementById("calendar").value;
    if (!input) return;
    
    const birthday = new Date(input + "-01T00:00:00");
    const now = new Date();
    const nextBirthday = new Date(now.getFullYear(), birthday.getMonth(), birthday.getDate());
    if (nextBirthday < now) {
        nextBirthday.setFullYear(now.getFullYear() + 1);
    }
    
    const diff = nextBirthday - now;
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById("birthdayCountdown").innerHTML = `До дня народження залишилось: ${months} міс. ${days} дн. ${hours} год. ${minutes} хв. ${seconds} сек.`;
}