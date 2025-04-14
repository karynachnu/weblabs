let redTime = 5000, yellowTime = 3000, greenTime = 7000;
        let currentState = 0;
        let interval;
        const lights = ["red", "yellow", "green", "yellow"];
        const statusText = ["Червоний", "Жовтий", "Зелений", "Жовтий (миготіння)"];
        
        function setLight(state) {
            document.querySelectorAll(".light").forEach(light => light.style.background = "gray");
            if (state === 3) {
                document.getElementById("status").textContent = statusText[3];
                let blinkCount = 0;
                let blinkInterval = setInterval(() => {
                    document.getElementById("yellow").style.background = blinkCount % 2 ? "gray" : "yellow";
                    blinkCount++;
                    if (blinkCount > 5) {
                        clearInterval(blinkInterval);
                        nextCycle();
                    }
                }, 500);
            } else {
                document.getElementById(lights[state]).style.background = lights[state];
                document.getElementById("status").textContent = statusText[state];
                setTimeout(nextCycle, [redTime, yellowTime, greenTime, yellowTime][state]);
            }
        }
        
        function nextCycle() {
            currentState = (currentState + 1) % lights.length;
            setLight(currentState);
        }
        
        function changeTime() {
            redTime = parseInt(prompt("Час червоного (мс):", redTime)) || redTime;
            yellowTime = parseInt(prompt("Час жовтого (мс):", yellowTime)) || yellowTime;
            greenTime = parseInt(prompt("Час зеленого (мс):", greenTime)) || greenTime;
        }
        
        document.getElementById("nextState").addEventListener("click", nextCycle);
        document.getElementById("changeTime").addEventListener("click", changeTime);
        
        setLight(0);