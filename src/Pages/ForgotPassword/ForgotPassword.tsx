import Swal from 'sweetalert2';
import { Button } from '../../components/Button/Button';
import { Form } from '../../components/Form/Form';
import { SimpleUserPage } from '../../components/SimpleUserPage/SimpleUserPage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {
    const navigate = useNavigate();
	const [errors, setErrors] = useState<any>({});
	const [showCode, setShowCode] = useState<boolean>(false);
	function onSubmit(e: any) {
		e.preventDefault();
		let newErrors = {};
		// get values
		const email = e.target['email'].value;
		//Create an regexp
		const emailRegExp = new RegExp(
			'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
		);
		if (!emailRegExp.test(email)) {
			newErrors = {
				...newErrors,
				email: 'El correo no es válido',
			};
		}
		// validate email
		if (!email) {
			newErrors = {
				...newErrors,
				email: 'El correo es requerido',
			};
		}
		// set errors
		setErrors(newErrors);
		// if there are no errors
		if (Object.keys(newErrors).length === 0) {
			if (!showCode) {
				setShowCode(true);
			} else {
				setShowCode(false);
			}
		}
	}

    function onSubmitPassword(e: any) {
        e.preventDefault();
        let newErrors = {};
        // get values
        const password = e.target['password'].value;
        const confirmPassword = e.target['confirmPassword'].value;
        // validate password
        if (password !== confirmPassword) {
            newErrors = {
                ...newErrors,
                password: 'Las contraseñas no coinciden',
                confirmPassword: 'Las contraseñas no coinciden',
            };
        }
        if (!password) {
            newErrors = {
                ...newErrors,
                password: 'La contraseña es requerida',
            };
        }
        if (!confirmPassword) {
            newErrors = {
                ...newErrors,
                confirmPassword: 'La contraseña es requerida',
            };
        }
        // set errors
        setErrors(newErrors);
        // if there are no errors
        if (Object.keys(newErrors).length === 0) {
            Swal.fire({
                title: 'Contraseña cambiada',
                text: 'La contraseña ha sido cambiada con éxito',
                icon: 'success',
                confirmButtonText: 'Aceptar',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/');
                }
            })
        }
    }

	return (
		<SimpleUserPage showFooter={false}>
			{!showCode ? (
				<Form
					title='Recuperar Contraseña'
					fields={[
						{
							name: 'email',
							type: 'text',
							label: 'Correo Electrónico',
						},
					]}
					onSubmit={onSubmit}
					button={
						<Button text={'Enviar Código'} fill={false} onClick={() => {}} />
					}
					cancel={false}
					errors={errors}
				/>
			) : (
				<Form
					title='Cambiar Contraseña'
					fields={[
						{
							name: 'password',
							type: 'password',
							label: 'Nueva Contraseña',
						},
						{
							name: 'confirmPassword',
							type: 'password',
							label: 'Confirmar Contraseña',
						},
					]}
					onSubmit={onSubmitPassword}
					button={
						<Button
							text={'Cambiar Contraseña'}
							fill={false}
							onClick={() => {}}
						/>
					}
					cancel={false}
					errors={errors}
				/>
			)}
		</SimpleUserPage>
	);
};
