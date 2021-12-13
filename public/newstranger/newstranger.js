const questions = [
    document.getElementById('q_appearance'),
    document.getElementById('q_conloc'),
    document.getElementById('q_name'),
    document.getElementById('q_saving')
];

let active_question = questions[0];

const new_stranger = {};

const c = document.getElementById('myCanvas');
// const e_

//Naar de volgende vragen gaan
$('#button_next').click(() => {
    if (questions.indexOf(active_question) <= 2) {
        active_question.style.display = 'none';
        active_question = questions[questions.indexOf(active_question) + 1];
        active_question.style.display = 'block';
    } else {

        new_stranger.img = c.toDataURL();
        new_stranger.name = document.getElementById('field_name').value;
        new_stranger.meetingplace = document.getElementById('field_meetingplace').value;
        new_stranger.conversation = document.getElementById('field_converation').value;
        new_stranger.time = Date.now();
        new_stranger.userID = window.localStorage.getItem("qualtaghID");

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(new_stranger)
        };
        fetch('/save_stranger', options);

        window.location.href = "../index.html";
    }


    if (questions.indexOf(active_question) === 1) {//convo
        c.style.left = "85px";
        c.style.width = "200px";
        c.style.top = "140px"
    }

    if (questions.indexOf(active_question) === 2) {//name
        c.style.left = "85px";
        c.style.top = "330px"
    }

    if (questions.indexOf(active_question) === 3) {//save question
        document.getElementById('saved_name').textContent = document.getElementById('field_name').value;
    }



    console.log(questions.indexOf(active_question));
});

$('#button_back').click(() => {
    if (questions.indexOf(active_question) >= 1) {
        active_question.style.display = 'none';
        active_question = questions[questions.indexOf(active_question) - 1];
        active_question.style.display = 'block';
    } else {
        console.log("rerout to homepage");
        window.location.href = "../index.html";
    }


    if (questions.indexOf(active_question) === 0) {
        document.getElementById("myCanvas").style.left = "40px";
        document.getElementById("myCanvas").style.width = "300px";
        document.getElementById("myCanvas").style.top = "140px"
    }

    if (questions.indexOf(active_question) === 1) {
        document.getElementById("myCanvas").style.left = "85px";
        document.getElementById("myCanvas").style.width = "200px";
        document.getElementById("myCanvas").style.top = "140px"
    }
});

//Als je op een nav element klikt dan veranderen de tabs
function navClick(e) {
    const tabs = document.getElementById("tabs").children;
    const navs = document.getElementById("navs").children;
    for (let i = 1; i < navs.length + 1; i++) {
        navs.item(i - 1).style.backgroundColor = "white";
    }
    e.style.backgroundColor = "#FF90DB"
    for (let i = 1; i < tabs.length + 1; i++) {
        tabs.item(i - 1).firstElementChild.src = `img/tabs/tab_${e.id}${i}.png`;
        tabs.item(i - 1).dataset.type = e.id + i;
    }
}

//Canvas
const ctx = c.getContext('2d');
c.style.border = "none";

clearCanvas();
function clearCanvas() {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.rect(0, 0, c.width, c.height);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
}


function selectElement(e) {

    const regx = e.dataset.type.match(/[a-z]+|[0-9]/gm);
    const bodypart = regx[0];
    const typepart = regx[1];


    console.log("bodypart: " + bodypart + " | typepart: " + typepart);
    switch (bodypart) {
        case 'eye':
            new_stranger.eyetype = typepart;
            break;
        case 'nose':
            new_stranger.nosetype = typepart;
            break;
        case "head":
            new_stranger.headtype = typepart;
            break;
        case 'hair':
            new_stranger.hairtype = typepart;
            break;
        case 'shirt':
            new_stranger.shirttype = typepart;
            break;
        case 'mouth':
            new_stranger.mouthtype = typepart;
            break;
        default:
            console.log("nothing selected");
    }
    drawStranger();


}

function drawStranger() {
    clearCanvas();
    // (typeof new_stranger.hairtype !== "underfined") ? true : drawBackHair(new_stranger.hairtype);
    // (typeof new_stranger.shirttype !== "undefined") ? true : drawShirt(new_stranger.shirttype);
    // (typeof new_stranger.headtype !== "undefined") ? true : drawFace(new_stranger.headtype);
    // (typeof new_stranger.hairtype !== "undefined") ? true : drawFrontHair(new_stranger.hairtype);
    // (typeof new_stranger.nosetype !== "undefined") ? true : drawNose(new_stranger.nosetype);
    // (typeof new_stranger.eyetype !== "undefined") ? true : drawEyes(new_stranger.eyetype);
    // (typeof new_stranger.mouthtype !== "undefined") ? true : drawMouth(new_stranger.mouthtype);

    if (typeof new_stranger.hairtype !== "undefined") {
        drawBackHair(new_stranger.hairtype);
        console.log("back hair drawn.");
    }
    if (typeof new_stranger.shirttype !== "undefined") {
        drawShirt(new_stranger.shirttype);
        console.log("shirt drawn.");
    }
    if (typeof new_stranger.headtype !== "undefined") {
        drawFace(new_stranger.headtype);
        console.log("face drawn.");
    }
    if (typeof new_stranger.hairtype !== "undefined") {
        drawFrontHair(new_stranger.hairtype);
        console.log("front hair drawn.");
    }
    if (typeof new_stranger.eyetype !== "undefined") {
        drawEyes(new_stranger.eyetype);
        console.log("eye drawn.");
    }
    if (typeof new_stranger.nosetype !== "undefined") {
        drawNose(new_stranger.nosetype);
        console.log("nose drawn.");
    }
    if (typeof new_stranger.mouthtype !== "undefined") {
        drawMouth(new_stranger.mouthtype);
        console.log("mouth drawn.");
    }

    console.log(new_stranger);
}

