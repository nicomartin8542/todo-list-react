import React from 'react';

const PlacesList = ({ list, deleteP, countries, objPlace }) => {
  return list.length > 0 ? (
    <div className="table-responsive table-container ">
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Places</th>
            <th>Countries</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {list.map(c => {
            const { name, countrieId, id } = c;
            let countrieName = countries.find(p => p.id === countrieId) || [];
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{countrieName.name}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => objPlace(id)}>
                    <i className="fa fa-edit"></i>
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteP(id)}>
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
      <p className="encabezado">No found</p>
    </div>
  );
};

export default PlacesList;
