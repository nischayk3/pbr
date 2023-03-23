export const dataSourcePbr = [
    {
        key: "1",
        query: "limit",
        type: "int",
        desc: (
            <>
                <p>Restricts the no. of records fetched </p>
            </>
        ),
    },
    {
        key: "1",
        query: "createdBy",
        type: "text",
        desc: (
            <>
                <p>Can provide filter with created by user</p>
            </>
        ),
    },
    {
        key: "1",
        query: "status",
        type: "integer",
        desc: (
            <>
                <p>Approved/unapproved</p>
            </>
        ),
    },
    {
        key: "1",
        query: "confidence",
        type: "string",
        desc: (
            <>
                <p>High,low</p>
            </>
        ),
    },
    {
        key: "1",
        query: "id",
        type: "integer",
        desc: (
            <>
                <p>0</p>
            </>
        ),
    },
    {
        key: "1",
        query: "template_id",
        type: "string",
        desc: (
            <>
                <p>P236</p>
            </>
        ),
    },
    {
        key: "1",
        query: "date_range",
        type: "string",
        desc: (
            <>
                <p>2023-03-19T06:09:34.814Z/2023-03-22T06:09:34.815Z</p>
            </>
        ),
    },
    {
        key: "1",
        query: "x-access-token",
        type: "text",
        desc: "The function also retrieves the access token from the x-access-token header of the request.",
    },
];

export const columnsPbr = [
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

export const versioningPbr = (
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

export const parametersPbr_url = (
    <>
        <div className="black-div2" id="projects">
            <p className="black_text">
                <br />
                <span className="slash">/</span>pbr
                <span className="slash">/</span>udh
                <span className="slash">/</span>get_cpv_pbr
            </p>
        </div>
    </>
);

export const pbr_request = [{

    limit: 10,
    createdBy: null,
    status: null,
    confidence: null,
    id: null,
    template_id: [
    ],
    date_range: null,
    download: true


}]
export const render_side_tab_pbr = [
    "Overview",
    "Resources",
    "Parameters",
    "Versioning and Endpoint Lifecycle",
    "Conventions",
    "Output",
    "Try Code",
];


export const content_pbr = (<>
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


</>
)

