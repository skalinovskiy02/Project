import React, {FC, useEffect} from 'react';
import {Clusterer, Map, Placemark, useYMaps} from "@pbe/react-yandex-maps";
import house_fill from "../icons/house-fill.svg";
import {IFlat} from "../models/IFlat";
import {FlatBalloonContent, FlatBalloonLayout} from "./FlatBaloonLayout";

interface SearchMapProps {
    flats: IFlat[],
    refreshPoints: Function,
    yMapRef: any
}

const OfferMap: FC<SearchMapProps> = ({flats, refreshPoints, yMapRef}) => {
    const yMaps: any = useYMaps(['templateLayoutFactory', 'Placemark']);

    // get yMaps api and start Init
    useEffect(() => {
        if (!yMapRef.current || !yMaps) {
            return;
        }
        const map: any = yMapRef.current;
        refreshPoints()

        //events
        map.events.add('boundschange', () => {
            refreshPoints();
        })
    }, [yMaps, yMapRef])


    return (
        <Map instanceRef={yMapRef}
             className={"map-container"}
             defaultState={{
                 center: [56.74006, 37.22523],
                 margin: [0, 0, 0, 0],
                 zoom: 8,
                 controls: [],
             }}>
            <Clusterer
                options={{
                    preset: "islands#invertedBlackClusterIcons",
                    gridSize: 128
                }}>
                {flats.map((flat) =>
                    <Placemark key={flat.id} geometry={flat.coordinates}
                               properties={{
                                   balloonContentBody: FlatBalloonContent(flat),
                                   hintContent: flat.title,
                                   iconContent: `<div class="icon-content rounded border">${flat.price}</div>`
                               }}

                               options={{
                                   iconLayout: 'default#imageWithContent',
                                   iconImageHref: house_fill,
                                   iconImageSize: [40, 40],
                                   iconImageOffset: [-40 / 2, -40 / 2],
                                   iconContentOffset: [40 / 2, 40 / 2],
                                   balloonLayout: FlatBalloonLayout(yMaps),
                                   balloonShadow: true,
                                   balloonPanelMaxMapArea: 0
                               }}/>)}
            </Clusterer>
        </Map>
    );
};

export default OfferMap;