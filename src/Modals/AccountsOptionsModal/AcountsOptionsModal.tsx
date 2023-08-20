import { ModalContainer, Modal } from '../../components/Modal/Modal';
import { useState } from 'react';

import { Form, FormField } from '../../components/Form/Form';

import { Button } from '../../components/Button/Button';

import { useNavigate, useLocation, Link } from 'react-router-dom';

import LoginImage from '../../assets/LoginImage.png';
import RegisterImage from '../../assets/RegisterImage.png';

import './AccountsOptionsModal.css';
import Swal from 'sweetalert2';

export const Login = ({ showModal }: any) => {
	const location = useLocation();
	const { pathname } = location;
	const navigate = useNavigate();
	const handleClick = () => {
		navigate({
			pathname: pathname,
			search: `register`,
		});
	};
	const [error, setError] = useState<any>([]);
	function onSubmit(e: any) {
		e.preventDefault();
		let newErrores: any = {};
		// get the values of inputs
		const { email, password } = e.target.elements;
		// create 2 RegExp for validate email and password
		const emailRegExp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
		// validate email and password
		if (!emailRegExp.test(email.value)) {
			newErrores = {...newErrores, email: 'El correo no es válido' };
		}
		// validate email and error are empty
		if (!email.value || !password.value) {
			newErrores = {
				...newErrores,
				email: !email.value && 'El correo no puede estar vacío',
				password: !password.value && 'La contraseña no puede estar vacía',
			}
		}
		setError(newErrores);
		if(Object.keys(newErrores).length === 0) {
			Swal.fire({
				title: '¡Bienvenido!',
				icon: 'success',
				timer: 1500,
				showConfirmButton: false,
			}).then(() => {
				navigate('/admin')
			})
		}
	}
	const loginForm: FormField[] = [
		{
			name: 'email',
			type: 'text',
			label: 'Correo Electrónico',
		},
		{
			name: 'password',
			type: 'password',
			label: 'Contraseña',
		},
	];
	return (
		<>
			<ModalContainer ShowModal={showModal}>
				<Modal showModal={showModal} className={'SubscribeModal'}>
					<div className='imageContainer'>
						<img src={LoginImage} alt='' />
					</div>
					<div className='formContainer'>
						<Form
							fields={loginForm}
							onSubmit={onSubmit}
							button={
								<Button
									text={'Iniciar Sesión'}
									onClick={() => null}
									fill={false}
								/>
							}
							cancel={false}
							extraElements={
								<Link to={'/forgot-password'} className={`linksStyle`}>
									¿Olvidaste tu contraseña?
								</Link>
							}
							title='Inicio de Sesión'
							errors={error}
						/>
						<span className={`linksContainer`}>
							<span>¿Aún no tienes una cuenta? </span>
							<a
								onClick={(e) => {
									e.preventDefault();
									handleClick();
								}}
								className={`linksStyle`}
							>
								¡Registrate aquí!
							</a>
						</span>
					</div>
				</Modal>
			</ModalContainer>
		</>
	);
};

export const Register = ({ showModal }: any) => {
	const location = useLocation();
	const { pathname } = location;
	const navigate = useNavigate();
	const [error, setError] = useState<any>({});
	const handleClick = () => {
		navigate({
			pathname: pathname,
			search: `login`,
		});
	};
	function onSubmit(e: any) {
		e.preventDefault();
		let newErrores: any = {};
		// get the values of inputs
		const { name, phone, email, password, confirmPassword, birth } =
			e.target.elements;
		// create 2 RegExp for validate email, name and phone
		const emailRegExp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
		const nameRegExp = new RegExp(/^[a-zA-ZÀ-ÿ\s]{1,40}$/g);
		const phoneRegExp = new RegExp(/^[0-9]{10}$/g);
		//validate every field
		if (!nameRegExp.test(name.value)) {
			newErrores = {
				...newErrores,
				name: 'El nombre no es válido',
			};
		}
		if (!phoneRegExp.test(phone.value)) {
			newErrores = {
				...newErrores,
				phone: 'El teléfono no es válido',
			};
		}
		if (!emailRegExp.test(email.value)) {
			newErrores = {
				...newErrores,
				email: 'El correo no es válido',
			};
		}
		if (password.value !== confirmPassword.value) {
			newErrores = {
				...newErrores,
				password: 'Las contraseñas no coinciden',
				confirmPassword: 'Las contraseñas no coinciden',
			};
		}
		// validate if any field are empty
		if (!name.value || !phone.value || !email.value || !password.value || !confirmPassword.value || !birth.value) {
			newErrores = {
				...newErrores,
				name: !name.value && 'El nombre no puede estar vacío',
				phone: !phone.value && 'El teléfono no puede estar vacío',
				email: !email.value && 'El correo no puede estar vacío',
				password: !password.value && 'La contraseña no puede estar vacía',
				confirmPassword: !confirmPassword.value && 'La contraseña no puede estar vacía',
				birth: !birth.value && 'La fecha de nacimiento no puede estar vacía',
			};
		}
		setError(newErrores);
		if (Object.keys(newErrores).length === 0) {
			Swal.fire({
				title: '¡Bienvenido!',
				icon: 'success',
				text: 'Te has registrado correctamente',
				timer: 1500,
				showConfirmButton: false,
			}).then(() => {
				handleClick();
			});
		}

	}
	const registerForm: FormField[] = [
		{
			name: 'name',
			type: 'text',
			label: 'Nombres',
			size: 50,
		},
		{
			name: 'phone',
			type: 'text',
			label: 'Teléfono',
			size: 50,
		},
		{
			name: 'email',
			type: 'text',
			label: 'Correo Electrónico',
		},
		{
			name: 'password',
			type: 'password',
			label: 'Contraseña',
			size: 50,
		},
		{
			name: 'confirmPassword',
			type: 'password',
			label: 'Confirmar Contraseña',
			size: 50,
		},
		{
			name: 'birth',
			type: 'date',
			label: 'Fecha de Nacimiento',
		},
	];
	return (
		<>
			<ModalContainer ShowModal={showModal}>
				<Modal showModal={showModal} className={'SubscribeModal'}>
					<div className='formContainer'>
						<Form
							fields={registerForm}
							onSubmit={onSubmit}
							button={
								<Button
									text={'Registrarse'}
									onClick={() => null}
									fill={false}
								/>
							}
							cancel={false}
							title='Registrarse'
							errors={error}
						/>
						<span className={`linksContainer`}>
							<span>¿Ya tienes una cuenta? </span>
							<a
								onClick={(e) => {
									e.preventDefault();
									handleClick();
								}}
								className={`linksStyle`}
							>
								¡Inicia Sesión Ahora!
							</a>
						</span>
					</div>
					<div className='imageContainer'>
						<img src={RegisterImage} alt='' />
					</div>
				</Modal>
			</ModalContainer>
		</>
	);
};
