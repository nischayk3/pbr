const newDate = new Date();

// current date - date format February 23, 2023
export const currentDate = () => {
	const newDate = new Date();
	const month = newDate.toLocaleString('default', { month: 'long' });
	const latestDate = newDate.getDate();
	const year = newDate.getFullYear();
	const updateDate = month + ' ' + latestDate + ',' + ' ' + year;
	return updateDate;
};

// current timestamp format - 1:20:54
export const currentTimeStamp = () => {
	const hour = newDate.getHours();
	const minute = newDate.getMinutes();
	const second = newDate.getSeconds();
	const timestamp = hour + ":" + minute + ":" + second;
	return timestamp;
}

//current date format - 2023-2-23
export const latestDate = () => {
	const day = newDate.getDate();
	const month = newDate.getMonth() + 1;
	const year = newDate.getFullYear();
	const date = year + "-" + month + "-" + day;
	return date;
}