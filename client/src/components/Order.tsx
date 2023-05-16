import React, {FC} from 'react';
import {IOrder} from "../models/IOrder";

interface OrderProps{
    order: IOrder
}

const Order:FC<OrderProps>= ({order}) => {
    return (
        <div className={'order'}>
            {order.id}
            {order.cost}
            {order.owner}
            {order.dayOut}
        </div>
    );
};

export default Order;