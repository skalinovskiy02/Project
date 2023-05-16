import React, {FC, useEffect} from 'react';
import {Map} from "@pbe/react-yandex-maps";


interface RentOutMapProps {
    address: any,
    setAddress: any,
    setCoords: any,
    yMapRef:any,
    yMaps:any
}

const RentOutMap: FC<RentOutMapProps> = ({address, setAddress, setCoords, yMapRef, yMaps}) => {
    let canAdd: boolean = true;
    let placemark: any;

    useEffect(()=>{
        if(!yMapRef.current || !yMaps) return;
        const map = yMapRef.current;
        //events
        map.events.add('click', async function (e: any) {
            if (canAdd) {
                let coords = e.get('coords');
                const [title, addr] = await getAddress(coords);
                await addPlaceMark(coords);
                setCoords(coords);
                setAddress(addr);
            }
        });
    }, [yMapRef.current, yMaps])

    useEffect(() => {
        if (yMaps && canAdd) {
            canAdd = false;
            yMaps.geocode(address, {results: 1}).then((res: any) => {
                let firstGeoObject = res.geoObjects.get(0),
                    coords = firstGeoObject.geometry.getCoordinates();
                addPlaceMark(coords).then(() => {
                    canAdd = true;
                });
            })
        }
    }, [address])

    // get yMaps api and start Init


    async function addPlaceMark(coords: any) {
        const [title, addr] = await getAddress(coords);
        const map = yMapRef.current;
        // Создание новой метки
        placemark = new yMaps.Placemark(coords, {
            iconCaption: 'поиск...'
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });
        map.geoObjects.removeAll();
        map.geoObjects.add(placemark);

        placemark.properties
            .set({
                // Формируем строку с данными об объекте.
                iconCaption: title,
                // В качестве контента балуна задаем строку с адресом объекта.
                balloonContent: addr
            });
    }

    //Вставка метки при изменении адреса по инпуту
    // Определяем адрес по координатам (обратное геокодирование).
    async function getAddress(coords: any) {
        const res = await yMaps.geocode(coords, {results: 1});
        let firstGeoObject = res.geoObjects.get(0);
        const title = [
            // Название населенного пункта или вышестоящее административно-территориальное образование.
            firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
            // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
        ].filter(Boolean).join(', ');
        const addr = firstGeoObject.getAddressLine();
        return [title, addr];
    }

    return (
        <Map instanceRef={yMapRef}
             className={"map-container border"}
             defaultState={{
                 center: [56.74006, 37.22523],
                 margin: [0, 0, 0, 0],
                 zoom: 16,
                 controls: [],
             }}>
        </Map>
    );
};

export default RentOutMap;