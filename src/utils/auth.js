export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then(res => {
            if (res.ok) {
                return res.json;
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => console.log(err));
};

export const login = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
};

export const signOut = (token) => {
    return fetch(`${BASE_URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json;
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(res => res.json())
        .then(data => data)
}

// export const authorize = (password, email) => {
//     return fetch(`${BASE_URL}/auth/local`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ password, email })
//     })
//         .then((response => response.json()))
//         .then((data) => {
//             if (data.jwt) {
//                 localStorage.setItem('jwt', data.jwt);
//                 return data;
//             }
//         })
//         .catch(err => console.log(err))
// };