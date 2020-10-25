let getPlayers = document.getElementById("boton");
let addPlayer = document.getElementById("addPlayer");
let searchPlayer = document.getElementById("searchPlayer");

/////////////////////////////////////////////
//POST
addPlayer.addEventListener("click", () => {
    let idV = document.getElementById("id").value;
    let nameV = document.getElementById("name").value;
    let nicknameV = document.getElementById("nickname").value;
    let emailV = document.getElementById("email").value;

    let player = {
        id: idV,
        name: nameV,
        nickname: nicknameV,
        email: emailV
    }

    sendPlayer(player);
});

const sendPlayer = (player) => {
    fetch("http://localhost:8080/lol/player", {
        method: 'POST',
        body: JSON.stringify(player),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))
};

/////////////////////////////////////////////
//GET {ID}
searchPlayer.addEventListener("click", () => {
    let id = document.getElementById("id").value

    fetch("http://localhost:8080/lol/player/" + id)
        .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))
        .then(res => res.json())
        .then(res => mostrarEnFormulario(res))

});

const mostrarEnFormulario = (json) => {
    let name = document.getElementById("name");
    let nickname = document.getElementById("nickname");
    let email = document.getElementById("email");
    name.value = json.name;
    nickname.value = json.nickname;
    email.value = json.email;
};

/////////////////////////////////////////////
//Get all players
getPlayers.addEventListener("click", () => {
    fetch("http://localhost:8080/lol/player")
        .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))
        .then(res => res.json())
        .then(res => getPlayers(res))
        .catch(clear())
});

const getPlayers = (json) => {
    let div = clear();
    for (let i = 0; i < json.length; i++) {
        div.innerHTML += json[i].nickname + "<br>";
    }
};

const clear = () => {
    let div = document.getElementById("getPlayers");
    div.textContent = "";

    return div;
};

