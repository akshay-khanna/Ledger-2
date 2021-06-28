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
