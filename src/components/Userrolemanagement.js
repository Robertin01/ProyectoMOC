import { useState } from "react";
import UsersForm from "./Usersform";

function UserRoleManagement({ usuarios, cargarUsuarios, API_URL }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const cambiarRol = async (emailUsuario, rolActual) => {
    const usuario = usuarios.find((u) => u.email === emailUsuario);
    if (!usuario) return;

    const nuevoRol = rolActual === "admin" ? "user" : "admin";

    await fetch(`${API_URL}/users/${usuario.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rol: nuevoRol }),
    });

    cargarUsuarios();
  };

  const agregarUsuario = async (nuevoUsuario) => {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoUsuario),
    });

    if (response.ok) {
      cargarUsuarios();
      setMostrarFormulario(false);
    } else {
      alert("Error al registrar el usuario.");
    }
  };

  return (
    <div className="card shadow p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">👥 Gestión de usuarios y roles</h3>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          {mostrarFormulario ? "Cancelar" : "➕ Nuevo usuario"}
        </button>
      </div>

      {mostrarFormulario && (
        <div className="mb-4">
          <UsersForm agregarUsuario={agregarUsuario} />
        </div>
      )}

      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>{u.nombre || "-"}</td>
              <td>
                <span
                  className={`badge ${u.rol === "admin" ? "bg-danger" : "bg-primary"}`}
                >
                  {u.rol}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => cambiarRol(u.email, u.rol)}
                >
                  Cambiar rol
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserRoleManagement;