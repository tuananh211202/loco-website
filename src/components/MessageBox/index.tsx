import { Avatar, Button, Typography, Input} from "antd";
import { messageBoxStyles } from "./styles";
import { CloseOutlined, UserOutlined } from "@ant-design/icons";
import { useChat } from "../../context/chat-context";
import { useEffect, useRef, useState } from "react";
import { ChatApi } from "../../midlewares/api";
import { useMutation, useQuery } from "react-query";

const { Text } = Typography;

const MessageBox = () => {
  const { state, dispatch } = useChat();
  const scrollableDivRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');

  const handleClose = () => {
    dispatch({ type: 'CLOSE' });
  };

  const { data: chat, refetch } = useQuery(['getChat', state.chatId], () => ChatApi.getChat(state.chatId));

  const sendMessageMutation = useMutation(ChatApi.sendMessage, {
    onSuccess: () => {
      refetch();
    }
  });

  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
    }
  },[chat]);

  const handleSendMessage = () => {
    if(inputValue.length) {
      sendMessageMutation.mutate({ userId: state.chatId, message: inputValue });
      setInputValue(''); 
    }
  }

  // useEffect(() => {
  //   socket.on('receiveMessage', () => {
  //     refetch();
  //   });

  //   return () => {
  //     socket.off('receiveMessage');
  //   };
  // },[]);

  return <div style={{...messageBoxStyles, display: state.isOpen ? 'inline' : 'none' }}>
    <div style={{ width: '100%', borderStyle: 'solid', borderWidth: '0px 0px 1px 0px', height: '50px', backgroundColor: '#bebebf', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 5px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
       <Avatar icon={<UserOutlined />} style={{ borderColor: 'white', borderRadius: '1000px' }} />
       <Text style={{ marginLeft: '5px' }}>aaa</Text>
      </div>
      <Button type="link" icon={<CloseOutlined />} onClick={handleClose} />
    </div>
    <div style={{ width: '100%', height: '400px', overflowY: 'auto' }} className="element" ref={scrollableDivRef}>
      {
        chat.map((message) => {
          return <div style={{ width: '100%', display: 'flex', justifyContent: message.sender.userId !== state.chatId ? 'end' : 'start', padding: '5px' }}>
             <div 
                style={{ 
                  width: 'fit-content', 
                  padding: '8px 16px', 
                  margin: '4px 0px',
                  borderRadius: '16px',
                  backgroundColor: message.sender.userId !== state.chatId ? "#2c84ff" : "#f0f0f0",
                  color: message.sender.userId !== state.chatId ? '#fff' : '#000',
                  fontSize: '16px',
                  maxWidth: '70%',
                  wordWrap: 'break-word',
                }}
              >
                {message.message}
              </div>
          </div>;
        })
      }  
    </div>
    <div style={{ width: '100%', height: '50px', borderStyle: 'solid', borderWidth: '1px 0px 0px 0px', display: 'flex', alignItems: 'center' }}>
      <Input style={{ border: 'none', borderRadius: 0, backgroundColor: 'white !important', margin: '0px 5px' }} placeholder="Write message..." onPressEnter={handleSendMessage} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
    </div>
  </div>;
}

export default MessageBox;