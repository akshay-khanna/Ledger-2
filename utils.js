function daysBetween(d1, d2) {
	return Math.floor((d2 - d1) / (24 * 60 * 60 * 1000));
}

// function monthsBetween(d1, d2) {
// 	return Math.floor((d2 - d1) / (30 * 7 * 24 * 60 * 60 * 1000));
// }

// function weeksBetween(d1, d2) {
// 	return Math.floor((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
// }

Date.prototype.addDays = function (days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
};

Date.isLeapYear = function (year) {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

Date.getDaysInMonth = function (year, month) {
	return [31, Date.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
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

function weeklyPayment(details) {
	let start_date = new Date(Date.parse(details.start_date)),
		end_date = new Date(Date.parse(details.end_date)),
		// total_weeks = weeksBetween(start_date, end_date),
		total_days = daysBetween(start_date, end_date),
		result = [];
	let new_start_date = new Date(start_date);

	// console.log('weeks--', total_weeks, ' ==dayss', total_days, '  --months', total_months);

	for (let i = 0; i < Math.floor(total_days / 7); i++) {
		result.push({
			start1: new_start_date.toDateString(),
			end1: new_start_date.addDays(6).toDateString(),
			weekly_rent: details.weekly_rent,
		});
		new_start_date = new_start_date.addDays(7);
	}

	let remaining_days = total_days % 7;

	if (remaining_days !== 0) {
		result.push({
			tenancy_start: new_start_date.toDateString(),
			tenancy_end: new_start_date.addDays(remaining_days).toDateString(),
			weekly_rent: (details.weekly_rent / 7) * (remaining_days + 1),
		});
	}
	console.log('kkkk', result);
	return result;
}

function fortnightPayment(details) {
	let start_date = new Date(Date.parse(details.start_date)),
		end_date = new Date(Date.parse(details.end_date)),
		total_days = daysBetween(start_date, end_date),
		fortnightResult = [];

	let new_start_date = new Date(start_date);

	for (let i = 0; i < Math.floor(total_days / 14); i++) {
		fortnightResult.push({
			start1: new_start_date.toDateString(),
			end1: new_start_date.addDays(13).toDateString(),
			fortnight_rent: details.weekly_rent * 2,
		});
		new_start_date = new_start_date.addDays(14);
	}

	let remaining_days = total_days % 14;
	console.log('remaining_days', remaining_days);

	if (remaining_days !== 0) {
		fortnightResult.push({
			tenancy_start: new_start_date.toDateString(),
			tenancy_end: new_start_date.addDays(remaining_days).toDateString(),
			fortnight_rent: (details.weekly_rent / 7) * (remaining_days + 1),
		});
	}
	console.log('mmmmm', fortnightResult);
	return fortnightResult;
}

function monthlyPayment(details) {
	let start_date = new Date(Date.parse(details.start_date)),
		end_date = new Date(Date.parse(details.end_date)),
		monthlyResult = [],
		remaining_days;

	let new_start_date = new Date(start_date),
		i = 0;

	while (end_date >= new_start_date) {
		if (end_date >= new_start_date) {
			monthlyResult.push({
				tenancy_start: new_start_date.toDateString(),
				tenancy_end: new_start_date.addMonths(1).toDateString(),
				fortnight_rent: ((details.weekly_rent / 7) * 365) / 12,
			});
			i++;
			new_start_date = new_start_date.addMonths(1);
		} else {
			break;
		}
	}
	console.log('new_start_date', new_start_date, 'end_date', end_date, 'i', i);

	if (end_date > new_start_date) {
		remaining_days = daysBetween(new_start_date, end_date);
	}

	console.log('remaining_days', remaining_days);

	if (remaining_days !== 0) {
		monthlyResult.push({
			tenancy_start: new_start_date.toDateString(),
			tenancy_end: end_date.toDateString(),
			fortnight_rent: (details.weekly_rent / 7) * (remaining_days + 1),
		});
	}

	console.log('FINALL monthlyResult', monthlyResult);

	return monthlyResult;
}

module.exports = {
	weeklyPayment: weeklyPayment,
	monthlyPayment: monthlyPayment,
	fortnightPayment: fortnightPayment,
};
