import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonUncheckedRounded";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TaskModal from "./taskModal";
import "./card.css";

let currentTask = null;
let currentIndex = null;
export default function TaskCard(props) {
  const [addTask, setAddTask] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [tasksList, setTasksList] = useState([]);
  const [completedTasksList, setCompletedTasksList] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const changeHandler = (event) => setNewTask(event.target.value);

  function addTaskHandler() {
    setTasksList((prev) => {
      return [...prev, { taskName: newTask, description: null, date: null }];
    });
    setNewTask("");
    setAddTask(false);
  }

  function taskCheckHandler(index) {
    setCompletedTasksList((prev) => [
      ...prev,
      ...tasksList.filter((task, ind) => ind === index),
    ]);

    console.log(completedTasksList);

    setTasksList(tasksList.filter((task, ind) => ind !== index));
  }

  function editTaskHandler(index) {
    currentTask = tasksList.filter((task, ind) => ind === index);
    currentIndex = index;
    setShowTaskModal(true);
  }

  function modifyTask(value) {
    setShowTaskModal(false);
    let allTasks = tasksList;
    allTasks.splice(currentIndex, 1, value);
    setTasksList(allTasks);
  }

  function taskDeleteHandler() {
    setTasksList(tasksList.filter((task, ind) => ind !== currentIndex));
    setShowTaskModal(false);
  }

  return (
    <React.Fragment>
      {showTaskModal && (
        <TaskModal
          show={showTaskModal}
          onHide={modifyTask}
          task={currentTask}
          index={currentIndex}
          onRemove={taskDeleteHandler}
        />
      )}
      <Card className="task-card" style={{ width: "20rem" }}>
        <Card.Body>
          <Card.Title
            style={{
              fontSize: "15px",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
            className="blue-color display-flex"
          >
            <span>{props.boardName}</span>
            <MoreVertIcon />
          </Card.Title>
          <Card.Text>
            {addTask && (
              <div
                style={{ justifyContent: "space-between" }}
                className="display-flex add-task"
              >
                <input
                  type="text"
                  placeholder="New Task"
                  onChange={changeHandler}
                  value={newTask}
                  autoFocus
                />
                <AddCircleIcon
                  fontSize="large"
                  className="blue-color"
                  onClick={addTaskHandler}
                />
              </div>
            )}

            {!addTask && (
              <div className="display-flex add-task">
                <span style={{ margin: "0 30px 0 0" }}>
                  <AddCircleIcon
                    fontSize="large"
                    className="blue-color"
                    onClick={() => setAddTask((prev) => !prev)}
                  />
                </span>
                <span className="blue-color">Add a task</span>
              </div>
            )}
          </Card.Text>

          <ul className="active-tasks list">
            {tasksList.map((task, index) => {
              return (
                <li key={index} className="list-items blue-color">
                  <div
                    className=" display-flex"
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="display-flex"
                      style={{ alignItems: "center" }}
                    >
                      <span>
                        <RadioButtonUncheckedRoundedIcon
                          className="blue-color"
                          fontSize="large"
                          onClick={() => taskCheckHandler(index)}
                        />
                      </span>
                      <div style={{ margin: "0 0 0 30px" }}>
                        {task.taskName}
                      </div>
                    </div>
                    <CreateRoundedIcon
                      fontSize="small"
                      className="blue-color"
                      onClick={() => editTaskHandler(index)}
                    />
                  </div>
                  <p style={{ fontSize: "small", marginLeft: "65px" }}>
                    {task.description}
                  </p>
                </li>
              );
            })}
          </ul>

          <ul className="completed-tasks list">
            {!!completedTasksList.length && (
              <p>Completed ({completedTasksList.length})</p>
            )}
            {completedTasksList.map((task, index) => {
              return (
                <li className="list-items display-flex" key={index}>
                  <span>
                    <CheckCircleOutlineRoundedIcon fontSize="large" />
                  </span>
                  <div style={{ margin: "0 0 0 30px" }}> {task.taskName}</div>
                </li>
              );
            })}
          </ul>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}
