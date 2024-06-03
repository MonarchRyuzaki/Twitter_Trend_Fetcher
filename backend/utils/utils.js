import Imap from 'imap-simple';
import { simpleParser } from 'mailparser';
import { dirname } from "path";
import { fileURLToPath } from "url";

const getEmailVerificationCode = async (config) => {
    try {
      // Connect to the IMAP server
      const connection = await Imap.connect(config);
  
      // Open the INBOX mailbox
      await connection.openBox('INBOX');
  
      // Search for unread emails
      const searchCriteria = ['UNSEEN'];
      const fetchOptions = {
        bodies: ['HEADER', 'TEXT'],
        markSeen: true
      };
  
      // Fetch unread emails
      const emails = await connection.search(searchCriteria, fetchOptions);
  
      // Loop through each email
      for (const email of emails) {
        const parsed = await simpleParser(email.parts[0].body);
        console.log('From:', parsed.from.text);
        console.log('Subject:', parsed.subject);
        console.log('Body:', parsed.text);
      }
  
      // Close the connection
      await connection.end();
    } catch (err) {
      console.error('Error reading emails:', err);
    }
  };

export { getEmailVerificationCode };

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
