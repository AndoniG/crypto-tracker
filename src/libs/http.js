const http = {};

http.get = async (url) => {
  try {
    let res = await fetch(url);
    let data = await res.json();

    return {
      data,
      error: false,
    };
  } catch (e) {
    console.log('HTTP get method err', e);
    return {
      error: true,
      status: 'GET_E',
      message: e.message,
    };
  }
};

http.post = async (url, body) => {
  try {
    let res = await fetch(url, {
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let data = await res.json();

    return {
      data,
      error: false,
    };
  } catch (e) {
    console.log('HTTP get method err', e);
    return {
      error: true,
      status: 'GET_E',
      message: e.message,
    };
  }
};

export default http;
