type MessageTypes = 'sendMsg' | 'requestMsg' | 'ackMsg';
type ContentTypes = 'TEXT' | 'IMAGE' | 'VOICE' | 'FILE' | 'BIGFILE';
type MessageStatus = 'success' | 'fail' | 'pending';

// 数据库的消息格式
type RawMessage = {
  content: string;
  contentType: ContentTypes;
  messageID: number;
  timestamp: number;
};

// UI层的消息格式
type UserMessage = {
  role: number;
  seq?: string;
  content: string;
  contentType: ContentTypes;
  messageID?: number;
  timestamp: number;
  status: MessageStatus;
};

// 接收的消息类型
namespace ReceiveMessage {
  type Wrapper = {
    seq: string;
    code: number;
    codeMsg: string;
  };

  type SendMsgData = {
    messageID: number;
  };
  type RequestMsgData = {
    messages: RawMessage[];
  };
  type AckMsgData = null | string;

  type SendMsgResponse = Wrapper & { data: SendMsgData };
  type RequestMsgResponse = Wrapper & { data: RequestMsgData };
  type AckMsgResponse = Wrapper & { data: AckMsgData };

  type Response = SendMsgResponse | RequestMsgResponse | AckMsgResponse;
}

// 接收的消息类型
namespace SendMessage {
  type Wrapper = {
    type: MessageTypes;
    seq: string;
  };

  type SendMsgData = {
    sessionID: number;
    senderID: number;
    receiverID: number;
    content: string;
    contentType: ContentTypes;
    timestamp: number;
  };
  type RequestMsgData = {
    userID: number;
    sessionID: number;
  };
  type AckMsgData = {
    messageIDs: number[];
    ackTimestamp: number;
  };

  type SendMsg = Wrapper & { data: SendMsgData };
  type RequestMsg = Wrapper & { data: RequestMsgData };
  type AckMsg = Wrapper & { data: AckMsgData };

  type Message = SendMsg | RequestMsg | AckMsg;
}
