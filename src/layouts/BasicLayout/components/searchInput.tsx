import { Input } from "antd";
import React from "react";
import { useRouter } from "next/navigation";

const SearchInput = () => {
  const router = useRouter();
  return (
    <div
      className="serchInput"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        marginInlineEnd: 24,
      }}
    >
      <Input.Search
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
        }}
        placeholder="搜索题目"
        variant="borderless"
        onSearch={(value) => router.push(`/questions?q=${value}`)}
      />
    </div>
  );
};

export default SearchInput;
