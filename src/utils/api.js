const API_URL = "https://api.toster.lol";

export async function api(path, method = "POST", data, token) {
  const opts = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (token) opts.headers["Authorization"] = "Bearer " + token;
  if (data) opts.body = JSON.stringify(data);

  const res = await fetch(API_URL + path, opts);
  const json = await res.json();
  if (!res.ok) throw json;
  return json;
}

export function register(username, password, avatar) {
  return api("/chat/register", "POST", { username, password, avatar });
}
export function login(username, password) {
  return api("/chat/login", "POST", { username, password });
}
export function listConversations(token) {
  return api("/chat/conversations", "POST", {}, token);
}
export function listMessages(token, withUserOrGroup) {
  return api("/chat/list", "POST", { withUser: withUserOrGroup }, token);
}
export function sendMessage(token, to, body, replyToId, threadId) {
  return api("/chat/send", "POST", { to, body, replyToId, threadId }, token);
}
export function editMessage(token, messageId, newBody) {
  return api("/chat/message/edit", "POST", { messageId, newBody }, token);
}
export function deleteMessage(token, messageId) {
  return api("/chat/message/delete", "POST", { messageId }, token);
}
export function searchMessages(token, query) {
  return api("/search/messages", "POST", { query }, token);
}
export function searchUsers(token, query) {
  return api("/search/users", "POST", { query }, token);
}
export function listGroups(token) {
  return api("/chat/groups", "POST", {}, token);
}
export function createGroup(token, name, members, avatar) {
  return api("/chat/group/create", "POST", { name, members, avatar }, token);
}