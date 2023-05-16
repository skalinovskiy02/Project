import React, {FC, useEffect, useState} from 'react';
import {IFlat} from "../models/IFlat";
import OrderService from "../services/OrderService";
import {IOrder} from "../models/IOrder";
import {useTypesSelector} from "../hooks/useTypesSelector";
import {IUser} from "../models/IUser";
import DatePicker from "./DatePicker";

interface orderFormProps {
    action: Function,
    flat: IFlat
}

const OrderForm: FC<orderFormProps> = ({action, flat}) => {
    const user:IUser|null = useTypesSelector(state => state.auth.user)

    const doOrder = () => {
        if(!user || !flat) return;
        let order: IOrder = {
            userid: user.id,
            owner: flat.owner,
            flatId: flat.id,
            dayIn: new Date().toLocaleDateString(),
            dayOut: new Date().toLocaleDateString(),
            cost: flat.price
        }
        console.log(order)
        let today = new Date().toISOString().split('T')[0];
        document.getElementsByName("selectDate")[0].setAttribute('min', today);
        OrderService.postOrder(order)
        // action()

    }

    const [daysCount, setDaysCount] = useState<number>(0);
    let inputs = document.querySelectorAll<HTMLInputElement>('.day-select');
    let calculateDays = ()=>{
        setDaysCount(Math.abs(new Date(inputs[0].value).getDate() - new Date(inputs[1].value).getDate()))
        return 1;
    }
    return (

        <div className="head-info_order-form">
            <div className={"date_selector"}>
                Дата заезда
                <DatePicker></DatePicker>
            </div>
            <div className={"date_selector"}>
                Дата выезда
                <input className={"day-select"} type={'date'} name={'selectDate'} onChange={calculateDays}/>
            </div>
            <div>Цена за {daysCount} дней: {daysCount * flat.price}</div>
            <button onClick={doOrder} type="button" className="btn btn-warning">Забронировать</button>
        </div>
    );
};

export default OrderForm;