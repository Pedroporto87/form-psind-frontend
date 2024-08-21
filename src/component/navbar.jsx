import '../styles/component/navbar.scss'
import RMH from  '../assets/rmh.jpeg'
import Psind from '../assets/psind-ce.jpeg'

export const NavBar = () => {
    return (
        <nav className="navbar">
          <div className="navbar-left">
            <img src={RMH} alt="Left Logo" className="navbar-image" />
          </div>
          <div className="navbar-title">
            Cadastro dos Psicólogos do Estado do Ceará
          </div>
          <div className="navbar-right">
            <img src={Psind} alt="Right Logo" className="navbar-image" />
          </div>
        </nav>
      );
}
