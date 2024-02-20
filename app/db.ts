import Dexie from 'dexie';
import {CSVDetails} from "@/types/types";


class StockDatabase extends Dexie {
    stocks: Dexie.Table<CSVDetails, string>;

    constructor() {
        super('StockDatabase');
        // Previous version
        this.version(4).stores({
            stocks: 'instrument_key, last_price, exchange, name',
        });

        this.stocks = this.table('stocks');
    }
}

const db = new StockDatabase();

export async function checkCSVData() {
    if(await db.stocks.count() > 1000) return true;
    else return false;
}

export async function storeCSVData(csvData: CSVDetails[]) {
    if(await checkCSVData()) return;
    
    console.log('storing csv...');
    try {
        await db.transaction('rw', db.stocks, async () => {
            await db.stocks.clear();
            await db.stocks.bulkPut(csvData);
        });
        console.log('stored csv successfully');
    } catch (error) {
        console.error('Error storing csv data:', error);
    }
}


export async function fetchStocks(query: string): Promise<CSVDetails[]> {

    if (!query) {
        return [];
    }
    
    const response : CSVDetails[] =  await db.stocks.where('name').startsWithIgnoreCase(query).limit(20).toArray();
    return response;
}
