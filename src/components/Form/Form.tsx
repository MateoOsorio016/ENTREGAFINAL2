import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Form.css';
import { Button } from '../Button/Button';

interface optionField {
	value: string;
	label: string;
}

export interface FormField {
	name: string;
	type: string;
	label: string;
	placeholder?: string;
	value?: string;
	options?: optionField[];
	selected?: string;
	size?: number;
}

interface FormProps {
	title?: string;
	fields: FormField[];
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	button: JSX.Element | JSX.Element[] | string;
	errors?: { [key: string]: string };
	cancel?: boolean;
	extraElements?: JSX.Element | JSX.Element[] | string;
}

export const Form: FC<FormProps> = ({
	title,
	fields,
	onSubmit,
	button,
	errors,
	cancel = true,
	extraElements,
}) => {
	const [selectedOption, setSelectedOption] = useState(false);
	const navigate = useNavigate();
	return (
		<>
			<form onSubmit={onSubmit}>
				{title && <h1>{title}</h1>}
				<div className='inputsFormContainer'>
					{fields?.map(
						({
							name,
							type,
							label,
							placeholder,
							value,
							options,
							selected,
							size = 100,
						}) => {
							switch (type) {
								case 'text':
								case 'password': {
									return (
										<div
											className={`inputControl ${
												size === 50
													? 'inputControl--halfInput'
													: 'inputControl--fullInput'
											}
											${errors && errors[name] ? 'inputControl--error' : ''}
											`}
											key={name}
										>
											<input
												type={type}
												name={name}
												id={name}
												value={value && value}
												placeholder={placeholder ? placeholder : label}
												autoComplete='false'
											/>
											<label htmlFor={name}>{label}</label>
											{errors && errors[name] && (
												<span className={`error`}>{errors[name]}</span>
											)}
										</div>
									);
								}
								case 'select': {
									return (
										<div
											className={`selectControl${
												selectedOption ? ' active' : ''
											}
										${size === 50 ? ' selectControl--halfInput' : ' selectControl--fullInput'}
										${errors && errors[name] ? 'selectControl--error' : ''}

										`}
											key={name}
										>
											<select
												name={name}
												id={name}
												value={selected}
												onChange={(e) =>
													e.target.value === ''
														? setSelectedOption(false)
														: setSelectedOption(true)
												}
											>
												<option value=''></option>
												{options?.map(({ value, label }) => (
													<option key={value} value={value}>
														{label}
													</option>
												))}
											</select>
											<label htmlFor={name}>{label}</label>
											{errors && errors[name] && (
												<span className={`error`}>{errors[name]}</span>
											)}
										</div>
									);
								}
								case 'checkbox': {
									return (
										<>
											<div className='inputCheckbox'>
												<input type='checkbox' id={name} name={name} />
												<label htmlFor={name}>{label}</label>
											</div>
										</>
									);
								}
								case 'date':{
									return (
										<div
											className={`inputControl ${
												size === 50
													? 'inputControl--halfInput'
													: 'inputControl--fullInput'
											}
											${errors && errors[name] ? 'inputControl--error' : ''}
											`}
											key={name}
										>
											<input
												type={type}
												name={name}
												id={name}
												value={value && value}
												placeholder={placeholder ? placeholder : label}
												autoComplete='false'
											/>
											<label htmlFor={name}>{label}</label>
											{errors && errors[name] && (
												<span className={`error`}>{errors[name]}</span>
											)}
										</div>
									);
								}
								default: {
									return (
										<div>
											Tipo {type} desconocido en el input {name}
										</div>
									);
								}
							}
						}
					)}
					{extraElements}
				</div>
				{button}
				{cancel && (
					<Button
						text='Cancelar'
						onClick={() => {
							navigate(-1);
						}}
						fill={false}
					/>
				)}
			</form>
		</>
	);
};
