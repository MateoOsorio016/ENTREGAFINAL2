import { Form, FormField } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { Table } from '../../components/Table/Table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const RolesCreate = () => {
    const navigate = useNavigate();
	const [dataRolesCreate, setDataRolesCreate] = useState([] as any[]);
    const [errors, setErrors] = useState<any>({});
	const fieldsFormRoles: FormField[] = [
		{
			name: 'name',
			type: 'text',
			label: 'Nombre del Rol',
		},
		{
			name: 'permisos',
			type: 'select',
			label: 'Permisos',
			options: [
				{ value: '1', label: 'Permiso 1' },
				{ value: '2', label: 'Permiso 2' },
				{ value: '3', label: 'Permiso 3' },
				{ value: '4', label: 'Permiso 4' },
			],
		},
	];

	function addPermission() {
        const permission = document.getElementById('permisos') as HTMLSelectElement;
        // Validate if the permission is already added
        const permissionExists = dataRolesCreate.find((item) => item.id === permission.value);
        if (permissionExists) {
            setErrors({ ...errors, permisos: 'El permiso ya fue agregado' });
            return;
        }

        //validate if the permission is selected
        if (permission.value == null || permission.value === '') {
            setErrors({ ...errors, permisos: 'Seleccione un permiso' });
            return;
        }
		// get the value and the text of the selected option
		const permissionId = permission.options[permission.selectedIndex].value;
		const permissionName = permission.options[permission.selectedIndex].text;
		const permissionData = { id: permissionId, name: permissionName };
		setDataRolesCreate([...dataRolesCreate, permissionData]);
        permission.value = '';
        setErrors({ ...errors, permisos: '' });
	}

	function deletePermission(id: string) {
        Swal.fire({
            title: '¿Está seguro de eliminar el permiso?',
            text: "No podrá revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9f212f',
            cancelButtonColor: '#D6CAB0',
            confirmButtonText:'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const newData = dataRolesCreate.filter((item) => item.id !== id);
                setDataRolesCreate(newData);
                Swal.fire({
                    icon: 'success',
                    title: 'Permiso eliminado',
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
        })
	}

    function createRole() {
        // select the fields
        const name = document.getElementById('name') as HTMLInputElement;
        let newErrors = {};
        // validate the fields
        // RegExp to validate the name, this don't allow special characters or numbers
        const regExp = new RegExp('^[a-zA-Z ]+$');
        if (!regExp.test(name.value)) {
            newErrors = { ...newErrors, name: 'El nombre del rol no puede contener caracteres especiales o números' };
        }
        if (name.value == null || name.value === '') {
            newErrors = { ...newErrors, name: 'El nombre del rol es requerido' };
        }
        if (dataRolesCreate.length === 0) {
            newErrors = { ...newErrors, permisos: 'Debe agregar al menos un permiso' };
        }
        // if there are errors, show them
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        // if there are not errors, create the role
        Swal.fire({
            title: '¿Está seguro de crear el rol?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9f212f',
            cancelButtonColor: '#D6CAB0',
            confirmButtonText:'Crear',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: 'Rol creado',
                    showConfirmButton: false,
                    timer: 1500,
                })
                navigate(-1);
            }
        })
    }

	return (
		<>
			<Form
				title='Crear Rol'
				fields={fieldsFormRoles}
				onSubmit={(e) => e.preventDefault()}
				button={<Button text={'Añadir Permiso'} onClick={addPermission} />}
                cancel={false}
                errors={errors}
			/>
            {
                dataRolesCreate.length > 0 && (
                    <Table
                        columns={['#', 'Nombre del Permiso']}
                        dbColumns={['id', 'name']}
                        data={dataRolesCreate}
                        alternativeStyle={true}
                        editButton={false}
                        deleteFunction={deletePermission}
                    />
                )
            }
			<div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: '600px',
                margin: '0 auto',
                gap: '1rem'

            }}>
				<Button text={'Crear Rol'} onClick={createRole} />
				<Button text={'Cancelar'} onClick={()=> navigate(-1)} fill={false}/>
			</div>
		</>
	);
};
