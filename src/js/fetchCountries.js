// import Notiflix from "notiflix";

const fetchCountries = (name) => {
  return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    // .then((data) => {
    //   if (data.length > 10) {
    //     Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    //   } else if (data.length >= 2 && data.length <= 10) {
    //     return data;
    //   } else if (data.length === 1) {
    //     return data;
    //   } else {
    //     Notiflix.Notify.failure('Oops, there is no country with that name');
    //   }
    // })
    // .catch((error) => {
    //   console.error('Error fetching countries:', error);
    //   Notiflix.Notify.failure('Oops, there is an error. Please try again later.');
    // });
};

export { fetchCountries };
