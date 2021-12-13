
async function showAllStrangers(e) {

    const response = await fetch(`/get_all_strangers/${e}`);
    const data = await response.json();

    for (item of data) {

        const container = document.createElement('section');
        const text = document.createElement('div');
        const photo = document.createElement('img');
        const name = document.createElement('h2');
        const h3 = document.createElement('h3');
        const meetingplace = document.createElement('p');
        const convo = document.createElement('p');
        const hr = document.createElement("hr");
        const time = document.createElement("p");
        const delete_button = document.createElement("button");


        photo.src = item.img;
        name.textContent = item.name;
        h3.textContent = "Where did you meet them?"
        meetingplace.textContent = item.meetingplace;
        convo.textContent = item.conversation;
        time.textContent = 'Time of entry: ' +
            new Date(item.time).getDay() + '-' +
            (new Date(item.time).getMonth() + 1) + '-' +
            new Date(item.time).getFullYear();
        delete_button.setAttribute('onclick', `deleteStranger("${item._id}");`);
        delete_button.textContent = 'X';
        delete_button.className = 'x_button';

        text.append(name, delete_button, h3, meetingplace);
        container.append(photo, text);
        document.getElementById("main").append(container);
        console.log(new Date(item.time).getFullYear());
    }
}

async function requestNewUser() {
    const response = await fetch('/newUser');
    const data = await response.json();
    console.log(data.id);
    window.localStorage.setItem("qualtaghID", data.id);
}


async function deleteStranger(id_stranger) {
    const options = await {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_stranger })
    }

    await fetch('/delete_stranger', options);

    location.reload();
}


if (window.localStorage.getItem("qualtaghID")) {
    console.log(window.localStorage.getItem("qualtaghID"));
    showAllStrangers(window.localStorage.getItem("qualtaghID"));
} else {
    requestNewUser();
}


