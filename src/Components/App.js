import style from './App.module.scss';
import {Header} from "./Header/Header";
import {data} from '../data/image-imports';
import {Routes, Route} from "react-router-dom";
import {Home} from './Home/Home';
import {Product} from "./Product/Product";
import {createContext, useState} from "react";

export const FavoritesContext = createContext(null);
export const CartContext = createContext(null);

export function checkUnique(arr, item) {
    return !arr.find(obj => obj.id === item.id);
}


function App() {
    let [favorites, setFavorites] = useState([]);
    let [cart, setCart] = useState([]);


// console.log(JSON.stringify(data));

    return (
        <div className="App">
            <CartContext.Provider value={{cart, setCart}}>
                <FavoritesContext.Provider value={{favorites, setFavorites}}>
                    <Header/>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/product/:productId' element={<Product/>}/>
                    </Routes>
                </FavoritesContext.Provider>
            </CartContext.Provider>
        </div>
    );
}

export default App;
