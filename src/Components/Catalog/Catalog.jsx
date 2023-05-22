import style from './Catalog.module.scss';
import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export function Catalog() {
    let [catalog, setCatalog] = useState([]);

    useEffect(() => {
        axios.get('./data.json')
            .then(response => {
                setCatalog(response.data.catalog);
            })
    }, [])

    return (
        <nav className={style.Catalog_nav}>
            <ul className={style.catalog_nav_list}>
                {
                    catalog.map(item => {
                        return (
                            <li key={item.id} className={style.catalog_nav_item}>
                                <NavLink to={item.path} className={style.catalog_nav_link}>
                                    <img src={item.icon} alt="chevron icon"/>
                                    <span>{item.name}</span>
                                </NavLink>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}