import { RainbowButton } from "@/components/magicui/rainbow-button";
import SpecialBtn from "@/components/ui/special-btn";

export default function Home() {
  return (
    <div className="md:max-w-7xl mx-auto mt-42">
        <div className="flex flex-row items-center justify-center w-full">
        <div className="w-1/2 space-y-4">
        <SpecialBtn title="A New Era of Elder Care" />
        <h1 className="text-6xl text-gray-800 font-bold">A Companion for Health, A Reminder for Care.</h1>
        <p className="text-xl text-gray-700">ElderCare AI provides timely medication reminders, health tips, and symptom guidance through the familiar interface of WhatsApp — making healthcare management effortless for seniors.</p>
        </div>
        <div className="w-1/2">
        
        </div>
      </div>
    </div>
  );
}
