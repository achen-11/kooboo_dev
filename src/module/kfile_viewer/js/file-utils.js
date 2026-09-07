(function () {
  var root = typeof window !== 'undefined' ? window : globalThis;

  var IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'ico', 'avif'];
  var DOCUMENT_EXTS = ['md', 'markdown', 'txt', 'csv', 'log', 'pdf', 'doc', 'docx', 'xls', 'xlsx'];
  var CODE_EXTS = ['json', 'js', 'ts', 'html', 'css', 'xml', 'vue', 'jsx', 'tsx', 'yml', 'yaml'];
  var ARCHIVE_EXTS = ['zip', 'rar', '7z', 'tar', 'gz'];
  var MEDIA_EXTS = ['mp3', 'wav', 'ogg', 'mp4', 'webm', 'mov'];

  function normalizePath(input) {
    return String(input || '')
      .replace(/\\/g, '/')
      .split('/')
      .filter(Boolean)
      .join('/');
  }

  function joinPath(folder, name) {
    var left = normalizePath(folder);
    var right = normalizePath(name);
    if (!left) return right;
    if (!right) return left;
    return left + '/' + right;
  }

  function getItemName(item) {
    if (!item) return '';
    var name = item.Name != null ? item.Name : item.name;
    if (name) return String(name);
    var fullName = item.FullName != null ? item.FullName : item.fullName;
    return normalizePath(fullName).split('/').pop() || '';
  }

  function getItemFullName(item) {
    if (!item) return '';
    var fullName = item.FullName != null ? item.FullName : item.fullName;
    return normalizePath(fullName || getItemName(item));
  }

  function getFileExtension(name) {
    var base = getItemName({ Name: name });
    var idx = base.lastIndexOf('.');
    if (idx <= 0 || idx === base.length - 1) return '';
    return base.slice(idx + 1).toLowerCase();
  }

  function getFileKind(name) {
    var ext = getFileExtension(name);
    if (IMAGE_EXTS.indexOf(ext) !== -1) return 'image';
    if (DOCUMENT_EXTS.indexOf(ext) !== -1) return 'document';
    if (CODE_EXTS.indexOf(ext) !== -1) return 'code';
    if (ARCHIVE_EXTS.indexOf(ext) !== -1) return 'archive';
    if (MEDIA_EXTS.indexOf(ext) !== -1) return 'media';
    return 'other';
  }

  function itemMatchesQuery(item, query) {
    var q = String(query || '').trim().toLowerCase();
    if (!q) return true;
    return (getItemName(item) + ' ' + getItemFullName(item)).toLowerCase().indexOf(q) !== -1;
  }

  function filterItems(items, options) {
    var opts = options || {};
    var typeFilter = opts.typeFilter || 'all';
    var isFolder = !!opts.isFolder;
    return (items || []).filter(function (item) {
      if (!itemMatchesQuery(item, opts.query)) return false;
      if (typeFilter === 'all') return true;
      if (typeFilter === 'folder') return isFolder;
      if (isFolder) return false;
      return getFileKind(getItemName(item)) === typeFilter;
    });
  }

  function uniqueUploadName(desiredFullName, existingPaths) {
    var desired = normalizePath(desiredFullName);
    var existing = {};
    (existingPaths || []).forEach(function (path) {
      existing[normalizePath(path)] = true;
    });
    if (!existing[desired]) return desired;

    var parts = desired.split('/');
    var fileName = parts.pop() || '';
    var folder = parts.join('/');
    var dot = fileName.lastIndexOf('.');
    var stem = dot > 0 ? fileName.slice(0, dot) : fileName;
    var ext = dot > 0 ? fileName.slice(dot) : '';
    var index = 1;
    var candidate;
    do {
      candidate = joinPath(folder, stem + ' (' + index + ')' + ext);
      index += 1;
    } while (existing[candidate]);
    return candidate;
  }

  function getFolderDisclosureState(folder, maps) {
    var path = normalizePath(folder);
    var stateMaps = maps || {};
    if (stateMaps.checkingMap && stateMaps.checkingMap[path]) return 'checking';
    if (stateMaps.hasChildrenMap && stateMaps.hasChildrenMap[path] === true) return 'expandable';
    if (stateMaps.hasChildrenMap && stateMaps.hasChildrenMap[path] === false) return 'empty';
    if (stateMaps.loadedMap && stateMaps.loadedMap[path]) return 'empty';
    return 'unknown';
  }

  root.KFileViewerUtils = {
    normalizePath: normalizePath,
    joinPath: joinPath,
    getItemName: getItemName,
    getItemFullName: getItemFullName,
    getFileExtension: getFileExtension,
    getFileKind: getFileKind,
    filterItems: filterItems,
    uniqueUploadName: uniqueUploadName,
    getFolderDisclosureState: getFolderDisclosureState
  };
})();
