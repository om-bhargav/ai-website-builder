import { useState, useCallback } from "react"

export default function useLoading<T extends any[], R>(
  fn: (...args: T) => Promise<R>
) {
  const [loading, setLoading] = useState(false)

  const execute = useCallback(
    async (...args: T): Promise<R | undefined> => {
      try {
        setLoading(true)
        return await fn(...args)
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [fn]
  )

  return { loading, execute }
}