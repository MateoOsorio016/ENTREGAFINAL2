import { FC } from 'react';
import { ModalContainer, Modal } from '../../components/Modal/Modal';

import BreannaYde from '../../assets/breannaYde.jpg';

import './UserProfileModal.css';

interface UserProfileModalProps {
	showModal: (showModal: boolean) => void;
}

export const UserProfileModal: FC<UserProfileModalProps> = ({
	showModal,
}: any) => {
	return (
		<ModalContainer ShowModal={showModal}>
			<Modal showModal={showModal} className={'UserProfileModal'}>
				<div className='userProfileModal--UserProfileContainer'>
					<div className='userProfileModal--imageProfileContainer'>
						<img
							src={BreannaYde}
							alt='Breanna Yde'
							className='userProfileModal--imageProfile'
						/>
					</div>
					<div className='userProfileModal--nameProfileContainer'>
						<span className='userProfileModal--nameProfile'>Breanna Yde</span>
						<span className="userProfileModal--rolProfile">
							Admin
						</span>
					</div>
					<div className='userProfileModal--emailProfileContainer'>
						<span className='userProfileModal--emailProfile'>
							breanna.yde@burdeos.com
						</span>
					</div>
				</div>
			</Modal>
		</ModalContainer>
	);
};
