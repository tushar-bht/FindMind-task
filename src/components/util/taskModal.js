import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import Form from "react-bootstrap/Form";
export default function TaskModal(props) {
  const [taskDetails, setTaskDetails] = useState();

  function detailsChangeHandler(event) {
    setTaskDetails(event.target.value);
  }

  function closeHandler() {
    let obj = {
      taskName: props.task[0].taskName,
      description: taskDetails,
      date: null,
    };
    props.onHide(obj);
  }

  return (
    <Modal onHide={closeHandler} show={props.show} className="blue-color">
      <Modal.Header closeButton>
        <DeleteOutlineRoundedIcon onClick={props.onRemove} />
      </Modal.Header>

      {props.task[0] && (
        <Modal.Body>
          <p>{props.task[0].taskName}</p>
          <Form.Control
            as="textarea"
            onChange={detailsChangeHandler}
            style={{ backgroundColor: "rgb(240,245,250)", outline: "none" }}
            placeholder="Add details"
            value={taskDetails}
            rows={3}
          />
          <br />
          <p>Add date</p>
          <p>Move to another list</p>
        </Modal.Body>
      )}
    </Modal>
  );
}
