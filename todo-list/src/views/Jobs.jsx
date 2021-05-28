import React, { useState, useEffect } from 'react';
import { alertaBorrar } from '../utils/alerts';
import {
  getCountries,
  getPlaces,
  getOrganizations,
  getJobs,
  deleteJobs,
  postJobs,
  putJobs,
} from '../utils/apis';
import { JobsForm } from '../components/Jobss/JobsForm';
import { JobsList } from '../components/Jobss/JobsList';
import Spinner from '../components/Spinner';

export const Jobs = () => {
  const [jobs, chargeJobs] = useState([]);
  const [countries, chargeCountries] = useState([]);
  const [places, chargePlaces] = useState([]);
  const [organization, chargeOrganization] = useState([]);
  const [spinner, chargeSpinner] = useState(false);
  const [uJob, chargeUJob] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    chargeSpinner(true);
    await Promise.all([
      getJobs(),
      getCountries(),
      getPlaces(),
      getOrganizations(),
    ]).then(resp => {
      chargeJobs(resp[0]);
      chargeCountries(resp[1]);
      chargePlaces(resp[2]);
      chargeOrganization(resp[3]);
    });
    chargeSpinner(false);
  }, []);

  //Componentes variables
  let component;
  if (spinner) {
    component = <Spinner />;
  } else {
    component = (
      <JobsList
        list={jobs}
        deleteJ={deleteJ}
        countries={countries}
        places={places}
        organization={organization}
        objJob={objJob}
      />
    );
  }

  function objJob(id) {
    const c = jobs.filter(c => c.id === id);
    chargeUJob(c);
  }

  //Update Countries
  async function updateJob(job) {
    chargeSpinner(true);
    await putJobs(job);
    const orgApi = await getJobs();
    chargeJobs(orgApi);
    chargeSpinner(false);
  }

  const addJobs = async jobs => {
    chargeSpinner(true);
    await postJobs(jobs);
    const jobsApi = await getJobs();
    chargeJobs(jobsApi);
    chargeSpinner(false);
  };

  //Elimino Item
  function deleteJ(id) {
    alertaBorrar().then(async resp => {
      if (resp) {
        chargeSpinner(true);
        //Delete
        const result = await deleteJobs(id);
        if (result.status === 200) {
          //Get
          const jobApi = await getJobs();
          chargeJobs(jobApi);
        }
      }
      chargeSpinner(false);
    });
  }

  return (
    <>
      <JobsForm
        addJobs={addJobs}
        organization={organization}
        uJob={uJob}
        updateJob={updateJob}
      />
      {component}
    </>
  );
};
