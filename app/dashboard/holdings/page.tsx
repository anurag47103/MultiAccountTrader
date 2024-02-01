'use client'

import { getAllHoldings } from "@/lib/dashboardService"
import { useEffect } from "react"

export const Holdings = () => {

    useEffect(() => {
      getAllHoldings();
    }, [])

    return (
      <div>
        Holdings
      </div>
    )
}

export default Holdings;