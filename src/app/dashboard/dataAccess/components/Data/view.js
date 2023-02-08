export const dataSourceView = [
    {
        key: "1",
        query: "view_disp_id",
        type: "text",
        desc: (
            <>
                <p>The ID of the view to retrieve the data for </p>
            </>
        ),
    },
    {
        key: "1",
        query: "view_version",
        type: "text",
        desc: (
            <>
                <p>The version of the view to retrieve the data .</p>
            </>
        ),
    },
    {
        key: "1",
        query: "type",
        type: "integer",
        desc: (
            <>
                <p>The format of the data to return, either csv or pdf</p>
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

export const columnsView = [
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

export const versioningView = (
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

export const parametersGenealogy_url = (
    <>
        <div className="black-div2" id="projects">
            <p className="black_text">
                <br />
                <span className="slash">/</span>services
                <span className="slash">/</span>v1
                <span className="slash">/</span>view-download
            </p>
        </div>
    </>
);

export const view_request = {
    download_type: "csv",
    view_disp_id: "V475",
    view_version: 2
}
export const render_side_tab_view = [
    "Overview",
    "Resources",
    "Parameters",
    "Versioning and Endpoint Lifecycle",
    "Conventions",
    "Output",
    "Implementation",
    "Error Codes",
    "Try Code",
];


export const content_view = (<>
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

    <div className="parent_div" id="Implementation">
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

    </div>
</>
)

