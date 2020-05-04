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
      var request;
      request = $.ajax({
        url: "https://cors-anywhere.herokuapp.com/" + "https://www.mubasher.info/api/1/stocks/prices",
        type: "GET",
        data: {country: 'eg'}
      });
   
      // Callback handler for success
      request.done(function (response, textStatus, jqXHR){
         var jsonObject = response;
         tableData = [];
         jsonObject.prices.forEach(
            function(item, index) {
            var value = item.value;
            const volume = item.volume;
            var name = item.name;
            tableData.push({"Country": name, "Year": volume, "GDP": value});
            }
         );
         table.appendRows(tableData);
         doneCallback();
            });
      
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