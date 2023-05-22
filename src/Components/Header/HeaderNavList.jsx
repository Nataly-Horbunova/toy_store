import style from './Header.module.scss';
import { NavLink } from "react-router-dom";

export function HeaderNavList ({navList}) {
    return (
        <ul className={style.Header_nav_list}>
            {
                navList.map(item => {
                    return (
                        <li className={style.header_nav_list_item} key={item.id}>
                            <NavLink to={item.path} className={style.header_nav_link}>{item.name}</NavLink>
                        </li>
                    )
                })
            }
        </ul>
    )
}