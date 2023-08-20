import { Outlet } from 'react-router-dom';
import { AdminMenu } from '../components/AdminMenu/AdminMenu';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { UserProfileModal } from '../Modals/UserProfileModal/UserProfileModal';
import Swal from 'sweetalert2';

import BreannaYde from '../assets/breannaYde.jpg';

import './Admin.css';

export const Admin = () => {
	const navigate = useNavigate();
	const [userOptionsOpen, setUserOptionsOpen] = useState(false);
	const [showModal, setShowModal] = useState(false);
	return (
		<div className='Admin'>
			<AdminMenu />
			<div
				className={`user ${userOptionsOpen ? 'user--open' : 'user--close'}`}
				onClick={() => setUserOptionsOpen(!userOptionsOpen)}
			>
				<span className='accountNameSmall'>Breanna Yde</span>
				<div className='imageSmallContainer'>
					<img
						className='accountImageSmall'
						src={BreannaYde}
						alt='Breanna Yde'
					/>
				</div>
			</div>
			<div
				className={`userOptionsContainer ${
					userOptionsOpen
						? 'userOptionsContainer--open'
						: 'userOptionsContainer--close'
				}`}
			>
				<ul className='userOptionsList'>
					<li
						className='userOption'
						onClick={() => {
							setUserOptionsOpen(false);
							navigate('profile');
						}}
					>
						Perfil
					</li>
					<li
						className='userOption'
						onClick={() => {
							Swal.fire({
								title: '¿Estás seguro?',
								text: '¿Quieres cerrar sesión?',
								icon: 'warning',
								showCancelButton: true,
								confirmButtonText: 'Sí',
								cancelButtonText: 'No',
								confirmButtonColor: '#9f212f',
								cancelButtonColor: '#d6cab0',
							}).then((result) => {
								if (result.isConfirmed) {
									Swal.fire({
										title: '¡Hasta luego!',
										text: 'Has cerrado sesión correctamente',
										icon: 'success',
										timer: 1000,
										showConfirmButton: false,
									}).then(() => {
										navigate('/');
									});
								}
							});
						}}
					>
						Cerrar sesión
					</li>
				</ul>
			</div>
			<div className='appContent' onClick={()=>setUserOptionsOpen(false)}>
				<Outlet />
			</div>
			{showModal &&
				createPortal(
					<UserProfileModal showModal={setShowModal} />,
					document.getElementById('modal') as HTMLElement
				)}
		</div>
	);
};
