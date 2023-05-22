import style from './Home.module.scss';
import {Catalog} from "../Catalog/Catalog";
import {Carousel} from "../Carousel/Carousel";
import {ProductsSections} from "../ProductsSections/ProductsSections";

export function Home({favorites, setFavorites}) {
    return (
        <main className={style.Home}>
            <div className={`container ${style.home_container}`}>
                <div className={style.catalog_and_carousel_wrapper}>
                    <Catalog/>
                    <Carousel/>
                </div>
                <ProductsSections favorites={favorites} setFavorites={setFavorites}/>
                {/*<RecentProducts/>*/}
            </div>
        </main>


    )

}