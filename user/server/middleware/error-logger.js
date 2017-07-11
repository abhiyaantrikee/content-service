module.exports = function(options) {
  return function logError(err, req, res, next) {
    next(err);
  };
};