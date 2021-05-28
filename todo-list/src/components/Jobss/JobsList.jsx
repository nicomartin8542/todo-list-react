export const JobsList = ({
  list,
  deleteJ,
  organization,
  places,
  countries,
  objJob,
}) =>
  list.length > 0 ? (
    <div className="table-responsive table-container ">
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Position</th>
            <th>Description</th>
            <th>Organizations</th>
            <th>Places</th>
            <th>Countries</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {list.map(job => {
            const { position, description, organizationId, id } = job;
            const org = organization.filter(
              e => Number(e.id) === Number(organizationId),
            );
            const place = places.filter(
              e => Number(e.id) === Number(org[0].placeId),
            );
            const countrie = countries.filter(
              e => Number(e.id) === Number(place[0].countrieId),
            );
            return (
              <tr key={id}>
                <td>{position}</td>
                <td>{description}</td>
                <td>{org[0].name}</td>
                <td>{place[0].name}</td>
                <td>{countrie[0].name}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => objJob(id)}>
                    <i className="fa fa-edit"></i>
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteJ(id)}>
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
        <p className="encabezado">No Result</p>
      </div>
    </>
  );
