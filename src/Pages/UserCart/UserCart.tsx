import { Button } from '../../components/Button/Button';
import { Form } from '../../components/Form/Form';
import { CartProductCard } from '../../components/ProductCard/ProductCard';
import { SimpleUserPage } from '../../components/SimpleUserPage/SimpleUserPage';
import { useGlobalState } from '../../Context/GlobalState';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './UserCart.css';

export const UserCart = () => {
	const { cart } = useGlobalState();
	const [error, setError] = useState<any>({});
	const [discount, setDiscount] = useState<boolean>(false);
	const navigate = useNavigate();
	function handleApplyDiscount(e: any) {
		e.preventDefault();
		let newError = {};
		if (e.target.discountCode.value == '') {
			newError = { discountCode: 'Campo vacío' };
		} else if(e.target.discountCode.value == 'BURDEOS10'){
			setDiscount(true);
		} else {
			newError = { discountCode: 'Código inválido' };
		}
		setError(newError);

	}
	
	const subtotal = cart.reduce(
		(acc, product) => acc + product.price * product.quantity,
		0
	);
	const descuento = discount ? subtotal * .1 : cart.reduce(
		(acc, product) =>
			product.discount
				? acc + (product.price * product.quantity * product.discount) / 100
				: acc + 0,
		0
	);
	const total = subtotal - descuento + 10000;
	return (
		<SimpleUserPage showFooter={true}>
			{cart.length == 0 ? (
                <div className="userCart--cartEmpty">
                    <h1>No tienes agregado ningún producto al carrito</h1>
                    <Button onClick={()=> navigate('/')} text={'Ir a comprar'} />
                </div>
			) : (
				<>
					<nav className='userCart--menu'>
						<ul>
							<li className='userCart--menuItem userCart--menuItem--active'>
								Carrito
							</li>
							<li className='userCart--menuItem'>Completa tu información</li>
							<li className='userCart--menuItem'>Shipping</li>
							<li className='userCart--menuItem'>Pago</li>
						</ul>
					</nav>
					<div className='userCart--content'>
						<div className='userCart--productContainer'>
							{cart.map((product) => (
								<CartProductCard key={product.id} product={product} />
							))}
						</div>
						<div className='userCart--infoTotalContainer'>
							<div className='userCart--discountForm'>
								<Form
									fields={[
										{
											label: 'Código de descuento',
											type: 'text',
											name: 'discountCode',
											placeholder: 'Ingresa tu código de descuento',
										},
									]}
									button={
										<Button text='Aplicar' onClick={() => null} fill={false} />
									}
									cancel={false}
									onSubmit={handleApplyDiscount}
									errors={error}
								/>
							</div>
							<div className='userCart--summary'>
								<span className='userCart--summarySubtotal userCart--summaryItem'>
									Subtotal
									<span>
										${new Intl.NumberFormat('es-co').format(subtotal) || '0000'}
									</span>
								</span>
								<span className='userCart--summaryDiscount userCart--summaryItem'>
									Descuento
									<span>
										${' '}
										{new Intl.NumberFormat('es-co').format(descuento) || '0000'}
									</span>
								</span>
								<span className='userCart--summaryShipping userCart--summaryItem'>
									Envío
									<span>$ 10.000</span>
								</span>
								<span className='userCart--summaryTotal'>
									Total
									<span>
										$ {new Intl.NumberFormat('es-co').format(total) || '0000'}
									</span>
								</span>
							</div>
							<div className='userCart--buttonsAction'>
								<Button
									text='Finalizar Orden'
									onClick={() => null}
									fill={false}
									autoSize={false}
								/>
								<Button
									text='Seguir Comprando'
									onClick={() => navigate('/')}
									fill={true}
									autoSize={false}
								/>
							</div>
						</div>
					</div>
				</>
			)}
		</SimpleUserPage>
	);
};
