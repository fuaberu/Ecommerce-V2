import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../app/store';
import Spinner from '../components/smallComponents/Spinner';
import moment from 'moment';

const ProfilePage = () => {
	const { user } = useSelector((state: RootState) => state.user);

	if (!user) return <Spinner />;
	return (
		<ProfileContainer>
			<div>
				<img src={user.profilePic.url} alt={`${user.name} profile`} />
				<button>Edit Photo</button>
			</div>
			<div>
				<h3>Full Name</h3>
				<p>{user.name}</p>
				<h3>Email</h3>
				<p>{user.email}</p>
				<h3>User since</h3>
				<p>{moment(user.createdAt).format('MMMM DD YYYY')}</p>
				<button>My orders</button>
				<button>Change Password</button>
			</div>
		</ProfileContainer>
	);
};

const ProfileContainer = styled.div`
	display: flex;
	div {
		flex: 1;
		&:first-child {
			padding: 1rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			button {
				margin-top: 1rem;
			}
		}
		&:nth-child(2) {
			padding: 1rem;
		}
	}
	img {
		border-radius: 50%;
		height: 40vw;
		width: 40vw;
		max-width: 400px;
		max-height: 400px;
		overflow: hidden;
		object-fit: cover;
	}
	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

export default ProfilePage;
