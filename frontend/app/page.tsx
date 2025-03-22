import SpecialBtn from "@/components/ui/special-btn";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
    <Navbar/>
    <div className="md:max-w-7xl mx-auto mt-42">
        <div className="flex flex-row items-center justify-center w-full">
        <div className="w-1/2 space-y-4">
        <SpecialBtn title="A New Era of Elder Care" />
        <h1 className="text-6xl text-gray-800 font-bold">A Companion for Health, A Reminder for Care.</h1>
        <p className="text-xl text-gray-700">ElderCare AI provides timely medication reminders, health tips, and symptom guidance through the familiar interface of WhatsApp — making healthcare management effortless for seniors.</p>

        <div className="space-x-2">
          <button className="px-12 py-2.5 cursor-pointer rounded-full tracking-widest uppercase font-bold bg-blue-400 text-white hover:bg-blue-700 transition duration-200">
            Get Started
          </button>
          <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-2.5 cursor-pointer rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
            Learn More
        </button>
        </div>
        </div>

        <div className="w-1/2">
        
        </div>
      </div>
    </div>
    </div>
  );
}
