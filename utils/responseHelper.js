const successResponse = (res, data, message = "Success", statusCode = 200) => {
  return res.status(statusCode).json({
    status: true,
    message: message,
    data: data,
  });
};

export default successResponse;
