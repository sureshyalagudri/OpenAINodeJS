import { generateToken } from './util.js';
import { OpenAI } from 'openai';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

// Generate the token
await generateToken();

// Set up the OpenAI client
const header_name = process.env.GATEWAY_HEADER_NAME;
const header_value = process.env.GATEWAY_HEADER_VALUE;
const headers = {
    [header_name]: header_value,
};
const client = new OpenAI({ defaultHeaders: headers });

// Set up the readline interface
const rl = readline.createInterface({ input, output });

console.log('Enter a message to send to the Chat API (type "exit" to quit):');

while (true) {
    // Get user input
    const userMessage = await rl.question('You: ');

    // Check for "exit"
    if (userMessage.toLowerCase() === 'exit') {
        console.log('Goodbye!');
        break;
    }

    console.log('Fetching details....')
    try {
        // Call the Chat API
        const completion = await client.chat.completions.create({
            model: "gpt-4o-2024-05-13",
            messages: [{ role: "user", content: userMessage }],
        });

        // Log the API response
        console.log('Chatbot:', completion.choices[0].message.content);
    } catch (error) {
        // Handle errors
        console.error('Error calling the Chat API:', error);
    }
}

// Close the readline interface
rl.close();
