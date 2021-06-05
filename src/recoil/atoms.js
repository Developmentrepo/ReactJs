import { atom } from "recoil";

export const batchSearchStepState = atom({
  key: 'batchSearchStepState',
  default: 0
})

export const chosenFileState = atom({
  key: 'chosenFileState',
  default: null
})

export const selectedCSVDataState = atom({
  key: 'selectedCSVDataState',
  default: [],
})

export const mappedCSVDataState = atom({
  key: 'mappedCSVDataState',
  default: [],
})

export const headerMappingState = atom({
  key: 'headerMappingState',
  default: {
    'Last Name': '',
    'First Name': '',
    'Mailing Address': '',
    'Mailing City': '',
    'Mailing State': '',
    'Mailing Zip': '',
    'Property Address': '',
    'Property City': '',
    'Property State': '',
    'Property Zip': '',
    'Phone 1': '',
    'Phone 2': '',
    'Phone 3': '',
    'Email': ''
  }
})