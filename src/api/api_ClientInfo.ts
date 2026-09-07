//@k-url /api/ClientInfo
var result = {};
var updates = k.content.ClientInfoUpdate.all();
updates.forEach(function (o) {
  if (o.Image) {
    o.Image = k.site.info.makeAbsUrl(o.Image);
  }
});
result.news = updates;
var banner = k.content.ClientInfoBanner.all();
var IsOnlineServer = k.request.IsOnlineServer;
if (IsOnlineServer) {
  var info = banner.filter(o => o.IsOnlineServer == "true")[0];
  result.banner = info;
} else {
  var info = banner.filter(o => o.IsOnlineServer == "false")[0];
  result.banner = info;
}
var docs = k.content.ClientInfoDocEntry.all();
result.doc = docs;
k.response.json(result);