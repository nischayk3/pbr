
import elogJson from "../elog.json"
import ElogTable from './elogTable'
import "./elogTemplate.scss"

const ElogTemplate = () => {
	return (
		<>
			<div className="custom-user-roles-wrapper">
				<ElogTable
					getTableData={elogJson}
				// saveTableData={saveUserConfigurationws}
				// deleteTableRow={deleteUserConfiguartions}
				/>
			</div>
		</>
	)
}

export default ElogTemplate