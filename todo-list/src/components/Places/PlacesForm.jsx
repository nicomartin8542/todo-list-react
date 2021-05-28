import React, { useState, useEffect } from 'react';
import { validarImputForm } from '../../utils/util';

const PlacesForm = ({ addPlaces, countries, uPlace, updatePlaces }) => {
  const [places, chargePlaces] = useState('');
  const [countrieState, chargeCountries] = useState(0);
  const [visible, chargeVisible] = useState(true);
  const [update, chargeUpdate] = useState(false);
  const [placeId, chargePlaceId] = useState(0);
  const [nameBtn, chargeNameBtn] = useState('Add');

  //Charge value input
  const addValue = e => {
    let htmlParent;
    if (e.target.id !== 'countries') {
      htmlParent = e.target.parentElement.querySelector('input');
      chargePlaces(htmlParent.value);
    } else {
      htmlParent = e.target;
      chargeCountries(htmlParent.value);
    }
    btnVisible(e);
  };

  useEffect(() => {
    if (uPlace.length > 0) {
      updateP(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uPlace]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function updateP(update) {
    chargeUpdate(update);
    if (update) {
      chargeNameBtn('Update');
      chargePlaces(uPlace[0].name);
      chargeCountries(uPlace[0].countrieId);
      chargePlaceId(uPlace[0].id);
      chargeVisible(false);
    } else {
      chargeNameBtn('Add');
      chargePlaces('');
      chargeCountries(0);
      chargePlaceId(0);
      chargeVisible(true);
    }
  }

  //Valid inputs form
  function btnVisible(e) {
    if (validarImputForm(e)) {
      chargeVisible(true);
    } else {
      chargeVisible(false);
    }
  }

  //Cargo datos del formulario
  const addItem = e => {
    if (e) {
      e.preventDefault();
    }

    let placesObj;
    if (placeId > 0) {
      placesObj = {
        name: places,
        countrieId: Number(countrieState),
        id: Number(placeId),
      };
      updatePlaces(placesObj);
    } else {
      placesObj = {
        name: places,
        countrieId: Number(countrieState),
      };
      addPlaces(placesObj);
    }

    chargePlaces('');
    updateP(false);
    e.target.reset();
    btnVisible(e);
  };
  return (
    <>
      <form onSubmit={addItem}>
        <div>
          <h2 className="encabezado">
            Charge Place <hr />
          </h2>
        </div>
        <div className="datos mb-3">
          <label htmlFor="Places" className="form-label">
            Places:
          </label>
          <input
            type="text"
            id="places"
            className="form-control"
            placeholder="Places"
            onChange={e => addValue(e)}
            onKeyDown={e => addValue(e)}
            value={places}
            required
          />
        </div>

        <div className="datos mb-3">
          <label htmlFor="pais" className="form-label">
            Countrie:
          </label>
          <select
            className="form-select"
            id="countries"
            onChange={e => addValue(e)}
            onKeyDown={e => addValue(e)}
            required>
            <option value="0">Select</option>
            {countries.map(countrie => {
              const { name, id } = countrie;
              if (!update) {
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              } else if (uPlace[0].countrieId === id) {
                return (
                  <option key={id} value={id} selected>
                    {name}
                  </option>
                );
              } else {
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              }
            })}
          </select>

          <input type="text" value={placeId} readOnly hidden />
        </div>

        <div className="d-grid gap-2 col-12 mx-auto">
          <button disabled={visible} className="btn btn-primary" type="submit">
            {nameBtn}
          </button>

          {update ? (
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => updateP(false)}>
              Cancel
            </button>
          ) : (
            ''
          )}
        </div>
      </form>
    </>
  );
};
export default PlacesForm;
