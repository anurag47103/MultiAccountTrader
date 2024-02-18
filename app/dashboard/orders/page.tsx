'use client'
import { useAccounts } from "@/contexts/AccountsContext";
import { getAllHoldings, getAllOrders } from "@/lib/dashboardService";
import { formatOrderResponse, sortOrderResponse } from "@/lib/utils";
import { OrderResponse, Orders } from "@/types/types";
import NoAccountMessage from "@/ui/NoAccountMessage";
import OrdersTable from "@/ui/OrdersTable";
import { useEffect, useState } from "react";

const OrdersPage = () => {

    const [orders, setOrders] = useState<Orders[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const { loggedInAccounts } = useAccounts();

    useEffect( () => {
        try {  
            const fetchOrders = async () => {
                const data : OrderResponse = await getAllOrders();
                const sortedData: Orders[] = sortOrderResponse(data.orders);
                const formatedData: Orders[] = formatOrderResponse(sortedData);
                setOrders(formatedData);
                setIsLoading(false);
            }
            fetchOrders();
        } catch(error) {
            console.error('Error in fetchOrders : ', error);
            setIsError(true);
        }
    }, [])

    if(!loggedInAccounts || loggedInAccounts.length === 0) {
        return (
           <NoAccountMessage action="view orders" />
          );
    }
    if(!orders) return <div> null </div>
    if(isLoading) return <div>Loading...</div>
    if(isError) return <div> Error </div>

    return (
        <div className="m-4 rounded-lg flex-1 custom-scrollbar overflow-auto">
            <OrdersTable orders={orders} />
        </div>
    );
};

export default OrdersPage;
