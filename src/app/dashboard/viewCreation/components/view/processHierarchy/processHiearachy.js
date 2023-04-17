/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  2
 * @Last Modified - 11 April, 2023
 * @Last Changed By - Dinesh
 */

import { Card } from "antd";
import React from "react";
import SelectSearchField from "../../../../../../components/SelectSearchField/SelectSearchField";
import "./processHierarchy.scss";

const ProcessHierarchy = () => {


	return (
		<div>
			<Card title='Parameter Lookup' className='custom__card'>
				<div className='parameter__wraper'>
					<div className="parameter__wraper--select">
						<p>Molecule</p>

						<SelectSearchField
							id="filter-molecule"
							showSearch
							placeholder='Search Molecule'
							onChangeSelect={e => onChangeParam(e)}
							onSearchSelect={type => onSearchParam(type)}
							handleClearSearch={e => clearSearch(e)}
						//options={optionsMolecule}
						//selectedValue={filterValue}
						/>
					</div>
					<div className="parameter__wraper--select">
						<p>Filters</p>

						<SelectSearchField
							id="filter-molecule"
							showSearch
							placeholder='Search Molecule'
							onChangeSelect={e => onChangeParam(e)}
							onSearchSelect={type => onSearchParam(type)}
							handleClearSearch={e => clearSearch(e)}
						//options={optionsMolecule}
						//selectedValue={filterValue}
						/>
					</div>
				</div>
			</Card>
			<Card title='Process hierarchy' className='custom__card'></Card>
			<Card title='Files' className='custom__card'></Card>
		</div>
	)
}

export default ProcessHierarchy;