export const ToDoList = ({ listado, deleteItem }) => {
  if (listado.length !== 0) {
    return (
      <div className="table-responsive table-container ">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Trabajo</th>
              <th>Empresa</th>
              <th>Cidudad</th>
              <th>Pais</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {listado.map((task, index) => {
              const { trabajo, empresa, ciudad, pais, id } = task;
              return (
                <tr key={id}>
                  <td>{trabajo}</td>
                  <td>{empresa}</td>
                  <td>{ciudad}</td>
                  <td>{pais}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={index => deleteItem(id)}>
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <>
        <div className="sinResultados table-container">
          <p className="encabezado">No hay resultados</p>
        </div>
      </>
    );
  }
};
