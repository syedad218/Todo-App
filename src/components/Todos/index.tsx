import AddToDo from "./AddToDo";
import TodosList from "./TodoList";
import Status from "./Status";
import Pagination from "components/Shared/Pagination";
import { TodosContainer } from "./styles";

export const Todos = () => {
  return (
    <TodosContainer>
      <AddToDo />
      <TodosList />
      <Status />
      <Pagination />
    </TodosContainer>
  );
};

export default Todos;
