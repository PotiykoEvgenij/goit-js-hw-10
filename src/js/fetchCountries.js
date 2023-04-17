const fetchCountries = (name) => {
    return fetch('https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags.svg,languages')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Oops, there is no country with that name');
        });
};

export default fetchCountries;