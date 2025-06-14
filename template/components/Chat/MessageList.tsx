export default function MessageList({ messages, currentUserId }: { messages: any[], currentUserId: string }) {
    return (
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
            {messages.map((msg, index) => {
                const isMine = msg.senderId === currentUserId;
                return (
                    <div
                        key={index}
                        className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg shadow 
                  ${isMine ? 'bg-green-100 text-right' : 'bg-white text-left'}`}
                        >
                            <p className="text-sm">{msg.text}</p>
                            <p className="text-[10px] text-gray-500 mt-1">
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
  