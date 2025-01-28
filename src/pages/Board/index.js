import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { sampleTaskData } from "./../../utils/data/sampleTaskData";
import "./index.css";

const Board = () => {
  const priorityStyle = {
    HIGH: "#ed3980",
    MEDIUM: "#377ef1",
    LOW: "#10b4b3",
  };

  return (
    <div>
      <div className="columns-container">
        <div className="column">
          <div className="column-title-container">
            <h1 className="column-title">TO DO</h1>
            <div className="column-edit-icon">
              <BsThreeDotsVertical />
            </div>
          </div>
          {sampleTaskData
            .filter((task) => task.column === "TO DO")
            .map((task) => {
              const {
                id,
                title,
                assignedUsers,
                description,
                due,
                priority,
                column,
              } = task;

              const date = new Date(due);
              const formattedDate = date.toLocaleDateString("en-GB");

              return (
                <div key={id} className="task-card">
                  <div
                    className="priority"
                    style={{
                      backgroundColor: priorityStyle[priority] || "#3b7de9",
                    }}
                  >
                    {priority}
                  </div>
                  <h2 className="task-title">{title}</h2>
                  <div className="assigned-users-container">
                    {assignedUsers.map((user, idx) => (
                      <div key={idx} className="assigned-user">
                        {user}
                      </div>
                    ))}
                    <div className="assign-user-icon">+</div>
                  </div>
                  <div className="description-container">
                    <h3 className="description-heading">Description</h3>
                    <p className="description-content">{description}</p>
                  </div>
                  <div className="due-date-container">
                    <label htmlFor="dueDate" className="due-date-label">
                      Due date
                    </label>
                    <div className="due-date">{formattedDate}</div>
                  </div>
                </div>
              );
            })}
          <div className="add-task-container">
            <div className="add-task-icon">+</div>
            <div className="add-task-text">ADD TASK</div>
          </div>
        </div>
        <div className="column">
          <div className="column-title-container">
            <h1 className="column-title">IN PROGRESS</h1>
            <button className="btn column-action-icon">
              <BsThreeDotsVertical />
            </button>
          </div>
          {sampleTaskData
            .filter((task) => task.column === "IN PROGRESS")
            .map((task) => {
              const {
                id,
                title,
                assignedUsers,
                description,
                due,
                priority,
                column,
              } = task;

              const date = new Date(due);
              const formattedDate = date.toLocaleDateString("en-GB");

              return (
                <div key={id} className="task-card">
                  <div
                    className="priority"
                    style={{
                      backgroundColor: priorityStyle[priority] || "#3b7de9",
                    }}
                  >
                    {priority}
                  </div>
                  <h2 className="task-title">{title}</h2>
                  <div className="assigned-users-container">
                    {assignedUsers.map((user, idx) => (
                      <div key={idx} className="assigned-user">
                        {user}
                      </div>
                    ))}
                    <div className="assign-user-icon">+</div>
                  </div>
                  <div className="description-container">
                    <h3 className="description-heading">Description</h3>
                    <p className="description-content">{description}</p>
                  </div>
                  <div className="due-date-container">
                    <label htmlFor="dueDate" className="due-date-label">
                      Due date
                    </label>
                    <div className="due-date">{formattedDate}</div>
                  </div>
                </div>
              );
            })}
          <div className="add-task-container">
            <div className="add-task-icon">+</div>
            <div className="add-task-text">ADD TASK</div>
          </div>
        </div>
        <div className="column">
          <div className="column-title-container">
            <h1 className="column-title">IN REVIEW</h1>
            <div className="column-edit-icon">
              <BsThreeDotsVertical />
            </div>
          </div>
          {sampleTaskData
            .filter((task) => task.column === "IN REVIEW")
            .map((task) => {
              const {
                id,
                title,
                assignedUsers,
                description,
                due,
                priority,
                column,
              } = task;

              const date = new Date(due);
              const formattedDate = date.toLocaleDateString("en-GB");

              return (
                <div key={id} className="task-card">
                  <div
                    className="priority"
                    style={{
                      backgroundColor: priorityStyle[priority] || "#3b7de9",
                    }}
                  >
                    {priority}
                  </div>
                  <h2 className="task-title">{title}</h2>
                  <div className="assigned-users-container">
                    {assignedUsers.map((user, idx) => (
                      <div key={idx} className="assigned-user">
                        {user}
                      </div>
                    ))}
                    <div className="assign-user-icon">+</div>
                  </div>
                  <div className="description-container">
                    <h3 className="description-heading">Description</h3>
                    <p className="description-content">{description}</p>
                  </div>
                  <div className="due-date-container">
                    <label htmlFor="dueDate" className="due-date-label">
                      Due date
                    </label>
                    <div className="due-date">{formattedDate}</div>
                  </div>
                </div>
              );
            })}
          <div className="add-task-container">
            <div className="add-task-icon">+</div>
            <div className="add-task-text">ADD TASK</div>
          </div>
        </div>
        <div className="column">
          <div className="column-title-container">
            <h1 className="column-title">DONE</h1>
            <div className="column-edit-icon">
              <BsThreeDotsVertical />
            </div>
          </div>
          {sampleTaskData
            .filter((task) => task.column === "DONE")
            .map((task) => {
              const {
                id,
                title,
                assignedUsers,
                description,
                due,
                priority,
                column,
              } = task;

              const date = new Date(due);
              const formattedDate = date.toLocaleDateString("en-GB");

              return (
                <div key={id} className="task-card">
                  <div
                    className="priority"
                    style={{
                      backgroundColor: priorityStyle[priority] || "#3b7de9",
                    }}
                  >
                    {priority}
                  </div>
                  <h2 className="task-title">{title}</h2>
                  <div className="assigned-users-container">
                    {assignedUsers.map((user, idx) => (
                      <div key={idx} className="assigned-user">
                        {user}
                      </div>
                    ))}
                    <div className="assign-user-icon">+</div>
                  </div>
                  <div className="description-container">
                    <h3 className="description-heading">Description</h3>
                    <p className="description-content">{description}</p>
                  </div>
                  <div className="due-date-container">
                    <label htmlFor="dueDate" className="due-date-label">
                      Due date
                    </label>
                    <div className="due-date">{formattedDate}</div>
                  </div>
                </div>
              );
            })}
          <div className="add-task-container">
            <div className="add-task-icon">+</div>
            <div className="add-task-text">ADD TASK</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
