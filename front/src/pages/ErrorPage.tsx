import "./ErrorPage.css";

export default function ErrorPage() {
  return (
    <main className="error-page">
      <div className="error-page-content">
        <h2 className="error-page-title">Page non trouvée</h2>
        <div className="error-page-code">404</div>
        <p className="error-page-message">
          Oups ! Il semble que la page que vous cherchez n'existe pas...
        </p>
      </div>
    </main>
  );
}
