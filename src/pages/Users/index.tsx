import { SearchOutlined } from "@ant-design/icons";
import { Card, Table, Form, Input, Button } from "antd";

function Users() {
  return (
    <Card title="用户信息">
      <Form layout="inline">
        <Form.Item label="用户名">
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item>
          <Button icon={<SearchOutlined />} type="primary" />
        </Form.Item>
      </Form>
      <Table />
    </Card>
  );
}

export default Users;
