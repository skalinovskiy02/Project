import React, {FC, useEffect, useRef, useState} from 'react';
import {IFlat} from "../../models/IFlat";
import OfferMap from "../../components/OfferMap";
import FlatService from "../../services/FlatService";
import OfferPanel from "../../components/OfferPanel";
import Header from "../../components/Header";

interface StartPageProps {
    yMapRef: any,
    yMaps: any
}

const StartPage: FC<StartPageProps> = ({yMapRef, yMaps}) => {
    const [flats, setFlats] = useState<IFlat[]>([]);
    const offerRef: any = useRef();

    async function refreshPoints() {
        const map: any = yMapRef.current;
        let limit = 10;
        let newFlats: IFlat[] | undefined = await FlatService.getNearestFlats(map.getCenter(), limit);
        if (!newFlats) return;
        setFlats([...newFlats]);
    }


    useEffect(() => {
        if (!yMapRef.current) return;
        refreshPoints();
    }, [yMapRef])


    useEffect(() => {
        if (offerRef.current) {
            const resizeMap = () => {
                if (yMapRef.current) {
                    const map: any = yMapRef.current;
                    const mapContainer: any = map.container.getElement().parentElement.parentElement;
                    mapContainer.classList.toggle('map-container-small');
                    map.container.fitToViewport();
                }
            }
            offerRef.current.addEventListener("shown.bs.offcanvas", resizeMap);
            offerRef.current.addEventListener("hide.bs.offcanvas", resizeMap);
        }
    }, [offerRef]);


    return (
        <Header yMapRef={yMapRef} yMaps={yMaps}>
            <div className="start-page">
                <OfferPanel flats={flats} setFlats={setFlats} yMapRef={yMapRef}></OfferPanel>
                <OfferMap flats={flats} refreshPoints={refreshPoints} yMapRef={yMapRef}/>
            </div>
        </Header>

    )
};

export default StartPage;