exports.handler = async (event, context) => {
  const apiUrl = 'http://todo-demo-app.ap-northeast-2.elasticbeanstalk.com/api';
  const url = `${apiUrl}${event.path}`;

  try {
    const response = await fetch(url, {
      method: event.method,
      headers: event.headers,
      body: event.body ? JSON.stringify(event.body) : null,
    });

    return {
      statusCode: response.status,
      body: await response.text(),
      headers: response.headers,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
