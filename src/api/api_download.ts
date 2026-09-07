//@k-url /api/download
k.api.get(culture => {
  k.RenderContext.Culture = culture ?? 'en';
  var downloads = k.content.Downloads.all();
  var result = [];
  for (const download of downloads) {
    var fileUrl = download.FileUrl;
    var lastModified = download.lastModified;
    result.push({
      ...download,
      FileUrl: fileUrl,
      lastModified
    });
  }
  return result;
});