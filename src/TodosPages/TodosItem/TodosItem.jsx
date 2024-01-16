import React, { useState, useEffect } from 'react';
import style from './TodosItem.module.css';
import EditTodo from './EditTodo/EditTodo';
import DeleteTodo from './DeleteTodo/DeleteTodo';
import { useNavigate, useParams, Link } from 'react-router-dom';

const TodoItem = ({ getTodoById, data }) => {
	const [isEdit, setIsEdit] = useState(false);
	const [todoTitle, setTodoTitle] = useState('');

	const { id } = useParams();
	const navigate = useNavigate();
	const fetchData = async () => {
		try {
			const response = await fetch(`http://localhost:3005/posts/${id}`);
			const result = await response.json();
			setTodoTitle(result.title);
		} catch (error) {
			console.error('Error during async operation:', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleEdit = () => {
		setIsEdit((prevState) => !prevState);
	};

	const handleNavigate = () => {
		navigate(-1);
	};

	return (
		<>
			{isEdit ? (
				<EditTodo
					getTodoById={getTodoById}
					title={todoTitle}
					handleEdit={handleEdit}
				/>
			) : (
				<li className={style.li}>
					<span>{todoTitle}</span>
					<Link to={`/posts/${id}/edit`} className={style.Ul}>
						<button className={style.buttonEdit} onClick={handleEdit}>
							Edit
						</button>
					</Link>
					<DeleteTodo />
				</li>
			)}
			<button className={style.buttonEdit} onClick={handleNavigate}>
				{' <='}{' '}
			</button>
		</>
	);
};
export default TodoItem;
