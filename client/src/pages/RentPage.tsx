import React, {useEffect, useRef, useState} from 'react';
import RentOutMap from "../components/RentOutMap";
import {useYMaps} from "@pbe/react-yandex-maps";
import FlatService from "../services/FlatService";
import MyInput from "../components/MyInput";
import LoginForm from "../components/LoginForm/LoginForm";
import {useTypesSelector} from "../hooks/useTypesSelector";
import Header from "../components/Header";

const RentOutPage = () => {
    const yMapRef = useRef();
    const yMaps: any = useYMaps(['SuggestView', 'geocode']);
    const isAuth = useTypesSelector(state => state.auth.isAuth)
    const [address, setAddress] = useState<any>();
    const [coords, setCoords] = useState<any>();
    let photos: File[] = [];


    function checkFilled(formData: any) {
        if (!formData.get('address')) return false;
        if (!formData.get('title')) return false;
        if (!formData.get('type')) return false;
        if (!formData.get('price')) return false;
        if (!formData.get('description')) return false;
        if (!formData.get('photo_0')) return false;

        return true;
    }

    async function postFlat() {
        const formElement: any = document.getElementById('form')
        const formData = new FormData(formElement)
        formData.append(`coordinates`, coords)
        if (photos?.length > 0) {
            photos.forEach((photo, index) => {
                formData.append(`photo_${index}`, photo)
            })
        }
        if (checkFilled(formData)) {
            FlatService.postFlat(formData).then((flat) => {
                if (flat) alert('Добавлено!');
            })
        } else {
            alert('Заполнены не все поля.')
        }
    }

    function setPhotos(e: React.ChangeEvent<HTMLInputElement>): void {
        const input: HTMLInputElement = e.target;
        photos = Array.from(input.files ?? []);
    }

    return (
        isAuth?
            <Header>
                <div className={'rent-out-page container py-2 h-80'}>
                    <h2>Сдать жильё</h2>
                    <div className='d-flex'>
                        <div className="col p-2">
                            <RentOutMap
                                address={address}
                                setAddress={setAddress}
                                setCoords={setCoords}
                                yMapRef={yMapRef}
                                yMaps={yMaps}
                            ></RentOutMap>
                        </div>
                        <form className="col p-2" id={'form'}>
                            <div className="row">
                                <div className="mb-3">
                                    <label htmlFor="InputAddress" className="form-label">Адрес</label>
                                    <MyInput idName={'RentPageInput'} address={address} setAddress={setAddress} yMaps={yMaps}
                                             yMapRef={yMapRef}></MyInput>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="InputTitle" className="form-label">Название</label>
                                    <input name="title" type="input" className="form-control" id="InputTitle"/>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label htmlFor="InputType" className="form-label">Тип жилья:</label>
                                            <select name="type" id="InputType" className="form-control">
                                                <option>Квартира</option>
                                                <option>Апартаменты</option>
                                                <option>Комната</option>
                                                <option>Номер</option>
                                                <option>Дом</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3">
                                            <label htmlFor="InputPrice" className="form-label">Цена за ночь</label>
                                            <input name="price" type="number" className="form-control" id="InputPrice"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="InputPhotos" className="form-label">Фото</label>
                                    <input type="file" onChange={setPhotos} multiple={true} className="form-control"
                                           id="InputPhotos"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="InputDescription" className="form-label">Описание</label>
                                    <textarea name="description" className="form-control" id="InputDescription"/>
                                </div>
                                <div className="mb-3 d-flex justify-content-between">
                                    <button type="button" className="btn btn-warning" onClick={postFlat}>Сдать</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Header>
            : <LoginForm></LoginForm>
    )
}

export default RentOutPage;