import { Form, FormField } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const UsuariosEdit = () => {
	const navigate = useNavigate();
	const [errors, setErrors] = useState<any>({});
	const usuariosFields: FormField[] = [
		{
			name: 'nombre',
			type: 'text',
			label: 'Nombre',
			size: 50,
		},
		{
			name: 'telefono',
			type: 'text',
			label: 'Telefono',
			size: 50,
		},
		{
			name: 'correo',
			type: 'text',
			label: 'Correo Electrónico',
		},
		{
			name: 'contrasena',
			type: 'password',
			label: 'Contraseña',
			size: 50,
		},
		{
			name: 'confirmarContrasena',
			type: 'password',
			label: 'Confirmar Contraseña',
			size: 50,
		},
		{
			name: 'birth',
			type: 'date',
			label: 'Fecha de Nacimiento',
		},
		{
			name: 'rol',
			type: 'select',
			label: 'Rol',
			options: [
				{ value: 'Administrador', label: 'Administrador' },
				{ value: 'usuario', label: 'usuario' },
			],
		},
	];

	// ... (el código restante se mantiene igual)

	function onSubmit(e: any) {
		e.preventDefault();
		// Initialize a new object to track errors
		let newErrors = {};

		// get data of inputs by name
		const nombre = e.target['nombre'].value;
		console.log(nombre);
		const telefono = e.target['telefono'].value;
		const correo = e.target['correo'].value;
		const contrasena = e.target['contrasena'].value;
		const confirmarContrasena = e.target['confirmarContrasena'].value;
		const birth = e.target['birth'].value;
		const rol = e.target['rol'].value;

		// Create RegExp to validate nombre
		const nombreRegExp = new RegExp('[a-zA-Zs]+');
		// Create RegExp to validate telefono
		const telefonoRegExp = new RegExp('^[0-9]{1,10}$');
		// Create RegExp to validate correo
		const correoRegExp = new RegExp(
			'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
		);
		// Create RegExp to validate contrasena
		const contrasenaRegExp = new RegExp(
			'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.{8,})'
		);

		// validate every field and update the newErrors object
		if (!nombreRegExp.test(nombre as string)) {
			newErrors = { ...newErrors, nombre: 'Nombre no válido' };
		}
		if (!telefonoRegExp.test(telefono as string)) {
			newErrors = { ...newErrors, telefono: 'Telefono no válido' };
		}
		if (!correoRegExp.test(correo as string)) {
			newErrors = { ...newErrors, correo: 'Correo no válido' };
		}
		if (!contrasenaRegExp.test(contrasena as string)) {
			newErrors = { ...newErrors, contrasena: 'Contraseña no válida' };
		}

		if (contrasena !== confirmarContrasena) {
			newErrors = {
				...newErrors,
				confirmarContrasena: 'Las contraseñas no coinciden',
			};
		}
		// Every field must be filled
		if (
			!nombre ||
			!telefono ||
			!correo ||
			!contrasena ||
			!confirmarContrasena ||
			!birth ||
			!rol
		) {
			newErrors = {
				...newErrors,
				nombre: !nombre ? 'Campo requerido' : '',
				telefono: !telefono ? 'Campo requerido' : '',
				correo: !correo ? 'Campo requerido' : '',
				contrasena: !contrasena ? 'Campo requerido' : '',
				confirmarContrasena: !confirmarContrasena ? 'Campo requerido' : '',
				birth: !birth ? 'Campo requerido' : '',
				rol: !rol ? 'Campo requerido' : '',
			};
		}

		// Update the errors state with the newErrors object
		setErrors(newErrors);

		// Check if newErrors is empty, indicating no validation errors
		if (Object.keys(newErrors).length === 0) {
			// if all is ok, send data to backend or perform any other action
			Swal.fire({
				title: 'Usuario creado',
				icon: 'success',
				confirmButtonText: 'Aceptar',
				confirmButtonColor: '#9f212f',
			}).then((result) => {
				if (result.isConfirmed) {
					navigate('/admin/usuarios');
				}
			});
		}
	}

	return (
		<>
			<Form
				fields={usuariosFields}
				title='Editar Usuario'
				onSubmit={onSubmit}
				button={<Button text={'Actualizar Usuario'} onClick={() => null} />}
				errors={errors}
			/>
		</>
	);
};
