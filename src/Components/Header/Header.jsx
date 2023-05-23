import style from './Header.module.scss'
import {useContext, useEffect, useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import {HeaderNavList} from "./HeaderNavList";
import axios from "axios";
import {CartContext, FavoritesContext} from "../App";
import {Catalog} from "../Catalog/Catalog";

export function Header() {
    const headerTopRef = useRef(null);
    const headerBottomRef = useRef(null);
    let [data, setData] = useState({});
    const {cart} = useContext(CartContext);
    const {favorites} = useContext(FavoritesContext);
    const catalogDropDown = useRef(null);
    const catalogOverlay = useRef(null);

    useEffect(() => {
        axios.get('/data.json')
            .then(response => {
                setData(response.data);
            })
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop;

            if (scrollTop > headerTopRef.current.offsetHeight) {
                headerBottomRef.current.classList.add(`${style.sticky}`);
                catalogOverlay.current.classList.add(`${style.sticky}`);
            } else {
                headerBottomRef.current.classList.remove(`${style.sticky}`);
                catalogOverlay.current.classList.remove(`${style.sticky}`);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function toggleCatalog() {
        catalogDropDown.current.classList.toggle(style.active);
        catalogOverlay.current.classList.toggle(style.active);
    }

    return (
        <header className={style.Header}>
            <div className={style.header_top} ref={headerTopRef}>
                <div className={`container ${style.header_top_container}`}>
                    <div className={style.logo_and_nav_wrapper}>
                        <NavLink to='/' className={style.header_logo_link}>
                            <img className={style.header_logo_img} src={data.header && data.header.logo} alt="logo"/>
                        </NavLink>
                        <nav className={style.header_nav}>
                            <HeaderNavList navList={data.header ? data.header.menu : []}/>
                        </nav>
                    </div>
                    <div className={style.login_wrapper}>
                        <img src={data.header && data.header.login.icon} alt="user icon" className={style.login_icon}/>
                        <span className={style.login_text}>{data.header && data.header.login.text}</span>
                    </div>
                </div>
            </div>
            <div className={style.header_bottom} ref={headerBottomRef}>
                <div className={`container ${style.header_bottom_container}`}>
                    <div className={style.catalog}>
                        <img src={data.header && data.header.catalog.icon} alt="catalog icon"
                             className={style.catalog_icon} onClick={toggleCatalog}/>
                        <span className={style.catalog_text}>{data.header && data.header.catalog.text}</span>
                        <div className={style.header_catalog} ref={catalogDropDown}>
                            <Catalog/>
                        </div>

                    </div>
                    <div className={style.search_wrapper}>
                        <input type="text" className={style.search_input}
                               placeholder={data.header && data.header.search.text}/>
                        <img src={data.header && data.header.search.icon} alt="search icon"
                             className={style.search_icon}/>
                    </div>
                    <div className={style.icons_group}>
                        <div className={style.icon_wrapper}>
                            <img src={data.header && data.header.icons_group.recent} className={style.icon_img}
                                 alt="eye icon"/>
                            {/*<span className={style.icon_qty}></span>*/}
                        </div>
                        <div className={style.icon_wrapper}>
                            <img src={data.header && data.header.icons_group.favorite} className={style.icon_img}
                                 alt="heart icon"/>
                            {favorites.length > 0 && <span className={style.icon_qty}>{favorites.length}</span>}

                        </div>
                        <div className={style.icon_wrapper}>
                            <img src={data.header && data.header.icons_group.cart} className={style.icon_img}
                                 alt="cart icon"/>
                            {cart.length > 0 && <span className={style.icon_qty}>{cart.length}</span>}
                        </div>
                    </div>
                </div>
                <div className={style.catalog_overlay} onClick={toggleCatalog} ref={catalogOverlay}></div>
            </div>


        </header>

    )
}