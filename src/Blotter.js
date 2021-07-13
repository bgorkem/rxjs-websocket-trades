import { AgGridReact } from "@ag-grid-community/react";
import { useState, useEffect } from "react";
import { AllModules } from "@ag-grid-enterprise/all-modules";
import "@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-enterprise/all-modules/dist/styles/ag-theme-alpine.css";
// import "ag-grid-enterprise";

const colDefs = [
  { field: "s", headerName: "symbol", rowGroup: true },
  {
    field: "t",
    headerName: "Timestamp",
    rowGroup: false,
    valueFormatter: (params) =>
      params.value ? new Date(params.value).toLocaleTimeString() : "",
    aggFunc: "last",
  },
  {
    field: "p",
    headerName: "price",
    cellRenderer: "agAnimateShowChangeCellRenderer",
    aggFunc: "last",
    valueFormatter: ({ value }) => +value.toFixed(4),
  },
  {
    field: "v",
    headerName: "volume",
    aggFunc: "sum",
    valueFormatter: ({ value }) => +value.toFixed(4),
  },
];

const Blotter = ({ data }) => {
  const [api, setApi] = useState(null);

  const onGridReady = (evt) => {
    setApi(evt.api);
  };

  useEffect(() => {
    if (!api) {
      return;
    }
    api.applyTransaction({ add: data });
  }, [api, data]);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 800 }}>
      <AgGridReact
        defaultColDef={{
          flex: 1,
          minWidth: 100,
          filter: true,
          sortable: true,
          resizable: true,
        }}
        autoGroupColumnDef={{ minWidth: 200 }}
        groupMultiAutoColumn={true}
        enableRangeSelection={true}
        animateRows={true}
        onGridReady={onGridReady}
        columnDefs={colDefs}
        modules={AllModules}
      ></AgGridReact>
    </div>
  );
};

export default Blotter;
