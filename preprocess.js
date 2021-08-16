function readLineEvents(req, res, next) {
  const events = req.body.events;
  if (Array.isArray(events)) {
    if (events.length === 0) {
      res.status(200).send("Ok");
    } else {
      next();
    }
  } else {
    res.stats(400).send("Could not understand the data.");
  }
}

function checkLineId(req, res, next) {
  const lineId = req.body.events[0].source.userId;
  req.lineId = lineId;
  next();
}

module.exports = { readLineEvents, checkLineId };
