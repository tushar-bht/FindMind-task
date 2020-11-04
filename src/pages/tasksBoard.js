import React, { useState } from "react";
import MainNavigation from "../components/mainNavigation";
import TaskCard from "../components/util/card";
import icon from "../components/icons/plus.svg";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Modal from "react-bootstrap/Modal";
import "./tasksBoard.css";

export default function TasksBoard() {
  const [boardList, setBoardList] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [newBoard, setNewBoard] = useState("");

  function handleClick() {
    setAddModal(true);
  }
  function changeHandler(event) {
    setNewBoard(event.target.value);
  }

  function addBoardHandler() {
    setBoardList((prev) => [...prev, newBoard]);
    setNewBoard("");
    setAddModal(false);
  }

  return (
    <div>
      <Modal
        show={addModal}
        onHide={() => setAddModal(false)}
        centered
        animation={true}
      >
        <Modal.Header>
          <div
            style={{ justifyContent: "space-between", width: "100%" }}
            className="display-flex add-task"
          >
            <input
              type="text"
              placeholder="New List"
              onChange={changeHandler}
              value={newBoard}
              autoFocus
            />
            <AddCircleIcon
              fontSize="large"
              className="blue-color"
              onClick={addBoardHandler}
            />
          </div>
        </Modal.Header>
      </Modal>
      <MainNavigation />

      <div className="main-content">
        <TaskCard boardName="My Tasks" />

        {boardList.map((boardName, index) => (
          <TaskCard key={index} boardName={boardName} />
        ))}
        <div>
          <img
            onClick={handleClick}
            className="add-task-board"
            src={icon}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
