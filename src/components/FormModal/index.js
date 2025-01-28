import React from "react";
import "./index.css";

const FormModal = ({
  taskId,
  editTaskData,
  handleChangeEditTask,
  taskPriorities,
  handleEditTask,
  handleCloseEditTaskModal,
}) => {
  return (
    <div className="form-overlay">
      <div className="form-modal">
        <h1 className="form-modal-heading">Edit Task Details</h1>
        <div>
          <div className="form-edit-task-section">
            <div className="form-edit-task-title-container">
              <label
                htmlFor="form-edit-task-name"
                className="form-edit-task-title-heading"
              >
                Title
              </label>
              <div className="form-edit-task-title-field">
                <input
                  id="edit-task-name"
                  type="text"
                  name="taskName"
                  placeholder="Enter task name"
                  className="form-edit-task-input"
                  value={editTaskData.taskName}
                  onChange={handleChangeEditTask}
                />
              </div>
            </div>
            <div>
              <div className="form-edit-task-priority-container">
                <label
                  htmlFor="task-priority"
                  className="form-edit-task-priority-heading"
                >
                  Priority
                </label>
                <div>
                  <select
                    id="task-priority"
                    name="priority"
                    className="form-edit-task-priority"
                    value={editTaskData.priority}
                    onChange={handleChangeEditTask}
                  >
                    {taskPriorities.map((taskPriority) => {
                      const { priorityId, priority } = taskPriority;
                      return <option key={priorityId}>{priority}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="form-edit-description-container">
              <label
                htmlFor="edit-description"
                className="form-edit-description-heading"
              >
                Description
              </label>
              <textarea
                id="edit-description"
                name="description"
                value={editTaskData.description}
                onChange={handleChangeEditTask}
                className="form-edit-description-content"
              ></textarea>
            </div>
            <div className="form-edit-due-date-container">
              <label htmlFor="dueDate" className="form-edit-due-date-label">
                Due date
              </label>
              <div className="form-edit-due-date">
                <input
                  id="dueDate"
                  type="date"
                  name="dueDate"
                  className="form-edit-due-date-field"
                  value={editTaskData.dueDate}
                  onChange={handleChangeEditTask}
                />
              </div>
            </div>
            <div className="form-modal-btn-container">
              <button
                type="button"
                className="form-modal-btn-success"
                onClick={() => handleEditTask(taskId)}
              >
                Save
              </button>
              <button
                type="button"
                className="form-modal-btn-cancel"
                onClick={handleCloseEditTaskModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
