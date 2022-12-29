import React, { useEffect, useMemo, useState } from "react";
import {
  Divider,
  Table,
  Tag,
  Avatar,
  Modal,
  Button,
  Row,
  Col,
  message,
  notification,
  
} from "antd";
import { Header } from "antd/es/layout/layout";
import { UserOutlined, RadiusBottomrightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  InvitationListData,
} from "../../redux/invitatoins/invitation.action";
import {
  inv_list,
  upd_inv_list,
} from "../../redux/invitatoins/invitaton.selector";
import "./invitatonlist.css";

const Context = React.createContext({
    name: 'Default',
  });
const Invitatoinlist = () => {
  const isLoggedIn = localStorage.getItem("isLoginToken");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const invList = useSelector(inv_list);
  const updInvList = useSelector(upd_inv_list);
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: `New Notification`,
      description: <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>,
      placement,
    });
  };
  const contextValue = useMemo(
    () => ({
      name: 'Someone sent you new invitation for something, please check!',
    }),
    [],
  );
  useEffect(() => {
    let islogin = localStorage.getItem('isLoginToken')
    let userObj = localStorage.getItem("userData");
    if (islogin) {
        let filter = invList?.filter((x) => x.user_id == JSON.parse(userObj).map((x) => x.user_id)[0]);
        dispatch(InvitationListData(filter));
        const filter2 = updInvList.filter((x) => x.user_id == JSON.parse(userObj).map((x) => x.user_id)[0]);
        // message.info("New Invitation Found!");
        const inre = setInterval(() => {
          if (Object.keys(filter2).length > 0) {
            filter.push(filter2[0]);
            dispatch(InvitationListData(filter));
            filter2.splice(0, 1);
            openNotification('bottomRight')
          }
        }, 5000);
        if (Object.keys(filter2).length === 0) {
          clearInterval(inre);
        }
    } else {
        navigate("/");
    }
  }, []);
  const columns = [
    {
      title: "Id",
      dataIndex: "invite_id",
      key: "invite_id",
      render: (invite_id) => <a>{invite_id}</a>,
    },
    {
      title: "Name",
      dataIndex: "sender_id",
      key: "sender_id",
      render: (sender_id) => <a>{sender_id}</a>,
    },
    {
      title: "Message",
      dataIndex: "invite",
      key: "invite",
      render: (invite) => <p>{invite}</p>,
    },
    {
      title: "Vector",
      dataIndex: "vector",
      key: "vector",
      render: (vector) => <p>{vector}</p>,
    },
    {
      title: "status",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <>
          {/* {
              let color = status.length > 5 ? "geekblue" : "green";
                if (tag === "unread") {
                  color = "volcano";
                }
                return (
                );
            } */}
          {status === "unread" ? (
            <>
              <Tag color={"red"} key={status}>
                {status}
              </Tag>
            </>
          ) : (
            <>
              <Tag color={"green"} key={status}>
                {status}
              </Tag>
            </>
          )}
          {/* {status.map((tag) => {
                let color = status.length > 5 ? "geekblue" : "green";
                if (tag === "unread") {
                  color = "volcano";
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })} */}
        </>
      ),
    },
  ];
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    localStorage.removeItem("isLoginToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("password");
    navigate("/");
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
     <Context.Provider value={contextValue}>
     {contextHolder}
     {/* <RadiusBottomrightOutlined /> */}
     </Context.Provider>
      <Header>
        {isLoggedIn ? (
          <>
            <Avatar
              className="prfl_avtr"
              icon={<UserOutlined />}
              onClick={showModal}
            />
          </>
        ) : (
          <></>
        )}
      </Header>
      <Divider />
      <Row>
        <Col
          span={23}
          xs={{
            order: 4,
          }}
          sm={{
            order: 3,
          }}
          md={{
            order: 1,
          }}
          lg={{
            order: 2,
          }}
        >
          <Table
            className="list_tbl"
            pagination={false}
            columns={columns}
            dataSource={invList}
          />
          ;
        </Col>
      </Row>
      <Modal
        open={isModalOpen}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="profilte_modal">
          <h2>Logout Confirm?</h2>
          <Button type="primary" onClick={handleOk}>
            Yes
          </Button>
          <Button type="ghost" onClick={handleCancel}>
            No
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default Invitatoinlist;
