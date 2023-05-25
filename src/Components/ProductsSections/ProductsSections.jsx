import style from './ProductsSections.module.scss';
import {useEffect, useState} from "react";
import axios from "axios";
import {ProductsSection} from "../ProductsSection/ProductsSection";
import data from "../../data/data.json";

export function ProductsSections({favorites, setFavorites}) {
    let [products, setProducts] = useState(null);
    let [sections, setSections] = useState(null);


    useEffect(() => {
        setProducts(data.products);
        setSections(data.products.sections);

        // axios.get('data.json')
        //     .then(response => {
        //         setProducts(response.data.products);
        //         setSections(response.data.products.sections);
        //     })
    }, []);

    function filterProducts(products, sectionName) {
        return products.filter(product => {
            {
                return product[sectionName] === true
            }
        });
    }

    return (
        <div className={style.ProductsSections}>
            {
                sections && sections.map(section => {
                    if (section.name !== 'recent') {
                        let sectionProducts = (filterProducts(products.list, section.name));
                        return (
                            <ProductsSection sectionTitle={section.title} products={sectionProducts}
                                             icons={products.icons} key={section.id} favorites={favorites}
                                             setFavorites={setFavorites}/>
                        )
                    }
                })
            }
        </div>
    )
}