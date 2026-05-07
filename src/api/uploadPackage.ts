//@k-url /uploadPackage
k.api.post((key: string) => {
  if (key !== "hello") {
    return k.response.unauthorized();
  }
  if (k.request.files.length <= 0) {
    return badRequest("File not found");
  }
  ;
  const file = k.request.files[0];
  const form = k.request.form;
  const info = k.file.writeBinary(file.fileName, file.bytes);
  const url = info?.absoluteUrl;
  if (!url) {
    return badRequest({
      filename: file?.fileName,
      bytes: file?.bytes?.length,
      message: "Upload failed"
    });
  }
  const version = form.get("version");
  const sha256 = form.get("sha256");
  const platform = form.get("platform");
  k.response.setHeader("content-type", "application/json");
  return {
    url,
    version,
    sha256,
    platform,
    filename: file?.fileName,
    bytes: file?.bytes?.length
  };
  // let item = k.content.Package.find(`Version == "${version}" && Platform == "${platform}"`);
  // if (item) {
  //     item.Sha256 = sha256;
  //     item.Url = url;
  //     k.content.Package.update(item);
  // } else {
  //     item = k.content.Package.add({
  //         Version: version,
  //         Sha256: sha256,
  //         Url: url,
  //         Platform: platform,
  //     });
  // }
  // return item;
});
function badRequest(message: any) {
  k.response.statusCode(400);
  return {
    error: message
  };
}