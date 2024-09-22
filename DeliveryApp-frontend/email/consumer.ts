import { emailClient } from '@/email/sender';
import Bull, { Job } from 'bull';
import { MailArgs as UserData } from '@/app/lib/definitions';


(async function mainSender() {
  const queue = new Bull<UserData>('user_data_queue');

  queue.on('error', (err: Error) => console.error('Bull queue error:', err));

  queue.process(async (job: Job<UserData>) => {
    const user_data = job.data;
    console.log('Received data');
    await emailClient.mailMe(user_data);
  });

  console.log('Consumer (worker) ready');
})();
