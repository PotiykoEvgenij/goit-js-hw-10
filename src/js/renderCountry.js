const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function renderCountryList(countries) {
    countryList.innerHTML = '';

    countries.forEach((country) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `<img src="${country.flags.png}" alt="${country.name.common}" class="flag-country"><span>${country.name.common}</span>`;

        listItem.addEventListener('click', () => {
            countryList.innerHTML = '';
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
};

function clearHTML() {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
}

export { renderCountryInfo, renderCountryList, clearHTML };