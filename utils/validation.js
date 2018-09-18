import first from 'lodash/first';
import match from 'switch-match';
// import {safeGet} from 'utils/safeGet';

const errorsText = {
	isRequired: 'Field is required',
	isEmail: 'Email is not valid'
};

export function isValidEmail(email) { // eslint-disable-line import/prefer-default-export
	const re = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\u0001-\u0008\u000b\u000c\u000e-\u001f\u0021\u0023-\u005b\u005d-\u007f]|\\[\u0001-\u0009\u000b\u000c\u000e-\u007f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?|[a-z0-9-]*[a-z0-9]:(?:[\u0001-\u0008\u000b\u000c\u000e-\u001f\u0021-\u005a\u0053-\u007f]|\\[\u0001-\u0009\u000b\u000c\u000e-\u007f])+)\])$/; // eslint-disable-line no-control-regex
	return re.test(email.toLowerCase());
}

export function validate(fields, state) { // eslint-disable-line import/prefer-default-export
	let isValid = true;
	let firstErrorTitle;
	const validateErrors = {};
	fields.forEach(field => {
		const value = state[field.title];
		const error = [];
		const isRequired = (field.validation || []).indexOf('isRequired') > -1;
		(field.validation || []).forEach(validation => {
			match(validation, {
				isRequired: () => {
					if (!value) {
						isValid = false;
						error.push(errorsText[validation]);
					}
				},
				isEmail: () => {
					if ((isRequired && !isValidEmail(value)) || (!isRequired && value && !isValidEmail(value))) {
						isValid = false;
						error.push(errorsText[validation]);
					}
				}
			}, null);
			if (!isValid && !firstErrorTitle) {
				firstErrorTitle = field.title;
			}
		});
		validateErrors[field.title] = first(error);
	});
	return {isValid, validateErrors, firstErrorTitle};
}

