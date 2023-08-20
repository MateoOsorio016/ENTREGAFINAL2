import { FC } from 'react';
import { useGlobalState } from '../../Context/GlobalState';
import { MiniCartProductCard } from '../ProductCard/ProductCard';

import { MdClose } from 'react-icons/md';
import { BiCart } from 'react-icons/bi';
import './MiniCart.css';
import { Button } from '../Button/Button';
import { useNavigate } from 'react-router-dom';

interface MiniCartProps {
	setShowMiniCart: (showMiniCart: boolean) => void;
}

export const MiniCart: FC<MiniCartProps> = ({ setShowMiniCart }) => {
	const { cart } = useGlobalState();
	const navigate = useNavigate();
	const descuento = cart.reduce(
		(acc, product) =>
			product.discount
				? acc + (product.price * product.quantity * product.discount) / 100
				: acc + 0, 0
	);
	const subtotal = cart.reduce(
		(acc, product) => acc + product.price * product.quantity,
		0
	);
	const total = subtotal - descuento;
	return (
		<div className='miniCart--overlay' onClick={() => setShowMiniCart(false)}>
			<div
				className={`miniCart--container`}
				onClick={(e) => e.stopPropagation()}
			>
				<div className='miniCart--header'>
					<h3 className={`miniCart-Title`}>Carrito</h3>
					<button
						className='miniCart--close'
						onClick={() => setShowMiniCart(false)}
					>
						<MdClose />
					</button>
				</div>
				<div className='miniCart--body'>
					{cart.length > 0 ? (
						cart.map((product: any) => (
							<MiniCartProductCard key={product.id} product={product} />
						))
					) : (
						<div className='miniCart--emptyMessage'>
							<BiCart />
							<p>Carrito vacio</p>
						</div>
					)}
					{cart.length > 0 && (
						<div className='miniCart--footer'>
							<span className='miniCart--footerSubTotal'>
								Subtotal{' '}
								<span>
									${new Intl.NumberFormat('es-co').format(subtotal) || '0000'}
								</span>
							</span>
							<span className='miniCart--footerDiscount'>
								Descuento
								<span>
									${new Intl.NumberFormat('es-co').format(descuento) || '0000'}
								</span>
							</span>
							<span className='miniCart--footerTotal'>
								Total{' '}
								<span>
									${new Intl.NumberFormat('es-co').format(total) || '0000'}
								</span>
							</span>
							<Button
								text={'Finalizar compra'}
								onClick={() => navigate('/cart')}
								fill={false}
								autoSize={false}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
