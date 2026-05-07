//@k-url /api/download
k.api.get(culture => {
  k.RenderContext.Culture = culture ?? 'en';
  var downloads = k.content.Downloads.all();
  var result = [];
  var files = k.file.folderFiles("/").sort((a, b) => b.lastModified - a.lastModified);
  for (const download of downloads) {
    var fileUrl = download.FileUrl;
    var lastModified = download.lastModified;
    if (download.Title?.includes("Microsoft Store")) {
      var file = files.find(f => f.name.includes(".msi"));
      if (file) {
        lastModified = file.lastModified;
      }
    } else if (download.Title?.includes("Mac")) {
      var file = files.find(f => f.name.includes("Kooboo-osx"));
      if (file) {
        lastModified = file.lastModified;
      }
    } else if (fileUrl?.includes("Kooboo-portable")) {
      var file = files.find(f => f.name.includes("Kooboo-portable"));
      if (file) {
        lastModified = file.lastModified;
        fileUrl = `https://www.kooboo.com/__kb/kfile/${file.name}`;
      }
    } else if (fileUrl?.includes(".msi")) {
      var file = files.find(f => f.name.includes(".msi"));
      if (file) {
        lastModified = file.lastModified;
        fileUrl = `https://www.kooboo.com/__kb/kfile/${file.name}`;
      }
    }
    result.push({
      ...download,
      FileUrl: fileUrl,
      lastModified
    });
  }
  return result;
});