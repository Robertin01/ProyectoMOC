function ListaIncidencias({ incidencias, usuarioLogueado, cargarIncidencias }) {

  const cerrarIncidencia = async (id) => {
    await fetch(`http://localhost:3004/incidencias/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: "Cerrada" }),
    });
    cargarIncidencias();
  };

  return (
    <div className="card shadow p-3">
      <h3 className="mb-3">Listado de incidencias</h3>

      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Usuario</th>
            <th>Urgencia</th>
            <th>Ubicación</th>
            <th>Estado</th>
            <th>Fecha Registro</th>
            {usuarioLogueado?.rol === "admin" && <th>Acciones</th>}
          </tr>
        </thead>

        <tbody>
          {incidencias.map((i) => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.titulo}</td>
              <td>{i.usuario?.email}</td>
              <td>{i.urgencia}</td>
              <td>{i.ubicacion}</td>
              <td>
                <span
                  className={`badge ${
                    i.estado === "Cerrada"
                      ? "bg-secondary"
                      : i.estado === "En Curso"
                      ? "bg-warning text-dark"
                      : "bg-success"
                  }`}
                >
                  {i.estado}
                </span>
              </td>
              <td>{i.fecha_registro}</td>
              {usuarioLogueado?.rol === "admin" && (
                <td>
                  {i.estado !== "Cerrada" ? (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => cerrarIncidencia(i.id)}
                    >
                      Cerrar
                    </button>
                  ) : null}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaIncidencias;