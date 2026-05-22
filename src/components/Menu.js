import { Link, useLocation } from "react-router-dom";

function Menu({ usuarioLogueado, onCerrarSesion }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold">Gestión de Incidencias</span>

        {/* Botón hamburguesa para móvil */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Opciones del menú */}
        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/") ? "active fw-bold" : ""}`}
                to="/"
              >
                 Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/incidencias") ? "active fw-bold" : ""}`}
                to="/incidencias"
              >
                 Ver incidencias
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/registrar") ? "active fw-bold" : ""}`}
                to="/registrar"
              >
                 Registrar incidencia
              </Link>
            </li>

            {/* Solo visible para administradores */}
            {usuarioLogueado?.rol === "admin" && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/usuarios") ? "active fw-bold" : ""}`}
                  to="/usuarios"
                >
                   Gestión de usuarios
                </Link>
              </li>
            )}
          </ul>

          {/* Info usuario + botón cerrar sesión */}
          <div className="d-flex align-items-center gap-3">
            {usuarioLogueado && (
              <span className="text-light small">
                👤 {usuarioLogueado.email}{" "}
                <span className="badge bg-secondary">{usuarioLogueado.rol}</span>
              </span>
            )}
            <button className="btn btn-outline-danger btn-sm" onClick={onCerrarSesion}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Menu;