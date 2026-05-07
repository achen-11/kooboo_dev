//@k-url /testtemp
var list = k.content.EcommerceComparisonCategory.all();
var articles = list[0].EcommerceComparison;
var articles2 = list[1].EcommerceComparison;
var articles3 = list[2].EcommerceComparison;
k.response.json(list);
k.response.json(articles);
k.response.json(articles2);
k.response.json(articles3);