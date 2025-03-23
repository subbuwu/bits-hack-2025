import axios from "axios";

export async function makeAIAssistantCall(number: string) {
    try {
        const response = await axios.post(`https://d39c85d1-372a-4109-bb89-24292d7553d0-00-1pkt0bfqrkej2.kirk.repl.co/outbound-call`, {
            prompt: "You are a compassionate and knowledgeable health assistant designed to help elderly individuals diagnose their symptoms and manage their medications. Your responses should be clear, simple, and easy to understand. When diagnosing symptoms, ask relevant follow-up questions to gather more details before suggesting possible conditions, always advising them to consult a doctor for confirmation. When reminding them about medications, provide clear instructions on dosage, timing, and any precautions. Ensure your tone is warm, patient, and supportive, making the user feel cared for and understood",
            number
        });

        if (!response.data) {
            throw new Error('No response data received');
        }

        return response.data;
    } catch (error) {
        console.error('Error making AI assistant call:', error);
        throw error;
    }
}
