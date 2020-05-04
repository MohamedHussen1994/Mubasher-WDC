(function () {
    var myConnector = tableau.makeConnector();
    // This creates the Web Data Connector schema that
    // describes the information returned by hte WDC.
    myConnector.getSchema = function (schemaCallback) {
       var cols = [{
          id: "exchange",
          dataType: tableau.dataTypeEnum.string
       }, {
         id: "name",
         dataType: tableau.dataTypeEnum.string
      }, {
         id: "url",
         dataType: tableau.dataTypeEnum.string
      }, {
         id: "code",
         dataType: tableau.dataTypeEnum.string
      }, {
          id: "value",
          dataType: tableau.dataTypeEnum.float
       }, {
         id: "change",
         dataType: tableau.dataTypeEnum.float
      }, {
         id: "changePercentage",
         dataType: tableau.dataTypeEnum.float
      }, {
         id: "turnover",
         dataType: tableau.dataTypeEnum.float
      }, {
         id: "open",
         dataType: tableau.dataTypeEnum.float
      }, {
         id: "high",
         dataType: tableau.dataTypeEnum.float
      }, {
         id: "low",
         dataType: tableau.dataTypeEnum.float
      }, {
         id: "volume",
         dataType: tableau.dataTypeEnum.float
      }, {
         id: "status",
         dataType: tableau.dataTypeEnum.string
      }, {
         id: "chartFileUrl",
         dataType: tableau.dataTypeEnum.string
      }, {
          id: "updatedAt",
          dataType: tableau.dataTypeEnum.string
       }];
  
       var tableSchema = {
          id: "WDC1",
          alias: "Mubasher web data connector",
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
            tableData.push({"exchange": item.exchange,
                            "name": item.name,
                            "url": item.url,
                            "code": item.code,
                            "value": item.value,
                            "change": item.change,
                            "changePercentage": item.changePercentage,
                            "turnover": item.turnover,
                            "open": item.open,
                            "high": item.high,
                            "low": item.low,
                            "volume": item.volume,
                            "status": item.status,
                            "chartFileUrl": item.chartFileUrl,
                            "updatedAt": item.updatedAt
                           });
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