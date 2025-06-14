import { Phone, Video, MoreVertical, User as UserIcon } from "lucide-react";
import { useState } from "react";

export default function UserHeader({ user }: { user: any }) {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center space-x-4">
                {user.image && !imageError ? (
                    <img
                        src={user.image}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <UserIcon className="text-gray-500" size={20} />
                    </div>
                )}

                <div>
                    <h2 className="text-sm font-semibold text-gray-900">
                        {user.DisplayName || user.Username}
                    </h2>
                    <p className="text-xs text-gray-500">Online</p>
                </div>
            </div>

            <div className="flex items-center space-x-4 text-gray-600">
                <button className="hover:text-black transition">
                    <Phone size={20} />
                </button>
                <button className="hover:text-black transition">
                    <Video size={20} />
                </button>
                <button className="hover:text-black transition">
                    <MoreVertical size={20} />
                </button>
            </div>
        </div>
    );
}
