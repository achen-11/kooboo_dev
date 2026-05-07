//@k-url /test-api
k.api.get(() => {
  return k.content.homeContent.homeTabs.map(i => {
    return i;
  });
});