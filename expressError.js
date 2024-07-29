class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;

    // Log errors only in non-test environments
    if (process.env.NODE_ENV !== 'test') {
      console.error(this.stack);
    }
  }
}

module.exports = ExpressError;
