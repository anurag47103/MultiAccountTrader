'use client'
import { getAllHoldings, getAllOrders } from "@/lib/dashboardService";
import { formatOrderResponse } from "@/lib/utils";
import { OrderResponse } from "@/types/types";
import OrdersTable from "@/ui/OrdersTable";
import { useEffect, useState } from "react";

type OrdersResponse = OrderResponse | null;

const OrdersPage = () => {

    const [orderResponse, setOrderResponse] = useState<OrdersResponse>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect( () => {
        try {  
            const fetchOrders = async () => {
                const data : OrderResponse = await getAllOrders();
                const formatedData: OrderResponse = formatOrderResponse(data);
                setOrderResponse(formatedData);
                setIsLoading(false);
            }
            fetchOrders();
        } catch(error) {
            console.error('Error in fetchOrders : ', error);
            setIsError(true);
        }
    }, [])

    if(!orderResponse) return <div> null </div>
    if(isLoading) return <div>Loading...</div>
    if(isError) return <div> Error </div>

    return (
        <div className="m-4 rounded-lg">
            <OrdersTable orderResponse={orderResponse} />
        </div>
    );
};

export default OrdersPage;
