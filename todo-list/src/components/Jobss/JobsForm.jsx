import React, { useState, useEffect } from 'react';
import { validarImputForm } from '../../utils/util';

export const JobsForm = ({ addJobs, organization, uJob, updateJob }) => {
  //State
  const [org, chargeOrg] = useState(0);
  const [position, chargePosition] = useState('');
  const [description, chargeDesc] = useState('');
  const [visible, chargeVisible] = useState(true);
  const [update, chargeUpdate] = useState(false);
  const [jobId, chargeJobId] = useState(0);
  const [nameBtn, chargeNameBtn] = useState('Add');

  useEffect(() => {
    if (uJob.length > 0) {
      updateJ(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uJob]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function updateJ(update) {
    chargeUpdate(update);
    if (update) {
      chargeNameBtn('Update');
      chargeOrg(uJob[0].organizationId);
      chargeDesc(uJob[0].description);
      chargePosition(uJob[0].position);
      chargeJobId(uJob[0].id);
      chargeVisible(false);
    } else {
      chargeNameBtn('Add');
      chargeOrg(0);
      chargeDesc('');
      chargePosition('');
      chargeJobId(0);
      chargeVisible(true);
    }
  }

  //Agrego Item al array
  const addItem = e => {
    if (e) {
      e.preventDefault();
    }

    let jobsObj;
    if (jobId > 0) {
      jobsObj = {
        position,
        description,
        organizationId: Number(org),
        id: Number(jobId),
      };
      updateJob(jobsObj);
    } else {
      jobsObj = {
        position,
        description,
        organizationId: Number(org),
      };
      addJobs(jobsObj);
    }

    chargeDesc('');
    chargePosition('');
    chargeOrg(0);
    updateJ(false);
    e.target.reset();
    btnVisible(e);
  };

  const addValue = e => {
    if (e.target.id === 'position') {
      chargePosition(e.target.parentElement.querySelector('#position').value);
    } else if (e.target.id === 'description') {
      chargeDesc(e.target.parentElement.querySelector('#description').value);
    } else {
      chargeOrg(e.target.value);
    }

    btnVisible(e);
  };

  const btnVisible = e => {
    if (validarImputForm(e)) {
      chargeVisible(true);
    } else {
      chargeVisible(false);
    }
  };

  return (
    <>
      <form onSubmit={addItem}>
        <div>
          <h2 className="encabezado">
            Add Jobs
            <hr />
          </h2>
        </div>

        <div className="datos mb-3">
          <label htmlFor="position" className="form-label">
            Position:
          </label>
          <input
            type="text"
            id="position"
            className="form-control"
            placeholder="Position"
            onChange={e => addValue(e)}
            onKeyDown={e => addValue(e)}
            value={position}
            required
          />
        </div>

        <div className="datos mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <input
            type="text"
            id="description"
            className="form-control"
            placeholder="Description"
            onChange={e => addValue(e)}
            onKeyDown={e => addValue(e)}
            value={description}
            required
          />
        </div>

        <div className="datos mb-3">
          <label htmlFor="org" className="form-label">
            Organizations:
          </label>
          <select
            className="form-select"
            id="org"
            onChange={e => addValue(e)}
            onKeyDown={e => addValue(e)}
            required>
            <option value="0">Select</option>
            {organization.map(e => {
              const { name, id } = e;
              if (!update) {
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              } else if (Number(uJob[0].organizationId) === Number(id)) {
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
          <input type="text" value={jobId} readOnly hidden />
        </div>

        <div className="d-grid gap-2 col-12 mx-auto">
          <button disabled={visible} className="btn btn-primary" type="submit">
            {nameBtn}
          </button>

          {update ? (
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => updateJ(false)}>
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
