// 子级路由需在通配路由上方声明1

// --- 文件夹 ---
k.api.get("subFolders", (folder: string) => {
  return k.file.subFolders(folder || "");
});
k.api.get("folderFiles", (folder: string) => {
  return k.file.folderFiles(folder || "");
});
k.api.get("createFolder", (folderName: string, parentFolder: string) => {
  return k.file.createFolder(folderName, parentFolder);
});
k.api.get("deleteFolder", (folderName: string) => {
  return k.file.deleteFolder(folderName);
});
k.api.get("renameFolder", (oldName: string, newName: string) => {
  return k.file.renameFolder(oldName, newName);
});

// --- 文件 读 ---
k.api.get("get", (fileName: string) => {
  return k.file.get(fileName);
});
k.api.get("load", (fileName: string) => {
  return k.file.load(fileName);
});
k.api.get("read", (fileName: string) => {
  return k.file.read(fileName);
});
k.api.get("readBinary", (fileName: string) => {
  return k.file.readBinary(fileName);
});
k.api.get("exists", (fileName: string) => {
  return k.file.exists(fileName);
});
k.api.get("url", (fileName: string) => {
  return k.file.url(fileName);
});
k.api.get("getAllFiles", () => {
  return k.file.getAllFiles();
});

// --- 文件 写/删/改 ---
k.api.get("delete", (fileName: string) => {
  return k.file.delete(fileName);
});
k.api.get("rename", (oldName: string, newName: string) => {
  return k.file.rename(oldName, newName);
});
k.api.get("copy", (oldName: string, newName: string) => {
  return k.file.copy(oldName, newName);
});

// POST: write, append, writeBinary, createFolder(可选 POST)
k.api.post("write", (body: any) => {
  const {
    fileName,
    content
  } = typeof body === "string" ? JSON.parse(body) : body;
  return k.file.write(fileName, content);
});
k.api.post("append", (body: any) => {
  const {
    fileName,
    content
  } = typeof body === "string" ? JSON.parse(body) : body;
  return k.file.append(fileName, content);
});
k.api.post("writeBinary", (body: any) => {
  const {
    fileName,
    binary
  } = typeof body === "string" ? JSON.parse(body) : body;
  return k.file.writeBinary(fileName, binary);
});

// 断点续传
// k.api.get("resumableUploadCreate", (name: string, size: number, chunkSize: number) => {
//   return k.file.resumableUpload.create(name, Number(size), Number(chunkSize))
// })

// k.api.get("resumableUploadGet", () => {
//   return k.file.resumableUpload.get()
// })

// k.api.get("resumableUploadRemove", () => {
//   return k.file.resumableUpload.remove()
// })