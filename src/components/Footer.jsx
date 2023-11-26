const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>
        <a href="https://gwib-personal-portfolio-react.netlify.app/">
          portfolio
        </a>
      </p>
      <p>&copy; Gavan Browne {year}</p>
    </footer>
  );
};

export default Footer;
