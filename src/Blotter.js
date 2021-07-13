import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const Blotter = ({ data }) => {
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 800 }}>
      <AgGridReact rowData={data}>
        <AgGridColumn field="s" headerName="Symbol"></AgGridColumn>
        <AgGridColumn field="t" headerName="Timestamp"></AgGridColumn>
        <AgGridColumn field="p" headerName="Price"></AgGridColumn>
        <AgGridColumn field="v" headerName="Volume"></AgGridColumn>
      </AgGridReact>
    </div>
  );
};

export default Blotter;