function drawFace(headtype, headscale = .7) {
    const head_img = new Image(0, 0);
    head_img.src = `img/draw/head${headtype}.png`;

    head_img.onload = function () {
        const head_width = head_img.naturalWidth * headscale;
        const head_height = head_img.naturalHeight * headscale;

        const head_x = c.width / 2 - head_width / 2;
        const head_y = c.height / 2 - head_height / 2 - 30;

        ctx.drawImage(head_img, head_x, head_y, head_width, head_height);
    }
}

function drawEyes(eyetype) {
    const image_left = new Image(0, 0);
    const image_right = new Image(0, 0);

    image_left.src = `img/draw/eyes${eyetype}_links.png`;
    image_right.src = `img/draw/eyes${eyetype}_rechts.png`;

    const eye_level = 100;
    const eye_distance = 10;
    const eye_scale = .8;

    image_left.onload = function () {

        const eye_size_width = image_left.naturalWidth * eye_scale;
        const left_eye_x = c.width / 2 - eye_size_width - eye_distance / 2;
        const eye_size_height = image_left.naturalHeight * eye_scale;
        image_right.onload = function () {
            const right_eye_x = c.width / 2 + eye_distance / 2;
            ctx.drawImage(image_right, right_eye_x, eye_level, eye_size_width, eye_size_height);
        };
        ctx.drawImage(image_left, left_eye_x, eye_level, eye_size_width, eye_size_height);
    };

}

function drawShirt(shirttype) {

    const shirt_img = new Image(0, 0);

    shirt_img.src = `img/draw/shirt${shirttype}.png`;
    shirt_img.onload = function () {
        const shirt_scale = .7;

        const shirt_width = shirt_img.naturalWidth * shirt_scale;
        const shirt_height = shirt_img.naturalHeight * shirt_scale;

        const shirt_x = c.width / 2 - shirt_width / 2;
        const shirt_y = c.height / 2 - shirt_height / 2 + 80;

        ctx.drawImage(shirt_img, shirt_x, shirt_y, shirt_width, shirt_height);
    }
}

function drawBackHair(hairtype, hairscale = .7) {

    const hair_back_img = new Image(0, 0);

    hair_back_img.src = `img/draw/hair${hairtype}_back.png`;
    hair_back_img.onload = function () {

        const hair_back_width = hair_back_img.naturalWidth * hairscale;
        const hair_back_height = hair_back_img.naturalHeight * hairscale;

        const hair_back_x = c.width / 2 - hair_back_width / 2;
        const hair_back_y = c.height / 2 - hair_back_height / 2 - 35;


        ctx.drawImage(hair_back_img, hair_back_x, hair_back_y, hair_back_width, hair_back_height);
    }
}

function drawFrontHair(hairtype, hairscale = .7) {

    const hair_front_img = new Image(0, 0);

    hair_front_img.src = `img/draw/hair${hairtype}_front.png`;
    hair_front_img.onload = function () {

        const hair_front_width = hair_front_img.naturalWidth * hairscale;
        const hair_front_height = hair_front_img.naturalHeight * hairscale;

        const hair_front_x = c.width / 2 - hair_front_width / 2;
        const hair_front_y = c.height / 2 - hair_front_height / 2 - 84;

        ctx.drawImage(hair_front_img, hair_front_x, hair_front_y, hair_front_width, hair_front_height);
    }
}

function drawNose(nosetype) {
    const nose_img = new Image(0, 0);
    nose_img.src = `img/draw/nose${nosetype}.png`;

    nose_img.onload = function () {
        const nose_scale = .7;

        const nose_width = nose_img.naturalWidth * nose_scale;
        const nose_height = nose_img.naturalHeight * nose_scale;

        const nose_x = c.width / 2 - nose_width / 2;
        const nose_y = c.height / 2 - nose_height / 2 - 10;

        ctx.drawImage(nose_img, nose_x, nose_y, nose_width, nose_height);
    }
}

function drawMouth(mouthtype) {

    const mouth_img = new Image(0, 0);
    mouth_img.src = `img/draw/mouth${mouthtype}.png`
    mouth_img.onload = function () {
        const mouth_scale = .7;

        const mouth_width = mouth_img.naturalWidth * mouth_scale;
        const mouth_height = mouth_img.naturalHeight * mouth_scale;


        const mouth_x = c.width / 2 - mouth_width / 2;
        const mouth_y = c.height / 2 - mouth_height / 2 + 15;


        ctx.drawImage(mouth_img, mouth_x, mouth_y, mouth_width, mouth_height);
    }
}
