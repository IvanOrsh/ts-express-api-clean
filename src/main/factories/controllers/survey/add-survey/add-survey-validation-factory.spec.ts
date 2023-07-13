import { makeAddSurveyValidation } from './add-survey-validation-factory'
import {
  RequiredFieldValidation,
  ValidationComposite
} from '../../../../../validation/validators'
import { type Validation } from '../../../../../presentation/protocols/validation'

jest.mock('../../../../../validation/validators/validation-composite')

describe('AddSurveyVAlidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
