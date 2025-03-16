window.onload = function() {
    const userData = getCookies();
    if (userData.firstName) {
        showWelcomeMessage(userData.firstName);
    } else {
        showForm();
    }

    document.getElementById('userForm').addEventListener('submit', function(e) {
        e.preventDefault();
        setCookies(
            document.getElementById('firstName').value,
            document.getElementById('lastName').value,
            document.getElementById('email').value
        );
        location.reload();
    });
};

function setCookies(firstName, lastName, email) {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `firstName=${encodeURIComponent(firstName)}; expires=${expires}; path=/`;
    document.cookie = `lastName=${encodeURIComponent(lastName)}; expires=${expires}; path=/`;
    document.cookie = `email=${encodeURIComponent(email)}; expires=${expires}; path=/`;
}

function getCookies() {
    return document.cookie.split('; ').reduce((acc, cookie) => {
        const [key, value] = cookie.split('=');
        acc[key] = decodeURIComponent(value);
        return acc;
    }, {});
}

function deleteCookies() {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `firstName=; expires=${expires}; path=/;`;
    document.cookie = `lastName=; expires=${expires}; path=/;`;
    document.cookie = `email=; expires=${expires}; path=/;`;
    location.reload();
}

function changeName() {
    const newName = prompt('Podaj nowe imię:');
    if (newName) {
        const userData = getCookies();
        setCookies(newName, userData.lastName, userData.email);
        location.reload();
    }
}

function showWelcomeMessage(firstName) {
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('welcomeMessage').style.display = 'block';
    document.getElementById('welcomeText').textContent = `Witaj, ${firstName}`;
}

function showForm() {
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('welcomeMessage').style.display = 'none';
}