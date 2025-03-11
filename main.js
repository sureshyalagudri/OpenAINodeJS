import { generateToken } from './util.js';
import { OpenAI  } from 'openai';

await generateToken()

const header_name = process.env.GATEWAY_HEADER_NAME
const header_value = process.env.GATEWAY_HEADER_VALUE
const headers = {
    [header_name]: header_value,
};
const client = new OpenAI({defaultHeaders: headers});

const completion = await client.chat.completions.create({
    model: "gpt-4o-2024-05-13",
    messages: [
        { role: "user", content: "What is OpenAI" }
    ]
});
console.log(completion.choices[0].message);