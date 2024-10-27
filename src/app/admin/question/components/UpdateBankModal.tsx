"use client";
import { Form, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import {
  addQuestionBankQuestionUsingPost,
  listQuestionBankQuestionVoByPageUsingPost,
  removeQuestionBankQuestionUsingPost,
} from "@/api/questionBankQuestionController";
import { useForm } from "antd/es/form/Form";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";

interface Props {
  questionId?: number;
  visible: boolean;
  onCancel: () => void;
}

/**
 * 更新所属题库弹窗
 * @param props
 * @constructor
 */
const UpdateBankModal: React.FC<Props> = (props) => {
  const { questionId, visible, onCancel } = props;
  const [questionBankList, setQuestionBankList] = useState<
    API.QuestionBankVO[]
  >([]);
  const [form] = useForm();

  // 获取所属题库列表
  const getCurrentQuestionBankIdList = async () => {
    try {
      const res = await listQuestionBankQuestionVoByPageUsingPost({
        questionId,
        pageSize: 20,
      });
      const list = (res.data?.records ?? []).map((item) => item.questionBankId);
      form.setFieldValue("questionBankIdList", list);
    } catch (e) {
      message.error("获取所属题库失败" + e.message);
    }
  };

  // 获取题库列表
  const getQuestionBankList = async () => {
    const pageSize = 200;
    try {
      const res = await listQuestionBankVoByPageUsingPost({
        pageSize,
        sortField: "createTime",
        sortOrder: "descend",
      });
      const list = res.data?.records ?? [];
      setQuestionBankList(list);
    } catch (e) {
      console.error("获取题库列表失败," + e.message);
    }
  };

  useEffect(() => {
    if (questionId) {
      getCurrentQuestionBankIdList();
    }
  }, [questionId]);

  useEffect(() => {
    getQuestionBankList();
  }, []);

  return (
    <Modal
      destroyOnClose
      title={"更新所属题库"}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <Form form={form}>
        <Form.Item
          label={"所属题库"}
          style={{ marginBottom: 16 }}
          name={"questionBankIdList"}
        >
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            options={questionBankList.map((item) => ({
              label: item.title,
              value: item.id,
            }))}
            onSelect={async (value) => {
              const hide = message.loading("正在更新");
              try {
                await addQuestionBankQuestionUsingPost({
                  questionId,
                  questionBankId: value,
                });
                hide();
                message.success("绑定题库成功");
              } catch (error: any) {
                hide();
                message.error("绑定题库失败，" + error.message);
              }
            }}
            onDeselect={async (value) => {
              const hide = message.loading("正在更新");
              try {
                await removeQuestionBankQuestionUsingPost({
                  questionId,
                  questionBankId: value,
                });
                hide();
                message.success("取消绑定题库成功");
              } catch (error: any) {
                hide();
                message.error("取消绑定题库失败，" + error.message);
              }
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default UpdateBankModal;
