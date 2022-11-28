import "./header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link className="logo" to="/">
        UltraValorant
      </Link>
      <Link className="lista-favoritos-button" to="/favoritos">
        Agentes favoritos
      </Link>
    </header>
  );
}

export default Header;
