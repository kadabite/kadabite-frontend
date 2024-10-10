import os
import json
import redis
from email_client import mailSender
import logging

# Configure logging
logging.basicConfig(filename='worker.log', level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Connect to Redis
redis_conn = redis.Redis(host='redis', port=6379)

def process_job(job_data):
    try:
        mailSender(job_data)
        logger.info(f"Processed job: id={job_data['id']}")
    except Exception as e:
        logger.warning(f"Failed to process job: id={job_data['id']}, error: {e}")


def main():
    pubsub = redis_conn.pubsub()
    pubsub.subscribe('user_data_queue')

    logger.info("Worker is running and waiting for jobs...")

    for message in pubsub.listen():
        if message['type'] == 'message':
            job_data = json.loads(message['data'])
            process_job(job_data)

if __name__ == '__main__':
    main()
