import { useEffect } from "react";
import socket from "../lib/socket";
import type { Message } from "../lib/types";

export function useChatSocket(currentUserId: string | undefined, onMessageReceived: (message: Message) => void) {
	useEffect(() => {
		if (currentUserId) {
			socket.emit("newUser", currentUserId);
		}
	}, [currentUserId]);

	useEffect(() => {
		socket.on("getMessage", onMessageReceived);

		return () => {
			socket.off("getMessage", onMessageReceived);
		};
	}, [onMessageReceived]);
}
