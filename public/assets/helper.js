function validateRange() {
	if (new Date(Date.parse(document.getElementById('start_date').value)).valueOf() > new Date(Date.parse(document.getElementById('end_date').value)).valueOf()) {
		document.getElementById('end_date').focus();
		return false;
	}
	return true;
}
function validateForm() {
	if (!validateRange()) {
		alert('End date cannot be lesser than the Start Date');
		return false;
	}
}

// That is for calculating the length between days. 24 hours * 60 minutes * 60 seconds * 1000 milliseconds.
function daysBetween(d1, d2) {
	return Math.floor((d2 - d1) / (24 * 60 * 60 * 1000));
}

Date.isLeapYear = function (year) {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

Date.getDaysInMonth = function (year, month) {
	return [31, Date.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

Date.prototype.addDays = function (days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
};

Date.prototype.isLeapYear = function () {
	return Date.isLeapYear(this.getFullYear());
};

Date.prototype.getDaysInMonth = function () {
	return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};

Date.prototype.addMonths = function (value) {
	var n = this.getDate();
	this.setDate(1);
	this.setMonth(this.getMonth() + value);
	this.setDate(Math.min(n, this.getDaysInMonth()));
	return this;
};

module.exports = {
	daysBetween: daysBetween,
};
