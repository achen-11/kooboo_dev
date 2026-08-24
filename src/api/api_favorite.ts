//@k-url /api/favorite
k.api.get((culture, userId) => {
  k.RenderContext.Culture = culture ?? 'en';
  var list = k.content.Favorite.all();
  var result = [];
  for (const i of list) {
    if (i.culture == 'all' || i.culture == culture || !i.culture) {
      result.push({
        id: i.id,
        type: i.type,
        referenceId: i.referenceId,
        cover: i.cover ? k.site.info.makeAbsUrl(i.cover) : null,
        creationDate: i.creationDate
      });
    }
  }
  return result;
});