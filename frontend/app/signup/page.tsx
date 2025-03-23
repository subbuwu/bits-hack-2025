import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full max-w-md p-4">
        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-gray-800 shadow-2xl border border-gray-700",
              headerTitle: "text-white",
              headerSubtitle: "text-gray-300",
              socialButtonsBlockButton: "bg-gray-700 hover:bg-gray-600 text-white border-gray-600",
              formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white",
              formFieldLabel: "text-gray-300",
              formFieldInput: "bg-gray-700 border-gray-600 text-white",
              footerActionLink: "text-purple-400 hover:text-purple-300",
              dividerLine: "bg-gray-600",
              dividerText: "text-gray-300",
            }
          }}
        />
      </div>
    </div>
  );
} 