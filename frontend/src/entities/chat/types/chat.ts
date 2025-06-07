interface Receiver {
  id: string;
  userName: string;
  avatar?: string | null;
}

interface Chat {
  id: string;
  title?: string | null;
  receiver?: Receiver | null; // объект получателя (собеседника) для 1-1 чата
  lastMessage?: string | null;
  lastMessageTime?: string | null;
  unreadCount?: number;
  isGroupChat?: boolean;
  participants?: string[]; // ID пользователей
  isSelfChat?: boolean; // если чат с самим собой
}

export interface ChatSchema {
  currentChat: Chat | null;
  allChats: Chat[];
}
