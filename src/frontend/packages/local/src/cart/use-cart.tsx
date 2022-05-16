import { useMemo } from 'react'
import { SWRHook } from '@vercel/commerce/utils/types'
import useCart, { UseCart } from '@vercel/commerce/cart/use-cart'

export default useCart as UseCart<typeof handler>

export const handler: SWRHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher() {
    return {
      id: '',
      createdAt: '',
      currency: { code: '' },
      taxesIncluded: '',
      lineItems: [],
      lineItemsSubtotalPrice: '',
      subtotalPrice: 0,
      totalPrice: 0,
    }
  },
  useHook:
    ({ useData }) =>
    (input) => {
      return useMemo(
        () =>
          Object.create(
            {
              subtotalPrice: 33,
              currency: {
                code: "JPY"
              },
              lineItems: [{
                id: 3,
              }
              ]
            },
            {
              isEmpty: {
                get() {
                  return false
                },
                enumerable: true,
              },
            }
          ),
        []
      )
    },
}
