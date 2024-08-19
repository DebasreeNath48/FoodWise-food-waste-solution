import React from 'react'
import "../Styles/CSS/chatBubble.css"
import ReactMarkdown from 'react-markdown';

const ChatBubble = ({ message, role }) => {
  return (
    <div className={role === "user" ? 'userBubble' : 'modelBubble'}>
      <ReactMarkdown>{message}</ReactMarkdown>
    </div>
  )
}

export default ChatBubble
