import { Table } from '../../components/Table/Table';

export const RolesList = () => {
	const columns = ['id', 'Nombre', 'Estado'];
	const dbcolumns = ['id', 'name', 'state'];
	const roles = [
		{
			id: 1,
			name: 'Administrador',
			state: 'Activo',
		},
		{
			id: 2,
			name: 'Cliente',
			state: 'Activo',
		},
	];
	return (
		<>
			<Table
				data={roles}
				columns={columns}
				dbColumns={dbcolumns}
				title='Roles'
				createLink='create'
				createText='Crear Rol'
				label='Buscar Rol'
				nombreArchivo='Roles'
				tituloDocumento='Roles'
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
