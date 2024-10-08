import { Button, Result } from "antd";

const Forbidden = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="对不起，您没有权限访问该页面"
      extra={
        <Button type="primary" href="/">
          返回首页
        </Button>
      }
    />
  );
};

export default Forbidden;
