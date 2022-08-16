import './style.css';

import { renderHTML } from './render-html';
import { garage, engine } from './urls';
import {
    startURLs, driveURLs, stopURLs, getURLsForRace, getUrlId,
    counterForRacePosition, randomCarData
} from './utils';


renderHTML();

export let idArray: number[] = [];
let winnersArray: string[] = [];
let data: { items: [{ name: string; color: string; id: number }]; count: string };
const fullCarData: { [id: string]: { name: string; time: string } } = {};
let page = 1;
let id: number;
const limit = 7;
const generateCarsQty = 100;

const garageBtn: HTMLElement = document.getElementById('garage-btn')!;
const winnersBtn: HTMLElement = document.getElementById('winners-btn')!;
const garageCount: HTMLElement = document.getElementById('garage-count-title')!;
const pageCount: HTMLElement = document.getElementById('page-count-title')!;
const createBtn: HTMLElement = document.getElementById('create-btn')!;
const updateBtn: HTMLElement = document.getElementById('update-btn')!;
const inputCreate = <HTMLInputElement>document.getElementById('input-create');
const inputUpdate = <HTMLInputElement>document.getElementById('input-update');
const colorCreate = <HTMLInputElement>document.getElementById('color-create');
const colorUpdate = <HTMLInputElement>document.getElementById('color-update');
const raceBtn: HTMLElement = document.getElementById('race-btn')!;
const resetBtn: HTMLElement = document.getElementById('reset-btn')!;
const generateBtn: HTMLElement = document.getElementById('generate-cars-btn')!;
let raceResultId: HTMLElement;
let winTitle: HTMLElement;
let startBtn: NodeListOf<HTMLButtonElement>;
let stopBtn: NodeListOf<HTMLButtonElement>;
const cars: HTMLElement = document.getElementById('garage')!;
let carActive: HTMLElement;
const prevBtn: HTMLElement = document.getElementById('prev-btn')!;
const nextBtn: HTMLElement = document.getElementById('next-btn')!;
const winnersPage: HTMLElement = document.getElementById('winners-container')!;

