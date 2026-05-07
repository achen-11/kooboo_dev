//@k-url /api/kooboo.rb
type PackageType = Kooboo.KContent.FolderTypes.Package;
k.api.get(() => {
  const template = k.file.read("brew_template.rb");
  if (!template) {
    return badRequest("brew_template.rb not found");
  }
  const platforms = ["MacArm64", "MacX64", "LinuxX64"];
  const criteria = platforms.map(it => `Platform == ${it}`).join(" || ");
  const packages = k.content.Package.findAll(criteria);
  const groups = groupBy(packages, it => it.Platform);
  const macArm64: PackageType = maxBy(groups["MacArm64"], it => it.Version);
  const macX64: PackageType = maxBy(groups["MacX64"], it => it.Version);
  const linuxX64: PackageType = maxBy(groups["LinuxX64"], it => it.Version);
  if (!macArm64) {
    return badRequest("MacArm64 package not found");
  }
  if (!macX64) {
    return badRequest("MacX64 package not found");
  }
  if (!linuxX64) {
    return badRequest("LinuxX64 package not found");
  }
  const urls = `if OS.mac?
    if Hardware::CPU.arm?
      url "${macArm64.Url}"
      sha256 "${macArm64.Sha256}"
    elsif Hardware::CPU.intel?
      url "${macX64.Url}"
      sha256 "${macX64.Sha256}"
    end
  elsif OS.linux?
    url "${linuxX64.Url}"
    sha256 "${linuxX64.Sha256}"
  end
`;
  const response = template.replace(`url: ""`, urls);
  k.response.setHeader("content-type", "text/plain");
  k.response.write(response);
});
function badRequest(error: string) {
  k.response.setHeader("content-type", "application/json");
  k.response.statusCode(400);
  return {
    error
  };
}
function groupBy<T>(array: T[], keyFunc: (it: T) => any) {
  return array.reduce((groups, item) => {
    const key = keyFunc(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});
}
function maxBy<T>(array: T[], keyFunc: (it: T) => any) {
  if (!Array.isArray(array) || array.length === 0) {
    return undefined;
  }
  return array.reduce((maxItem, currentItem) => {
    const maxValue = keyFunc(maxItem);
    const currentValue = keyFunc(currentItem);
    return currentValue > maxValue ? currentItem : maxItem;
  });
}