'use client';

import { useUserService } from "@/composables";
import { useEffect } from "react";

export default function Home() {
  const { sendMessage } = useUserService();

  useEffect(() => {
    sendMessage({ message: 'hello' });
  }, []);

  return (
    <section className="py-24">
      <div className="container">
        Home
      </div>
    </section>
  );
}
