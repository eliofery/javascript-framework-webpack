// import BidService from '@/services/BidService' // запросы заявок

// const { loadBids } = BidService // получение заявок

export const REFRESH_BIDS = 'REFRESH_BIDS' // для обновления заявок

/**
 * Обновление заявок
 *
 * @param bids
 * @returns {{bids, type: string}}
 */
export const refreshBids = bids => ({
  type: REFRESH_BIDS,
  bids,
})

/**
 * Получение заявок
 *
 * @type {*}
 */
const bids = [1, 2, 3, 4] // await loadBids()

/**
 * Состояние заявок
 *
 * @type {{bids: *, countBids}}
 */
export const bidsState = {
  bids,
  countBids: bids.length,
}

/**
 * Reducer заявок
 *
 * @param previousState
 * @param action
 * @returns {*|null}
 */
export const bidsReducer = (previousState, action) => {
  switch (action.type) {
    case REFRESH_BIDS:
      previousState.bids = action.bids

      return {
        ...previousState,
      }

    default:
      return null
  }
}

export default bidsReducer
