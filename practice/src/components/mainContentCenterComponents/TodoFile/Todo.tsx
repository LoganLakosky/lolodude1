import "./todo.css";
import { useState, ChangeEvent } from "react";

type Todos = {
  title: string;
  body?: string;
};

type TodoProps = {
  borderColor: string;
};

export default function Todo({ borderColor }: TodoProps) {
  const [currentTodos, setCurrentTodos] = useState<Todos[]>([]);

  const [firstHideTodo, setFirstHideTodo] = useState<boolean>(true);
  const [secondHideTodo, setSecondHideTodo] = useState<boolean>(true);

  const [revealTodoCreationInputs, setRevealTodoCreationInputs] = useState<boolean>(false);

  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [newTodoBody, setNewTodoBody] = useState<string>("");

  //Error states
  const [titleError, setTitleError] = useState<boolean>(false);

  function updateTodoTitleValue(e: ChangeEvent<HTMLInputElement>) {
    setNewTodoTitle(e.target.value);
  }

  function updateTodoBodyValue(e: ChangeEvent<HTMLInputElement>) {
    setNewTodoBody(e.target.value);
  }

  function startTodoCreation() {
    setSecondHideTodo(false);
    setFirstHideTodo(false);

    setTimeout(() => {
      setFirstHideTodo(true);
      setRevealTodoCreationInputs(true);
    }, 900);
  }

  function createTodo() {
    if (currentTodos.length === 4) {
      alert("You have created the max amount of todos");
      return;
    }

    if (newTodoTitle === "") {
      //ADD BETTER ERROR
      setTimeout(() => {
        setTitleError(false);
      }, 1200);
      setTitleError(true);
      return;
    }

    let todoBody: string;
    if (newTodoBody === undefined) {
      todoBody = "Start typing here to add to this todo's body";
    } else {
      todoBody = newTodoBody;
    }

    const todoItems: Todos = {
      title: newTodoTitle,
      body: todoBody,
    };

    setNewTodoTitle("");

    setCurrentTodos((prev) => [...prev, todoItems]);
  }

  function goToTodo() {}

  return (
    <div className="todoMainContainer">
      <div className="todoMainTop">
        {secondHideTodo && <h1>Todo List</h1>}
        {!firstHideTodo && <h1 className="fadeOut">Todo List</h1>}
        {!firstHideTodo && <button className="startTodoCreationBtn fadeOut">Create A Todo</button>}
        {secondHideTodo && (
          <button className="startTodoCreationBtn" onClick={() => startTodoCreation()}>
            Create A Todo
          </button>
        )}

        {revealTodoCreationInputs && (
          <>
            <div className="titleInputContainer">
              {!titleError && <label htmlFor="title-input">Todo Title:</label>}
              {titleError && (
                <label htmlFor="title-input" style={{ color: "red" }}>
                  Please enter a title
                </label>
              )}
              <input
                value={newTodoTitle}
                type="text"
                id="title-input"
                className="titleInput"
                onChange={updateTodoTitleValue}
              />
            </div>
            <button className="createTodoBtn" onClick={() => createTodo()}>
              Create Todo
            </button>
          </>
        )}
      </div>

      <div className="todoMainContentContainer">
        <div className="todosContainer">
          {currentTodos?.map((todo) => {
            return (
              <div
                className="todoContainer"
                style={{ border: `2px solid ${borderColor}` }}
                key={todo.title}
              >
                <div className="todoTopContainer">
                  <h2> {todo.title}</h2>
                </div>
                <button className="TodoBtn" onClick={() => goToTodo()}></button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
