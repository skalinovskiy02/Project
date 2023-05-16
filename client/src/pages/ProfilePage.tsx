import React, {useEffect, useState} from 'react';
import {useTypesSelector} from "../hooks/useTypesSelector";
import {IUser} from "../models/IUser";
import LoginForm from "../components/LoginForm/LoginForm";
import Header from "../components/Header";
import OrderService from "../services/OrderService";
import FlatService from "../services/FlatService";
import {IOrder} from "../models/IOrder";
import {IFlat} from "../models/IFlat";
import FlatCard from "../components/FlatCard";
import OrderForm from "../components/OrderForm";
import Order from "../components/Order";


const ProfilePage = () => {
    const isAuth: boolean = useTypesSelector(state => state.auth.isAuth)
    const user: IUser | null = useTypesSelector(state => state.auth.user)
    const [type, setType] = useState<'uOrder' | 'flats' | 'oOrder'>('uOrder')
    const [items, setItems] = useState<IOrder[] | IFlat[]>([])
    const getItems = (e: any) =>{
        if (!user) return;
        switch (e.target.id){
            case 'uOrder' : return OrderService.getOrdersByUserId(user.id)
                .then((i)=> i? setItems([i]): setItems([]))
            case 'flats' : return FlatService.getFlatById(user.id)
                .then((i)=> i? setItems([i]): setItems([]))
            case 'oOrder' :  OrderService.getOrdersByOwnerId(user.id)
                .then((i)=> i? setItems([i]): setItems([]))
        }
    }

    function isFlat(obj: any): obj is IFlat{
        return obj?.price !== undefined;
    }

    useEffect(()=>{
        console.log(isFlat(items[0])? 'flat' : 'order')
    },[items])
    return (
        isAuth ?
            <Header>
                <div className={'profile'}>
                    <div className="user-info">
                        <div className="user-avatar"></div>
                        {user?.email}
                        {user?.isActivated? 1 : 0}
                    </div>
                    <div className="profile-body">
                        <ul className="title">
                            <li id={'uOrder'} onClick={getItems}>Бронирования</li>
                            <li id={'flats'} onClick={getItems}>Объявления</li>
                            <li id={'oOrder'} onClick={getItems}>Завершённые бронирования</li>
                        </ul>
                        <div className="items">
                            {
                                items.map((i)=> {
                                    if(isFlat(i))
                                    return <FlatCard flat={i} prefix={'profile'}></FlatCard>
                                    else
                                        return <Order order={i}></Order>
                                })
                            }
                        </div>
                    </div>
                </div>
            </Header>
            :
            <LoginForm></LoginForm>
    );
};

export default ProfilePage;