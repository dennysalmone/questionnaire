export interface IQuestionData {
  question: string,
  options: string[],
  answer: string[]
}

export interface IQuestionEntity {
  id: string,
  createAt?: Date,
  updateAt: Date,
  type: string,
  data: IQuestionData
}

