module.exports = (fn) => {
  return (req, res, next) => {
    console.log("aha");
    fn(req, res, next).catch((err) => {
      console.log("💛💛", err);

      return next(err);
    }); // this catch is callback runs when async task is rejected
  };
};
