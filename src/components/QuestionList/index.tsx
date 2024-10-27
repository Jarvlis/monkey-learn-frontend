"use client";
import "./index.css";
import { Card, List } from "antd";
import Link from "next/link";
import TagList from "@/components/TagList";

interface Props {
  questionList?: API.QuestionVO[];
  cardTitle?: string;
  questionBankId?: string;
}

/**
 * 题库列表组件
 * @param props
 * @constructor
 */
const QuestionList = (props: Props) => {
  const { questionList = [], cardTitle, questionBankId } = props;
  return (
    <Card className="questionList" title={cardTitle}>
      <List
        dataSource={questionList}
        renderItem={(item) => (
          <List.Item extra={<TagList tagList={item.tagList} />}>
            <List.Item.Meta
              title={
                <Link
                  href={
                    questionBankId
                      ? `/bank/${questionBankId}/question/${item.id}`
                      : `/question/${item.id}`
                  }
                >
                  {item.title}
                </Link>
              }
            ></List.Item.Meta>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default QuestionList;
