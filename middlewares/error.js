export const errorMiddleware = (err, req, res, next) => {
  res.locals.message = err.message;
  res.render('error');
};

export class InternalServerError extends Error {
  constructor() {
    super('Internal server error');
    this.statusCode = 500;
  }
}

export class NotFoundError extends Error {
  constructor() {
    super('Page not found');
    this.statusCode = 404;
  }
}
