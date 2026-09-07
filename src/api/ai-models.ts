//@k-url /api/ai-models

k.api.get(() => {
  // The generated kooboo.d.ts in this checkout predates KAI.getModels().
  // @ts-ignore
  const providers = k.ai.getModels();
  return Array.from(providers ?? []).map((provider: any) => ({
    name: provider.name ?? provider.Name,
    displayName: provider.displayName ?? provider.DisplayName ?? provider.name ?? provider.Name,
    chatModels: Array.from(provider.chatModels ?? provider.ChatModels ?? []).map((model: any) => ({
      name: model.name ?? model.Name
    }))
  }));
});