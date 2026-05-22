import { useState } from "react";

function UsersForm({ agregarUsuario }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("user");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("El email y la contraseña son obligatorios.");
      return;
    }
    agregarUsuario({ email, password, nombre, rol });
    // Limpiar formulario
    setEmail("");
    setPassword("");
    setNombre("");
    setRol("user");
  };

  return (
    <div className="card border-primary p-3">
      <h5 className="mb-3">Registrar nuevo usuario</h5>

      <form onSubmit={handleSubmit}>
        <div className="row g-2">
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input
              className="form-control"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email *</label>
            <input
              type="email"
              className="form-control"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Contraseña *</label>
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Rol</label>
            <select
              className="form-select"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-success w-100">
              Registrar usuario
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UsersForm;