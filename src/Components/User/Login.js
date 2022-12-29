import React, { useEffect } from "react";
import { Button, Col, Form, Input, message, Row } from "antd";
import LogInData from "../../JSON/users.json";
import { useNavigate } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
import "./user.css";
const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("isLoginToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("password");
  }, [])
  
  const onFinish = (values) => {
    const data = LogInData;
    let encode = btoa(values.password);

    const isSuccess = data.users.filter(
      (x) => x.email === values.username && x.password === values.password
    );
    debugger
    if (Object.keys(isSuccess).length > 0) {
        debugger
        navigate("/invitatoinlist");
      localStorage.setItem("userData", JSON.stringify(isSuccess));
      localStorage.setItem("isLoginToken", true);
      if (encode) {
        localStorage.setItem("password", encode);
      }
      
    } else {
      message.error("Invalid Email or Password");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Header className="login_header">
        <h2>Login to View Invitations</h2>
      </Header>
      <Row>
        <Col span={10} offset={6}>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="login_form"
          >
            <Form.Item
              label="Email"
              name="username"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please input your correct email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default Login;
