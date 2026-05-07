//@k-url /startSiteVersion
k.api.get(function () {
  var obj = {};
  obj.Version = 0;
  if (k.file.exists("startSite.zip")) {
    var info = k.file.load("startSite.zip");
    if (info) {
      obj.Version = dateToLongTicks(info.lastModified);
      obj.Url = info.absoluteUrl;
      return obj;
    }
  }
  ;
  obj.Url = "";
  return obj;
});
function dateToLongTicks(date) {
  const TICKS_PER_MILLISECOND = 10000;
  const EPOCH_DIFFERENCE = 62135596800000; // Milliseconds from 0001-01-01 to 1970-01-01

  return BigInt((date.getTime() + EPOCH_DIFFERENCE) * TICKS_PER_MILLISECOND);
}