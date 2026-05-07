//@k-url /testip
// sample code.. 
var city = k.net.IP.getCityOrCountry(k.request.clientIp);
if (city.countryCode == "CN") {
  k.response.write("True");
} else {
  k.response.write("False");
}
k.response.write(city);