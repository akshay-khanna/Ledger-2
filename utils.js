var helper = require('./public/assets/helper.js');

function weeklyPayment(details) {
	let start_date = new Date(Date.parse(details.start_date)),
		end_date = new Date(Date.parse(details.end_date)),
		total_days = helper.daysBetween(start_date, end_date),
		weekly_result = [],
		new_start_date = new Date(start_date);

	for (let i = 0; i < Math.floor(total_days / 7); i++) {
		weekly_result.push({
			tenancy_start: new_start_date.toISOString(),
			tenancy_end: new_start_date.addDays(6).toISOString(),
			weekly_rent: details.weekly_rent,
		});
		new_start_date = new_start_date.addDays(7);
	}

	let remaining_days = total_days % 7;

	if (remaining_days !== 0) {
		weekly_result.push({
			tenancy_start: new_start_date.toISOString(),
			tenancy_end: new_start_date.addDays(remaining_days).toISOString(),
			weekly_rent: (details.weekly_rent / 7) * (remaining_days + 1),
		});
	}
	return weekly_result;
}

function fortnightPayment(details) {
	let start_date = new Date(Date.parse(details.start_date)),
		end_date = new Date(Date.parse(details.end_date)),
		total_days = helper.daysBetween(start_date, end_date),
		fortnightResult = [],
		new_start_date = new Date(start_date);

	for (let i = 0; i < Math.floor(total_days / 14); i++) {
		fortnightResult.push({
			tenancy_start: new_start_date.toISOString(),
			tenancy_end: new_start_date.addDays(13).toISOString(), //one day is the start_date itself
			fortnight_rent: details.weekly_rent * 2,
		});
		new_start_date = new_start_date.addDays(14);
	}

	let remaining_days = total_days % 14;

	if (remaining_days !== 0) {
		fortnightResult.push({
			tenancy_start: new_start_date.toISOString(),
			tenancy_end: new_start_date.addDays(remaining_days).toISOString(),
			fortnight_rent: (details.weekly_rent / 7) * (remaining_days + 1), //+1 coz start_date needs to be included in the rent as well
		});
	}
	return fortnightResult;
}

function monthlyPayment(details) {
	let start_date = new Date(Date.parse(details.start_date)),
		end_date = new Date(Date.parse(details.end_date)),
		monthlyResult = [],
		remaining_days = 0,
		new_start_date = new Date(start_date.valueOf()),
		i = 0;

	while (end_date >= new_start_date) {
		let new_end_date = new Date(start_date.valueOf());

		new_end_date = new_end_date.addMonths(i + 1);
		new_end_date.setDate(new_end_date.getDate() - 1);

		if (new_end_date <= end_date) {
			monthlyResult.push({
				tenancy_start: new_start_date.toISOString(),
				tenancy_end: new_end_date.toISOString(),
				monthly_rent: ((details.weekly_rent / 7) * 365) / 12,
			});
			i++;
			new_start_date = new_end_date.addDays(1);
		} else {
			break;
		}
	}
	if (end_date >= new_start_date) {
		remaining_days = helper.daysBetween(new_start_date, end_date);
	}
	// console.log('new_start_date', new_start_date, 'end_date', end_date, 'remaining_days', remaining_days);

	if (remaining_days > 0) {
		monthlyResult.push({
			tenancy_start: new_start_date.toISOString(),
			tenancy_end: end_date.toISOString(),
			monthly_rent: (details.weekly_rent / 7) * (remaining_days + 1), //+1 coz start_date needs to be included in the rent as well
		});
	}
	return monthlyResult;
}

module.exports = {
	weeklyPayment: weeklyPayment,
	monthlyPayment: monthlyPayment,
	fortnightPayment: fortnightPayment,
};

