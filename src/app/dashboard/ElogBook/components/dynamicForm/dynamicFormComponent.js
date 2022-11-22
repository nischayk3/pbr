import InputField from "../../../../../components/InputField/InputField";

export const DynamicFormComponent = ({ type, title, label, value, id, editable }) => {
	console.log("formKey", type, title, label, value, id, editable);
	switch (type) {
		case "input":
			return (
				<InputField value={value} label={label} />
			);

	}

};