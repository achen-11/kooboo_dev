//@k-url /api/version-latest
type RequestModel = {
  platform: "WinUI" | "Web" | "Mac" | "MacArm64" | "MacX64" | "LinuxX64" | "LinuxArm64";
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
  // if (!["WinUI", "Web", "Mac", "MacArm64", "MacX64", "LinuxX64"].includes(platform)) {
  //     throw new Error("Invalid platform");
  // }

  var files = k.file.folderFiles("/").sort((a, b) => b.lastModified - a.lastModified);
  const entity = k.content.Package.find(`Platform == '${platform}'`);
  if (!entity) {
    k.response.statusCode(404);
    return {
      error: "Not found"
    };
  }
  var url = entity.Url;
  var version = entity.Version;
  if (platform == "WinUI") {
    var file = files.find(f => f.fullName.includes("Kooboo-win-x64"));
    url = `https://www.kooboo.com/__kb/kfile/${file.name}`;
    version = file.name.replace("Kooboo-win-x64-", "").replace(".zip", "");
    // https://www.kooboo.com/__kb/kfile/Kooboo-win-x64-2.1.9355.39678.zip
  }
  if (platform == "LinuxX64") {
    var file = files.find(f => f.fullName.includes("Kooboo-linux-x64"));
    url = `https://www.kooboo.com/__kb/kfile/${file.name}`;
    version = file.name.replace("Kooboo-linux-x64-", "").replace(".zip", "");
    // https://www.kooboo.com/__kb/kfile/Kooboo-linux-x64-2.1.9355.41693.zip
  }
  if (platform == "LinuxArm64") {
    var file = files.find(f => f.fullName.includes("Kooboo-linux-arm64"));
    url = `https://www.kooboo.com/__kb/kfile/${file.name}`;
    version = file.name.replace("Kooboo-linux-arm64-", "").replace(".zip", "");
    // https://www.kooboo.com/__kb/kfile/Kooboo-linux-arm64-2.1.9355.41693.zip
  }
  if (platform == "MacArm64") {
    var file = files.find(f => f.fullName.includes("Kooboo-osx-arm64"));
    url = `https://www.kooboo.com/__kb/kfile/${file.name}`;
    version = file.name.replace("Kooboo-osx-arm64-", "").replace(".zip", "");
    // https://www.kooboo.com/__kb/kfile/Kooboo-osx-arm64-2.1.9355.40752.zip
  }
  if (platform == "MacX64") {
    var file = files.find(f => f.fullName.includes("Kooboo-osx-x64"));
    url = `https://www.kooboo.com/__kb/kfile/${file.name}`;
    version = file.name.replace("Kooboo-osx-x64-", "").replace(".zip", "");
    // https://www.kooboo.com/__kb/kfile/Kooboo-osx-x64-2.1.9355.40590.zip
  }
  return {
    version: version,
    url: url,
    forceUpgrade: entity.ForceUpgrade === "true",
    publishDate: entity.lastModified
  };
}