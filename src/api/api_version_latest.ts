//@k-url /api/version-latest
type RequestModel = {
  platform: "WinUI" | "Web" | "Mac" | "MacArm64" | "LinuxX64" | "LinuxArm64";
  dotnetInfo: string;
  macAddress: string;
  loginUser: string;
  currentVersion: string;
};
k.api.post((body: RequestModel) => {
  k.logger.debug(body.macAddress);
  k.logger.debug(body);
  k.logger.debug(JSON.stringify(body));
  k.logger.debug(body.platform);
  const platform = body.platform;
  return getByPlatform(platform);
});
k.api.get(getByPlatform);
function getByPlatform(platform: string) {
  const entity = k.content.Package.find(`Platform == '${platform}'`);
  if (!entity) {
    k.response.statusCode(400);
    return {
      error: "Not found"
    };
  }
  if (platform == "WinUI") {
    return getByUrl("https://cdn.kooboo.eu/download/kooboo-win-x64.zip", entity.ForceUpgrade === "true", entity.lastModified);
  }
  if (platform == "LinuxX64") {
    return getByUrl("https://cdn.kooboo.eu/download/kooboo-linux-x64.zip", entity.ForceUpgrade === "true", entity.lastModified);
  }
  if (platform == "MacArm64") {
    return getByUrl("https://cdn.kooboo.eu/download/kooboo-osx-arm64.zip", entity.ForceUpgrade === "true", entity.lastModified);
  }
}
function getByUrl(url, forceUpgrade, publishDate) {
  var cache = k.cache.get(url);
  if (cache) return cache;
  var result = k.net.httpClient.send(url + "?mode=filename", "get").bodyString();
  var version = result.substring(result.lastIndexOf("-") + 1, result.lastIndexOf("."));
  var result = {
    version: version,
    url: url,
    forceUpgrade: forceUpgrade,
    publishDate: publishDate
  };
  k.cache.set(url, result, 5);
  return result;
}