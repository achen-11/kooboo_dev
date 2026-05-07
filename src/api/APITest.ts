//@k-url /APITest
// sample code.. 
var cateogryList = k.content.EcommerceComparisonCategory.all();
var functionsList = cateogryList[2].EcommerceComparison;
k.response.json(functionsList);
k.response.json(cateogryList);