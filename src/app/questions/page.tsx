"use server";
import "./index.css";
import Title from "antd/es/typography/Title";
import { message } from "antd";
import { searchQuestionVoByPageUsingPost } from "@/api/questionController";
import QuestionTable from "@/components/QuestionTable";

/**
 * 题目列表页面
 * @constructor
 */
export default async function QuestionsPage({ searchParams }) {
  // 获取搜索参数
  const { q: searchText } = searchParams;
  let questionList = [];
  let total = 0;

  try {
    const res = await searchQuestionVoByPageUsingPost({
      searchText,
      pageSize: 12,
      sortField: "_score",
      sortOrder: "descend",
    });
    questionList = res.data.records ?? [];
    total = res.data.total ?? 0;
  } catch (e) {
    message.error("获取题目列表失败," + e.message);
  }

  return (
    <div id="questionsPage" className="max-width-content">
      <Title level={3}>题目大全</Title>
      <QuestionTable
        defaultQuestionList={questionList}
        defaultTotal={total}
        defaultSearchParams={{
          searchText,
        }}
      />
    </div>
  );
}
