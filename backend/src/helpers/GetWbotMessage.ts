import { proto } from "@whiskeysockets/baileys";
import WALegacySocket from "@whiskeysockets/baileys"
import Ticket from "../models/Ticket";
import GetTicketWbot from "./GetTicketWbot";
import AppError from "../errors/AppError";
import GetMessageService from "../services/MessageServices/GetMessagesService";
import Message from "../models/Message";

export const GetWbotMessage = async (
  ticket: Ticket,
  messageId: string
): Promise<proto.WebMessageInfo | Message> => {
  const getSock = await GetTicketWbot(ticket);

  let limit = 20;

  const fetchWbotMessagesGradually = async (): Promise<
    proto.WebMessageInfo | Message | null | undefined
  > => {
      const msgFound = await GetMessageService({
        id: messageId
      });

      return msgFound;


  };

  try {
    const msgFound = await fetchWbotMessagesGradually();

    if (!msgFound) {
      throw new Error("No se puede encontrar el mensaje dentro de los últimos 100 mensajes");
    }

    return msgFound;
  } catch (err) {
    throw new AppError("ERR_FETCH_WAPP_MSG");
  }
};

export default GetWbotMessage;
