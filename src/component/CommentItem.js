import React from "react";
// design
import "antd/dist/antd.css";
import { Rate, Comment, Tooltip, List } from "antd";
import { FcLikePlaceholder } from "react-icons/fc";
import { AiOutlineDislike } from "react-icons/ai";
import moment from "moment";

const CommentItem = (props) => {
  const data = [
    {
      actions: [
        <span key="comment-list-reply-to-0">
          <FcLikePlaceholder /> Like
        </span>,
        <span key="comment-list-reply-to-0">
          <AiOutlineDislike /> Dislike
        </span>,
      ],
      author: `${props.userId}`,
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      content: <p>{props.comment}</p>,
      datetime: (
        <Tooltip title={moment().subtract(1, "days").fromNow()}>
          <span>
            {moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")}
          </span>
        </Tooltip>
      ),
    },
  ];

  return (
    <List
      className="comment-list"
      header={" "}
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <li>
          <Rate value={props.rating} />
          <Comment
            actions={item.actions}
            author={item.author}
            avatar={item.avatar}
            content={item.content}
            datetime={item.datetime}
          />
        </li>
      )}
    />
  );
};

export default CommentItem;