function renderCarContainers() {
    for (let i = 0; i < data.items.length; i++) {

        cars.insertAdjacentHTML('beforeend', `
        <div class="car-container"">
            
            <div class="car-btns">
                <button class="btn car-start-btn" id="start${data.items[i].id}" data-id="${data.items[i].id}">START</button>
                <button class="btn car-stop-btn btn-inactive" id="stop${data.items[i].id}" data-id="${data.items[i].id}">STOP</button>
                <button class="btn car-update-btn" data-id="${data.items[i].id}">UPDATE</button>
                <button class="btn car-remove-btn" data-id="${data.items[i].id}">DELETE</button>
                <h6 class="car-titles">${data.items[i].name}</h6>
                <div class="race-result" id="race-result${data.items[i].id}"></div>
            </div>

            <div class="svg-container">
            <svg class="svg" id="svg${data.items[i].id}" version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="70" height="50" viewBox="0 0 403.000000 287.000000"
            preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,287.000000) scale(0.100000,-0.100000)"
            fill="${data.items[i].color}" stroke="none">
            <path d="M1045 2844 c-155 -8 -391 -25 -408 -30 -15 -5 -12 -11 18 -49 l36
            -43 -20 -119 c-29 -168 -49 -371 -57 -570 l-7 -171 -90 -32 c-108 -38 -190
            -78 -272 -133 -64 -43 -175 -152 -175 -171 0 -6 21 -28 47 -48 l48 -37 60 58
            c105 100 232 173 372 213 67 20 101 23 243 23 160 -1 168 -2 260 -33 113 -39
            180 -75 277 -148 152 -116 269 -295 320 -492 31 -120 35 -307 9 -414 l-16 -68
            35 -70 c30 -60 39 -70 58 -66 12 3 156 8 320 12 l297 6 0 67 c0 36 4 72 8 79
            7 9 40 12 132 10 l124 -3 24 -80 c13 -44 25 -81 27 -83 1 -1 15 0 31 4 l29 5
            0 142 c1 129 3 149 28 222 77 219 260 393 477 451 86 23 244 23 329 0 35 -9
            66 -15 69 -12 7 8 -23 148 -59 275 -32 112 -71 201 -100 227 -48 43 -638 129
            -984 143 l-160 6 -3 318 -2 317 -70 0 -70 0 0 -320 0 -320 -24 0 c-13 0 -31
            -3 -39 -6 -12 -4 -16 16 -21 118 -8 136 -28 317 -51 448 -24 134 -66 300 -81
            314 -13 14 -114 31 -269 47 -97 10 -586 19 -700 13z m285 -574 c0 -242 -1
            -440 -2 -440 -2 1 -41 14 -88 30 -79 26 -82 29 -45 29 22 1 51 4 64 8 21 5 22
            10 17 47 -10 65 -33 76 -153 76 l-102 0 -9 33 c-44 152 -96 316 -108 335 -11
            17 -24 22 -55 22 -34 0 -40 -3 -35 -17 40 -142 86 -374 86 -439 l0 -41 -72 -7
            c-40 -4 -91 -9 -112 -13 l-39 -6 7 144 c8 164 29 393 51 552 8 59 15 112 15
            117 0 6 110 10 290 10 l290 0 0 -440z m612 434 c36 -6 37 -7 52 -78 37 -170
            76 -445 91 -646 l6 -85 -93 93 c-54 53 -102 92 -113 92 -11 0 -45 -26 -77 -57
            l-58 -58 -46 53 -47 53 -33 -32 -33 -32 46 -53 c35 -42 43 -57 34 -67 -8 -11
            37 -83 199 -321 172 -252 210 -314 210 -342 l0 -34 -78 0 -78 0 -33 80 c-76
            183 -243 376 -424 490 l-86 55 -1 448 0 447 263 0 c144 0 279 -3 299 -6z m826
            -907 c9 -12 55 -278 49 -284 -2 -2 -25 0 -50 3 l-46 7 -11 51 c-27 128 -47
            236 -44 238 7 8 94 -5 102 -15z m254 -26 c8 -7 52 -271 46 -277 -2 -2 -26 2
            -53 9 l-50 12 -22 120 c-31 166 -32 156 25 149 26 -4 50 -9 54 -13z m308 -49
            l135 -28 22 -40 c27 -46 69 -172 78 -231 l6 -41 -33 8 c-57 13 -323 83 -326
            85 -5 4 -49 270 -45 277 2 4 9 5 16 2 7 -2 73 -17 147 -32z"/>
            <path d="M1581 2072 c-123 -117 -148 -152 -110 -152 17 0 280 253 276 264 -9
            28 -42 6 -166 -112z"/>
            <path d="M2280 2655 c0 -88 1 -95 20 -95 19 0 20 7 20 95 0 88 -1 95 -20 95
            -19 0 -20 -7 -20 -95z"/>
            <path fill="#000000" d="M723 1683 c-30 -4 -32 -7 -36 -51 -3 -38 -5 -43 -11 -24 -10 25 -9
            25 -60 11 -29 -8 -45 -8 -61 1 -19 10 -31 7 -76 -15 -52 -27 -169 -104 -169
            -112 0 -2 9 -22 20 -43 21 -41 17 -54 -6 -22 -12 16 -15 15 -47 -16 -21 -21
            -42 -32 -53 -30 -13 3 -29 -10 -52 -42 -35 -47 -82 -133 -82 -148 0 -5 18 -22
            40 -37 42 -29 56 -54 19 -35 -11 7 -22 10 -23 8 -1 -2 -8 -23 -16 -47 -12 -37
            -21 -46 -46 -53 -35 -9 -37 -15 -50 -140 l-6 -67 38 -6 c22 -3 48 -10 59 -15
            18 -8 17 -9 -7 -9 -27 -1 -27 -2 -21 -52 5 -46 4 -53 -18 -69 l-23 -18 18 -59
            c18 -55 52 -133 60 -133 2 0 23 7 46 15 50 18 50 18 50 7 0 -5 -9 -13 -20 -18
            -20 -9 -20 -10 6 -48 24 -35 26 -43 16 -70 -12 -29 -10 -33 50 -93 34 -35 66
            -63 70 -63 4 0 23 14 41 30 41 36 55 39 34 7 -14 -22 -13 -24 24 -45 31 -18
            39 -28 39 -52 0 -22 7 -33 28 -44 27 -14 149 -56 162 -56 4 0 15 20 24 45 21
            54 36 66 33 28 -2 -26 1 -28 41 -31 36 -3 47 -8 60 -33 20 -34 47 -37 163 -18
            l69 12 0 56 c1 47 2 53 12 36 6 -11 12 -21 13 -23 1 -1 19 5 41 14 36 15 41
            15 70 -1 32 -17 33 -17 91 18 32 20 80 55 106 79 l48 43 -30 45 c-32 47 -33
            64 -2 36 18 -17 20 -16 46 18 22 29 34 36 61 36 29 0 37 6 60 45 14 25 34 67
            44 94 l19 48 -35 19 c-39 21 -46 38 -10 24 20 -7 25 -5 30 13 3 12 6 32 6 44
            0 13 11 30 25 39 24 16 25 19 25 138 0 66 -4 126 -8 133 -4 6 -28 13 -52 16
            -37 3 -41 5 -22 11 25 10 26 15 10 67 -9 33 -9 42 6 58 16 17 15 22 -23 96
            -22 42 -52 92 -66 111 l-26 34 -39 -20 c-50 -25 -58 -25 -35 0 18 20 18 21
            -12 53 -24 24 -30 38 -26 58 4 21 -3 31 -54 66 -59 41 -109 69 -175 96 l-38
            16 -26 -37 c-25 -35 -26 -36 -21 -9 2 16 0 27 -7 27 -30 0 -86 23 -86 34 0 8
            -10 16 -22 20 -24 6 -171 6 -225 -1z m210 -348 c182 -38 345 -196 386 -375 15
            -66 13 -187 -4 -255 -57 -216 -263 -375 -485 -375 -272 1 -500 232 -500 508 0
            236 170 447 400 496 84 19 120 19 203 1z"/>
            <path d="M716 1223 c-289 -88 -378 -465 -159 -674 148 -143 362 -154 523 -26
            250 199 170 609 -136 702 -62 19 -164 18 -228 -2z m239 -108 c233 -105 237
            -439 7 -552 -78 -38 -183 -40 -256 -4 -63 31 -122 90 -149 150 -33 71 -31 199
            5 267 30 58 94 119 146 141 87 36 164 36 247 -2z"/>
            <path fill="#000000" d="M3343 1243 c-18 -3 -23 -11 -23 -36 -1 -26 -2 -29 -10 -15 -9 14 -16
            15 -40 6 -21 -7 -34 -7 -43 0 -14 12 -88 -21 -144 -64 -32 -24 -33 -26 -18
            -55 9 -16 11 -29 6 -29 -5 0 -11 6 -14 13 -3 8 -14 4 -33 -14 -16 -15 -34 -25
            -40 -22 -13 4 -41 -31 -73 -94 l-21 -42 32 -22 c29 -21 30 -23 11 -30 -11 -4
            -23 -19 -27 -32 -3 -15 -15 -27 -30 -31 -25 -6 -36 -37 -36 -106 0 -39 11 -50
            51 -50 10 0 19 -4 19 -10 0 -5 -6 -10 -14 -10 -11 0 -13 -8 -9 -33 3 -23 0
            -37 -11 -46 -21 -17 -20 -28 5 -95 19 -49 25 -56 43 -50 12 3 30 8 41 10 18 5
            19 4 3 -9 -16 -12 -16 -15 1 -41 11 -16 16 -37 13 -52 -3 -20 4 -35 34 -65 43
            -44 54 -47 79 -19 22 25 40 26 26 3 -7 -14 -3 -21 20 -35 16 -10 29 -26 29
            -38 0 -10 9 -24 21 -30 20 -11 112 -41 114 -37 0 1 8 18 17 37 14 29 17 31 17
            13 1 -19 7 -23 35 -23 26 0 36 -5 41 -20 7 -22 51 -26 128 -14 36 6 37 8 37
            48 1 33 3 37 11 24 9 -16 13 -17 38 -4 25 13 31 13 50 0 20 -14 25 -13 59 8
            20 12 54 38 75 57 l37 33 -22 37 c-18 29 -19 33 -4 22 15 -13 20 -12 39 12 12
            14 33 27 47 29 26 3 62 56 75 110 5 21 3 27 -14 33 -12 3 -21 11 -21 17 0 5 7
            8 15 5 10 -4 16 4 21 28 3 18 12 36 19 39 18 6 28 99 18 156 -7 39 -12 46 -38
            51 -17 4 -25 7 -18 8 7 1 10 23 9 69 -3 59 -8 76 -40 126 -38 59 -41 60 -91
            40 -18 -7 -19 -6 -6 9 12 15 11 21 -9 42 -13 13 -20 31 -17 39 7 18 -54 63
            -135 101 l-53 24 -22 -27 c-19 -23 -21 -24 -17 -6 5 18 0 23 -29 28 -19 4 -38
            13 -41 21 -4 12 -22 15 -78 14 -40 -1 -83 -4 -95 -6z m214 -265 c107 -39 202
            -161 221 -281 38 -244 -178 -463 -412 -417 -83 16 -143 49 -198 108 -86 92
            -119 197 -98 315 15 77 40 127 97 188 101 108 246 141 390 87z"/>
            <path d="M3342 915 c-79 -24 -133 -72 -178 -155 -28 -52 -26 -190 3 -246 34
            -65 70 -101 127 -129 72 -35 138 -42 211 -20 80 23 166 107 189 185 34 114 11
            206 -74 290 -82 82 -175 107 -278 75z m149 -66 c121 -37 184 -185 128 -304
            -63 -134 -236 -167 -343 -67 -90 84 -87 249 5 326 65 55 130 69 210 45z"/>
            </g>
            </svg>
            </div>
        </div>
        `);
    }
}

