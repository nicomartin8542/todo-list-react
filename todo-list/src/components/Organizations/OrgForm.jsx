import React, { useState, useEffect } from 'react';
import { validarImputForm } from '../../utils/util';

const OrgForm = ({ addOrg, placesA, uOrg, updateOrg }) => {
  const [org, chargeOrg] = useState('');
  const [place, chargePlace] = useState(0);
  const [visible, chargeVisible] = useState(true);
  const [update, chargeUpdate] = useState(false);
  const [orgId, chargeOrgId] = useState(0);
  const [nameBtn, chargeNameBtn] = useState('Add');

  useEffect(() => {
    if (uOrg.length > 0) {
      updateO(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uOrg]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function updateO(update) {
    chargeUpdate(update);
    if (update) {
      chargeNameBtn('Update');
      chargeOrg(uOrg[0].name);
      chargePlace(uOrg[0].placeId);
      chargeOrgId(uOrg[0].id);
      chargeVisible(false);
    } else {
      chargeNameBtn('Add');
      chargeOrg('');
      chargePlace(0);
      chargeOrgId(0);
      chargeVisible(true);
    }
  }

  //Obtengo item del imput
  const addValue = e => {
    if (e.target.id !== 'place') {
      chargeOrg(e.target.parentElement.querySelector('input').value);
    } else {
      chargePlace(e.target.value);
    }

    //Valido contenido
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
  const addItem = e => {
    if (e) {
      e.preventDefault();
    }

    let empresaObj;
    if (orgId > 0) {
      empresaObj = {
        name: org,
        placeId: Number(place),
        id: Number(orgId),
      };

      updateOrg(empresaObj);
    } else {
      empresaObj = {
        name: org,
        placeId: Number(place),
      };
      addOrg(empresaObj);
    }

    chargeOrg('');
    chargePlace(0);
    updateO(false);
    e.target.reset();
    btnVisible(e);
  };

  return (
    <>
      <form onSubmit={addItem}>
        <div>
          <h2 className="encabezado">
            Add Organizations
            <hr />
          </h2>
        </div>

        <div className="datos mb-3">
          <label htmlFor="organization" className="form-label">
            Organization:
          </label>
          <input
            type="text"
            id="organization"
            className="form-control"
            placeholder="Organization"
            onChange={e => addValue(e)}
            onKeyDown={e => addValue(e)}
            value={org}
            required
          />
        </div>

        <div className="datos mb-3">
          <label htmlFor="place" className="form-label">
            Ciudad:
          </label>
          <select
            className="form-select"
            id="place"
            onChange={e => addValue(e)}
            onKeyDown={e => addValue(e)}
            required>
            <option value="0">Select</option>
            {placesA.map(p => {
              const { name, id } = p;
              if (!update) {
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              } else if (Number(uOrg[0].placeId) === Number(id)) {
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
          <input type="text" value={orgId} readOnly hidden />
        </div>

        <div className="d-grid gap-2 col-12 mx-auto">
          <button disabled={visible} className="btn btn-primary" type="submit">
            {nameBtn}
          </button>

          {update ? (
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => updateO(false)}>
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

export default OrgForm;
