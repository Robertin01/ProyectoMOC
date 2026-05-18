import { useState, useEffect } from "react";
import Login from "./components/Login";
import ListaIncidencias from "./components/ListaIncidencias";
import Form from "./components/Form";

const API_URL = "http://localhost:3004";
const LOGIN_API_URL = `${API_URL}/login`;

function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [incidencias, setIncidencias] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  // Cargar incidencias
  useEffect(() => {
    fetch(`${API_URL}/incidencias`)
      .then((res) => res.json())
      .then((data) => setIncidencias(data));
  }, []);

  // Cargar usuarios
  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((res) => res.json())
      .then((data) => setUsuarios(data));
  }, []);

  // LOGIN
  const onLogin = async (email, password) => {
    const response = await fetch(LOGIN_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setUsuarioLogueado(data.user);
      localStorage.setItem("usuarioLogueado", JSON.stringify(data.user));
    } else {
      const errorData = await response.json();
      alert(`Fallo de autenticación. Error: ${response.status}: ${errorData}`);
    }
  };

  // POST INCIDENCIA (UT05)
  const agregarIncidencia = async (nueva) => {
    // 1. Validar usuario
    const usuarioEncontrado = usuarios.find(
      (u) => u.email === nueva.email
    );

    if (!usuarioEncontrado) {
      alert("Usuario no encontrado. Por favor, regístrese primero.");
      return;
    }

    // 2. Crear objeto final
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

    // 3. POST
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

return (
  <div className="container mt-4">

    {!usuarioLogueado ? (
      <div className="row justify-content-center">
        <div className="col-md-4">
          <Login onLogin={onLogin} />
        </div>
      </div>
    ) : (
      <>
        <div className="row">
          {/* LISTADO IZQUIERDA */}
          <div className="col-md-8 mb-4">
            <ListaIncidencias incidencias={incidencias} />
          </div>

          {/* FORMULARIO DERECHA */}
          <div className="col-md-4 mb-4">
            <Form agregarIncidencia={agregarIncidencia} />
          </div>
        </div>

        {/* BOTÓN CERRAR SESIÓN ABAJO A LA DERECHA */}
        <div className="d-flex justify-content-end mb-4">
          <button
            className="btn btn-danger btn-lg px-4"
            onClick={() => {
              setUsuarioLogueado(null);
              localStorage.removeItem("usuarioLogueado");
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </>
    )}

  </div>
);


}

export default App;
