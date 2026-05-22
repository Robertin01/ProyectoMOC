import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import ListaIncidencias from "./components/ListaIncidencias";
import Form from "./components/Form";
import Menu from "./components/Menu";
import UserRoleManagement from "./components/Userrolemanagement";

const API_URL = "http://localhost:3004";

function Inicio() {
  return (
    <div className="text-center mt-5">
      <h2> Bienvenido a la gestión de incidencias</h2>
      <p className="text-muted mt-3">
        Usa el menú superior para navegar entre las secciones.
      </p>
    </div>
  );
}

function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [incidencias, setIncidencias] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  const cargarIncidencias = () => {
    fetch(`${API_URL}/incidencias`)
      .then((res) => res.json())
      .then((data) => setIncidencias(data));
  };

  const cargarUsuarios = () => {
    fetch(`${API_URL}/users`)
      .then((res) => res.json())
      .then((data) => setUsuarios(data));
  };

  useEffect(() => {
    cargarIncidencias();
    cargarUsuarios();
  }, []);

  // Recuperar sesión de localStorage al recargar
  useEffect(() => {
    const guardado = localStorage.getItem("usuarioLogueado");
    if (guardado) setUsuarioLogueado(JSON.parse(guardado));
  }, []);

  const onLogin = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setUsuarioLogueado(data.user);
      localStorage.setItem("usuarioLogueado", JSON.stringify(data.user));
      navigate("/");
    } else {
      alert("Credenciales incorrectas.");
    }
  };

  const onCerrarSesion = () => {
    setUsuarioLogueado(null);
    localStorage.removeItem("usuarioLogueado");
    navigate("/");
  };

  const agregarIncidencia = async (nueva) => {
    const usuarioEncontrado = usuarios.find((u) => u.email === nueva.email);
    if (!usuarioEncontrado) {
      alert("Usuario no encontrado. Por favor, regístrese primero.");
      return;
    }

    const nuevaIncidencia = {
      titulo: nueva.titulo,
      descripcion: nueva.descripcion,
      categoria: nueva.categoria,
      urgencia: nueva.urgencia,
      ubicacion: nueva.ubicacion,
      usuario: usuarioEncontrado,
      estado: "Abierta",
      comentarios: [],
      fecha_registro: new Date().toISOString().split("T")[0],
    };

    const response = await fetch(`${API_URL}/incidencias`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaIncidencia),
    });

    if (response.ok) {
      const creada = await response.json();
      setIncidencias([...incidencias, creada]);
    }
  };

  // Si no hay usuario logueado, mostrar login
  if (!usuarioLogueado) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <Login onLogin={onLogin} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Menu usuarioLogueado={usuarioLogueado} onCerrarSesion={onCerrarSesion} />

      <div className="container">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/incidencias"
            element={
              <ListaIncidencias
                incidencias={incidencias}
                usuarioLogueado={usuarioLogueado}
                cargarIncidencias={cargarIncidencias}
              />
            }
          />
          <Route
            path="/registrar"
            element={<Form agregarIncidencia={agregarIncidencia} />}
          />
          {usuarioLogueado?.rol === "admin" && (
            <Route
              path="/usuarios"
              element={
                <UserRoleManagement
                  usuarios={usuarios}
                  cargarUsuarios={cargarUsuarios}
                  API_URL={API_URL}
                />
              }
            />
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;