import InputField from "../../../../../components/InputField/InputField";

export const DynamicFormComponent = ({ type, title, label, value, id, editable, formDetails, setFormData }) => {
	console.log("formKey", type, title, label, value, id, editable, formDetails);

	const inputChange = (a, b, c) => {
		var item = [...c]
		var val_ = a.target.value
		item.forEach((element, index) => {
			if (element.id === b) {
				item[index].value = val_;
			}
		});
		setFormData(item)
	}
	switch (type) {
		case "input":
			return (
				<InputField value={value} label={label} onChangeInput={(e) => inputChange(e, id, formDetails)} />
			);

	}

};