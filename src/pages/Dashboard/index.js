import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdTask } from "react-icons/md";
import "./index.css";
import Sidebar from "./../../components/Sidebar";
import Board from "../Board";

const Dashboard = () => {
  const [columnName, setColumnName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [columns, setColumns] = useState(() => {
    const savedColumns = localStorage.getItem("kbColumns");
    return savedColumns ? JSON.parse(savedColumns) : [];
  });
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("kbTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [isAddColumn, setIsAddColumn] = useState(false);
  const [isAddTask, setIsAddTask] = useState("");
  const [isAddedColumn, setIsAddedColumn] = useState([]);
  const [isAddedTask, setIsAddedTask] = useState([]);
  const [columnActionOpen, setColumnActionOpen] = useState("");
  const [editColumnName, setEditColumnName] = useState("");
  const [removeColumnName, setRemoveColumnName] = useState("");
  const [editedColumnName, setEditedColumnName] = useState("");
  const [removedColumnName, setRemovedColumnName] = useState("");
  const [columnErrorMsg, setColumnErrorMsg] = useState("");
  const [taskErrorMsg, setTaskErrorMsg] = useState("");

  const handleClickAddColumn = () => {
    setIsAddColumn(true);
  };

  const handleChangeColumnName = (event) => {
    setColumnName(event.target.value);
  };

  const handleAddColumnName = (colName) => {
    if (colName !== "") {
      setColumns((prevState) => {
        if (prevState.includes(columnName)) {
          setColumnErrorMsg("Column name already exist!");
          return prevState;
        }
        const column = {
          id: uuidv4(),
          columnName,
        };
        return [...prevState, column];
      });

      setIsAddedColumn((prevState) => {
        if (!prevState.includes(colName)) {
          return [...prevState, colName];
        }
        return prevState;
      });
      setIsAddColumn(false);
    } else {
      setColumnErrorMsg("Column name cannot be empty");
    }
  };

  const handleChangeTaskName = (event) => {
    setTaskName(event.target.value);
  };

  const handleDuedate = (event) => {
    setDueDate(event.target.value);
  };

  const handleAddDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleAddClickTask = (colName) => {
    setIsAddTask(colName);
  };

  const handleAddTask = (colId, tName) => {
    if (tName !== "") {
      setTasks((prevState) => {
        if (prevState.includes(taskName)) {
          setTaskErrorMsg("Task name already exist!");
          return prevState;
        }
        const task = {
          id: uuidv4(),
          taskName,
          description,
          dueDate,
          colId,
        };
        return [...prevState, task];
      });
      setIsAddedTask((prevState) => {
        if (!prevState.includes(tName)) {
          return [...prevState, tName];
        }
        return prevState;
      });
      setIsAddTask("");
    } else {
      setTaskErrorMsg("Task name cannot be empty");
    }
  };

  const handleCancelTask = () => {
    setIsAddTask("");
  };

  const handleCancelColumn = () => {
    setIsAddColumn("");
  };

  const handleColumnAction = (colName) => {
    setColumnActionOpen((prevState) => (prevState !== colName ? colName : ""));
  };

  const handleClickEditColumn = (colName) => {
    setEditColumnName(colName);
    setEditedColumnName(colName);
  };

  const handleEditColumnName = (event) => {
    setEditedColumnName(event.target.value);
  };

  const handleSaveColumnName = (colName, colId) => {
    setColumnName(colName);
    if (columns.some((col) => col.columnName === colName)) {
      setColumnErrorMsg("Column name already exist!");
      return;
    }
    setColumns((prevState) => {
      const updatedColumns = prevState.map((column) =>
        column.id === colId ? { ...column, columnName: colName } : column
      );
      return updatedColumns;
    });
    setEditColumnName("");
    setEditedColumnName("");
  };

  const handleClickRemovecolumn = (colName) => {
    setRemoveColumnName(colName);
  };

  const handleRemovecolumnName = () => {};

  useEffect(() => {
    localStorage.setItem("kbColumns", JSON.stringify(columns));
  }, [columns]);

  useEffect(() => {
    localStorage.setItem("kbTasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="dashboard">
      <div>
        <Sidebar />
      </div>
      <Board />

      <div className="columns-container">
        {columns.map((column) => {
          const { id, columnName } = column;
          return (
            <div key={id}>
              <div className="column">
                <div className="column-title-container">
                  {editColumnName === columnName ? (
                    <input
                      type="text"
                      value={editedColumnName}
                      onChange={handleEditColumnName}
                    />
                  ) : (
                    <h1 className="column-title">{columnName}</h1>
                  )}

                  <button
                    className="btn column-action-icon"
                    onClick={() => handleColumnAction(columnName)}
                  >
                    <BsThreeDotsVertical size={16} />
                  </button>
                </div>

                {columnActionOpen === columnName && (
                  <div className="column-action-container">
                    {editColumnName === columnName ? (
                      <button
                        onClick={() =>
                          handleSaveColumnName(editedColumnName, id)
                        }
                        className="btn column-edit-btn"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleClickEditColumn(columnName)}
                        className="btn column-edit-btn"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() => handleClickRemovecolumn(columnName)}
                      className="btn column-remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {tasks
                  .filter((task) => task.colId === id)
                  .map((task) => {
                    const { id, taskName, description, dueDate } = task;
                    return (
                      <div key={id}>
                        <div className="task-card">
                          <div
                            className="priority"
                            style={{
                              backgroundColor: "#3b7de9",
                            }}
                          >
                            HIGH
                          </div>
                          <h2 className="task-title">{taskName}</h2>
                          <div className="assigned-users-container">
                            <div className="assigned-user">NH</div>
                            <div className="assign-user-icon">+</div>
                          </div>
                          <div className="description-container">
                            <h3 className="description-heading">Description</h3>
                            <p className="description-content">{description}</p>
                          </div>
                          <div className="due-date-container">
                            <h3 className="due-date-heading">Due date</h3>
                            <div className="due-date">{dueDate}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {isAddTask === columnName && (
                  <div className="add-task-section">
                    <div>
                      <label htmlFor="task-name">Title</label>
                      <div className="add-task-title-container">
                        <div>
                          <MdTask size={20} color="#f49d3f" />
                        </div>
                        <div>
                          <input
                            id="task-name"
                            type="text"
                            placeholder="Enter task name"
                            className="add-task-input"
                            value={taskName}
                            onChange={handleChangeTaskName}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="add-description-container">
                      <label
                        htmlFor="add-description"
                        className="add-description-heading"
                      >
                        Description
                      </label>
                      <textarea
                        id="add-description"
                        value={description}
                        onChange={handleAddDescription}
                        className="add-description-content"
                      ></textarea>
                    </div>
                    <div className="due-date-container">
                      <label htmlFor="dueDate" className="due-date-label">
                        Due date
                      </label>
                      <div className="add-due-date">
                        <input
                          id="dueDate"
                          type="date"
                          className="due-date-field"
                          value={dueDate}
                          onChange={handleDuedate}
                        />
                      </div>
                    </div>
                    <div className="btn-group">
                      <button
                        type="button"
                        onClick={() => handleAddTask(id, taskName)}
                        className="add-btn"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelTask}
                        className="cancel-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div
                  className="add-task-container"
                  onClick={() => handleAddClickTask(columnName)}
                >
                  <div className="add-task-icon">+</div>
                  <div className="add-task-text">ADD TASK</div>
                </div>
              </div>
            </div>
          );
        })}
        {isAddColumn && (
          <div className="add-column-input-container">
            <div>
              <input
                type="text"
                placeholder="Enter column name"
                className="add-column-input"
                value={columnName}
                onChange={handleChangeColumnName}
              />
            </div>

            <div className="btn-group">
              <button
                type="button"
                onClick={() => handleAddColumnName(columnName)}
                className="add-btn"
              >
                Add
              </button>
              <button
                type="button"
                onClick={handleCancelColumn}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div>
          <div className="add-column-container" onClick={handleClickAddColumn}>
            <div className="add-column-icon">+</div>
            <div className="add-column-text">ADD COLUMN</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
