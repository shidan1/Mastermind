let number = '', bull = 0, place = 0, wrong = 0;;
const buttons = document.querySelectorAll('.num-button');
const screen = document.getElementById('screen');
const feedback = document.getElementById('feedback');

// Generate a random 4-digit secret number
let secretNumber = '3726';//Math.floor(1000 + Math.random() * 9000).toString();

buttons.forEach(button => {
    button.addEventListener('click', function() {
        if (number.length < 4) {
            number += button.textContent;
            screen.textContent = number.padStart(4, '_');

            // Play the audio file.
            let audio = new Audio('audio_file.mp3');
            audio.play();
        }

        // Once the user has entered 4 digits, check the number.
        if (number.length === 4) {
            if (number === secretNumber) {
               // feedback.textContent = "Congratulations! You've guessed the number.";
            } else {
                let result = "";
                for (let i = 0; i < 4; i++) {
                    if (number[i] === secretNumber[i]) {
                        bull++;
                        //result += "Correct digit in correct place.<br>";
                    } else if (secretNumber.includes(number[i])) {
                        place++;
                        //result += "Correct digit in wrong place.<br>";
                    } else {
                        wrong++;
                        //result += "Incorrect digit.<br>";
                    }
                }
                feedback.innerHTML = result;
            }

            if ((bull == 0) && (place == 0)) {
                let audio = new Audio(wrong + 'wrong.mp3');
                audio.play();
                wrong = 0;
            }

            if (bull > 0) {
                let audio = new Audio(bull + 'bull.mp3');
                audio.play();
                bull = 0;
                audio.onended = function() {
                    if (place > 0) {
                        let audio = new Audio(place + 'place.mp3');
                        audio.play();
                        place = 0;
                        audio.onended = function() {
                            if (wrong > 0) {
                                let audio = new Audio(wrong + 'wrong.mp3');
                                audio.play();
                                wrong = 0;
                            }
                        }
                    }
                }
            }

            // Reset the entered number and the screen after checking.
            number = '';
            screen.textContent = '____';

        }
  
    });
});
