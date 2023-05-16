import React, {FC, useEffect, useRef, useState} from 'react';
import {useTypesSelector} from "../hooks/useTypesSelector";
import {useYMaps} from "@pbe/react-yandex-maps";

interface MyInputProps extends React.ComponentPropsWithoutRef<'input'>{
    address?: string,
    setAddress?: Function,
    idName: string,
    yMapRef: any,
    yMaps: any
}

const MyInput: FC<MyInputProps> = ({address, setAddress, idName, yMapRef, yMaps, ...props}: MyInputProps) => {
    const inputRef: any = useRef<HTMLInputElement>(null);
    //Изменение инпута при изменении адреса по клику на карту
    useEffect(() => {
        if (address) {
            inputRef.current.value = address;
        }
    }, [address])

    useEffect(() => {
        if (yMaps) {
            const suggestView: any = new yMaps.SuggestView(
                idName,
                {
                    offset: [0, 0],
                    results: 5,
                    border: '1px solid black',
                    background: 'black'
                }
            );
            suggestView.events.add("select", (e: any) => {
                const suggestAddress: string = e.get("item").value;
                if(setAddress) setAddress(suggestAddress);
                GoToAddress(suggestAddress);
            });
        }
    }, [yMaps])


    function GoToAddress(address: string) {  //Перемещает карту на координаты адреса
        const geocoder = yMaps.geocode(address);
        geocoder.then((res: any) => {
                const coordinates = res.geoObjects.get(0).geometry.getCoordinates();
                yMapRef.current.panTo(coordinates, {useMapMargin: false, duration: 0})
            }
        );
    }

    return (
        <input name="address" ref={inputRef} type="input" className="form-control" id={idName} {...props}/>
    );
};

export default MyInput;