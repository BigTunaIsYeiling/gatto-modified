import NotificationsPage from "@/components/Notifications/NotificationsPage";
import { GetNotifications } from "@/lib/NotificationsActions";

export default async function Page() {
  const Notificationsdata = await GetNotifications();
  return <NotificationsPage data={Notificationsdata} />;
}
