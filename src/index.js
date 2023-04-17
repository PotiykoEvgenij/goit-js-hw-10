import './css/styles.css';
import { debounce } from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = documet.querySelector('.country-info');

const handleInput = debounce((event) => {
    const inputValue = event.target.value;

    if (inputValue.trim() === '') {
        return;
    };

    fetchCountries(inputValue)
        .then((countries) => {
            renderCountryList(countries);
        })
        .catch((error) => {
            console.log(error);
        });
}, DEBOUNCE_DELAY);

input.addEventListener('input', handleInput);

function renderCountryList(countries) {
    countryList.innerHTML = '';

    countries.forEach((country) => {
        const listItem = document.createElement('li');

        listItem.innerText = country.name.official;

        listItem.addEventListener('click', () => {
            renderCountryInfo(country);
        });
        countryList.appendChild(listItem)
    });
};

function renderCountryInfo(country) {
    const languages = country.languages.map((lang) => lang.name).join(', ');

    countryInfo.innerHTML =
    `<h2>${country.name.official}</h2>
    <img src="${country.flags.svg}" alt="Flag of ${country.name.official}">
    <p>Capital: ${country.capital}</p>
    <p>Population: ${country.population}</p>
    <p>Languages: ${languages}</p>`;
}