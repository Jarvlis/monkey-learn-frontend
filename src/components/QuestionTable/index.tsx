"use client";
import { searchQuestionVoByPageUsingPost } from "@/api/questionController";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import React, { useRef, useState } from "react";
import TagList from "@/components/TagList";
import Link from "next/link";

interface Props {
  defaultQuestionList?: API.QuestionVO[];
  defaultTotal?: number;
  defaultSearchParams?: API.QuestionQueryRequest;
}

/**
 * 题目表格组件
 *
 * @constructor
 */
const QuestionTable: React.FC = (props: Props) => {
  const { defaultQuestionList, defaultTotal, defaultSearchParams = {} } = props;
  const actionRef = useRef<ActionType>();
  const [questionList, setQuestionList] = useState<API.QuestionVO[]>(
    defaultQuestionList || [],
  );
  const [total, setTotal] = useState<number>(defaultTotal || 0);
  const [isFirst, setIsFirst] = useState<boolean>(true);

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.Question>[] = [
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
      hideInSearch: true,
      render: (_, record: API.QuestionVO) => {
        return <Link href={`/question/${record.id}`}>{record.title}</Link>;
      },
    },
    {
      title: "搜索",
      dataIndex: "searchText",
      valueType: "text",
      hideInTable: true,
    },
    {
      title: "标签",
      dataIndex: "tagList",
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      render: (_, record: API.QuestionVO) => {
        return <TagList tagList={record.tagList} />;
      },
    },
  ];

  return (
    <div className="questionTable">
      <ProTable<API.QuestionVO>
        actionRef={actionRef}
        search={{
          labelWidth: "auto",
        }}
        form={{
          initialValues: defaultSearchParams,
        }}
        pagination={{
          pageSize: 12,
          showTotal: (total) => `共 ${total} 条`,
          showSizeChanger: false,
          total,
        }}
        dataSource={questionList}
        size="large"
        request={async (params, sort, filter) => {
          // 首次请求
          if (isFirst) {
            setIsFirst(false);
            if (defaultQuestionList && defaultTotal) {
              return {};
            }
          }

          const sortField = Object.keys(sort)?.[0] || "createTime";
          const sortOrder = sort?.[sortField] || "descend";

          const { data, code } = await searchQuestionVoByPageUsingPost({
            ...params,
            sortField: "_score",
            sortOrder,
            ...filter,
          } as API.QuestionQueryRequest);

          // 更新结果
          setQuestionList(data?.records || []);
          setTotal(Number(data?.total) || 0);

          return {
            success: code === 0,
            data: data?.records || [],
            total: Number(data?.total) || 0,
          };
        }}
        columns={columns}
      />
    </div>
  );
};
export default QuestionTable;
