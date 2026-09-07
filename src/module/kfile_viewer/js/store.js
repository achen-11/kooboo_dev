/**
 * 文件管理共享状态与逻辑，由根组件 provide('store', createStore())，子组件 inject('store') 使用。
 */
(function () {
  if (typeof Vue === 'undefined') return;
  var ref = Vue.ref, computed = Vue.computed, watch = Vue.watch;
  var utils = window.KFileViewerUtils || {};
  var normalizePath = utils.normalizePath || function (input) { return String(input || '').replace(/\\/g, '/').split('/').filter(Boolean).join('/'); };
  var joinPath = utils.joinPath || function (folder, name) { var left = normalizePath(folder), right = normalizePath(name); return left && right ? left + '/' + right : left || right; };
  var getItemFullName = utils.getItemFullName || function (item) { return normalizePath((item && (item.FullName || item.fullName || item.Name || item.name)) || ''); };
  var filterItems = utils.filterItems || function (items) { return items || []; };
  var uniqueUploadName = utils.uniqueUploadName || function (name) { return name; };
  var getFolderDisclosureState = utils.getFolderDisclosureState || function () { return 'unknown'; };

  function createStore() {
    var currentFolder = ref('');
    var topFolders = ref([]);
    var foldersMap = ref({});
    var files = ref([]);
    var selectedFile = ref(null);
    var previewContent = ref('');
    var previewError = ref('');
    var fileUrl = ref('');
    var editFileName = ref('');
    var editContent = ref('');
    var treeLoading = ref(false);
    var listLoading = ref(false);
    var error = ref('');
    var listError = ref('');
    var modalNewFolder = ref(false);
    var newFolderName = ref('');
    var modalNewFile = ref(false);
    var newFileName = ref('');
    var modalRename = ref({ show: false, oldName: '', newName: '', isFolder: false });
    var modalDelete = ref({ show: false, target: '', isFolder: false });
    var uploading = ref(false);
    var uploadProgress = ref(0);
    var uploadCurrentIndex = ref(0);
    var uploadTotal = ref(0);
    var uploadCurrentName = ref('');
    var previewWidth = ref(460);
    var isResizing = ref(false);
    var treeCollapsed = ref(false);
    var treeWidth = ref(224);
    var isTreeResizing = ref(false);
    var listViewMode = ref('list');
    var sortBy = ref('name');
    var sortOrder = ref('asc');
    var expandedFolders = ref({});
    var folderLoadingMap = ref({});
    var folderLoadedMap = ref({});
    var folderCheckingMap = ref({});
    var hasChildFoldersMap = ref({});
    var searchQuery = ref('');
    var typeFilter = ref('all');
    var modalCopyMove = ref({ show: false, mode: 'copy', target: '', targetName: '', isFolder: false, destinationFolder: '' });
    var uploadConflictMode = ref('rename');
    var uploadConflictModeDraft = ref('rename');
    var modalUploadSettings = ref(false);
    var uploadSkipped = ref(0);

    var breadcrumbParts = computed(function () {
      var p = currentFolder.value;
      return p ? p.split('/').filter(Boolean) : [];
    });
    var breadcrumbPartsDisplay = computed(function () {
      var parts = breadcrumbParts.value;
      if (parts.length <= 3) return parts.map(function (p) { return { name: p, path: parts.slice(0, parts.indexOf(p) + 1).join('/') }; });
      var first = { name: parts[0], path: parts[0] };
      var lastTwo = parts.slice(-2).map(function (p) { return { name: p, path: parts.slice(0, parts.indexOf(p) + 1).join('/') }; });
      return [first, { name: '...', path: null }].concat(lastTwo);
    });
    var subFoldersInList = computed(function () {
      var list = foldersMap.value[currentFolder.value];
      return list || [];
    });
    var filesInList = computed(function () { return files.value; });
    var filteredSubFoldersInList = computed(function () {
      return filterItems(subFoldersInList.value, { query: searchQuery.value, typeFilter: typeFilter.value, isFolder: true });
    });
    var filteredFilesInList = computed(function () {
      return filterItems(filesInList.value, { query: searchQuery.value, typeFilter: typeFilter.value, isFolder: false });
    });
    var isFiltering = computed(function () {
      return !!String(searchQuery.value || '').trim() || typeFilter.value !== 'all';
    });
    var knownFolders = computed(function () {
      var seen = { '': true };
      var result = [''];
      function add(folder) {
        var path = normalizePath(folder);
        if (seen[path]) return;
        seen[path] = true;
        result.push(path);
      }
      topFolders.value.forEach(function (f) { add(f.FullName || f.Name); });
      Object.keys(foldersMap.value).forEach(function (folder) {
        add(folder);
        (foldersMap.value[folder] || []).forEach(function (f) { add(f.FullName || f.Name); });
      });
      if (currentFolder.value) add(currentFolder.value);
      return result.sort(function (a, b) {
        if (a === '') return -1;
        if (b === '') return 1;
        return a.localeCompare(b);
      });
    });
    function sortItems(list, keyOverride) {
      var key = keyOverride != null ? keyOverride : sortBy.value, order = sortOrder.value;
      return list.slice().sort(function (a, b) {
        var va = key === 'name' ? (a.Name || a.FullName || '').toLowerCase() : (key === 'size' ? (a.Size != null ? a.Size : (a.size != null ? a.size : 0)) : (a.LastModified || a.lastModified || ''));
        var vb = key === 'name' ? (b.Name || b.FullName || '').toLowerCase() : (key === 'size' ? (b.Size != null ? b.Size : (b.size != null ? b.size : 0)) : (b.LastModified || b.lastModified || ''));
        if (va < vb) return order === 'asc' ? -1 : 1;
        if (va > vb) return order === 'asc' ? 1 : -1;
        return 0;
      });
    }
    var sortedSubFoldersInList = computed(function () { return sortItems(filteredSubFoldersInList.value, 'name'); });
    var sortedFilesInList = computed(function () { return sortItems(filteredFilesInList.value); });
    function setSortBy(by) {
      if (sortBy.value === by) sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
      else { sortBy.value = by; sortOrder.value = 'asc'; }
    }
    function resolvePublicFileUrl(url) {
      if (!url) return '';
      if (/^https?:\/\//i.test(url)) return url;
      var origin = (typeof sitePublicUrl !== 'undefined' && sitePublicUrl && sitePublicUrl.value)
        ? String(sitePublicUrl.value).replace(/\/$/, '')
        : window.location.origin;
      return url.charAt(0) === '/' ? origin + url : origin + '/' + url;
    }
    function getFileIconClass(file) {
      if (!file || !file.Name) return 'text-slate-400 dark:text-neutral-500';
      var ext = (file.Name || '').split('.').pop().toLowerCase();
      if (['md', 'markdown'].indexOf(ext) !== -1) return 'text-amber-600 dark:text-amber-400';
      if (['json', 'js', 'ts', 'html', 'css', 'xml'].indexOf(ext) !== -1) return 'text-indigo-500 dark:text-indigo-400';
      if (['txt', 'log', 'csv'].indexOf(ext) !== -1) return 'text-slate-500 dark:text-neutral-400';
      return 'text-slate-400 dark:text-neutral-500';
    }

    function setError(msg) {
      error.value = msg || '';
      if (msg) setTimeout(function () { error.value = ''; }, 4000);
    }
    function clearError() { error.value = ''; }
    function showToast(message, type, duration) {
      if (type === void 0) { type = 'success'; }
      if (duration === void 0) { duration = 3000; }
      var toast = document.getElementById('kfile-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'kfile-toast';
        toast.className = 'fixed top-4 right-4 z-[9999] flex flex-col gap-2';
        document.body.appendChild(toast);
      }
      var el = document.createElement('div');
      var icon = '';
      var bg = '';
      if (type === 'success') { icon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>'; bg = 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/60 dark:border-emerald-800 dark:text-emerald-300'; }
      else if (type === 'error') { icon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>'; bg = 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950/60 dark:border-red-800 dark:text-red-300'; }
      else if (type === 'warning') { icon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'; bg = 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/60 dark:border-amber-800 dark:text-amber-300'; }
      else { icon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'; bg = 'bg-slate-50 border-slate-200 text-slate-700 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200'; }
      el.className = 'flex items-center gap-2 px-4 py-3 rounded-lg border shadow-lg transform transition-all duration-300 translate-x-full opacity-0 ' + bg;
      el.innerHTML = '<span class="flex-shrink-0">' + icon + '</span><span class="text-sm font-medium">' + message + '</span>';
      toast.appendChild(el);
      requestAnimationFrame(function () {
        el.classList.remove('translate-x-full', 'opacity-0');
      });
      setTimeout(function () {
        el.classList.add('translate-x-full', 'opacity-0');
        setTimeout(function () { el.remove(); }, 300);
      }, duration);
    }
    function apiGet(action, params) {
      return http.get(action, { params: params }).catch(function (e) {
        var msg = (e.response && e.response.data && e.response.data.message) || e.message || '请求失败';
        showToast(msg, 'error');
        throw e;
      });
    }
    function apiPost(action, body) {
      return http.post(action, body).catch(function (e) {
        var msg = (e.response && e.response.data && e.response.data.message) || e.message || '请求失败';
        showToast(msg, 'error');
        throw e;
      });
    }

    function toArray(val) {
      if (Array.isArray(val)) return val;
      if (val && typeof val === 'object' && Array.isArray(val.data)) return val.data;
      if (val && typeof val === 'object' && Array.isArray(val.list)) return val.list;
      if (val && typeof val === 'object' && Array.isArray(val.items)) return val.items;
      return [];
    }
    function normalizeFolder(f) {
      if (!f || typeof f !== 'object') return f;
      return {
        Name: f.Name != null ? f.Name : f.name,
        FullName: f.FullName != null ? f.FullName : f.fullName
      };
    }
    function normalizeFile(f) {
      if (!f || typeof f !== 'object') return f;
      return {
        Name: f.Name != null ? f.Name : f.name,
        FullName: f.FullName != null ? f.FullName : f.fullName,
        StringSize: f.StringSize != null ? f.StringSize : f.stringSize,
        Size: f.Size != null ? f.Size : f.size,
        LastModified: f.LastModified != null ? f.LastModified : f.lastModified,
        url: f.url,
        RelativeUrl: f.RelativeUrl != null ? f.RelativeUrl : f.relativeUrl,
        AbsoluteUrl: f.AbsoluteUrl != null ? f.AbsoluteUrl : f.absoluteUrl
      };
    }
    function setFolderChildren(folder, children) {
      var key = normalizePath(folder);
      var arr = children || [];
      foldersMap.value = Object.assign({}, foldersMap.value, { [key]: arr });
      folderLoadedMap.value = Object.assign({}, folderLoadedMap.value, { [key]: true });
      hasChildFoldersMap.value = Object.assign({}, hasChildFoldersMap.value, { [key]: arr.length > 0 });
    }
    function setFolderChecking(folder, checking) {
      var key = normalizePath(folder);
      var next = Object.assign({}, folderCheckingMap.value);
      if (checking) next[key] = true;
      else delete next[key];
      folderCheckingMap.value = next;
    }
    function probeFoldersForChildren(folders) {
      (folders || []).forEach(function (folder) {
        var key = normalizePath(folder && (folder.FullName || folder.Name));
        if (!key || folderLoadedMap.value[key] || folderCheckingMap.value[key] || hasChildFoldersMap.value[key] !== undefined) return;
        setFolderChecking(key, true);
        apiGet('subFolders', { folder: key })
          .then(function (data) {
            var arr = toArray(data).map(normalizeFolder).filter(function (f) { return f && (f.Name != null || f.FullName != null); });
            setFolderChildren(key, arr);
          })
          .catch(function () {})
          .finally(function () { setFolderChecking(key, false); });
      });
    }

    function loadTopFolders() {
      treeLoading.value = true;
      listError.value = '';
      apiGet('subFolders', { folder: '' })
        .then(function (data) {
          var arr = toArray(data).map(normalizeFolder).filter(function (f) { return f && (f.Name != null || f.FullName != null); });
          topFolders.value = arr;
          setFolderChildren('', arr);
          probeFoldersForChildren(arr);
        })
        .catch(function (e) {
          listError.value = (e.response && e.response.data && e.response.data.message) || e.message || '接口请求失败';
        })
        .finally(function () { treeLoading.value = false; });
    }
    function loadCurrentList() {
      var folder = currentFolder.value;
      listLoading.value = true;
      listError.value = '';
      Promise.all([
        apiGet('subFolders', { folder: folder }),
        apiGet('folderFiles', { folder: folder })
      ]).then(function (responses) {
        var subArr = toArray(responses[0]).map(normalizeFolder).filter(function (f) { return f && (f.Name != null || f.FullName != null); });
        var fileArr = toArray(responses[1]).map(normalizeFile);
        setFolderChildren(folder, subArr);
        files.value = fileArr;
        probeFoldersForChildren(subArr);
      }).catch(function (e) {
        listError.value = (e.response && e.response.data && e.response.data.message) || e.message || '接口请求失败';
      }).finally(function () { listLoading.value = false; });
    }
    function loadSubFolders(folder) {
      var key = normalizePath(folder);
      if (folderLoadingMap.value[key]) return Promise.resolve([]);
      folderLoadingMap.value = Object.assign({}, folderLoadingMap.value, { [key]: true });
      return apiGet('subFolders', { folder: key })
        .then(function (data) {
          var arr = toArray(data).map(normalizeFolder).filter(function (f) { return f && (f.Name != null || f.FullName != null); });
          setFolderChildren(key, arr);
          probeFoldersForChildren(arr);
          return arr;
        })
        .catch(function (e) {
          listError.value = (e.response && e.response.data && e.response.data.message) || e.message || '接口请求失败';
          return [];
        })
        .finally(function () {
          var next = Object.assign({}, folderLoadingMap.value);
          delete next[key];
          folderLoadingMap.value = next;
        });
    }
    function refresh() {
      loadTopFolders();
      loadCurrentList();
      if (selectedFile.value) {
        var name = selectedFile.value.FullName || selectedFile.value.Name;
        selectFile({ FullName: name, Name: name.split('/').pop() });
      }
    }
    function navigateTo(folder) {
      currentFolder.value = normalizePath(folder);
      selectedFile.value = null;
      previewContent.value = '';
      previewError.value = '';
      fileUrl.value = '';
      editFileName.value = '';
    }
    function toggleFolder(folder) {
      var key = normalizePath(folder);
      var state = folderDisclosureState(key);
      if (state === 'checking' || state === 'empty') return;
      var nextOpen = !expandedFolders.value[key];
      expandedFolders.value = Object.assign({}, expandedFolders.value, { [key]: nextOpen });
      if (nextOpen && !folderLoadedMap.value[key]) loadSubFolders(key);
      else if (nextOpen) probeFoldersForChildren(folderChildren(key));
    }
    function folderDisclosureState(folder) {
      return getFolderDisclosureState(folder, {
        hasChildrenMap: hasChildFoldersMap.value,
        loadedMap: folderLoadedMap.value,
        checkingMap: folderCheckingMap.value
      });
    }
    function folderCanToggle(folder) {
      var state = folderDisclosureState(folder);
      return state === 'expandable' || state === 'unknown';
    }
    function isFolderExpanded(folder) { return !!expandedFolders.value[normalizePath(folder)]; }
    function isFolderLoading(folder) { return !!folderLoadingMap.value[normalizePath(folder)]; }
    function isFolderLoaded(folder) { return !!folderLoadedMap.value[normalizePath(folder)]; }
    function isFolderChecking(folder) { return folderDisclosureState(folder) === 'checking'; }
    function folderChildren(folder) { return foldersMap.value[normalizePath(folder)] || []; }

    function selectFile(file) {
      var name = file.FullName || file.Name;
      selectedFile.value = file;
      previewContent.value = '';
      previewError.value = '';
      fileUrl.value = '';
      apiGet('url', { fileName: name }).then(function (url) {
        if (url) fileUrl.value = resolvePublicFileUrl(url);
      });
      var ext = (file.Name || '').split('.').pop().toLowerCase();
      var textExts = ['txt', 'md', 'json', 'html', 'css', 'js', 'ts', 'xml', 'csv', 'log'];
      if (textExts.indexOf(ext) !== -1) {
        apiGet('read', { fileName: name }).then(function (text) {
          previewContent.value = text != null ? String(text) : '';
        }).catch(function () { previewError.value = '无法读取内容'; });
      }
    }
    function isImage(file) {
      if (!file || !file.Name) return false;
      return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'ico'].indexOf((file.Name || '').split('.').pop().toLowerCase()) !== -1;
    }
    function isMarkdown(file) {
      if (!file || !file.Name) return false;
      var ext = (file.Name || '').split('.').pop().toLowerCase();
      return ext === 'md' || ext === 'markdown';
    }
    var previewHtml = computed(function () {
      if (!selectedFile.value || !previewContent.value) return '';
      if (!isMarkdown(selectedFile.value)) return '';
      try {
        return (typeof marked !== 'undefined' && marked.parse) ? marked.parse(previewContent.value) : previewContent.value;
      } catch (e) { return previewContent.value; }
    });
    function copyLink() {
      if (!fileUrl.value) return;
      navigator.clipboard.writeText(fileUrl.value).then(function () { showToast('已复制链接', 'success'); });
    }
    function downloadFile(file) {
      var name = file && (file.FullName || file.Name);
      if (!name) return;
      apiGet('url', { fileName: name }).then(function (url) {
        var href = resolvePublicFileUrl(url);
        if (!href) return;
        var link = document.createElement('a');
        link.href = href;
        link.download = (file.Name || name.split('/').pop() || '');
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    }
    function startEdit(file) {
      var name = file.FullName || file.Name;
      editFileName.value = name;
      editContent.value = previewContent.value;
      if (previewWidth.value < 500) setPreviewWidth(Math.min(window.innerWidth * 0.5, 460));
      apiGet('read', { fileName: name }).then(function (text) {
        editContent.value = text != null ? String(text) : '';
      }).catch(function () {});
    }
    function cancelEdit() {
      editFileName.value = '';
      editContent.value = '';
      setPreviewWidth(460);
    }
    function saveEdit() {
      var name = editFileName.value;
      if (!name) return;
      apiPost('write', { fileName: name, content: editContent.value })
        .then(function () { cancelEdit(); refresh(); showToast('已保存', 'success'); });
    }
    function confirmDelete(target, isFolder) {
      modalDelete.value = { show: true, target: target, isFolder: isFolder };
    }
    function submitDelete() {
      var target = modalDelete.value.target, isFolder = modalDelete.value.isFolder;
      modalDelete.value.show = false;
      apiGet(isFolder ? 'deleteFolder' : 'delete', isFolder ? { folderName: target } : { fileName: target }).then(function () {
        if (selectedFile.value && (selectedFile.value.FullName || selectedFile.value.Name) === target) {
          selectedFile.value = null;
          previewContent.value = '';
          editFileName.value = '';
        }
        refresh();
        showToast('已删除', 'success');
      });
    }
    function openNewFolderModal() {
      newFolderName.value = '';
      modalNewFolder.value = true;
    }
    function openNewFileModal() {
      newFileName.value = '';
      modalNewFile.value = true;
    }
    function submitNewFile() {
      var name = newFileName.value.trim();
      if (!validateName(name)) { showToast('文件名为空或不能包含 /', 'error'); return; }
      var fullName = currentFolder.value ? currentFolder.value + '/' + name : name;
      apiPost('write', { fileName: fullName, content: '' })
        .then(function () { modalNewFile.value = false; newFileName.value = ''; loadCurrentList(); showToast('已创建', 'success'); });
    }
    function submitNewFolder() {
      var name = newFolderName.value.trim();
      if (!validateName(name)) { showToast('文件夹名为空或不能包含 /', 'error'); return; }
      var parent = currentFolder.value;
      apiGet('createFolder', parent ? { folderName: name, parentFolder: parent } : { folderName: name })
        .then(function () { modalNewFolder.value = false; newFolderName.value = ''; loadTopFolders(); loadCurrentList(); showToast('已创建', 'success'); });
    }
    function openRenameModal(fullName, isFolder) {
      modalRename.value = { show: true, oldName: fullName, newName: fullName.split('/').pop(), isFolder: isFolder };
    }
    function submitRename() {
      var o = modalRename.value;
      if (!validateName(o.newName.trim())) { showToast('名称为空或不能包含 /', 'error'); return; }
      apiGet(o.isFolder ? 'renameFolder' : 'rename', { oldName: o.oldName, newName: o.newName.trim() }).then(function () {
        modalRename.value.show = false;
        if (selectedFile.value && (selectedFile.value.FullName || selectedFile.value.Name) === o.oldName) {
          selectedFile.value = null;
          previewContent.value = '';
          editFileName.value = '';
        }
        refresh();
        showToast('已重命名', 'success');
      });
    }
    function openCopyMoveModal(fullName, isFolder, mode) {
      modalCopyMove.value = {
        show: true,
        mode: mode || 'copy',
        target: normalizePath(fullName),
        targetName: normalizePath(fullName).split('/').pop() || '',
        isFolder: !!isFolder,
        destinationFolder: currentFolder.value
      };
    }
    function closeCopyMoveModal() {
      modalCopyMove.value.show = false;
    }
    function submitCopyMove() {
      var o = modalCopyMove.value;
      var targetName = String(o.targetName || '').trim();
      var destination = normalizePath(o.destinationFolder || '');
      if (!validateName(targetName)) { showToast('名称为空或不能包含 /', 'error'); return; }
      var newName = joinPath(destination, targetName);
      if (!newName || newName === o.target) { showToast('目标路径不能与原路径相同', 'warning'); return; }
      if (o.isFolder && destination && (destination === o.target || destination.indexOf(o.target + '/') === 0)) {
        showToast('不能移动或复制到自身子目录', 'warning');
        return;
      }
      apiGet('folderExists', { folder: destination }).then(function (exists) {
        if (!exists) { showToast('目标文件夹不存在', 'error'); return; }
        var action = o.mode === 'move' ? (o.isFolder ? 'renameFolder' : 'rename') : 'copy';
        return apiGet(action, { oldName: o.target, newName: newName }).then(function () {
          modalCopyMove.value.show = false;
          refresh();
          showToast(o.mode === 'move' ? '已移动' : '已复制', 'success');
        });
      });
    }
    function onFileSelect(ev) {
      var input = ev.target, list = input.files;
      if (!list || list.length === 0) return;
      var existingPaths = files.value.map(function (file) { return getItemFullName(file); });
      uploading.value = true;
      uploadProgress.value = 0;
      uploadTotal.value = list.length;
      uploadCurrentIndex.value = 0;
      uploadCurrentName.value = '';
      uploadSkipped.value = 0;
      var done = 0, total = list.length;
      function next(i) {
        if (i >= total) {
          uploading.value = false;
          uploadCurrentName.value = '';
          input.value = '';
          refresh();
          showToast(uploadSkipped.value ? '上传完成，已跳过 ' + uploadSkipped.value + ' 个同名文件' : '上传完成', 'success');
          return;
        }
        var file = list[i], desiredName = joinPath(currentFolder.value, file.name), fileName = desiredName;
        uploadCurrentIndex.value = i + 1;
        uploadCurrentName.value = file.name;
        if (existingPaths.indexOf(desiredName) !== -1) {
          if (uploadConflictMode.value === 'skip') {
            uploadSkipped.value += 1;
            done++;
            uploadProgress.value = Math.round((done / total) * 100);
            next(i + 1);
            return;
          }
          if (uploadConflictMode.value === 'rename') {
            fileName = uniqueUploadName(desiredName, existingPaths);
          }
        }
        existingPaths.push(fileName);
        var reader = new FileReader();
        reader.onload = function () {
          apiPost('writeBinary', { fileName: fileName, binary: Array.from(new Uint8Array(reader.result)) })
            .then(function () { done++; uploadProgress.value = Math.round((done / total) * 100); next(i + 1); })
            .catch(function () { next(i + 1); });
        };
        reader.readAsArrayBuffer(file);
      }
      next(0);
    }
    function closeNewFolderModal() { modalNewFolder.value = false; newFolderName.value = ''; }
    function closeNewFileModal() { modalNewFile.value = false; newFileName.value = ''; }
    function closeRenameModal() { modalRename.value.show = false; }
    function closeDeleteModal() { modalDelete.value.show = false; }
    function openUploadSettingsModal() {
      uploadConflictModeDraft.value = uploadConflictMode.value;
      modalUploadSettings.value = true;
    }
    function closeUploadSettingsModal() { modalUploadSettings.value = false; }
    function submitUploadSettings() {
      uploadConflictMode.value = uploadConflictModeDraft.value;
      modalUploadSettings.value = false;
    }
    function validateName(name) { return name && name.indexOf('/') === -1 && !/^\s*$/.test(name); }
    function setPreviewWidth(w) { previewWidth.value = Math.max(200, Math.min(window.innerWidth - 200, w)); }
    function startResize() { isResizing.value = true; }
    function endResize() { isResizing.value = false; }
    function setTreeWidth(w) { treeWidth.value = Math.max(180, Math.min(480, w)); }
    function resetTreeWidth() { treeWidth.value = 224; }
    function startTreeResize() { isTreeResizing.value = true; }
    function endTreeResize() { isTreeResizing.value = false; }
    function toggleTree() { treeCollapsed.value = !treeCollapsed.value; }

    watch(currentFolder, function () { loadCurrentList(); }, { immediate: false });
    loadTopFolders();
    loadCurrentList();

    return {
      currentFolder, topFolders, foldersMap, files, selectedFile, previewContent, previewError, fileUrl,
      editFileName, editContent, treeLoading, listLoading, error, listError, modalNewFolder, newFolderName,
      modalNewFile, newFileName, modalRename, modalDelete, uploading, uploadProgress, uploadCurrentIndex, uploadTotal, uploadCurrentName,
      uploadConflictMode, uploadConflictModeDraft, modalUploadSettings, uploadSkipped, modalCopyMove,
      previewWidth, isResizing, setPreviewWidth, startResize, endResize,
      treeCollapsed, treeWidth, isTreeResizing, setTreeWidth, resetTreeWidth, startTreeResize, endTreeResize, toggleTree,
      expandedFolders, folderLoadingMap, folderLoadedMap, folderCheckingMap, hasChildFoldersMap,
      searchQuery, typeFilter, knownFolders,
      breadcrumbParts, breadcrumbPartsDisplay, subFoldersInList, filesInList, filteredSubFoldersInList, filteredFilesInList, sortedSubFoldersInList, sortedFilesInList, isFiltering,
      listViewMode, sortBy, sortOrder, setSortBy, getFileIconClass,
      refresh, navigateTo, loadSubFolders, toggleFolder, folderDisclosureState, folderCanToggle, isFolderExpanded, isFolderLoading, isFolderLoaded, isFolderChecking, folderChildren,
      selectFile, isImage, isMarkdown, previewHtml, copyLink, downloadFile, startEdit, cancelEdit, saveEdit,
      confirmDelete, submitDelete, openNewFolderModal, submitNewFolder, openNewFileModal, submitNewFile,
      openRenameModal, submitRename, openCopyMoveModal, submitCopyMove, closeCopyMoveModal, onFileSelect, clearError, showToast,
      closeNewFolderModal, closeNewFileModal, closeRenameModal, closeDeleteModal,
      openUploadSettingsModal, closeUploadSettingsModal, submitUploadSettings
    };
  }

  window.KFileViewerCreateStore = createStore;
})();
