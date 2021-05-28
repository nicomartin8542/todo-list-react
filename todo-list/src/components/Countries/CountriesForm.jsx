import React, { useState, useEffect } from 'react';
import { validarImputForm } from '../../utils/util';

const PaisesAlta = ({ addCountrie, uCountrie, updateCountries }) => {
  //State
  const [countrie, chargeCountrie] = useState('');
  const [nameBtn, chargeNameBtn] = useState('Add');
  const [visible, chargeVisible] = useState(true);
  const [update, chargeUpdate] = useState(false);
  const [countrieId, chargeCountrieId] = useState(0);

  useEffect(() => {
    if (uCountrie.length > 0) {
      updateC(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uCountrie]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function updateC(update) {
    chargeUpdate(update);
    if (update) {
      chargeNameBtn('Update');
      chargeCountrie(uCountrie[0].name);
      chargeCountrieId(uCountrie[0].id);
      chargeVisible(false);
    } else {
      chargeNameBtn('Add');
      chargeCountrie('');
      chargeCountrieId(0);
      chargeVisible(true);
    }
  }

  //Obtengo item del imput
  const addValue = e => {
    const htmlParent = e.target.parentElement.querySelector('input');
    chargeCountrie(htmlParent.value);
    btnVisible(e);
  };

  //Valido datos del formulario.
  const btnVisible = e => {
    if (validarImputForm(e)) {
      chargeVisible(true);
    } else {
      chargeVisible(false);
    }
  };

  //Cargo datos del formulario
  function addItem(e) {
    if (e) {
      e.preventDefault();
    }

    let countrieObj = {};

    if (countrieId === 0) {
      countrieObj = {
        name: countrie,
      };
      addCountrie(countrieObj);
    } else {
      countrieObj = {
        name: countrie,
        id: uCountrie[0].id,
      };
      updateCountries(countrieObj);
      updateC(false);
    }

    chargeCountrie('');
    e.target.reset();
    chargeVisible(true);
  }

  return (
    <>
      <form onSubmit={addItem}>
        <div>
          <h2 className="encabezado">
            Add Countries <hr />
          </h2>
        </div>
        <div className="datos mb-3">
          <label htmlFor="pais" className="form-label">
            Countrie:
          </label>
          <input
            type="text"
            id="countrie"
            className="form-control"
            placeholder="Countrie"
            onChange={e => addValue(e)}
            onKeyDown={e => addValue(e)}
            value={countrie}
            required
          />
          <input type="text" value={countrieId} readOnly hidden />
        </div>

        <div className="d-grid gap-2 col-12 mx-auto">
          <button disabled={visible} className="btn btn-primary" type="submit">
            {nameBtn}
          </button>

          {update ? (
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => updateC(false)}>
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
export default PaisesAlta;
