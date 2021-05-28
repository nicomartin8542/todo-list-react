import React from 'react';

const PaisList = ({ listado, deleteCountrie, updCountrie }) => {
  return listado.length > 0 ? (
    <div className="table-responsive table-container ">
      <table className="table table-dark table-striped ">
        <thead>
          <tr>
            <th>Countrie</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {listado.map(p => {
            const { name, id } = p;
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => updCountrie(id)}>
                    <i className="fa fa-edit"></i>
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteCountrie(id)}>
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
      <p className="encabezado">No Results</p>
    </div>
  );
};

export default PaisList;
