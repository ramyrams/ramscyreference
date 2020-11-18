/********************************************************************************************
* ? exec : task : screenshot : pause
*********************************************************************************************/




  
  
  on("task", {
    getContrctID({ newsql }) {
      console.log("%s", newsql);

      var config = {  
        server: 'stgdbt.stg.internal',  //update me
        authentication: {
            type: 'default',
            options: {
              trustedConnection: true
            }
        },
        options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: true,
            database: 'CORe'  //update me
        }
    }; 
    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        // If no error, then good to proceed.  
        console.log("CORe");  
        
        request = new Request("SELECT TOP 10 * FROM [Individual].[Individual]", function(err) {  
          if (err) {  
              console.log(err);}  
          });  
          var result = "";  
          request.on('row', function(columns) {  
              columns.forEach(function(column) {  
                if (column.value === null) {  
                  console.log('NULL');  
                } else {  
                  result+= column.value + " ";  
                }  
              });  
              console.log(result);  
              result ="";  
          });  
    
          request.on('done', function(rowCount, more) {  
          console.log(rowCount + ' rows returned');  
          });  
          connection.execSql(request);  

    });  


    return null;
  
}
})