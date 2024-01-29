'use client'

import {useEffect} from "react";
import {CSVDetails} from "@/types/types";
import {geCSVDetails} from "@/lib/dashboardService";
import {storeCSVData} from "@/db";

export default function Home() {
  useEffect(() => {

    (async () => {
      const csvData : CSVDetails[] = await geCSVDetails();
      storeCSVData(csvData);
    })()
  }, []);
  return (
    <main>

    </main>
  )
}
