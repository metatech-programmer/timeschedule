const Footer = (props) => {
  return (
    <footer className={"text-center border-t border-border-app py-3 " + (props.className || "")}>
      <div className="flex flex-col items-center gap-1">
        <p className="text-muted-app text-xs">
          &copy; 2025{" "}
          <span className="text-gradient font-semibold">Timeschedule</span>
        </p>
        <p className="text-muted-app/50 text-[0.65rem]">
          Hecho con ❤️ por{" "}
          <a
            className="text-secondary-blue-app hover:text-primary-orange-app transition-colors"
            href="https://santiagotorres-web-developer.netlify.app/"
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

