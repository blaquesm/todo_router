import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './TodosPages.module.css';
import TodosItem from './TodosItem/TodosItem';
import SearchQuery from './SearchQuery/SearchQuery';
import CreateTodo from './CreateTodo/CreateTodo';

const TodosPages = () => {
	const [todo, setTodo] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [sortTodos, setSortTodos] = useState(false);

	const loadTodos = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`http://localhost:3005/posts`);
			const data = await response.json();
			const sortedData = sortTodos
				? data.slice().sort((a, b) => a.title.localeCompare(b.title))
				: data;
			setTodo(sortedData);
			setIsLoading(false);
		} catch (error) {}
	};

	const createTodo = async (newTodo) => {
		try {
			const response = await fetch('http://localhost:3005/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newTodo),
			});

			const createdTodo = await response.json();
			setTodo((prevTodo) => [...prevTodo, createdTodo]);
		} catch (error) {
			console.error(error);
		}
	};

	const getTodoById = (id) => {
		return todo.find((prod) => prod.id === Number(id));
	};

	useEffect(() => {
		setIsLoading(true);
		loadTodos();
	}, [sortTodos, setTodo]);

	return (
		<div className={style.App}>
			<div className={style.header}>
				<h1 className={style.title}>Todo list</h1>
				<hr />
				<div className={style.createTodo}>
					<CreateTodo createTodo={createTodo} />
				</div>
				<div className={style.actions}>
					<SearchQuery setTodo={setTodo} setIsLoading={setIsLoading} />
					<button
						className={sortTodos ? style.sortButtonOff : style.sortButtonOn}
						onClick={() => setSortTodos(!sortTodos)}
					>
						{sortTodos ? 'Sort off' : 'Sort on'}
					</button>
				</div>
			</div>
			{isLoading ? (
				<div className={style.loader}></div>
			) : todo.length === 0 ? (
				<p className={style.noNotes}>Todo List is empty </p>
			) : (
				<div>
					{todo && todo.id ? (
						<div>
							<TodosItem data={todo} getTodoById={getTodoById} />
						</div>
					) : (
						todo.map(({ id, title }) => (
							<div key={id}>
								<Link to={`/posts/${id}`} className={style.Ul}>
									<p className={style.cardText}>{title}</p>
								</Link>
							</div>
						))
					)}
				</div>
			)}
		</div>
	);
};
export default TodosPages;
