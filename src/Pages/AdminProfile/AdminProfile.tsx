import { LuEdit } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

import BreannaYdePhoto from '../../assets/breannaYde.jpg';
import './AdminProfile.css';

export const AdminProfile = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className='AdminProfile--container'>
				<div className='AdminProfile--container__image'>
					<img src={BreannaYdePhoto} alt='Breanna Yde' />
				</div>
				<div className='AdminProfile--container__name'>
					<h4 className='AdminProfile--container__nameAccount'>Breanna Yde</h4>
					<span className='AdminProfile--container__nameRol'>Admin</span>
				</div>
				<div className='AdminProfile--container__info'>
					<div className='AdminProflie--container__infoColumn'>
						<div className='AdminProfile--container__info--item'>
							<span className='AdminProfile--container__info--item__title'>
								Correo electrónico
							</span>
							<span className='AdminProfile--container__info--item__value'>
								breanna.yde@burdeos.com
							</span>
						</div>
						<div className='AdminProfile--container__info--item'>
							<span className='AdminProfile--container__info--item__title'>
								Teléfono
							</span>
							<span className='AdminProfile--container__info--item__value'>
								1234567890
							</span>
						</div>
					</div>
					<div className='AdminProflie--container__infoColumn'>
						<div className='AdminProfile--container__info--item'>
							<span className='AdminProfile--container__info--item__title'>
								Fecha de nacimiento
							</span>
							<span className='AdminProfile--container__info--item__value'>
								11 de Junio de 2003
							</span>
						</div>
						<div className='AdminProfile--container__info--item'>
							<span className='AdminProfile--container__info--item__title'>
								Estado
							</span>
							<span className='AdminProfile--container__info--item__value'>
								Activo
							</span>
						</div>
					</div>
				</div>
				<div className='AdminProfile--edit' onClick={()=>navigate('/admin/usuarios/edit')}>
					<LuEdit />
				</div>
			</div>
		</>
	);
};
