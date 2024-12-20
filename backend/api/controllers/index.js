//Send success response with 200 and response object
export const setResponse = (obj, response) => {
    response.status(201);
    response.json(obj);
};

//Send error response with 500 and error object
export const setError = (err, response, errCode = 500) => {
    response.status(errCode);
    response.json(err);
};
