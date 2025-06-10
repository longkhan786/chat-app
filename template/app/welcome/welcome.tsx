import { useState } from "react";
import { useUserService } from "~/composable";


export function Welcome() {

  const [message, setMessage] = useState<string>("");
  const handleSend = async () => {
    if (message.trim()) {
      setMessage("");
    }
    
    const { sendMessage } = useUserService();

    const response = await sendMessage({ message })
    console.log(response);
  };

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
            {/* Chat messages will go here */}
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
