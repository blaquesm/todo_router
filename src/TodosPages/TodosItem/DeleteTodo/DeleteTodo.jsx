import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';
import style from './DeleteTodo.module.css';

const DeleteTodo = () => {
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

	const navigate = useNavigate();
	const { id } = useParams();

	const deleteTodo = async () => {
		try {
			await fetch(`http://localhost:3005/posts/${id}`, {
				method: 'DELETE',
			});
			navigate(`/`);
		} catch (error) {
			console.error('Error deleting todo:', error);
		}
	};

	const handleDeleteClick = () => {
		setShowDeleteConfirmation(true);
	};

	const handleDeleteCancel = () => {
		setShowDeleteConfirmation(false);
	};

	const handleDeleteConfirm = async (event) => {
		event.preventDefault();
		await deleteTodo();
		setShowDeleteConfirmation(false);
	};

	return (
		<>
			<button className={style.rm} onClick={handleDeleteClick}>
				&times;
			</button>
			{showDeleteConfirmation && (
				<DeleteConfirmation
					onCancel={handleDeleteCancel}
					onConfirm={handleDeleteConfirm}
				/>
			)}
		</>
	);
};

export default DeleteTodo;
