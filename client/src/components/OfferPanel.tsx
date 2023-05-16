import React, {FC, useEffect, useState} from 'react';
import {IFlat} from "../models/IFlat";
import FlatCard from "./FlatCard";
import FilterSelector from "./FilterSelector";

interface OfferPanelProps {

    flats: IFlat[],
    setFlats: Function,
    yMapRef: any
}

enum display {
    static = 'unset',
    absolute = 'absolute'
}

const OfferPanel: FC<OfferPanelProps> = ({flats, setFlats, yMapRef}) => {
    const [isShown, setIsShown] = useState<display>(display.static);
    const offerPanel: HTMLElement | null = document.querySelector(".offer-panel");

    const resizeMap = () => {
        const map: any = yMapRef.current;
        map.container.fitToViewport();
    }

    const toggleShow = ()=>{
            offerPanel?.classList.toggle('active');
            isShown === display.static
                ?
                setIsShown(display.absolute)
                :
                setTimeout(()=> setIsShown(display.static), 500)
    }
    useEffect(() => {
        if (yMapRef.current) {
            resizeMap()
        }
    }, [isShown])
    return (
        <div className={"offer-panel active"} style={{'position': isShown}} id={'offer-panel'}>
            <div className="offer-panel_head">
                <p>{flats.length} предложений</p>
                <div style={{display: "flex",}}>
                    Сортировать по <FilterSelector options={[["cost", "По цене"]]} data={flats}
                                                   setData={setFlats}></FilterSelector>
                </div>

            </div>

            <div className={"offer-panel-flat-list scrollable"}>

                {
                    flats.map((flat) =>
                        <FlatCard key={flat.id} className={'offer-panel-flat-card'} flat={flat}
                                  prefix={'offerPanel'}></FlatCard>)
                }
                {
                    flats.map((flat) =>
                        <FlatCard key={flat.id} className={'offer-panel-flat-card'} flat={flat}
                                  prefix={'offerPanel'}></FlatCard>)
                }
                {
                    flats.map((flat) =>
                        <FlatCard key={flat.id} className={'offer-panel-flat-card'} flat={flat}
                                  prefix={'offerPanel'}></FlatCard>)
                }

            </div>



            <div
                onClick={toggleShow}
            >
                <svg
                    className={"offer-panel-show" }
                    width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#323232" strokeWidth="2"/>
                    <path d="M16 12L8 12" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 15L15.913 12.087V12.087C15.961 12.039 15.961 11.961 15.913 11.913V11.913L13 9" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    );
};

export default OfferPanel;