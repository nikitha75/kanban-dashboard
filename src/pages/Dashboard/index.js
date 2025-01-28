import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { MdTask } from "react-icons/md";
import "./index.css";
import Board from "../Board";
import Sidebar from "./../../components/Sidebar";
import { users, uColors } from "../../utils/data/userData";
import { taskPriorities, priorityStyle } from "../../utils/data/taskData";
import Modal from "../../components/Modal";
import FormModal from "../../components/FormModal";

const Dashboard = () => {
  const [columnName, setColumnName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [assignedUsers, setAssignedUsers] = useState([]);
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
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState("");
  const [addTaskUser, setAddTaskUser] = useState("");
  const [isHoverUser, setIsHoverUser] = useState({});
  const [isRemoveTaskModalOpen, setIsRemoveTaskModalOpen] = useState("");
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState("");
  const [editTaskData, setEditTaskData] = useState({
    taskName: "",
    priority: "",
    description: "",
    dueDate: "",
  });

  const getAssignedUserColor = () => {
    const color = uColors[Math.floor(Math.random() * uColors.length)];
    const colorId = uuidv4();
    return { colorId, ...color };
  };

  const getShortName = (user) => {
    const shortName = user
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase();
    return shortName;
  };

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
        const priorityColors = assignedUsers.map(() => getAssignedUserColor());
        const task = {
          taskId: uuidv4(),
          taskName,
          priority,
          description,
          assignedUsers,
          dueDate,
          colId,
          priorityColors,
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
    // if (columns.some((col) => col.columnName === colName)) {
    //   setColumnErrorMsg("Column name already exist!");
    //   return;
    // }
    setColumns((prevState) => {
      const updatedColumns = prevState.map((column) =>
        column.id === colId ? { ...column, columnName: colName } : column
      );
      return updatedColumns;
    });
    setEditColumnName("");
    setEditedColumnName("");
  };

  const handleChangePriority = (event) => {
    setPriority(event.target.value);
  };

  const handleAssignUsers = (event) => {
    const assignedUserNames = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    const usersAssigned = users.filter((user) =>
      assignedUserNames.includes(user.userName)
    );
    setAssignedUsers(usersAssigned);
  };

  const handleOpenRemoveColumnModal = (columnName) => {
    setIsRemoveModalOpen(columnName);
  };

  const handleRemoveColumn = (colId) => {
    setColumns((prevState) =>
      prevState.filter((column) => column.id !== colId)
    );
    setIsRemoveModalOpen("");
  };

  const handleCloseColumnModal = () => {
    setIsRemoveModalOpen(false);
  };

  const handleOpenRemoveTaskModal = (taskName) => {
    setIsRemoveTaskModalOpen(taskName);
  };

  const handleRemoveTask = (taskId) => {
    setTasks((prevState) => prevState.filter((task) => task.taskId !== taskId));
    setIsRemoveTaskModalOpen("");
  };

  const handleCloseTaskModal = () => {
    setIsRemoveTaskModalOpen(false);
  };

  const handleClickAddUser = (taskId) => {
    setAddTaskUser(taskId);
  };

  const handleAddUser = (tId, user) => {
    setTasks((prevState) =>
      prevState.map((task) => {
        if (task.taskId === tId) {
          const isUserExist = task.assignedUsers.some(
            (assignedUser) => assignedUser.userName === user.userName
          );
          if (!isUserExist) {
            return { ...task, assignedUsers: [...task.assignedUsers, user] };
          }
        }
        return task;
      })
    );
  };

  const handleRemoveUser = (tId, user) => {
    setTasks((prevState) =>
      prevState.map((task) => {
        if (task.taskId === tId) {
          const updatedAssignedUsers = task.assignedUsers.filter(
            (assignedUser) => {
              return assignedUser.userId !== user.userId;
            }
          );
          return { ...task, assignedUsers: updatedAssignedUsers };
        }
        return task;
      })
    );
  };

  const handleHoverUser = (tId, userId) => {
    setIsHoverUser({ tId, userId });
  };

  const handleOpenEditTaskModal = (taskName, task) => {
    setIsEditTaskModalOpen(taskName);
    setEditTaskData({
      taskName: task.taskName,
      priority: task.priority,
      description: task.description,
      dueDate: task.dueDate,
    });
  };

  const handleChangeEditTask = (event) => {
    const { name, value } = event.target;
    // console.log("name val: ", name, value);
    setEditTaskData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditTask = (tId) => {
    // setTasks((prevState) => prevState.filter((task) => task.taskId !== tId));
    setTasks((prevState) =>
      prevState.map((task) =>
        task.taskId === tId ? { ...task, ...editTaskData } : task
      )
    );
    setIsEditTaskModalOpen("");
  };

  const handleCloseEditTaskModal = () => {
    setIsEditTaskModalOpen(false);
  };

  const handleClickOutsideUser = (event) => {
    if (!event.target.closest(".users-list")) {
      setAddTaskUser("");
    }
  };

  const handleClickOutsideColumnAction = (event) => {
    if (!event.target.closest(".column-actions-list")) {
      setColumnActionOpen("");
    }
  };

  useEffect(() => {
    localStorage.setItem("kbColumns", JSON.stringify(columns));
  }, [columns]);

  useEffect(() => {
    localStorage.setItem("kbTasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideUser);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideUser);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideColumnAction);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideColumnAction);
    };
  }, []);

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
                  <div className="column-action-container column-actions-list">
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
                      onClick={() => handleOpenRemoveColumnModal(columnName)}
                      className="btn column-remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {isRemoveModalOpen === columnName && (
                  <Modal
                    id={id}
                    name={columnName}
                    type="column"
                    handleRemove={handleRemoveColumn}
                    handleCloseModal={handleCloseColumnModal}
                  />
                )}

                {tasks
                  .filter((task) => task.colId === id)
                  .map((task) => {
                    const {
                      taskId,
                      taskName,
                      priority,
                      assignedUsers,
                      description,
                      dueDate,
                      priorityColors,
                    } = task;
                    const date = new Date(dueDate);
                    const formattedDate = date.toLocaleDateString("en-GB");
                    return (
                      <div key={taskId}>
                        <div className="task-card">
                          <div className="task-header">
                            <div
                              className="priority"
                              style={{
                                backgroundColor: priorityStyle[priority],
                              }}
                            >
                              {priority}
                            </div>
                            <div className="task-action-items-container">
                              <div
                                className="task-action-item"
                                onClick={() =>
                                  handleOpenEditTaskModal(taskName, task)
                                }
                              >
                                <FaPencilAlt />
                              </div>
                              <div
                                className="task-action-item"
                                onClick={() =>
                                  handleOpenRemoveTaskModal(taskName)
                                }
                              >
                                <FaTrashAlt />
                              </div>
                            </div>
                          </div>
                          {isRemoveTaskModalOpen === taskName && (
                            <Modal
                              id={taskId}
                              name={taskName}
                              type="task"
                              handleRemove={handleRemoveTask}
                              handleCloseModal={handleCloseTaskModal}
                            />
                          )}
                          <h2 className="task-title">{taskName}</h2>
                          <div className="users-container">
                            <div className="assigned-users-container">
                              {assignedUsers.length > 0 &&
                                assignedUsers.map((user, idx) => {
                                  const colorIdx = idx % priorityColors.length;
                                  const { bgColor, color } =
                                    priorityColors[colorIdx];
                                  return (
                                    <div
                                      key={idx}
                                      className="assign-container"
                                      onMouseEnter={() =>
                                        handleHoverUser(taskId, user.userId)
                                      }
                                      onMouseLeave={() =>
                                        handleHoverUser("", "")
                                      }
                                      onClick={() =>
                                        handleRemoveUser(taskId, user)
                                      }
                                    >
                                      <div
                                        className="assigned-user"
                                        style={{
                                          backgroundColor: bgColor,
                                          color: color,
                                        }}
                                      >
                                        {getShortName(user.userName)}
                                      </div>
                                      {isHoverUser.tId === taskId &&
                                        isHoverUser.userId === user.userId && (
                                          <div className="unassign-user-icon">
                                            <IoIosCloseCircle size={14} />
                                          </div>
                                        )}
                                    </div>
                                  );
                                })}
                              <div
                                className="assign-user-icon"
                                onClick={() => handleClickAddUser(taskId)}
                              >
                                +
                              </div>
                            </div>
                            {addTaskUser === taskId && (
                              <div className="add-new-user users-list">
                                {users.map((user) => {
                                  const { userId, userName } = user;
                                  return (
                                    <div
                                      key={userId}
                                      className="new-user"
                                      onClick={() =>
                                        handleAddUser(taskId, user)
                                      }
                                    >
                                      {userName}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                          <div className="description-container">
                            <h3 className="description-heading">Description</h3>
                            <p className="description-content">
                              {description.length > 0 ? description : "-"}
                            </p>
                          </div>
                          <div className="due-date-container">
                            <h3 className="due-date-heading">Due date</h3>
                            <div className="due-date">
                              {dueDate
                                ? formattedDate
                                : dueDate === "" && "No due date"}
                            </div>
                          </div>
                        </div>
                        {isEditTaskModalOpen === taskName && (
                          <FormModal
                            editTaskData={editTaskData}
                            taskId={taskId}
                            handleChangeEditTask={handleChangeEditTask}
                            taskPriorities={taskPriorities}
                            handleEditTask={handleEditTask}
                            handleCloseEditTaskModal={handleCloseEditTaskModal}
                          />
                        )}
                      </div>
                    );
                  })}
                {isAddTask === columnName && (
                  <div className="add-task-section">
                    <div>
                      <label
                        htmlFor="task-name"
                        className="add-task-title-heading"
                      >
                        Title
                      </label>
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
                    <div>
                      <div className="add-task-priority-container">
                        <label
                          htmlFor="task-priority"
                          className="add-task-priority-heading"
                        >
                          Priority
                        </label>
                        <div>
                          <select
                            id="task-priority"
                            className="add-task-priority"
                            value={priority}
                            onChange={handleChangePriority}
                          >
                            {taskPriorities.map((taskPriority) => {
                              const { priorityId, priority } = taskPriority;
                              return (
                                <option key={priorityId}>{priority}</option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="assign-user-container">
                      <label
                        htmlFor="assign-user"
                        className="assign-user-label"
                      >
                        Assign user(s)
                      </label>
                      <div className="assign-user-dropdown">
                        <select
                          id="assign-user"
                          className="assign-user"
                          value={assignedUsers.map((user) => user.userName)}
                          onChange={handleAssignUsers}
                          multiple
                        >
                          <option disabled>Select user</option>
                          {users.map((user) => {
                            const { userId, userName } = user;
                            return (
                              <option key={userId} value={userName}>
                                {userName}
                              </option>
                            );
                          })}
                        </select>
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
                    <div className="add-due-date-container">
                      <label htmlFor="dueDate" className="add-due-date-label">
                        Due date
                      </label>
                      <div className="add-due-date">
                        <input
                          id="dueDate"
                          type="date"
                          className="add-due-date-field"
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
