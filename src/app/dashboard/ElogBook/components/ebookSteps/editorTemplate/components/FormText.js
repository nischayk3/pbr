import React from 'react'

function FormText({ task }) {
	return (
		<div style={{ fontSize: `${task.fontSize}px`, fontWeight: task.fontWeight }}>{task.textlabel || "Enter text"}</div>
	)
}

export default FormText
