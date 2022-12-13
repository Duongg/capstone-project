/**
 * Fields in a request to update a single Car item.
 */
export interface UpdateCarRequest {
  name: string
  dueDate: string
  done: boolean
}