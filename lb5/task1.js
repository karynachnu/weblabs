document.addEventListener("DOMContentLoaded", function () {
    const lamp = document.getElementById("lamp");
    const toggleBtn = document.getElementById("toggleBtn");
    const lampTypeSelect = document.getElementById("lampType");
    const brightnessBtn = document.getElementById("brightnessBtn");
    let timeout;

    const colors = {
        incandescent: "#ffd700",
        energySaving: "#ffffff",
        led: "#a2d5f2"
    };

    function resetTimeout() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            lamp.classList.remove("on");
            lamp.style.opacity = "1";
            lamp.style.backgroundColor = "#333";
        }, 30000);
    }

    toggleBtn.addEventListener("click", function () {
        if (lamp.classList.toggle("on")) {
            const selectedType = lampTypeSelect.value;
            lamp.style.backgroundColor = colors[selectedType];
            lamp.style.opacity = "1";
        } else {
            lamp.style.backgroundColor = "#333";
            lamp.style.opacity = "1"; 
        }
        resetTimeout();
    });

    lampTypeSelect.addEventListener("change", function () {
        const selectedType = lampTypeSelect.value;
        lamp.style.backgroundColor = colors[selectedType];
        lamp.style.opacity = "1"; 
        brightnessBtn.disabled = (selectedType === "incandescent");
    });

    brightnessBtn.addEventListener("click", function () {
        if (lampTypeSelect.value === "incandescent") {
            alert("Яскравість звичайної лампи не можна змінювати!");
            return;
        }
        let brightness = prompt("Введіть рівень яскравості (0-100):", "100");
        brightness = parseInt(brightness);
        if (!isNaN(brightness) && brightness >= 0 && brightness <= 100) {
            lamp.style.opacity = brightness / 100;
        } else {
            alert("Некоректне значення!");
        }
        resetTimeout();
    });

    brightnessBtn.disabled = (lampTypeSelect.value === "incandescent");
    lamp.style.opacity = "1";
});