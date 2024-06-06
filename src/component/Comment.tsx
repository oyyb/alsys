import { Avatar, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { ReactNode } from 'react';

const { Text, Paragraph } = Typography;

export interface CommentPropsTyps {
  author: string,
  content: string | ReactNode,
  avatar?: string | ReactNode,
  createTime?: string | Dayjs,
  children?: ReactNode
  actions?: Array<string | ReactNode>
}

const Comment = (props: CommentPropsTyps) => {
  return (
    <div style={{ textAlign: "start" }}>
      {props.avatar ? <Avatar src={props.avatar} alt={props.author} /> : <></>}
      <div style={{ display: 'flex', alignItems: "center", justifyContent: 'start' }}>
        <Text style={{ marginRight: '30px', fontSize: "18px" }}>{props.author}</Text><Text type="secondary">{dayjs(props.createTime).format('YYYY-MM-DD HH:mm')}</Text>
      </div>
      <div className="comment-content">
        <Paragraph style={{ textIndent: '2rem' }}>
          {props.content}
        </Paragraph>
      </div>
      {props.actions ? props.actions.map((val, idx) => {
        return val
      }) : <></>}
      {props.children}
    </div>
  )
};

export default Comment;