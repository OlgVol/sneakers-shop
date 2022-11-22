import { Link } from 'react-router-dom';

function Header (props) {
    return (
<header className="d-flex justify-between align-center p-40">
<Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" />
          <div className="headerInfo">
            <h3 className="text-uppercase">React Sneakers</h3>
            <p>The best shop</p>
          </div>
        </div>
        </Link>
        <ul className="d-flex">
          <li onClick={props.onClickCart} className="mr-30 cu-p" >
            <img width={18} height={18} src="/img/cart.svg" />
            <span>125 EU</span>
          </li>
          <li>
          <Link to="/favorites">
            <img width={18} className="mr-20 cu-p" height={18} src="/img/heartWhite.svg"  alt="Favorites"/>
            </Link>
          </li>
          <li>
            <img width={18} height={18} src="/img/user.svg" />
          </li>
        </ul>

      </header>
    )
}
export default Header;