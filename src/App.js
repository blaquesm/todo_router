import TodosPages from './TodosPages/TodosPages.jsx';
import TodosItem from './TodosPages/TodosItem/TodosItem.jsx';
import EditTodo from './TodosPages/TodosItem/EditTodo/EditTodo.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
	return (
		<Routes>
			<Route path="/" element={<TodosPages />} />
			<Route path="/posts/:id?" element={<TodosItem />}>
				<Route path="edit" element={<EditTodo />} />
				Todo
			</Route>
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};
