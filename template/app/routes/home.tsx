import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Chat App" },
    { name: "description", content: "Welcome to the Chat App!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
