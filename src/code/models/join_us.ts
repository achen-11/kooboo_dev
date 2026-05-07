import { define, DataTypes } from "code/utils/k_sqlite";
export const getJoinUsModel = () => define('join_us', {
  jobQuestionId: {
    type: DataTypes.String,
    required: true
  },
  data: {
    type: DataTypes.Object as {
      jobQuestionId: string;
    },
    default: {}
  },
  fileAnswers: {
    type: DataTypes.Object,
    default: {}
  },
  isCollect: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});
export default getJoinUsModel;