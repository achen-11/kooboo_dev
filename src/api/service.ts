//@k-url /api/service
k.api.get((culture, userId) => {
  k.RenderContext.Culture = culture ?? 'en';
  const services = k.content.Service.all();
  const baseUrl = k.site.info.baseUrl;
  const result = [];
  for (const i of services) {
    if (i.culture == 'all' || i.culture == culture || !i.culture) {
      if (k.request.clientIp == "89.149.220.164" && i.url.indexOf("sitebao.com") > -1) {
        continue;
      }
      if (k.request.clientIp == "81.171.2.61" && i.url.indexOf("sitebao.com") > -1) {
        continue;
      }
      result.push({
        id: i.id,
        cover: baseUrl + i.cover,
        name: i.name,
        url: i.url,
        price: i.price ? parseFloat(i.price) : 0
      });
    }
  }
  return result;
});