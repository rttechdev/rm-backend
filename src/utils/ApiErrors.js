/**
 * Custom API Error class that extends the built-in Error class
 * Used for standardized error handling throughout the application
 */
class ApiError extends Error {
  /**
   * Creates an instance of ApiError
   * @param {string} message - The error message to display
   * @param {number} statusCode - HTTP status code for the error
   * @param {Array} errors - Array of additional error details (optional)
   * @param {string} stack - Custom stack trace (optional)
   */
  constructor(message, statusCode, errors = [], stack = "") {
    // Call the parent Error constructor with the message
    super(message);
    
    // Set the HTTP status code for the error response
    this.statusCode = statusCode;
    
    // Initialize data property as null (can be used for additional error data)
    this.data = null;
    
    // Set the error message
    this.message = message;
    
    // Indicate that this is not a successful response
    this.success = false;
    
    // Store additional error details (validation errors, etc.)
    this.error = errors;
    
    // Handle stack trace - use custom stack if provided, otherwise capture current stack
    if (stack) {
      this.stack = stack;
    } else {
      // Capture the stack trace, excluding this constructor from the trace
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Export the ApiError class as the default export
export default ApiError;
