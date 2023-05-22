import style from './ProductsSection.module.scss';
import {ProductSmallCard} from "../ProductSmallCard/ProductSmallCard";

export function ProductsSection({sectionTitle, products, icons, favorites, setFavorites}) {

    return (
        <div className={style.ProductsSection}>
            <h2 className={style.section_title}>{sectionTitle && sectionTitle}</h2>
            <ul className={style.section_products_list}>
                {
                    products && products.map(product => {
                        return (
                            <ProductSmallCard product={product} icons={icons} key={product.id} favorites={favorites} setFavorites={setFavorites}/>
                        )
                    })
                }
            </ul>
        </div>
    )
}