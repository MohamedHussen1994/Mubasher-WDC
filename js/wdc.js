(function () {
    var myConnector = tableau.makeConnector();
  
    // This creates the Web Data Connector schema that
    // describes the information returned by hte WDC.
    myConnector.getSchema = function (schemaCallback) {
       var cols = [{
          id: "Country",
          dataType: tableau.dataTypeEnum.string
       }, {
          id: "Year",
          dataType: tableau.dataTypeEnum.int
       }, {
          id: "GDP",
          dataType: tableau.dataTypeEnum.float
       }];
  
       var tableSchema = {
          id: "WDC1",
          alias: "GDP by Country and Year",
          columns: cols
       };
       schemaCallback([tableSchema]);
    };
  
    // This function is called when data is required from the
    // Web Data Connector.
    myConnector.getData = function (table, doneCallback) {
       tableData = [];
  
       // We are manually adding data, but in future tutorials
       // we will connect to an external data source using the
       // ajax function.
       tableData.push(
          {"Country": "US", "Year": "2002", "GDP": "10.98"},
          {"Country": "China", "Year": "2002", "GDP": "1.45"},
          {"Country": "Japan", "Year": "2002", "GDP": "3.98"},
          {"Country": "Germany", "Year": "2002", "GDP": "2.01"},
          {"Country": "France", "Year": "2002", "GDP": "1.45"},
          {"Country": "United Kingdom", "Year": "2002", "GDP": "1.62"},
          {"Country": "Brazil", "Year": "2002", "GDP": "0.50"},
          {"Country": "Russian Federation", "Year": "2002", "GDP": "0.35"},
          {"Country": "Italy", "Year": "2002", "GDP": "1.23"},
          {"Country": "India", "Year": "2002", "GDP": "0.52"},
          {"Country": "US", "Year": "2012", "GDP": "16.24"},
          {"Country": "China", "Year": "2012", "GDP": "8.23"},
          {"Country": "Japan", "Year": "2012", "GDP": "5.94"},
          {"Country": "Germany", "Year": "2012", "GDP": "3.43"},
          {"Country": "France", "Year": "2012", "GDP": "2.61"},
          {"Country": "United Kingdom", "Year": "2012", "GDP": "2.46"},
          {"Country": "Brazil", "Year": "2012", "GDP": "2.25"},
          {"Country": "Russian Federation", "Year": "2012", "GDP": "2.02"},
          {"Country": "Italy", "Year": "2012", "GDP": "2.01"},
          {"Country": "India", "Year": "2012", "GDP": "1.86"}
       );
  
       table.appendRows(tableData);
       doneCallback();
    };
  
    // This is reqired to register the Web Data Connector.
    tableau.registerConnector(myConnector);
  
    // Once the document has loaded we will attached functionality
    // to the submitButton.
    $(document).ready(function () {
       $("#submitButton").click(function () {
          tableau.connectionName = "Web Data Connector Part 1";
          tableau.submit();
       });
    });
 })();