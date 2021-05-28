import React, { useState, useEffect } from 'react';
import { alertaError, alertaBorrar } from '../utils/alerts';
import {
  getCountries,
  postCountries,
  deleteCountries,
  getPlaces,
  putCountries,
} from '../utils/apis';
import CountriesForm from '../components/Countries/CountriesForm';
import CountriesList from '../components/Countries/CountriesList';
import Spinner from '../components/Spinner';

export const Countries = () => {
  //State
  const [countries, chargeCountries] = useState([]);
  const [places, chargePlaces] = useState([]);
  const [spinner, chargeSpinner] = useState(false);
  const [uCountrie, chargeUcountrie] = useState([]);

  //components variables
  let component;
  if (spinner) {
    component = <Spinner />;
  } else {
    component = (
      <CountriesList
        listado={countries}
        deleteCountrie={deleteCountrie}
        updCountrie={updCountrie}
      />
    );
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    chargeSpinner(true);
    //Get Countries
    await Promise.all([getCountries(), getPlaces()]).then(resp => {
      chargeCountries(resp[0]);
      chargePlaces(resp[1]);
    });
    chargeSpinner(false);
  }, []);

  function updCountrie(id) {
    const c = countries.filter(c => c.id === id);
    chargeUcountrie(c);
  }

  //Add countries
  const addCountrie = async countries => {
    chargeSpinner(true);
    await postCountries(countries);
    const countriesApi = await getCountries();
    chargeCountries(countriesApi);
    chargeSpinner(false);
  };

  //Update Countries
  async function updateCountries(countrie) {
    chargeSpinner(true);
    await putCountries(countrie);
    const countriesApi = await getCountries();
    chargeCountries(countriesApi);
    chargeSpinner(false);
  }

  //Delete Countries
  async function deleteCountrie(id) {
    //Show Error
    const countriePlaces = places.some(c => c.countrieId === id);
    if (countriePlaces) {
      alertaError(
        'The country you want to delete is associated with a city. Check and try again',
      );
      return;
    }

    chargeSpinner(true);
    alertaBorrar().then(async resp => {
      if (resp) {
        //Delete Countries
        const result = await deleteCountries(id);
        if (result.status === 200) {
          //Get Countries
          const countriesApi = await getCountries();
          chargeCountries(countriesApi);
        }
      }
      chargeSpinner(false);
    });
  }

  return (
    <>
      <CountriesForm
        addCountrie={addCountrie}
        uCountrie={uCountrie}
        updateCountries={updateCountries}
      />
      {component}
    </>
  );
};
