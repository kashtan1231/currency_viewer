import { instanceApi } from './instance'
import store from '@/store'

// Get list of currencies
export const getCurrencies = async (date = '') => {
  const { data } = await instanceApi.get(
    `statdirectory/exchange?${date ? `date=${date}&` : ''}json`
  )
  store.commit('currency/setCurrencies', data)
  // store.commit('currency/setAllCurrencies', data)
}
