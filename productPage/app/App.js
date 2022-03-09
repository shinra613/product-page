let config = {
    appName: "product-page",
      reportName: "All-Products",
    criteria: "(type == \"preworkout\")",
    page: 1,
    pageSize: 10
}
   
ZOHO.CREATOR.API.getAllRecords(config).then(function(response){
     var recordArr = response.data;
 
    console.log(recordArr[0]);
  }
);