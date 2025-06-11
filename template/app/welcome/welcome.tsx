// ----------------- Imports ----------------------------
import { useEffect, useState } from "react";
import { useUserService } from "~/composable";

export function Welcome() {

  // ----------------- Constants & Reactive Variables -----
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchInitialMessages, setFetchInitialMessages] = useState([]);
  const { sendMessage, fetchMessages } = useUserService();

  // ----------------- Methods ----------------------------
  const handleSend = async () => {
    if (message.trim()) {
      setMessage("");
      return
    }
    
    await sendMessage({ message })
  };

  const currentUserId = 1; // Long Khan's ID

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const renderMessages = () => {
    if (fetchInitialMessages.length === 0) return null;

    return fetchInitialMessages.map((message) => {
      const isCurrentUser = message.SenderID === currentUserId;
      const displayName = isCurrentUser
        ? message.Sender.DisplayName || message.Sender.Username
        : message.Receiver.DisplayName || message.Receiver.Username;

      // Skip empty messages for display
      if (!message.Content.trim()) return null;

      return (
        <div
          key={message.ID}
          className={`flex mb-4 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow ${isCurrentUser
                ? 'bg-blue-500 text-white rounded-br-none'
                : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
          >
            <div className="text-sm font-medium mb-1">
              {displayName}
            </div>
            <div className="text-sm mb-1">
              {message.Content}
            </div>
            <div className={`text-xs ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'}`}>
              {formatTime(message.CreatedAt)}
            </div>
          </div>
        </div>
      );
    }).filter(Boolean); // Remove null values from empty messages
  };

  const fetchInitialData = () => {
    fetchMessages()
      .then((response) => {
        setFetchInitialMessages(response);
        setLoading(false)
    })
  }
  
  useEffect(() => {
    fetchInitialData(); // Move API call to useEffect
  }, []);

  return (
    <main className="h-screen">
      <div className="grid grid-cols-4 h-full">
        {/* Sidebar */}
        <div className="col-span-1 border-r p-4 m-2">
          <div>users</div>
        </div>

        {/* Main Chat Area */}
        <div className="col-span-3 flex flex-col p-4 h-full">
          {/* Messages Area */}
          <div className="flex-1 p-2 mb-4 bg-gray-50 overflow-y-auto" id="messages">
            
            {loading ? 'no-messages' : renderMessages() }
          </div>

          {/* Input Area */}
          <div className="flex">
            <input
              value={message}
              type="text"
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border rounded-l ml-2 px-3 py-2 focus:outline-none"
              placeholder="Type your message..."
            />
            <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600">
              Send
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
