export default function MenuBar({ onLogout }) {
  const goTo = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => goTo("inicio")}>
        Panel Médico
      </div>

      <ul className="navbar-links">
        <li onClick={() => goTo("inicio")}>Inicio</li>
        <li onClick={() => goTo("contenido")}>Contenido</li>
        <li onClick={() => goTo("servicios")}>Servicios</li>
        <li onClick={() => goTo("contactos")}>Contactos</li>
        <li onClick={() => goTo("acerca")}>Acerca de</li>
      </ul>

      <button className="navbar-logout" onClick={onLogout}>
        Cerrar sesión
      </button>
    </nav>
  );
}
