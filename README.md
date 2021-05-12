## RabbitMQ & Node.js sample setup with Docker & TS

### Development

```bash
# Run RabbitMQ container with docker
docker run --name rabbitmq -p 5672:5672 rabbitmq

cd <project-folder>

# Run publisher
yarn amqp:publish

# Run consumer
yarn amqp:consumer

# Run consumer again to see what message was acknowledged by the channel
yarn amqp:consumer

```
