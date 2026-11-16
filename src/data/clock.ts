import { serverEnv } from '../config/server-env'
import { toParisIsoDate } from '../utils/dates'

// Today's date in Paris, or DEMO_NOW when set, so each "À la une" variant can be shown with the
// fake data.
export function getToday(): string {
  return serverEnv.demoNow ?? toParisIsoDate(new Date())
}
