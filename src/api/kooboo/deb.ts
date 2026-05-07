//@k-url /api/kooboo.deb
const list = k.file.getAllFiles().filter(it => it.name.endsWith(".deb")).sort((a, b) => b.lastModified - a.lastModified);
if (list.length === 0) {
  k.response.statusCode(404);
} else {
  const latest = list[0].relativeUrl;
  k.response.redirect(latest);
}