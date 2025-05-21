import React, { useState, useEffect } from "react";
import { register, login, listConversations, listMessages, sendMessage, editMessage, deleteMessage, listGroups } from "./utils/api";
import { socket } from "./utils/socket";
import ChatSidebar from "./components/ChatSidebar";
import ChatWindow from "./components/ChatWindow";
import AuthForm from "./components/AuthForm";
import { usePresence } from "./hooks/usePresence";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [convos, setConvos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [refreshConvos, setRefreshConvos] = useState(false);
  const [groups, setGroups] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [usersInChat, setUsersInChat] = useState([]);
  const onlineUsers = usePresence(username);

  // Socket.io real-time: connect on login, join rooms
  useEffect(() => {
    if (token && username) {
      socket.connect();
      socket.emit("login", username);
      return () => {
        socket.emit("logout");
        socket.disconnect();
      };
    }
  }, [token, username]);

  // Load conversations & groups
  useEffect(() => {
    if (token) {
      listConversations(token).then(res => setConvos(res.conversations));
      listGroups(token).then(res => setGroups(res.groups || []));
    }
  }, [token, refreshConvos]);

  // Load messages for selected chat (user or group)
  useEffect(() => {
    if (token && selected)
      listMessages(token, selected).then(res => {
        setMessages(res.messages);
        // Collect all users (for mentions/autocomplete)
        const allUsers = [...new Set(res.messages.map(m => m.from))];
        setUsersInChat(allUsers);
        // Optionally, fetch userMap for avatars, etc.
      });
  }, [token, selected]);

  function handleSend(body, replyToId, threadId) {
    sendMessage(token, selected, body, replyToId, threadId).then(() => {
      listMessages(token, selected).then(res => setMessages(res.messages));
      setRefreshConvos(r => !r);
    });
  }

  function handleEdit(msgId, newBody) {
    editMessage(token, msgId, newBody).then(() => {
      listMessages(token, selected).then(res => setMessages(res.messages));
    });
  }

  function handleDelete(msgId) {
    deleteMessage(token, msgId).then(() => {
      listMessages(token, selected).then(res => setMessages(res.messages));
    });
  }

  if (!token) {
    return <AuthForm onAuth={({ username, token }) => {
      setToken(token);
      setUsername(username);
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
    }} />;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#1a1520] via-[#21101c] to-[#471726] font-display">
      <ChatSidebar
        conversations={convos}
        select={setSelected}
        selected={selected}
        username={username}
        onLogout={() => {
          setToken(null);
          setUsername(null);
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          setSelected(null);
          setConvos([]);
          setMessages([]);
        }}
        groups={groups}
        token={token}
        onGroupAdded={() => listGroups(token).then(res => setGroups(res.groups || []))}
        users={onlineUsers}
        userMap={userMap}
      />
      <div className="flex-1 flex flex-col min-w-0">
        {selected ? (
          <ChatWindow
            messages={messages}
            onSend={handleSend}
            username={username}
            partner={selected}
            usersInChat={usersInChat}
            userMap={userMap}
            onEdit={handleEdit}
            onDelete={handleDelete}
            // threadId, onThreadOpen etc for threaded replies
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-zinc-300 text-2xl select-none">
            <span className="backdrop-blur-xl bg-glassdark/80 px-12 py-8 rounded-3xl shadow-glass border border-glasslight">
              Select a conversation or start a new chat!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}