'use client'

import {useEffect} from "react";
import {CSVDetails} from "@/types/types";
import {getCSVDetails} from "@/lib/dashboardService";
import {storeCSVData} from "@/db";
import { permanentRedirect } from "next/navigation";

export default function Home() {
  useEffect(() => {

    (async () => {
      const csvData : CSVDetails[] = await getCSVDetails();
      storeCSVData(csvData);
    })()
  }, []);

  permanentRedirect(`/dashboard/placeOrders`)
  return (
    <main>

    </main>
  )
}
