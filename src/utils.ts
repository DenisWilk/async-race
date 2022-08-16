
import { engine } from './urls';
import { idArray } from './main-functions';
import { colorArray, firstName, secondName } from './data-arrays';

export let startURLs: string[];
export let driveURLs: string[];
export let stopURLs: string[];
export let countRacePosition = 1;

export async function getURLsForRace() {
    const urls1: string[] = [];
    const urls2: string[] = [];
    const urls3: string[] = [];

    for (let i = 0; i < idArray.length; i++) {
        const url1 = `${engine}?id=${Number(idArray[i])}&status=started`;
        const url2 = `${engine}?id=${Number(idArray[i])}&status=drive`;
        const url3 = `${engine}?id=${Number(idArray[i])}&status=stopped`;

        urls1.push(url1);
        urls2.push(url2);
        urls3.push(url3);
    }
    startURLs = urls1;
    driveURLs = urls2;
    stopURLs = urls3;
}

export function getUrlId(url: string) {
    const result = url
        .split("?")[1]
        .split('&')[0]
        .split('=')[1];

    return result;
}

export function counterForRacePosition() {

    return countRacePosition++;
}

export function randomCarData() {
    const name = `${firstName[Math.floor(Math.random() * firstName.length)]}&nbsp/&nbsp
        ${secondName[Math.floor(Math.random() * secondName.length)]}`;
    const color = colorArray[Math.floor(Math.random() * colorArray.length)];
    const carData = { name: name, color: color };

    return carData;
}

