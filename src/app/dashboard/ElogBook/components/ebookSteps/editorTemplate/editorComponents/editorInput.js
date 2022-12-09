import React from 'react'

function EditorInput(props) {
  return (
    <div>
      {/* <div>
        <InputField
        name={props.name}
        type="text"
        // defaultValue="data"
        placeholder={props.placeholder}
        id="id"
        // value="data"
        // onChange={props.onChangeInput}
        // disabled={props.disabled}
        // onClick={props.onChangeClick}
        width = {props.width}
        heigth= "30px"
        borderColor= "red"
        />

</div> */}
<div className="input_field">
			<p>{props.label}</p>
			<input
                name={props.name}
				type={props.type}
				defaultValue={props.defaultValue}
				placeholder={props.placeholder}
				id={props.id}
				value={props.value}
				onChange={props.onChangeInput}
				disabled={props.disabled}
				onClick={props.onChangeClick}
                style={{width : props.width,heigth: props.height,borderColor: props.borderColor, padding: props.padding,
                paddingTop: props.paddingTop,paddingBottom: props.paddingBottom, margin: props.margin,
                }}
			/>
		</div>
    </div>
  )
}

export default EditorInput
