import { residenceSchema, type Residence } from '../domain/residence'
import { residenceFixture } from './fixtures/residence'

export async function getResidence(): Promise<Residence> {
  return Promise.resolve(residenceSchema.parse(residenceFixture))
}
