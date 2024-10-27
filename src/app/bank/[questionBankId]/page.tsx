"use server";
import "./index.css";
import { Avatar, Button, Card } from "antd";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import QuestionList from "@/components/QuestionList";

/**
 * 题库详情页面
 * @constructor
 */
export default async function BankPage({ params }) {
  // 获取搜索参数
  const { questionBankId } = params;
  let bank = undefined;

  try {
    const res = await getQuestionBankVoByIdUsingGet({
      pageSize: 200,
      id: questionBankId,
      needQueryQuestionList: true,
    });
    bank = res.data;
  } catch (e) {
    console.error("获取题目列表失败," + e.message);
  }

  if (!bank) {
    return <div>获取题库列表失败，请刷新重试</div>;
  }

  let firstQuestionId = undefined;
  if (bank.questionPage?.records && bank.questionPage.records.length > 0) {
    firstQuestionId = bank.questionPage.records[0].id;
  }

  return (
    <div id="questionsPage" className="max-width-content">
      <Card>
        <Meta
          avatar={<Avatar src={bank.picture} size={72} />}
          title={
            <Title level={3} style={{ marginBottom: 0 }}>
              {bank.title}
            </Title>
          }
          description={
            <>
              <Paragraph type={"secondary"}>{bank.description}</Paragraph>
              <Button
                type="primary"
                shape="round"
                href={`/bank/${questionBankId}/question/${firstQuestionId}`}
                target="_blank"
                disabled={!firstQuestionId}
              >
                开始刷题
              </Button>
            </>
          }
        />
      </Card>
      <div style={{ marginBottom: 16 }}></div>
      <QuestionList
        cardTitle={"题目列表"}
        questionList={bank.questionPage?.records ?? []}
        questionBankId={questionBankId}
      ></QuestionList>
    </div>
  );
}
