import style from './Reviews.module.scss';
import {useState} from "react";
import {v4 as uuidv4} from 'uuid';


export function Reviews({reviewsData, product}) {
    let [reviews, setReviews] = useState(product.reviews);
    let [currentMessage, setCurrentMessage] = useState(null);
    let [currentUser, setCurrentUser] = useState(null);


    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)}`;
    const formattedTime = `${('0' + currentDate.getHours()).slice(-2)}:${('0' + currentDate.getMinutes()).slice(-2)}:${('0' + currentDate.getSeconds()).slice(-2)}`;
    const fullDate = `${formattedDate} ${formattedTime}`;

    function addReviewHandler(e) {
        e.preventDefault();
        const review = {
            id: uuidv4(),
            author: currentUser,
            message: currentMessage,
            date: fullDate
        }
        setReviews([review, ...reviews]);
    }

    function currentMessageHandler({target}) {
        setCurrentMessage(target.value);
    }

    function currentUserHandler({target}) {
        setCurrentUser(target.value);
    }

    return (
        <div className={style.Reviews}>
            <h3 className={style.reviews_tittle}>{`${reviewsData.title} (${reviews.length})`}</h3>
            <ul className={style.reviews_list}>
                {
                    reviews.map(review => {
                        return (
                            <li key={review.id} className={style.reviews_item}>
                                <h4 className={style.reviews_author}>{review.author}</h4>
                                <p className={style.reviews_date}>{review.date}</p>
                                <p className={style.reviews_message}>{review.message}</p>
                            </li>

                        )
                    })
                }
            </ul>
            <form className={style.reviews_form} onSubmit={addReviewHandler}>
                <input type="text" placeholder={reviewsData.form.name} className={style.reviews_form_name}
                       onChange={currentUserHandler} required/>
                <textarea className={style.reviews_form_message} placeholder={reviewsData.form.message}
                          onChange={currentMessageHandler} required></textarea>
                <button className={style.reviews_form_btn} >{reviewsData.form.button}</button>
            </form>
        </div>
    )
}