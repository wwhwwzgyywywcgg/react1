import { Form, Input, Button, Checkbox, message } from "antd";
import { useHistory } from "react-router-dom";
import yy from "../assets/images/yy.png";
import {loginAPI} from "../services/auth"
import { setToken } from "../utils/tools";
function Login() {
  const {replace} = useHistory();
  const onFinish = async(values: any) => {
    console.log("Success:", values);
    const res = await loginAPI(values)
    if(res.code ===1){
      setToken(res.data);
      message.success("登录成功");
      replace("/admin/dashboard");
    } else {
      message.error(res.data);
    }
    
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Form
      style={{width:"500px",position:"relative"}}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <img src={yy} alt="" style={{position:"absolute",top:"-180px",opacity:"0.7"}} />
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
}

export default Login;
