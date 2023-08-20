import { Table } from '../../components/Table/Table';

export const UsuariosList = () => {
	const columns = [
		'id',
		'correo electrónico',
		'Nombre',
		'Teléfono',
		'Estado',
		'Rol',
	];
	const dbColumns = ['id', 'email', 'name', 'tel', 'state', 'rol'];
	const users = [
		{
			id: 1,
			email: 'luiscorrea@example.com',
			name: 'Luis Correa',
			tel: '1234567890',
			state: 'Activo',
			rol: 'Administrador',
		},
		{
			id: 2,
			email: 'santiago.a@example.com',
			name: 'Santiago Agudelo',
			tel: '1234567890',
			state: 'Activo',
			rol: 'Administrador',
		},
		{
			id: 3,
			email: 'mateo.osorio@example.com',
			name: 'Mateo Osorio',
			tel: '1234567890',
			state: 'Activo',
			rol: 'Administrador',
		},
	];
	return (
		<>
			<Table
				data={users}
				columns={columns}
				dbColumns={dbColumns}
				title='Usuarios'
				createLink='create'
				createText='Crear Usuario'
				label='Buscar Usuario'
				nombreArchivo='Usuarios'
				tituloDocumento='Usuarios'
                buttonsActions={[
                    {
                        text: 'Desactivar',
                        onClick: () => null,
                        fill: false,
                    },
                ]}
			/>
		</>
	);
};
