import { SurveyMongoRepository } from './survey-mongo-repository'
import { type Collection } from 'mongodb'
import { type AddSurveyModel } from '../../../../domain/usecases/add-survey'
import { MongoHelper } from '../helpers/mongo-helper'

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

describe('Survey Mongo Repository', () => {
  let surveyCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGODB_URI as string)
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should add a survey on add success', async () => {
    const sut = makeSut()
    await sut.add({
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer'
        },
        {
          answer: 'other_answer'
        }
      ]
    })
    const survey = await surveyCollection.findOne<AddSurveyModel>({
      question: 'any_question'
    })
    expect(survey).toBeTruthy()
  })
})
