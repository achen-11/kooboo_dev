//@k-url /api/join-us/{action}
import { getJoinUsModel } from "code/models/index";
import { getFilePath } from "code/utils/index";
function moveFile(fileList) {
  return fileList?.map(file => {
    if (file?.name) {
      // 移动文件到join-us目录下
      const newPath = getFilePath('join-us', file.name);
      k.file.rename(file.fullName, newPath);
      const {
        name,
        fullName,
        relativeUrl,
        size,
        stringSize
      } = k.file.get(newPath);
      return {
        name,
        fullName,
        relativeUrl,
        size,
        stringSize
      };
    } else {
      return null;
    }
  }).filter(i => i) || [];
}
k.api.post('file', () => {
  const file = k.request.files[0];
  if (!file) return k.api.badRequest();

  // !> 5MB
  if (file.bytes.length > 5 * 1024 * 1024) return k.api.badRequest();

  // 临时文件，超出一段时间手动清空
  const path = getFilePath('temp', file.fileName);
  const {
    relativeUrl,
    name,
    size,
    fullName,
    stringSize
  } = k.file.writeBinary(path, file.bytes);
  return {
    relativeUrl,
    name,
    size,
    fullName,
    stringSize
  };
});
k.api.post('post', body => {
  if (!body.jobQuestionId) return k.api.badRequest();
  let fileAnswers = [];
  if (Array.isArray(body.fileAnswers)) {
    fileAnswers = body.fileAnswers.reduce((a, c) => {
      const files = moveFile(c.files);
      return {
        ...a,
        [c.name]: files
      };
    }, {});
  }
  delete body.fileAnswers;
  return getJoinUsModel().create({
    jobQuestionId: body.jobQuestionId,
    data: body,
    fileAnswers
  });
});
k.api.post('/admin/clearTempFile', () => {
  // #todo 删除1天前的文件
  const files = k.file.folderFiles('/temp');
  files.filter(file => Date.now() - file.lastModified.getTime() > 24 * 60 * 60 * 1000).forEach(file => {
    k.file.delete(file.fullName);
  });
  // k.file.deleteFolder('/temp')
  return k.api.ok();
});
k.api.get('/admin/list', () => {
  return getJoinUsModel().findAll({}, {
    isDeserialize: true,
    order: {
      prop: 'created',
      order: 'descending'
    }
  });
});
k.api.get('/admin/questions', () => {
  var jobQuestions = k.content.JobQuestion.all();
  var baseQuestions = k.content.JobBaseQuestion.all();
  return {
    jobQuestions: Array.from(jobQuestions).map(i => {
      return {
        ...i,
        questions: [...i.questions.map(i => i)]
      };
    }),
    baseQuestions: baseQuestions
  };
});
k.api.put('/admin/collect', (id, isCollect) => {
  getJoinUsModel().updateById(id, {
    isCollect
  });
});
k.api.delete('/admin/remove', id => {
  const fileJson = getJoinUsModel().findById(id).fileAnswers;
  for (const key in fileJson) {
    const items = fileJson[key];
    items.forEach(item => {
      const url = item.relativeUrl;
      k.file.delete(url);
    });
  }
  getJoinUsModel().deleteById(id);
});