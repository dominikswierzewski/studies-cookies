const API_BASE = 'http://0.0.0.0:80';

async function getCookies() {
    try {
        const response = await fetch(`${API_BASE}/cookies`, { 
            credentials: 'include' 
        });
        const data = await response.json();
        return data.cookies || {};
    } catch (error) {
        console.error('Error fetching cookies:', error);
        return {};
    }
}

async function setCookies(firstName, lastName, email) {
    try {
        const params = new URLSearchParams({ firstName, lastName, email });
        const response = await fetch(`${API_BASE}/cookies/set?${params}`, {
            credentials: 'include',
            redirect: 'follow'
        });
        console.log('Cookies set:', response);
    } catch (error) {
        console.error('Error setting cookies:', error);
    }
}

async function deleteCookies() {
    try {
        await fetch(`${API_BASE}/cookies/delete?firstName&lastName&email`, {
            credentials: 'include'
        });

        location.reload();
    } catch (error) {
        console.error('Error deleting cookies:', error);
    }
}

async function changeName() {
    const newName = prompt('Enter new first name:');
    if (newName) {
        try {
            const currentCookies = await getCookies();

            await fetch(`${API_BASE}/cookies/set?firstName=${encodeURIComponent(newName)}&lastName=${encodeURIComponent(currentCookies.lastName || '')}&email=${encodeURIComponent(currentCookies.email || '')}`, {
                credentials: 'include'
            });
            
            location.reload();
        } catch (error) {
            console.error('Error changing name:', error);
        }
    }
}

window.onload = async () => {
    try {
        const userData = await getCookies();
        
        if (userData.firstName) {
            showWelcomeMessage(userData.firstName);
        } else {
            showForm();
        }
        
        document.getElementById('userForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            
            await setCookies(firstName, lastName, email);
            location.reload();
        });
        
    } catch (error) {
        console.error('Initialization error:', error);
        showForm();
    }
};

function showWelcomeMessage(firstName) {
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('welcomeMessage').style.display = 'block';
    document.getElementById('welcomeText').textContent = `Welcome, ${firstName}`;
}

function showForm() {
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('welcomeMessage').style.display = 'none';
}
