import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import "./index.css";
import { Tag } from "antd";

interface Props {
  tagList?: string[];
}

/**
 * 标签列表组件
 * @param props
 * @constructor
 */
const TagList = (props: Props) => {
  const { tagList = [] } = props;

  return (
    <div className="tagList">
      {tagList.map((item) => {
        return <Tag key={item}>{item}</Tag>;
      })}
    </div>
  );
};

export default TagList;
