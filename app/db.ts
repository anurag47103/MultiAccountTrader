import Dexie from 'dexie';
import {CSVDetails} from "@/types/types";


class StockDatabase extends Dexie {
    stocks: Dexie.Table<CSVDetails, string>;

    constructor() {
        super('StockDatabase');
        // Previous version
        this.version(1).stores({
            stocks: 'instrument_key, last_price, exchange',
        });

        this.stocks = this.table('stocks');
    }
}

const db = new StockDatabase();

export async function storeCSVData(csvData: CSVDetails[]) {
    await db.stocks.bulkPut(csvData);
}

export async function fetchStocks(query: string): Promise<CSVDetails[]> {

    if (!query) {
        return [];
    }
    console.log('searched started....');
    const response : CSVDetails[] =  await db.stocks.where('name').startsWithIgnoreCase(query).limit(20).toArray();
    console.log('searched ended..... with ', response.length, ' results');
    return response;
}
