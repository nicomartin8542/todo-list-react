export const ToDoList = ({ listado, deleteItem, empresas, ciudades, paises }) =>
  listado.length > 0 ? (
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
          {listado.map(task => {
            const { trabajo, empresa, ciudad, id } = task;
            const emp = empresas.find(e => e.id === empresa);
            const ciu = ciudades.find(e => e.id === ciudad);
            const pais = paises.find(e => e.id === ciu.pais);
            return (
              <tr key={id}>
                <td>{trabajo}</td>
                <td>{emp.nombre}</td>
                <td>{ciu.nombre}</td>
                <td>{pais.nombre}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteItem(id)}>
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
    <>
      <div className="sinResultados table-container">
        <p className="encabezado">No hay resultados</p>
      </div>
    </>
  );