export async function getCars() {
    const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);

    data = {
        items: await response.json(),
        count: response.headers.get('X-Total-Count')!,
    };
    idArray = data.items.map((el: { name: string, color: string, id: number; }) => el.id)

    garageCount.innerHTML = `IN GARAGE: ${data.count}`
    pageCount.innerHTML = `PAGE: ${page}&nbsp of &nbsp${Math.ceil(Number(data.count) / limit)}`

    cars.innerHTML = '';

    renderCarContainers();

    winTitle = document.querySelector('.win-title')!;

    startBtn = (document.querySelectorAll('.car-start-btn'));
    startBtn.forEach((el: HTMLButtonElement) => el.addEventListener('click', startEngine));

    stopBtn = document.querySelectorAll('.car-stop-btn');
    stopBtn.forEach((el: HTMLButtonElement) => el.addEventListener('click', stopEngine));

    const updateBtn: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.car-update-btn');
    updateBtn.forEach((el: HTMLButtonElement) => el.addEventListener('click', goUpdateCarControls));

    const deleteBtn: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.car-remove-btn');
    deleteBtn.forEach((el: HTMLButtonElement) => el.addEventListener('click', deleteCar));

    await getURLsForRace();
    getFullCarData();
}
getCars();

function goToWinnersPage() {
    winnersPage.classList.add('active');
    winnersBtn.classList.add('btn-inactive');
    garageBtn.classList.remove('btn-inactive');
}
winnersBtn.addEventListener('click', goToWinnersPage);

