import React, { useState, useContext } from "react";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { VALIDATOR_REQUIRE } from "../components/form-components/validators";

import Container from "react-bootstrap/Container";
import Input from "../components/form-components/input";
import Button from "react-bootstrap/Button";
import { useForm } from "../components/hooks/form-hook";
import { AuthContext } from "../components/context/auth-context";
import "./authenticate.css";

export default function Authenticate() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const authDetails = useContext(AuthContext);
  const [formState, InputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  function switchModeHandler() {
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, userName: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          userName: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((previousMode) => !previousMode);
  }

  async function authSubmitHandler(e) {
    e.preventDefault();
    if (isLoginMode) {
      authDetails.login(
        formState.inputs.email.value,
        formState.inputs.password.value
      );
    } else {
      authDetails.login(
        formState.inputs.email.value,
        formState.inputs.password.value,
        formState.inputs.userName.value
      );
    }
  }

  return (
    <div className="authenticate-box ">
      <div className="auth-form">
        <h1
          style={{
            textAlign: "center",
            color: "white",
          }}
        >
          {isLoginMode ? "Log in!" : "Sign up"}
        </h1>
        <Container
          style={{ justifyContent: "center" }}
          className="display-flex"
        >
          <Col lg={7}>
            <form onSubmit={authSubmitHandler}>
              {!isLoginMode && (
                <React.Fragment>
                  <Input
                    type="text"
                    label="Username"
                    className="auth-input"
                    element="input"
                    id="userName"
                    value={formState.inputs.userName.value}
                    isValid={formState.inputs.userName.value}
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={InputHandler}
                  />
                </React.Fragment>
              )}
              <Input
                type="email"
                element="input"
                id="email"
                value={formState.inputs.email.value}
                label="Email"
                isValid={formState.inputs.email.isValid}
                validators={[VALIDATOR_REQUIRE()]}
                onInput={InputHandler}
              />
              <Input
                type="password"
                value={formState.inputs.password.value}
                element="input"
                id="password"
                label="Password"
                isValid={formState.inputs.password.isValid}
                onInput={InputHandler}
                validators={[VALIDATOR_REQUIRE()]}
              />
              {isLoginMode && (
                <div
                  style={{ justifyContent: "space-between", margin: "15px" }}
                  className="display-flex"
                >
                  <Form.Check type="checkbox" label="Remember me" />
                  <p onClick={switchModeHandler}>Forgot Password?</p>
                </div>
              )}
              {!isLoginMode && (
                <div>
                  <Form.Check
                    className="display-flex"
                    style={{ margin: "0 15px" }}
                    type="checkbox"
                    label="I accept the terms & conditions"
                  />
                </div>
              )}
              <br />
              <Button
                type="submit"
                disabled={!formState.isValid}
                className="form-button"
              >
                {isLoginMode ? "Log in" : "Sign up"}
              </Button>
            </form>

            <Button
              style={{ margin: "10px 10px" }}
              variant="dark"
              onClick={switchModeHandler}
            >
              {isLoginMode ? "Switch To Sign Up" : "Switch To Sign In"}
            </Button>
          </Col>
        </Container>
      </div>
    </div>
  );
}
