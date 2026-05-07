//@k-url /ai-page-cards
k.api.get(culture => {
  k.RenderContext.Culture = culture ?? 'en';
  var list = k.content.aiPageCards.all();
  for (const i of list) {
    i.icon = k.site.info.makeAbsUrl(i.icon);
  }
  return list;
});