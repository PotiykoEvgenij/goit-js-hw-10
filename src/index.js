import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
import { renderCountryInfo, renderCountryList, clearHTML } from './js/renderCountry';

const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

Notiflix.Notify.init({
  position: 'center-top',
  distance: '10px',
  borderRadius: '5px',
  width: '300px',
  opacity: 0.9,
  timeout: 3000,
});

const handleInput = debounce((event) => {
    const inputValue = event.target.value;

    if (inputValue.trim() === '') {
        return;
    };

    fetchCountries(inputValue)
        .then((countries) => {
            if (countries.length === 1) {
                countryList.innerHTML = '';
                renderCountryInfo(countries[0]);
            } else if (countries.length > 1 && countries.length <= 10) {
                countryInfo.innerHTML = '';
                renderCountryList(countries);
            } else if (countries.length > 10) {
                clearHTML();
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            }
        })
        
        .catch((error) => {
            clearHTML();
            Notiflix.Notify.failure('Oops, there is no country with that name');
        });
}, DEBOUNCE_DELAY);

input.addEventListener('input', handleInput);


