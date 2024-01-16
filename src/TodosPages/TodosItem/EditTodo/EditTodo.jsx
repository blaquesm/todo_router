import React, { useState, useEffect } from 'react';
import TextField from '../../TextField/TextField';
import { useNavigate, useParams } from 'react-router-dom';

const EditTodo = ({ getTodoById, title, handleEdit, ...props }) => {
	const [value, setValue] = useState({ title });
	const [error, setError] = useState({});
	const editTodo = async (id, payload) => {
		try {
			const response = await fetch(`http://localhost:3005/posts/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});
			const updateData = await response.json();

			const updateArray = props.map((prod) => {
				if (prod.id === Number(id)) {
					prod = updateData;
				}
				return prod;
			});
			setValue(updateArray);
		} catch (error) {}
	};

	const { id } = useParams();
	const navigate = useNavigate();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValue((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (typeof editTodo === 'function') {
			await editTodo(id, value);
			navigate(`/`);
		} else {
			console.error('editTodo is not a function');
		}
	};
	useEffect(() => {
		if (value) {
			setValue((prevState) => ({ ...prevState }));
		}
	}, []);

	return (
		<form onSubmit={handleSubmit}>
			<TextField
				id="title"
				name="title"
				type="text"
				placeholder="title"
				value={value.title}
				onChange={handleChange}
				error={error.title}
			/>
			<button type="submit">Save</button>
		</form>
	);
};

export default EditTodo;
