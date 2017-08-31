var termStartDates = {
  '1171': moment('2017-01-03'),
  '1175': moment('2017-05-01'),
  '1179': moment('2017-09-07'),
  '1181': moment('2018-01-03'),
  '1185': moment('2018-05-01'),
};

function toWarriorsBandDate(jsDate) {
  date = moment(jsDate);

  var term = _.findLastKey(termStartDates, function(startDate) { return startDate <= date; });
  var dayOfTerm = date.diff(termStartDates[term], 'days') + 1;

  if (_.isUndefined(term)) {
    throw 'Can\'t calculate Warriors Band dates for days in that term.';
  }

  return term + '-' + dayOfTerm;
}

function fromWarriorsBandDate(dateString) {
  textParts = _.split(dateString, '-');

  if (_.size(textParts) !== 2) {
    throw 'Date does not match Warriors Band date format.';
    return;
  }

  term = textParts[0];
  dayOfTerm = textParts[1];

  if (_.toInteger(dayOfTerm) === 0 || !isFinite(dayOfTerm)) {
    throw 'Date does not match Warriors Band date format.';
    return;
  }

  if (!_.has(termStartDates, term)) {
    throw 'Can\'t calculate Warriors Band dates for days in that term.';
    return;
  }

  return moment(termStartDates[term]).add(_.toInteger(dayOfTerm) - 1, 'days').toDate();
}
