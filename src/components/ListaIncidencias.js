function IncidentList({ incidencias }) {
  return (
    <div className="card shadow p-3">
      <h3 className="mb-3">Listado de incidencias</h3>

      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID Título</th>
            <th>Usuario</th>
            <th>Urgencia</th>
            <th>Ubicación</th>
            <th>Estado</th>
            <th>Fecha Registro</th>
          </tr>
        </thead>

        <tbody>
          {incidencias.map((i) => (
            <tr key={i.id}>
              <td>{i.id} {i.titulo}</td>
              <td>{i.usuario.email}</td>
              <td>{i.urgencia}</td>
              <td>{i.ubicacion}</td>
              <td>{i.estado}</td>
              <td>{i.fecha_registro}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IncidentList;
