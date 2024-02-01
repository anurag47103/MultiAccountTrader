'use client'

import {useEffect} from "react";
import {CSVDetails} from "@/types/types";
import {getCSVDetails} from "@/lib/dashboardService";
import {storeCSVData} from "@/db";

export default function Home() {
  useEffect(() => {

    (async () => {
      const csvData : CSVDetails[] = await getCSVDetails();
      storeCSVData(csvData);
    })()
  }, []);
  return (
    <main>

    </main>
  )
}
