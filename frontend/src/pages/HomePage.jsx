import MenuBar from '../components/MenuBar.jsx';

export default function HomePage({ user, onLogout }) {
  const medical = user?.medicalData || {};

  return (
    <>
      <MenuBar onLogout={onLogout} />

      <div className="page-container">
        <section id="inicio" className="section">
          <h1>Resumen Médico Personal</h1>
          <p><strong>Paciente:</strong> {user.name}</p>
          <p><strong>Correo:</strong> {user.email}</p>

          <div className="medical-card">
            <p><strong>Grupo sanguíneo:</strong> {medical.bloodType || "N/D"}</p>
            <p><strong>Enfermedades crónicas:</strong> {medical.chronicDiseases?.join(", ")}</p>
            <p><strong>Alergias:</strong> {medical.allergies?.join(", ")}</p>
            <p><strong>Última consulta:</strong> {medical.lastConsultation}</p>
            <p><strong>Médico tratante:</strong> {medical.doctorName}</p>
          </div>
        </section>

        <section id="contenido" className="section">
          <h2>Contenido</h2>
          <p>Aquí va tu historial médico y resultados (simulado).</p>
        </section>

        <section id="servicios" className="section">
          <h2>Servicios</h2>
          <ul>
            <li>Consultas médicas</li>
            <li>Historial clínico</li>
            <li>Controles periódicos</li>
          </ul>
        </section>

        <section id="contactos" className="section">
          <h2>Contactos</h2>
          <p><strong>Médico:</strong> {medical.doctorName}</p>
          <p><strong>Emergencias:</strong> 800-10-EMER</p>
        </section>

        <section id="acerca" className="section">
          <h2>Acerca de este sistema</h2>
          <p>React + Vite + Node + JWT</p>
        </section>
      </div>
    </>
  );
}
