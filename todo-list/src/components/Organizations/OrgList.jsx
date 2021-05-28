import React from 'react';

const OrgList = ({ list, deletOrg, places, countries, objOrg }) => {
  return list.length > 0 ? (
    <div className="table-responsive table-container ">
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Organization</th>
            <th>Place</th>
            <th>Countrie</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {list.map(e => {
            const { name, placeId, id } = e;
            let placeName = places.find(c => c.id === Number(placeId)) || [];
            const { countrieId } = placeName;
            let countrieName = countries.find(p => p.id === countrieId) || [];
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{placeName.name}</td>
                <td>{countrieName.name}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => objOrg(id)}>
                    <i className="fa fa-edit"></i>
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deletOrg(id)}>
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="sinResultados table-container">
      <p className="encabezado">No results</p>
    </div>
  );
};

export default OrgList;
