export const dataSourceRoles = [
    {
        key: "1",
        query: "type",
        type: "text",
        desc: (
            <>
                <p>Users, Role detail </p>
            </>
        ),
    },
    {
        key: "1",
        query: "role",
        type: "text",
        desc: (
            <>
                <p>Name of the role  for which data is required.</p>
            </>
        ),
    },
    {
        key: "1",
        query: "x-access-token",
        type: "text",
        desc: "The function also retrieves the access token from the x-access-token header of the request.",
    },
    {
        key: "1",
        query: "Resource-name",
        type: "text",
        desc: "View",
    }
];

export const columnsRoles = [
    {
        title: "Query Parameter",
        dataIndex: "query",
        key: "query",
    },
    {
        title: "Type",
        dataIndex: "type",
        key: "type",
    },
    {
        title: "Description",
        dataIndex: "desc",
        key: "desc",
    },
];

export const versioningRoles = (
    <>
        {" "}
        <p className="overview">Versioning and Endpoint Lifecycle</p>
        <ul>
            <li className="content">
                API versioning is not synchronized to specific releases of the MI
            </li>
            <li className="content">APIs are designed to be backward compatible.</li>
            <li className="content">
                Any changes to the API will first go through a deprecation phase
            </li>
        </ul>
    </>
);

export const parametersRoles_url = (
    <>
        <div className="black-div2" id="projects">
            <p className="black_text">
                <br />
                <span className="slash">/</span>services
                <span className="slash">/</span>v1
                <span className="slash">/</span>download-roles-users-details
            </p>
        </div>
    </>
);

export const roles_request = [{
    filter_type: "USERS",
    role_name: "CPV_USER",
}]
export const render_side_tab_roles = [
    "Overview",
    "Resources",
    "Parameters",
    "Versioning and Endpoint Lifecycle",
    "Conventions",
    "Output",
    "Try Code",
];

export const parameterContent_roles = (<>
    <div className="parent_div" id="Conventions">
        <p className="content">
            API has following filters :
        </p>
        Type = users ,
        role → role name
        <br />
        Gives list of all users, created on,locked/unlocked for a given role
        <br />
        To get the details of the role
        <ol type="a">
            <li>Type= role details</li>
            <li>Role= role name </li>
        </ol>
        Gives all the details of given role ,resource, action,datacess auth

    </div>
</>)
export const content_roles = (<>
    <div className="parent_div" id="Conventions">
        <p className="overview">Conventions</p>
        <ul>
            <li className="content">
                Resource names are plural and expressed in camelCase
            </li>
            <li className="content">
                Names are consistent between URL parameter name and field name.
            </li>
        </ul>
    </div>

    <div className="parent_div" id="Output">
        <p className="overview">Output</p>
        <p className="content">The output of the function is the data for the specified view in the specified format, returned as either a file (in the case of csv or pdf) or a JSON object with the following properties:</p>
        <ul>
            <li className="content">
                Message: An error message if the function was unable to retrieve the data
            </li>
            <li className="content">
                Error: The error that was raised, if applicable.
            </li>
            <li>
                Status: The HTTP status code
            </li>
        </ul>
    </div>

    {/* <div className="parent_div" id="Implementation">
        <p className="overview">Implementation</p>
        <ol>
            <li className="content">	The function retrieves the view_disp_id, view_version, and type parameters from the request and stores them in a dictionary params. </li>
            <li className="content">The function then retrieves the access token from the x-access-token header and uses the get_data_from_token function to get the token data. </li>
            <li className="content">The function checks if the user has access to the view using the get_resource_names function and raising a UserDontHaveAccessError if the user does not have access.</li>
            <li className="content">The function uses the get_view_calculation function to retrieve the data for the view.</li>
            <li className="content">If the data has a functions property, the function uses the convert_data_table_to_df function to convert the data to a pandas DataFrame.</li>
            <li className="content">If the DataFrame is not empty, the function uses the send_file function to return the data as a file in the specified format.</li>
            <li className="content">If the DataFrame is empty, the function returns a JSON object with an error message and a status code of BAD_REQUEST.</li>
            <li className="content">If any exceptions are raised during the execution of the function, a JSON object with an error message and a status code of BAD_REQUEST is returned.</li>
        </ol>

    </div> */}
</>
)