function goToGaragePage() {
    winnersPage.classList.remove('active');
    winnersBtn.classList.remove('btn-inactive');
    garageBtn.classList.add('btn-inactive');
}
garageBtn.addEventListener('click', goToGaragePage);

function goNextPage() {
    if (page === Math.ceil(Number(data.count) / limit) || Number(data.count) < 1) { return; }
    page += 1;

    getCars();
}
nextBtn.addEventListener('click', goNextPage);

function goPrevPage() {
    if (page === 1) { return; }
    page -= 1;

    getCars();
}
prevBtn.addEventListener('click', goPrevPage);

function getFullCarData() {
    for (let i = 0; i < data.items.length; i++) {
        fullCarData[`id${String(data.items[i].id)}`] = { name: `${data.items[i].name}`, time: '0' };
    }
}

async function createCar() {
    const data = { name: inputCreate?.value, color: colorCreate?.value };
    if (inputCreate?.value === '') { data.name = 'no name'; }

    await fetch(garage, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    });

    await getCars();
    inputCreate.value = '';
}
createBtn.addEventListener('click', createCar);

function goUpdateCarControls(event: MouseEvent) {
    if (!(event.target instanceof HTMLButtonElement)) { return; }
    id = Number(event.target.dataset.id);

    inputUpdate.focus();
    updateBtn.classList.remove('btn-inactive');
    inputUpdate.classList.remove('input-inactive');
    colorUpdate.classList.remove('input-inactive');
    updateBtn.addEventListener('click', updateCar);
}

