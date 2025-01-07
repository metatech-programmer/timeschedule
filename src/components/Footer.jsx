const Footer = (props) => {
  return (
    <footer className={"text-center text-quaternary-gray-app/50 bg-background-app w-dvw p-2 " + props.className}>
      <div className="container text-center text-pretty">
        <p>&copy; 2025 Timeschedule. Todos los derechos reservados.</p>

        <p className="text-center text-quaternary-gray-app/50 bg-background-app">
          Desarrollado por{" "}
          <a
            className="text-primary-orange-app active:text-primary-orange-app/50 hover:underline"
            href="https://www.linkedin.com/in/santiago-alexander-aguilar-torres-74a729137"
            target="_blank"
            rel="noopener noreferrer"
          >
            Metatech
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

