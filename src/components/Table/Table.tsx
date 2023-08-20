import React, { useState } from 'react';
import { SearchTable } from '../SearchTable/SearchTable';
import { Button } from '../Button/Button';
import { ExcelButton } from '../ExcelButton/ExcelButton';
import { IoAddCircleSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import './Table.css';

interface TableProps {
	data: any[];
	columns: any[];
	dbColumns?: any[];
	title?: string;
	label?: string;
	createLink?: string;
	createText?: string;
	editButton?: boolean;
	editLink?: string;
	alternativeStyle?: boolean;
	deleteFunction?: (id: string) => void;
	buttonsActions?: any[];
	tituloDocumento?: string;
	nombreArchivo?: string;
}

export const Table: React.FC<TableProps> = ({
	data,
	columns,
	dbColumns,
	title,
	label,
	createLink = '/',
	createText,
	editButton = true,
	editLink = 'edit',
	alternativeStyle = false,
	deleteFunction,
	buttonsActions,
	tituloDocumento,
	nombreArchivo,
}) => {
	const navigate = useNavigate();
	const [searchType, setSearchType] = useState('');
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchType(e.target.value);
	};

	let dataTable: any = [];

	if (searchType !== '') {
		dataTable = data.filter((row) => {
			return Object.values(row).some((value: any) =>
				value.toString().toLowerCase().includes(searchType.toLowerCase())
			);
		});
	} else {
		dataTable = data;
	}

	return (
		<>
			{title && <h1>{title}</h1>}
			<div className='tableContainer'>
				{alternativeStyle || (
					<div className='actionsTable'>
						<div className='left'>
							<ExcelButton
								tituloDocumento={tituloDocumento ? tituloDocumento : ''}
								dataDownload={data}
								nombreArchivo={nombreArchivo ? nombreArchivo : ''}
							/>
							<Link to={createLink} className='createButton'>
								{createText ? (
									<>
										<IoAddCircleSharp /> {createText}
									</>
								) : (
									<>
										<IoAddCircleSharp /> Crear Nuevo
									</>
								)}
							</Link>
						</div>
						<SearchTable
							searchType={searchType}
							handleSearch={handleSearch}
							label={label}
						/>
					</div>
				)}
				<div className='bottomTable'>
					<table
						className={`${
							alternativeStyle ? 'datatable--alternativeStyle' : 'dataTable'
						}`}
					>
						<thead>
							<tr>
								{columns?.map((column) => (
									<th key={column}>{column}</th>
								))}
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{dataTable.length == 0 && searchType && searchType.length > 0 ? (
								<tr>
									<td colSpan={columns.length + 1}>No hay resultados</td>
								</tr>
							) : (
								dataTable.map((row: any, index: number) => (
									<tr key={index}>
										{dbColumns?.map((column: string) =>
											column === 'id' ? (
												<td key={column} className='id'>
													{index + 1}
												</td>
											) : (
												<td key={column}>{row[column]}</td>
											)
										)}
										<td className='dataTable__actions'>
											{buttonsActions?.map((button: any) => (
												<Button
													key={index + row._id + button.text}
													text={button.text}
													onClick={button.onClick}
													fill={button.fill}
												/>
											))}
											{editButton && (
												<Button
													key={index}
													text={'editar'}
													onClick={() => navigate(`${editLink}/`)}
													fill={true}
												/>
											)}
											<Button
												key={index}
												text={'eliminar'}
												onClick={() => {
													if (deleteFunction) {
														deleteFunction(row.id);
													}
												}}
												fill={false}
											/>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};
