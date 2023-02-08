export const dataSourceGenealogy = [
  {
    key: "1",
    query: "batch_ids",
    type: "text",
    desc: (
      <>
        <p>Comma separated array of batch ids </p>
        <p>["1255|1322454|ABL2257-03","1255|1322454|ABL2257-04"]</p>{" "}
      </>
    ),
  },
  {
    key: "1",
    query: "material_nums",
    type: "text",
    desc: (
      <>
        <p>Comma separated array of material numbers </p>
        <p>Material number : [“1322454”]</p>{" "}
      </>
    ),
  },
  {
    key: "1",
    query: "sites",
    type: "integer",
    desc: (
      <>
        <p>Comma separated array of sites</p>
        <p>sites : [“1255”]</p>{" "}
      </>
    ),
  },
  {
    key: "1",
    query: "material_nums",
    type: "text",
    desc: "Level of detail needed  example 5",
  },
];

export const columnsGenealogy = [
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

export const versioningGenealogy = (
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

export const parametersGenealogy = (
  <>
    {" "}
    <p className="content"> Read : </p>
    <p className="content">
      The HTTP <span className="slash">GET</span> request can be used to read a
      resource or to list a number of resources. A resource's id can be
      submitted in the request parameters to read a specific resource. The
      response usually returns a 200 OK response code upon success, with the
      resource's metadata in the response body.
    </p>
    <p className="content">
      Most of the endpoints accept JSON as input and return JSON responses. This
      means that you must usually add the following headers to your request:
    </p>
    <div className="black-div2" id="projects">
      <p className="black_text">
        <br />
        <span className="slash">/</span>mdhgenealogy
        <span className="slash">/</span>v1
        <span className="slash">/</span>get-genealogy
      </p>
    </div>
  </>
);
