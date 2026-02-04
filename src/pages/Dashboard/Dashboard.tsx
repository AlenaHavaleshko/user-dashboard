import { Layout, Table, Card, Avatar, Spin, Alert, Button } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useFetchUsers } from "../../features/users/useFetchUsers";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import type { User } from "../../features/users/type";
import styles from "./Dashboard.module.scss";

const { Content } = Layout;

const Dashboard = () => {
  const { users, isLoading, error } = useFetchUsers();
  const currentUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const columns: ColumnsType<User> = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      responsive: ["sm"],
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
      responsive: ["sm"],
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
      responsive: ["xs"],
    },
  ];

  if (isLoading) {
    return (
      <div className={styles.spinContainer}>
        <Spin size="large" tip="Loading users..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <Layout className={styles.layout}>
      <Content className={styles.container}>
        <div className={styles.header}>
          <h1>Dashboard</h1>
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>

        {/* Current User Card */}
        {currentUser && (
          <Card
            className={styles.currentUserCard}
            title="Current User Information"
          >
            <div className={styles.userInfo}>
              <Avatar
                size={100}
                src={currentUser.image}
                icon={<UserOutlined />}
                className={styles.avatar}
              />
              <div className={styles.userDetails}>
                <div className={styles.userField}>
                  <strong>Name:</strong> {currentUser.firstName}{" "}
                  {currentUser.lastName}
                </div>
                <div className={styles.userField}>
                  <strong>Username:</strong> @{currentUser.username}
                </div>
                <div className={styles.userField}>
                  <strong>Email:</strong> {currentUser.email}
                </div>
                <div className={styles.userField}>
                  <strong>Gender:</strong> {currentUser.gender}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Users Table */}
        <Card
          className={styles.usersCard}
          title={`All Users (${users.length} total)`}
        >
          <Table
            columns={columns}
            dataSource={users}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} users`,
            }}
            scroll={{ x: 400 }}
          />
        </Card>
      </Content>
    </Layout>
  );
};

export default Dashboard;
