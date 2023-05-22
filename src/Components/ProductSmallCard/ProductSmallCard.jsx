import style from "./ProductSmallCard.module.scss";
import {useNavigate} from "react-router-dom";
import {useContext, useRef} from "react";
import {CartContext, FavoritesContext} from "../App";
import {checkUnique} from "../App";

export function ProductSmallCard({product, icons}) {
    const favoriteIcon = useRef(null);
    const cartIcon = useRef(null);
    const navigate = useNavigate();

    const {setFavorites} = useContext(FavoritesContext);
    const {favorites} = useContext(FavoritesContext);

    const {setCart} = useContext(CartContext);
    const {cart} = useContext(CartContext);

    function showMoreHandler(id) {
        navigate(`/product/${id}`);
    }

    function toggleFavouritesHandler() {
        const isUnique = checkUnique(favorites, product);
        if (isUnique) {
            setFavorites([...favorites, product]);
            favoriteIcon.current.src = icons.favorite_filled_red;
        } else {
            const updatedFavorites = favorites.filter(obj => obj.id !== product.id);
            setFavorites(updatedFavorites);
            favoriteIcon.current.src = icons.favorite_outlined;
        }
    }

    function toggleCartHandler() {
        const isUnique = checkUnique(cart, product);
        if (isUnique) {
            setCart([...cart, product]);
            cartIcon.current.src = icons.cart_filled_green;
        } else {
            const updatedCart = cart.filter(obj => obj.id !== product.id);
            setCart(updatedCart);
            cartIcon.current.src = icons.cart_outlined;
        }
    }

    return (
        <li className={style.ProductSmallCard}>
            <img src={product.img} alt="product image" className={style.product_img}
                 onClick={() => showMoreHandler(product.id)}/>
            <h3 className={style.product_title} onClick={() => showMoreHandler(product.id)}>{product.title} </h3>
            <div className={style.product_price}>{product.price + '$'}</div>
            <img src={checkUnique(favorites, product) ? icons.favorite_outlined : icons.favorite_filled_red}
                 alt="heart icon" className={style.product_favourite_icon}
                 onClick={toggleFavouritesHandler} ref={favoriteIcon}/>
            <img src={checkUnique(cart, product) ? icons.cart_outlined : icons.cart_filled_green}
                 alt="cart icon" className={style.product_cart_icon}
                 onClick={toggleCartHandler} ref={cartIcon}/>

        </li>
    )
}