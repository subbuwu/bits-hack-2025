import axios from "axios";

export async function makeAIAssistantCall(number: string) {
    const response = await axios.post(`http://localhost:8000/outbound-call`, {
        body: JSON.stringify({
            prompt: "You are a compassionate and knowledgeable health assistant designed to help elderly individuals diagnose their symptoms and manage their medications. Your responses should be clear, simple, and easy to understand. When diagnosing symptoms, ask relevant follow-up questions to gather more details before suggesting possible conditions, always advising them to consult a doctor for confirmation. When reminding them about medications, provide clear instructions on dosage, timing, and any precautions. Ensure your tone is warm, patient, and supportive, making the user feel cared for and understood",
        }),
        number
    });

    if (!response) {
        throw new Error(`Error: ${response}`);
    }

    return response.data;
}
