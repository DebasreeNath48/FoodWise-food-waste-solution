import React from 'react'
import "../Styles/CSS/chatBox.css"
import ScrollableFeed from 'react-scrollable-feed'
import ChatBubble from './ChatBubble'

const ChatBox = ({messages,greetText}) => {
  return (
    <ScrollableFeed  className={'chatBox'+(messages.length===0?' emptyChatBox':'')}>
      {!messages.length && <span className='emptyChatBoxText'>{greetText}</span>}
      {messages.map((message,index)=>(
        <ChatBubble key={index} message={message.parts[0].text} role={message.role}/>
      ))}
    </ScrollableFeed>
  )
}

export default ChatBox
