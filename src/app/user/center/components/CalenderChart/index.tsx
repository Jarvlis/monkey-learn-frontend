import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import "./index.css";
import dayjs from "dayjs";
import { getUserSignInRecordUsingGet } from "@/api/userController";
import { message } from "antd";

const CalenderChart = () => {
  // 签到日期表
  const [dataList, setDataList] = useState<number[]>([1, 20]);
  // 计算图表所需数据
  const year = new Date().getFullYear();

  // 获取后端数据
  const fetchDataList = async () => {
    try {
      const res = await getUserSignInRecordUsingGet({ year });
      setDataList(res.data);
    } catch (e) {
      message.error(e);
    }
  };

  // 保证只调用一次
  useEffect(() => {
    fetchDataList();
  }, []);

  const optionsData = dataList.map((dayofYear) => {
    const dateStr = dayjs(`${year}-01-01`)
      .add(dayofYear - 1, "day")
      .format("YYYY-MM-DD");
    return [dateStr, 1];
  });

  const options = {
    visualMap: {
      show: false,
      min: 0,
      max: 1,
      inRange: {
        color: ["#efefef", "#a8ea98"],
      },
    },
    calendar: {
      range: "2024",
      left: 0,
      yearLabel: {
        position: "top",
        formatter: `${year} 年刷题记录`,
      },
      cellSize: ["auto", 16],
    },
    series: {
      type: "heatmap",
      coordinateSystem: "calendar",
      data: optionsData,
    },
  };
  return <ReactECharts className="CalenderChart" option={options} />;
};

export default CalenderChart;
