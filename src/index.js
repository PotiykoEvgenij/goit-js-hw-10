import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const handleInput = debounce((event) => {
    const inputValue = event.target.value;

    if (inputValue.trim() === '') {
        return;
    };

    fetchCountries(inputValue)
        .then((countries) => {
            if (countries === null || countries === undefined) {
                countryList.innerHTML = '';
                countryInfo.innerHTML = '';
            } else if (countries.length === 1) {
                countryList.innerHTML = '';
                renderCountryInfo(countries[0]);
            } else if (countries.length !== 1) {
                countryInfo.innerHTML = '';
                renderCountryList(countries);
            }
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

        listItem.innerHTML = `<img src="${country.flags.png}" alt="${country.name.common}" class="flag-country"><span>${country.name.common}</span>`;

        listItem.addEventListener('click', () => {
            renderCountryInfo(country);
        });
        countryList.appendChild(listItem)
    });
};

function renderCountryInfo(country) {
    const countryLanguages = country.languages;
    const languages = [];
    Object.keys(countryLanguages).forEach(key => {
        const value = countryLanguages[key];
        languages.push(value)
    });

    countryInfo.innerHTML =
    `<h2><img src="${country.flags.png}" alt="${country.name.common}">${country.name.common}</h2>
    <p><strong>Capital:</strong> ${country.capital[0]}</p>
    <p><strong>Population:</strong> ${country.population}</p>
    <p><strong>Languages:</strong> ${languages.join(', ')}</p>`;
}
