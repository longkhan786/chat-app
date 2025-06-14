import { useUserService } from "@/composables";
import { useEffect, useState } from "react";

type Props = {
    selectUser: (user: object) => void;
};

export default function HorizontalNav({selectUser}: Props) {
    const { getUsers } = useUserService();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUsers().then((response) => {
            setUsers(response);
            setLoading(false);
        });
    }, []);

    if (loading) return <p className="p-4 text-gray-600">Loading users...</p>;

    return (
        <div className="h-screen overflow-y-auto">
            <div className="p-4 border-b border-gray-300 font-bold text-lg">Chats</div>
            <ul className="divide-y divide-gray-200">
                {users.map((user) => (
                    <li
                        key={user.ID}
                        className="p-4 hover:bg-gray-100 cursor-pointer transition-all"
                        onClick={() => selectUser(user)}
                    >
                        <div className="text-sm font-medium text-gray-900">
                            {user.DisplayName || user.Username}
                        </div>
                        <div className="text-xs text-gray-500">Click to chat</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
