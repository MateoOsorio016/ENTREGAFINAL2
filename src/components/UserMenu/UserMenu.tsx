import BurdeosLogo from '../../assets/BurdeoTextLogo.png';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { BiCart } from 'react-icons/bi';
import { useGlobalState } from '../../Context/GlobalState';
import './UserMenu.css';
import { createPortal } from 'react-dom';
import { Login, Register } from '../../Modals/AccountsOptionsModal/AcountsOptionsModal';
import { useState } from 'react';
import { MiniCart } from '../MiniCart/MiniCart';

export const UserMenu = () => {
	const { cart } = useGlobalState();
	const productsQuantity = cart.length;
	const location = useLocation();
	const { search, pathname } = location;
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const [showMiniCart, setShowMiniCart] = useState(false);
	const handleClick = () => {
		setShowModal(true);
		navigate({
			pathname: pathname,
			search: `login`,
		});
	};

	return (
		<>
			<header className='userMenu'>
				<div className='userMenu__logo'>
					<img src={BurdeosLogo} alt='Burdeos Logo' />
				</div>
				<div className='userMenu__menu'>
					<ul>
						<li className='userMenu__nav__item'>
							<NavLink
								className={({ isActive }) =>
									`userMenuItem ${isActive ? 'userMenuActive' : ''}`
								}
								to={'/'}
							>
								Home
							</NavLink>
						</li>
						<li className='userMenu__nav__item'>
							<NavLink
								className={({ isActive }) =>
									`userMenuItem ${isActive ? 'userMenuActive' : ''}`
								}
								to={'about'}
							>
								About Us
							</NavLink>
						</li>
						<li className='userMenu__nav__item'>
							<NavLink
								className={({ isActive }) =>
									`userMenuItem ${isActive ? 'userMenuActive' : ''}`
								}
								to={'/some'}
								style={{
									pointerEvents: 'none',
									cursor: 'default',
									opacity: 0.5,
								}}
							>
								Shop
							</NavLink>
						</li>
						<li className='userMenu__nav__item'>
							<NavLink
								className={({ isActive }) =>
									`userMenuItem ${isActive ? 'userMenuActive' : ''}`
								}
								to={'/some'}
								style={{
									pointerEvents: 'none',
									cursor: 'default',
									opacity: 0.5,
								}}
							>
								Coffee
							</NavLink>
						</li>
					</ul>
				</div>
				<div className='userMenu__huincha'>
					50% de descuento en todos los productos
				</div>
				<div className='userMenu_opciones'>
					<button className='userMenu_opciones__item'>
						<MdSearch />
					</button>
					<button
						className='userMenu_opciones__item'
						onClick={() => handleClick()}
					>
						<FaRegUser />
					</button>
					<button
						className='userMenu_opciones__item'
						onClick={() => setShowMiniCart(true)}
						id='cartButton'
					>
						{productsQuantity > 0 ? (
							<span className='cartCounter'>{productsQuantity}</span>
						) : (
							productsQuantity > 9 && <span className='cartCounter'>9+</span>
						)}
						<BiCart />
					</button>
				</div>
			</header>
			{showMiniCart &&
				createPortal(
					<MiniCart setShowMiniCart={setShowMiniCart} />,
					document.querySelector('#modal') as HTMLElement
				)}
			{showModal &&
				createPortal(
					search.includes('login') ? (
						<Login showModal={setShowModal} />
					) : search.includes('register') ? (
						<Register showModal={setShowModal} />
					) : null,
					document.querySelector('#modal') as HTMLElement
				)}
		</>
	);
};
