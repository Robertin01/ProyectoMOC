import { useState } from "react";

function Form({ agregarIncidencia }) {
  const [titulo, setTitulo] = useState("");
  const [email, setEmail] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [urgencia, setUrgencia] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarIncidencia({
      titulo,
      email,
      descripcion,
      categoria,
      urgencia,
      ubicacion,
    });
  };

  return (
    <div className="card shadow p-4">
      <h3 className="mb-3">Registrar incidencia</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Categoría</label>
          <input
            className="form-control"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nivel de urgencia</label>
          <select
            className="form-select"
            value={urgencia}
            onChange={(e) => setUrgencia(e.target.value)}
          >
            <option value="">Seleccionar...</option>
            <option>Alta</option>
            <option>Media</option>
            <option>Baja</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Ubicación</label>
          <input
            className="form-control"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
          />
        </div>

        <button className="btn btn-success w-100">Registrar</button>
      </form>
    </div>
  );
}

export default Form;
