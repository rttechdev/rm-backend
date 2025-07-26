class ApiResponse {
  constructor(res) {
    this.res = res;
  }

  success(data, message = 'Success') {
    return this.res.status(200).json({
      status: 'success',
      message,
      data,
    });
  }

//   error(message = 'An error occurred', statusCode = 500) {
//     return this.res.status(statusCode).json({
//       status: 'error',
//       message,
//     });
//   }
}