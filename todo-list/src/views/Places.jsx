import React, { useState, useEffect } from 'react';
import { alertaError, alertaBorrar } from '../utils/alerts';
import {
  getCountries,
  getPlaces,
  getOrganizations,
  postPlaces,
  deletePlaces,
  putPlaces,
} from '../utils/apis';
import PlacesForm from '../components/Places/PlacesForm';
import PlacesList from '../components/Places/PlacesList';
import Spinner from '../components/Spinner';

export const Places = () => {
  //State
  const [places, chargePlaces] = useState([]);
  const [countries, chargeCountries] = useState([]);
  const [organization, chargeOrganization] = useState([]);
  const [spinner, chargeSpinner] = useState(false);
  const [uPlace, chargeUplace] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    chargeSpinner(true);
    await Promise.all([getPlaces(), getCountries(), getOrganizations()]).then(
      resp => {
        chargePlaces(resp[0]);
        chargeCountries(resp[1]);
        chargeOrganization(resp[2]);
      },
    );
    chargeSpinner(false);
  }, []);

  //Componentes variables
  let component;
  if (spinner) {
    component = <Spinner />;
  } else {
    component = (
      <PlacesList
        list={places}
        deleteP={deleteP}
        countries={countries}
        objPlace={objPlace}
      />
    );
  }

  function objPlace(id) {
    const c = places.filter(c => c.id === id);
    chargeUplace(c);
  }

  //Update Countries
  async function updatePlaces(place) {
    chargeSpinner(true);
    await putPlaces(place);
    const placeApi = await getPlaces();
    chargePlaces(placeApi);
    chargeSpinner(false);
  }

  //Update list places
  const addPlaces = async places => {
    chargeSpinner(true);

    //Post Places
    await postPlaces(places);

    const placesApi = await getPlaces(places);
    //Get Places
    chargePlaces(placesApi);

    chargeSpinner(false);
  };

  //Elimino Paises
  function deleteP(id) {
    let countriesOrg = organization.some(e => e.placeId === id);
    //Valid places
    if (countriesOrg) {
      alertaError(
        'The city you want to delete is related to a country. Check and try again',
      );
      return;
    }

    //Show alert
    chargeSpinner(true);
    alertaBorrar().then(async resp => {
      if (resp) {
        //Delete Countries
        const result = await deletePlaces(id);
        if (result.status === 200) {
          //Get Countries
          const placesApi = await getPlaces();
          chargePlaces(placesApi);
        }
      }
      chargeSpinner(false);
    });
  }
  return (
    <>
      <PlacesForm
        addPlaces={addPlaces}
        updatePlaces={updatePlaces}
        countries={countries}
        uPlace={uPlace}
      />
      {component}
    </>
  );
};
