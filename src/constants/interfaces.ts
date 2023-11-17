import { ViewStyle } from "react-native";
import { MessageType } from "./enums";

export interface ChatComponentInterface {
  chatHistory?: ChatHistoryInterface[];
  onMessageSend: (userMessage: string) => void;
}

export interface ChatHistoryInterface {
  type: MessageType;
  message: string;
  timestamp: Date;
}
