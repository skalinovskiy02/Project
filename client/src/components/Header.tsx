import React, {FC, useEffect, useState} from 'react';
import MyList from "./MyList";
import {Link} from "react-router-dom";
import MyInput from "./MyInput";
import {useYMaps} from "@pbe/react-yandex-maps";

interface HeaderProps extends React.ComponentPropsWithoutRef<'header'>{
    yMapRef?: any,
    yMaps?: any,
}

const Header: FC<HeaderProps> = ({yMapRef, yMaps, children}) => {
    let menu: Element | null = document.querySelector('.navbar')
    let [opened, setOpened] = useState(false);
    let openMenu = ()=>{
        opened ?
            menu?.classList.add('opened')
            :  menu?.classList.remove('opened')
        setOpened(!opened);
    }

    return (
        <div className={'header-wrapper'}>
            <header className={'header'}>
                <ul className={'header-list'}>
                    <li className={''}><Link className={'Link'} to={'/'}>APP</Link></li>
                    {
                        yMapRef?
                         <li className={'header-input'}><MyInput idName={'header-input'} yMapRef={yMapRef} yMaps={yMaps} placeholder={'Введите адрес'}></MyInput></li>
                            : <></>
                    }
                    <li className={'navmenu'}>
                        <div onClick={openMenu} className={"Link"}>
                            Меню
                            <MyList></MyList>
                        </div>
                    </li>
                </ul>
            </header>
            {children}
        </div>

    );
};

export default Header;