import { FC } from 'react';

import {FaFacebookF, FaInstagram} from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';

import BurdeosLogo from '../../assets/BurdeoTextLogo.png';

import './SimpleUserPage.css';

interface SimpleUserPageProps {
	children: JSX.Element | JSX.Element[];
	showFooter?: boolean;
}

export const SimpleUserPage: FC<SimpleUserPageProps> = ({
	children,
	showFooter = true,
}) => {
	const year = new Date().getFullYear();
	const navigate = useNavigate();
	return (
		<div className='simpleUserPage'>
			<header className='simpleUserPage--header'>
				<img
					src={BurdeosLogo}
					alt='Burdeos'
					onClick={() => {
						navigate('/');
					}}
				/>
			</header>
			<main className='simpleUserPage--main'>{children}</main>
			{showFooter && <footer className='simpleUserPage--footer'>
                <span className="simpleUserPage--footerCopy">
                    © {year} Burdeos
                </span>
                <span className="simpleUserPage--footerSocial">
                    <a href="https://www.facebook.com/burdeosoficial" target="_blank" rel="noreferrer">
                        <FaFacebookF/>
                    </a>
                    <a href="https://www.instagram.com/burdeosoficial/" target="_blank" rel="noreferrer">
                        <FaInstagram/>
                    </a>
                </span>
                <span className="simpleUserPage--footerCredits">
                    CoffVart
                </span>
                </footer>}
		</div>
	);
};
