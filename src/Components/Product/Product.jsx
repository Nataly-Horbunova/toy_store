import style from './Product.module.scss';
import {useContext, useEffect, useRef, useState} from "react";
// import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {Reviews} from "../Reviews/Reviews";
import {CartContext, FavoritesContext} from "../App";
import {checkUnique} from "../App";
import data from "../../data/data.json";


export function Product() {
    let [product, setProduct] = useState(null);
    let [pageData, setPageData] = useState(null);

    let {productId} = useParams();
    const favouriteBtnText = useRef(null);
    const cartBtnText = useRef(null);

    const {setFavorites} = useContext(FavoritesContext);
    const {favorites} = useContext(FavoritesContext);

    const {setCart} = useContext(CartContext);
    const {cart} = useContext(CartContext);

    function findProduct(products, id) {
        return products.find(product => product.id === id);
    }

    function toggleCartHandler() {
        const isUnique = checkUnique(cart, product);
        if (isUnique) {
            setCart([...cart, product]);
            cartBtnText.current.innerText = pageData.buttons.cart.text_remove;

        } else {
            const updatedCart = cart.filter(obj => obj.id !== product.id);
            setCart(updatedCart);
            cartBtnText.current.innerText = pageData.buttons.cart.text_add;
        }
    }

    function toggleFavouritesHandler() {
        const isUnique = checkUnique(favorites, product);
        if (isUnique) {
            setFavorites([...favorites, product]);
            favouriteBtnText.current.innerText = pageData.buttons.favorite.text_remove;

        } else {
            const updatedFavorites = favorites.filter(obj => obj.id !== product.id);
            setFavorites(updatedFavorites);
            favouriteBtnText.current.innerText = pageData.buttons.favorite.text_add;
        }
    }

    useEffect(() => {
        const product = findProduct(data.products.list, productId);
        setProduct(product);
        setPageData(data.productPage);

        // axios.get('/data.json')
        //     .then(response => {
        //         const product = findProduct(response.data.products.list, productId);
        //         setProduct(product);
        //         setPageData(response.data.productPage);
        //     })
    }, [])

    return (
        product && pageData && <div className={style.Product}>
            <div className="container">

                <div className={style.product_wrapper}>
                    <h3 className={style.product_tittle}>{product.title}</h3>
                    <p className={style.product_code}>
                        <span>{pageData.info.code}</span>
                        <span> {product.code}</span>
                    </p>
                    <img src={product.img} alt="toy image" className={style.product_img}/>
                    <div className={style.product_info}>
                        <p className={style.product_category}>
                            <span className={style.category_text}>{pageData.info.category}</span>
                            <span className={style.category_name}>{product.category}</span>
                        </p>
                        <p className={style.product_manufacturer}>
                            <span className={style.manufacturer_text}>{pageData.info.manufacturer}</span>
                            <span> {product.manufacturer}</span>

                        </p>
                        <p className={style.product_price}>{product.price + "$"}</p>
                        <div className={style.product_btns}>
                            <button className={style.product_btn} onClick={toggleCartHandler}>
                                <span className={style.btn_text} ref={cartBtnText}>
                                    {
                                        checkUnique(cart, product) ? pageData.buttons.cart.text_add : pageData.buttons.cart.text_remove
                                    }
                                </span>
                                <img src={pageData.buttons.cart.icon} alt="cart icon" className={style.btn_icon}/>
                            </button>
                            <button className={style.product_btn} onClick={toggleFavouritesHandler}>
                                <span className={style.btn_text} ref={favouriteBtnText}>
                                    {
                                        checkUnique(favorites, product) ? pageData.buttons.favorite.text_add : pageData.buttons.favorite.text_remove
                                    }
                                </span>
                                <img src={pageData.buttons.favorite.icon} alt="heart icon" className={style.btn_icon}/>
                            </button>
                        </div>
                    </div>
                    <div className={style.product_description_wrapper}>
                        <h3 className={style.description_tittle}>{pageData.info.description}</h3>
                        <p className={style.description_text}>{product.description}</p>
                    </div>
                </div>

                <Reviews reviewsData={pageData.reviews} product={product}/>
            </div>
        </div>
    )
}