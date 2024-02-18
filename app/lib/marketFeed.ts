import { decodeMessage} from "@/lib/utils";
import {StockUpdate} from "@/types/websocket";

export type UpdateFunction = (update : StockUpdate[]) => void;


const handleMessage = (event: MessageEvent, updateFunction: UpdateFunction) => {
    const reader = new FileReader();
    reader.onload = () => {
        try {
            const decodedMessage = decodeMessage(reader.result as ArrayBuffer);
            updateFunction(decodedMessage);
        } catch (err) {
            console.error('Failed to decode protobuf message', err);
        }
    };
    reader.readAsArrayBuffer(event.data);
};

export const initializeWebSocket = (url: string, updateFunction: UpdateFunction): WebSocket => {
        const ws = new WebSocket(url);
        ws.onopen = () => {console.log('websocket connected')}

        ws.onmessage = (event) => handleMessage(event, updateFunction);

        ws.onerror = (error: Event) => console.error('WebSocket error:', error);
        ws.onclose = () => console.log('WebSocket disconnected');

        return ws;
};
