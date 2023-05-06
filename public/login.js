const API_URL = "http://localhost:3000";

const loginsec = document.querySelector(".login-section");
const loginlink = document.querySelector(".login-link");
const registerlink = document.querySelector(".register-link");
const agree = document.querySelector("#agreement");
const signup = document.querySelector("#signup");

agree.addEventListener("change", () => {
    if (agree.checked) {
        signup.disabled = false;
    } else {
        signup.disabled = true;
    }
});

registerlink.addEventListener("click", () => {
    loginsec.classList.add("active");
});
loginlink.addEventListener("click", () => {
    loginsec.classList.remove("active");
});

$("#signup").on("click", () => {
    const username = $('#username').val();
    const email = $('#emailS').val();
    const password = $('#passwordS').val();
    const body = {
        username,
        email,
        password,
    };

    console.log("Making post request with body: ", body);
$.post(`${API_URL}/add-user`, body)
    .then((response) => {
        console.log("Response: ", response);
        signup.disabled = true;

        // location.href = "/";
    })
    .catch((error) => {
        console.error(`Error: ${error}`);
    });

});

$("#login").on("click", () => {
    const email = $('#email').val();
    const password = $('#password').val();

    const body = {
        email,
        password,
    };

    console.log("Making post request with body: ", body);
    $.post(`${API_URL}/login`, body)
        .then((response) => {
            console.log("Response: ", response);
            if (response.success) {
                // Redirect to welcome page
                location.href = "/welcome.html";
            } else {
                // Show error message
                $('#error-message').text(response.message);
            }
        })
        .catch((error) => {
            console.error(`Error: ${error}`);
        });
});

