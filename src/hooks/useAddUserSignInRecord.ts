import { useEffect, useState } from "react";
import { addUserSignInUsingPost } from "@/api/userController";
import { message } from "antd";

/**
 * 添加用户刷题记录钩子
 */
const useAddUserSignInRecord = () => {
  // 签到状态
  const [loading, setLoading] = useState<boolean>(true);

  // 获取后端数据
  const dofetch = async () => {
    const signRecord = localStorage.getItem("signRecord");
    if (
      signRecord &&
      JSON.parse(signRecord).time === new Date().toLocaleDateString()
    ) {
      return;
    }

    try {
      await addUserSignInUsingPost();
      localStorage.setItem(
        "signRecord",
        JSON.stringify({ time: new Date().toLocaleDateString() }),
      );
    } catch (e) {
      message.error("签到失败" + e.message);
    }
    setLoading(false);
  };

  // 保证只调用一次
  useEffect(() => {
    dofetch();
  }, []);

  return { loading };
};

export default useAddUserSignInRecord;
