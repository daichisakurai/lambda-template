import { APIGatewayEvent, Context, APIGatewayProxyCallback } from 'aws-lambda'

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: APIGatewayProxyCallback
): Promise<void> => {
  console.log(`event: ${JSON.stringify(event)}, context=${JSON.stringify(context)}`)
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    body: JSON.stringify('Hello from Lambda!!')
  }
  callback(null, response)
}
