export function getFilePath(path, filename) {
  if (k.file.exists(`${path}/${filename}`)) {
    const list = filename.split('.');
    if (list.length > 1) {
      const index = list.length - 2;
      let str = list[index];
      // 已经带有重复文件格式
      if (/\([0-9]+\)$/.test(str)) {
        list[index] = str.replace(/\(([0-9]+)\)$/, (match, p1) => {
          return `(${Number(p1) + 1})`;
        });
      } else {
        list[index] = str + '(1)';
      }
    } else {
      list[0] = list[0] + '(1)';
    }
    const newFileName = list.join('.');
    return getFilePath(path, newFileName);
  } else {
    return `${path}/${filename}`;
  }
}