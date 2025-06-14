import { Send } from "lucide-react";
import { useState } from "react";

export default function MessageInput({ onSend }: { onSend: (text: string) => void }) {
    const [text, setText] = useState("");

    const handleSend = () => {
        if (!text.trim()) return;
        onSend(text.trim());
        setText("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="p-3 border-t bg-white flex items-center space-x-2">
            <input
                type="text"
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button
                onClick={handleSend}
                className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white"
            >
                <Send size={18} />
            </button>
        </div>
    );
}
