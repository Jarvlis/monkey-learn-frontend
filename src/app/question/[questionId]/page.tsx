"use server";
import "./index.css";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import QuestionCard from "@/components/QuestionCard";

/**
 * 题库题目详情页面
 * @constructor
 */
export default async function QuestionPage({ params }) {
  // 获取搜索参数
  const { questionId } = params;

  // 查询题目信息
  let question = undefined;
  try {
    const res = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = res.data;
  } catch (e) {
    console.error("获取题目详情失败," + e.message);
  }

  if (!question) {
    return <div>获取题目详情失败，请刷新重试</div>;
  }

  return (
    <div id="QuestionPage">
      <QuestionCard question={question} />
    </div>
  );
}
