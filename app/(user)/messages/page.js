import MessagesPage from "@/components/Messages/Messagepage";
import { GetMessages } from "@/lib/MessagesActions";

export default async function Page() {
  const messagesData = await GetMessages();
  return <MessagesPage data={messagesData} />
}
