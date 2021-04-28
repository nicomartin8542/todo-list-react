export const ToDoList = ({ listado, deleteItem }) => (
  <>
    <hr />
    <h1 className="encabezado">Listado de trabajos</h1>
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
          const { trabajo, empresa, ciudad, pais } = task;
          return (
            <tr key={index}>
              <td>{trabajo}</td>
              <td>{empresa}</td>
              <td>{ciudad}</td>
              <td>{pais}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={index => deleteItem(index)}>
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </>
);
