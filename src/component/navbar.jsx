import '../styles/component/navbar.scss'

export const NavBar = () => {
    return (
        <nav className="navbar">
          <div className="navbar-left">
            <img src="../../public/rmh.jpeg" alt="Left Logo" className="navbar-image" />
          </div>
          <div className="navbar-title">
            Cadastro dos Psicólogos do Estado do Ceará
          </div>
          <div className="navbar-right">
            <img src="../../public/psind-ce.jpeg" alt="Right Logo" className="navbar-image" />
          </div>
        </nav>
      );
}
