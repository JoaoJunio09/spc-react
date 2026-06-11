import { Client } from '@stomp/stompjs';
import SockJs from 'sockjs-client';
import { useCallback, useEffect, useRef } from "react";
import { useAuthContext } from "../../context/AuthContext";

type MessageHandler = (body: string) => void;

function useWebSocket(onMessage: MessageHandler) {
	const { auth, hasRole } = useAuthContext();
	const clientRef = useRef<Client | null>(null);

	const connect = useCallback(() => {
		if (!auth?.accessToken) return;

		const client = new Client({
			webSocketFactory: () => 
				new SockJs(`${import.meta.env.VITE_API_URL_DEV}/ws`),
				
				connectHeaders: {
					Authorization: `Bearer ${auth.accessToken}`,
				},

				reconnectDelay: 5000,

				onConnect: () => {
					client.subscribe('/user/queue/notifications', (message) => {
						onMessage(message.body);
					});

					if (hasRole('ROLE_COORDINATOR')) {
						client.subscribe('/topic/coordinators', (message) => {
							onMessage(message.body);
						});
					}

					if (hasRole('ROLE_ADMIN')) {
						client.subscribe('/topic/admin', (message) => {
							onMessage(message.body);
						});
					}
				},

				onDisconnect: () => {
					console.log('WebSocket desconectado');
				},

				onStompError: (frame) => {
					console.log('Erro STOMP: ', frame.headers['message']);
				}
		});

		client.activate();
		clientRef.current = client;
	}, [auth?.accessToken]);

	useEffect(() => {
		connect();

		return () => {
			clientRef.current?.deactivate();
		};
	}, [connect]);
}

export default useWebSocket;