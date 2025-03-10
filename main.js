import { generateToken } from './util.js';
import { OpenAI  } from 'openai';
import dotenv from "dotenv";

await generateToken()
dotenv.config();
console.log(process.env.OPENAI_API_KEY)