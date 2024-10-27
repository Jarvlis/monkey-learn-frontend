"use client";
import "./index.css";
import { Card } from "antd";
import Title from "antd/es/typography/Title";
import TagList from "@/components/TagList";
import MdViewer from "@/components/MdViewer";

interface Props {
  question: API.QuestionVO;
}

/**
 * 题库列表组件
 * @param props
 * @constructor
 */
const QuestionCard = (props: Props) => {
  const { question } = props;

  return (
    <div className="questionCard">
      <Card>
        <Title level={1}>{question.title}</Title>
        <TagList tagList={question.tagList}></TagList>
        <div style={{ marginBottom: 16 }}></div>
        <MdViewer value={question.content}></MdViewer>
      </Card>
      <div style={{ marginBottom: 16 }}></div>
      <Card title="推荐答案">
        <MdViewer value={question.answer}></MdViewer>
      </Card>
    </div>
  );
};

export default QuestionCard;
