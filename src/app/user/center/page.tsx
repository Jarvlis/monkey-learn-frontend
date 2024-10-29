"use client";
import "./index.css";
import { Avatar, Card, Col, Row } from "antd";
import { useSelector } from "react-redux";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { useState } from "react";
import CalenderChart from "@/app/user/center/components/CalenderChart";

/**
 * 用户中心页面
 * @constructor
 */
export default function UserCenterPage() {
  // 获取用户登录信息
  const loginUser = useSelector((state: any) => state.loginUser);
  // 控制菜单栏的Tab高亮
  const [activeTabKey, setActiveTabKey] = useState("1");
  // 便于复用
  const user = loginUser;
  // 查询题目信息
  // let question = undefined;
  // try {
  //   const res = await getQuestionVoByIdUsingGet({
  //     id: questionId,
  //   });
  // } catch (e) {
  //   console.error("获取题目详情失败," + e.message);
  // }

  return (
    <div id="UserCenterPage">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <Card style={{ textAlign: "center" }}>
            <Avatar src={user.userAvatar} size={72} />
            <div style={{ marginBottom: 16 }}></div>
            <Card.Meta
              title={
                <Title level={3} style={{ marginBottom: 0 }}>
                  {" "}
                  {user.userName}
                </Title>
              }
              description={
                <Paragraph type="secondary">{user.userProfile}</Paragraph>
              }
            ></Card.Meta>
          </Card>
        </Col>
        <Col xs={24} md={18}>
          <Card
            tabList={[
              {
                key: "record",
                label: "刷题记录",
              },
              {
                key: "other",
                label: "其它",
              },
            ]}
            activeTabKey={activeTabKey}
            onTabChange={(key) => setActiveTabKey(key)}
            defaultActiveTabKey={activeTabKey}
          >
            {activeTabKey === "record" && (
              <>
                <CalenderChart />
              </>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
