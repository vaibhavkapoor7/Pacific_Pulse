const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const error_message = document.getElementById('error-message');

// calls the function when button is pressed or enter key is pressed
form.addEventListener('submit', (e) => {
    // e.preventDefault()-> prevents form from submitting when there are errors


    let errors = []

    if(firstname_input) {
        // if we have a firstname input then we are in the signup
        errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, repeat_password_input.value);
    }
    else {
        // if we don't have a firstname input then we are in the login
        errors = getSignupFormErrors(email_input.value, password_input.value);
    }

    if(errors.length > 0){
        // to check if there are any errors
        e.preventDefault()
        // displays errors by combining multiple strings into one string and adds a '.' and a ' ' for punctuation
        error_message.innerText = errors.join(". ")
    }
})

function getSignupFormErrors(firstname, email, password, repeatPassword) {
    let errors = []

    if(firstname === '' || firstname == null){
        errors.push('Firstname is required');
        firstname_input.parentElement.classList.add('incorrect');
    }
    if(email === '' || email == null){
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    }
    if(password === '' || password == null){
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    }
    if(password !== repeatPassword) {
        errors.push('Password does not match repeated password');
        repeat_password_input.parentElement.classList.add('incorrect');
    }

    return errors;
}
const allInputs = [firstname_input, email_input, password_input, repeat_password_input]

allInputs.forEach(input => {
    // checks to see if the element has the .incorrect class styling and if it does - removes it
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('incorrect')){
            input.parentElement.classList.remove('incorrect')
            // removes error messages once input field is being filled
            error_message.innerText = ''
        }
    })
});