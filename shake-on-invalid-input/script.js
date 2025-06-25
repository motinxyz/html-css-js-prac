function validateInput(event) {
    event.preventDefault();

    const inputField = document.getElementById("inputField");
    const inputValue = inputField.value.trim();
    const errorMessage = document.getElementById("errorMessage");

    const isSingleDigitNumber = /^\d$/.test(inputValue);

    if (!isSingleDigitNumber) {

        inputField.classList.add("shake");
        errorMessage.classList.add("show");

        setTimeout(function () {
            inputField.classList.remove("shake");
            errorMessage.classList.remove("show");
        }, 800);
    } else {
        alert(`You've guessed: ${inputValue}`)
    }

}