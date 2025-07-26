const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      next(error);
    });
  };
};

// const asyncHandler = (fn) = async (req, res, next) => {
//     try {

//     } catch (error) {
//         console.error("Error in async handler:", error);
//         res.status(error.code || 500).json({ message: "Internal Server Error" });
//     }
// };

export default asyncHandler;
