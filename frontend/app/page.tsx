'use client';
import SpecialBtn from "@/components/ui/special-btn";
import Navbar from "@/components/Navbar";
import { SignedIn, SignedOut, SignUpButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { LampContainer } from "@/components/ui/lamp";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import { LayoutDashboardIcon } from "lucide-react";

export default function Home() {
  const router = useRouter()
  const {user} = useUser();
  const handleClick = () => {
    if(!user) {
      router.push('/signup');
    } else {
      router.push('/dashboard');
    }
  }
  
  const features = [
    {
      title: "Medication Reminders",
      description: "Never miss important medications with timely WhatsApp reminders personalized to your schedule.",
      icon: "💊"
    },
    {
      title: "Health Monitoring",
      description: "Simple check-ins to track well-being and alert caregivers when attention is needed.",
      icon: "📊"
    },
    {
      title: "Symptom Guidance",
      description: "Get reliable information about common health concerns with easy-to-understand advice.",
      icon: "🩺"
    },
    {
      title: "Caregiver Connection",
      description: "Keep family members informed about health status and medication adherence.",
      icon: "👨‍👩‍👧"
    }
  ];
  
  const testimonials = [
    {
      quote: "ElderCare AI has given me peace of mind knowing my father is taking his medications properly, even though I live in another state.",
      author: "Sarah T., Daughter & Caregiver",
      avatar: "/api/placeholder/40/40"
    },
    {
      quote: "The WhatsApp interface makes it so easy for me to use. No complicated apps to learn - just simple messages that help me stay on track.",
      author: "Robert M., 72, ElderCare User",
      avatar: "/api/placeholder/40/40"
    },
    {
      quote: "As a geriatric nurse, I recommend ElderCare AI to my patients' families. It bridges the gap between visits and improves medication adherence.",
      author: "Dr. Lisa Wong, Geriatric Specialist",
      avatar: "/api/placeholder/40/40"
    }
  ];
  
  return (
    <div className="relative overflow-hidden bg-white">
      <Navbar/>
      
      {/* Hero Section */}
      <section className="relative">
        <BackgroundBeams className="opacity-20" />
        <div className="md:max-w-7xl mx-auto pt-24 pb-16 px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 space-y-6 mb-12 md:mb-0">
              <SpecialBtn title="A New Era of Elder Care" />
              <h1 className="text-5xl md:text-6xl text-gray-800 font-bold leading-tight">
                A Companion for Health, A Reminder for Care.
              </h1>
              <p className="text-xl text-gray-700">
                ElderCare AI provides timely medication reminders, health tips, and symptom guidance through the familiar interface of WhatsApp — making healthcare management effortless for seniors.
              </p>
              <SignedIn>
              <button className='relative font-semibold bg-blue-500 cursor-pointer flex items-center justify-center  text-xl gap-2 px-12 py-4 hover:bg-blue-600 text-white hover:text-white rounded-full transition-colors duration-200' onClick={() => router.push('/dashboard')}>
                <LayoutDashboardIcon size={20} />
                Go To Dashboard
              </button>

          </SignedIn>
              <SignedOut>
              <SignUpButton>  
                <button className="px-12 py-2 cursor-pointer rounded-full font-bold bg-gradient-to-r from-[#a071f9] to-[#573c9d] text-white hover:shadow-lg hover:scale-105 transition duration-200">
                Sign Up
                </button>
              </SignUpButton>
          </SignedOut>
   
            </div>

            <div className="w-full md:w-1/2 flex justify-center">
              <Card className="w-full max-w-md">
                <CardContent className="bg-blue-50 relative group/card rounded-xl p-6 border-2 border-blue-100">
                  <CardTitle  className="w-full">
                    <img 
                      src="https://media.istockphoto.com/id/1397310103/vector/group-of-elderly-people-stand-together-happy-seniors-old-men-and-women-of-different-nations.jpg?s=612x612&w=0&k=20&c=flTLuoB1OBDsxVlhuxRSYRKXL8YaCH0aqUNL3t1ly1c=" 
                      className="rounded-lg object-cover w-full h-64"
                      alt="Elderly person using WhatsApp"
                    />
                  </CardTitle>
                  <CardDescription className="text-xl font-bold text-gray-800 mt-4">
                    Simple Interface, Powerful Care
                  </CardDescription>
                  <CardDescription  className="text-gray-700 text-sm mt-2">
                    Easy-to-use WhatsApp messages provide comprehensive healthcare support
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-20">
        <div className="md:max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How ElderCare AI Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered system integrates seamlessly into daily routines through the familiarity of WhatsApp.
            </p>
          </div>
          
          <Tabs defaultValue="setup" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="setup">Easy Setup</TabsTrigger>
              <TabsTrigger value="daily">Daily Use</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            </TabsList>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <TabsContent value="setup" className="space-y-4">
                <h3 className="text-2xl font-bold text-blue-600">Quick 3-Step Setup</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <span className="text-2xl">1</span>
                    </div>
                    <h4 className="font-bold">Register Account</h4>
                    <p className="text-gray-600 mt-2">Create your profile with basic health information and medication details.</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <span className="text-2xl">2</span>
                    </div>
                    <h4 className="font-bold">Connect WhatsApp</h4>
                    <p className="text-gray-600 mt-2">Link your WhatsApp number to start receiving personalized care messages.</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <span className="text-2xl">3</span>
                    </div>
                    <h4 className="font-bold">Set Preferences</h4>
                    <p className="text-gray-600 mt-2">Customize reminder timing and notification preferences to match your lifestyle.</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="daily" className="space-y-4">
                <h3 className="text-2xl font-bold text-blue-600">Everyday Assistance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mr-4">
                      <span className="text-xl">📱</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Timely Reminders</h4>
                      <p className="text-gray-600 mt-2">Receive friendly WhatsApp messages when it&apos;s time to take medications, including important details about dosage and instructions.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mr-4">
                      <span className="text-xl">✅</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Simple Confirmation</h4>
                      <p className="text-gray-600 mt-2">Respond with a simple message to confirm you&apos;ve taken your medication, allowing for effortless tracking.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mr-4">
                      <span className="text-xl">🔍</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Health Check-ins</h4>
                      <p className="text-gray-600 mt-2">Periodic wellness check-ins help track how you&apos;re feeling and identify potential concerns early.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mr-4">
                      <span className="text-xl">📚</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Health Tips</h4>
                      <p className="text-gray-600 mt-2">Receive personalized health advice and wellness tips tailored to your specific conditions and medications.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="monitoring" className="space-y-4">
                <h3 className="text-2xl font-bold text-blue-600">Care Monitoring</h3>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4">ElderCare AI provides peace of mind for family members and caregivers:</p>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">✓</span>
                      <span>Real-time alerts for missed medications</span>
                    </li>
                    <li className="flex items-center">
                      <span className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">✓</span>
                      <span>Weekly adherence reports sent to designated caregivers</span>
                    </li>
                    <li className="flex items-center">
                      <span className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">✓</span>
                      <span>Notification of concerning symptoms or patterns</span>
                    </li>
                    <li className="flex items-center">
                      <span className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">✓</span>
                      <span>Secure dashboard to monitor health trends over time</span>
                    </li>
                  </ul>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <LampContainer className="mb-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ElderCare AI combines AI intelligence with human-centered design to provide comprehensive care support.
            </p>
          </div>
        </LampContainer>
        
        <div className="md:max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="bg-blue-50 py-20">
        <div className="md:max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What People Are Saying</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how ElderCare AI is making a difference in the lives of seniors and their families.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="text-blue-400 text-4xl mb-4"></div>
                <p className="text-gray-700 italic mb-6">{testimonial.quote}</p>
                <div className="flex items-center">
                  
                  <span className="font-medium text-gray-800">{testimonial.author}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="md:max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl p-12 text-center shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Provide Better Care?</h2>
            <p className="text-xl text-blue-50 max-w-2xl mx-auto mb-8">
              Join thousands of families who trust ElderCare AI to help manage medications and monitor health for their loved ones.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 cursor-pointer rounded-full tracking-widest uppercase font-bold bg-white text-blue-600 hover:bg-blue-50 transition duration-200" 
                onClick={handleClick}
              >
                Get Started Now
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 cursor-pointer rounded-full tracking-widest uppercase font-bold bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 transition duration-200"
              >
                Schedule Demo
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}