async function updateCar() {
    const data = { name: inputUpdate.value, color: colorUpdate.value };

    await fetch(`${garage}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    await getCars();
    updateBtn.removeEventListener('click', updateCar);
    inputUpdate.value = '';
    updateBtn.classList.add('btn-inactive');
    inputUpdate.classList.add('input-inactive');
    colorUpdate.classList.add('input-inactive');
}

async function deleteCar(event: MouseEvent) {
    if (!(event.target instanceof HTMLButtonElement)) { return; }
    id = Number(event.target?.dataset.id);

    await fetch(`${garage}/${id}`, { method: 'DELETE' });

    // valueForCalculate: value for calculating the remaining number of pages after items deletion.
    // Needed to automatically go to the previous page when the last item on the current page is deleted.
    const valueForCalculate = Math.ceil((Number(data.count) - 1) / limit);

    if (valueForCalculate < page) {
        if (page > 1) { page -= 1; }
        else { page = 1; }
    }

    await getCars();
}

async function generateCars() {
    for (let i = 0; i < generateCarsQty; i++) {
        await fetch(garage, {
            method: 'POST',
            body: JSON.stringify(randomCarData()),
            headers: { 'Content-Type': 'application/json' }
        });

        await getCars();
    }

}
generateBtn.addEventListener('click', generateCars);

async function startEngine(event: MouseEvent) {
    if (!(event.target instanceof HTMLButtonElement)) { return; }
    id = Number(event.target.dataset.id);

    const stopBtnId: HTMLElement = document.getElementById(`stop${String(id)}`)!;
    carActive = document.getElementById(`svg${String(id)}`)!;

    event.target.classList.add('btn-inactive');
    stopBtnId.classList.remove('btn-inactive');

    const response = await fetch(`${engine}?id=${id}&status=started`, { method: 'PATCH' });
    const data = await response.json();
    const time = ((data.distance / data.velocity) / 1000).toFixed(2);

    carActive.style.animationDuration = `${time}s`;
    carActive.classList.add('svg-move');

    await drive();
}

async function drive() {
    const response = await fetch(`${engine}?id=${id}&status=drive`, { method: 'PATCH' }).catch();
    if (response.status !== 200) {
        carActive.style.animationPlayState = 'paused';
        return { success: false };
    }
    else {
        return { ...(await response.json()) };
    }
}

async function stopEngine(event: MouseEvent) {
    if (!(event.target instanceof HTMLButtonElement)) { return; }
    id = Number(event.target.dataset.id);

    const startBtnId: HTMLElement = document.getElementById(`start${String(id)}`)!;
    carActive = document.getElementById(`svg${String(id)}`)!;

    event.target.classList.add('btn-inactive');

    await fetch(`${engine}?id=${id}&status=stopped`, { method: 'PATCH' });

    startBtnId.classList.remove('btn-inactive');
    carActive.classList.remove('svg-move');
}

async function startRace() {
    const requests = startURLs.map((url: string) => fetch(url, { method: 'PATCH' }));

    raceBtn.classList.add('btn-inactive');
    startBtn.forEach((el: HTMLButtonElement) => el.classList.add('btn-inactive'));
    resetBtn.classList.remove('btn-inactive');

    Promise.all(requests)
        .then(responses => responses.forEach(
            response => response.json()
                .then((data: { distance: number; velocity: number }) => {
                    const time = ((data.distance / data.velocity) / 1000).toFixed(2);
                    const idStart = getUrlId(response.url);
                    carActive = document.getElementById(`svg${String(idStart)}`)!;
                    carActive.style.animationDuration = `${time}s`;
                    carActive.classList.add('svg-move');
                    fullCarData[`id${String(idStart)}`].time = time;

                    setTimeout(() => {
                        raceResultId = document.getElementById(`race-result${idStart}`)!;
                        if (raceResultId.innerHTML === '') {
                            raceResultId.innerHTML = `
                            / Race time: ${time}s / Pos.${counterForRacePosition()}`;
                        }
                    }, Number(time) * 1000);
                },
                    (err) => err.message
                )
        ));

    await driveAll();
}
raceBtn.addEventListener('click', startRace);

async function driveAll() {

    return Promise.all(
        driveURLs.map((url: string) =>
            fetch(url, { method: "PATCH" })
                .then(
                    (resp) => {
                        const idDrive = getUrlId(url);
                        if (resp.status !== 200) {
                            carActive = document.getElementById(`svg${String(idDrive)}`)!;
                            carActive.style.animationPlayState = "paused";
                            raceResultId = document.getElementById(`race-result${idDrive}`)!;
                            raceResultId.innerHTML = '/ DFN';
                            console.log(resp)
                        } else {
                            winnersArray.push(String(idDrive));
                            displayRaceWinner();
                        }
                    },
                    (err) => err.message
                )
        )
    );
}

async function stopRace() {
    const requests = stopURLs.map((url: string) => fetch(url, { method: 'PATCH' }));

    raceBtn.classList.remove('btn-inactive');
    startBtn.forEach((el: HTMLButtonElement) => el.classList.remove('btn-inactive'));
    winTitle.classList.remove('win-title-background');
    resetBtn.classList.add('btn-inactive');
    winnersArray = [];

    Promise.all(requests)
        .then(responses => responses.forEach(
            response => response.json()
                .then(() => {
                    const idStop = getUrlId(response.url);
                    carActive = document.getElementById(`svg${String(idStop)}`)!;
                    raceResultId = document.getElementById(`race-result${idStop}`)!;
                    carActive.classList.remove('svg-move');
                    raceResultId.innerHTML = '';
                    winTitle.innerHTML = '';
                })));
}
resetBtn.addEventListener('click', stopRace);

async function displayRaceWinner() {

    setTimeout(() => {
        const winCarTitle: HTMLElement = document.getElementById(`race-result${winnersArray[0]}`)!;
        winTitle.innerHTML =
            `WINNER - ${fullCarData[`id${winnersArray[0]}`].name} (id${winnersArray[0]}) 
            / Race time: ${fullCarData[`id${winnersArray[0]}`].time}s`;
        winTitle.classList.add('win-title-background');
        winCarTitle.classList.add('race-result-background');
    }, 1000);
}

