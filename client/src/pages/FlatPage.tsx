import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {IFlat} from "../models/IFlat";
import FlatService from "../services/FlatService";
import CarouselFlat from "../components/CarouselFlat";
import {IComment} from "../models/IComment";
import Rating from "../components/Rating/Rating";
import OrderForm from "../components/OrderForm";
import {useTypesSelector} from "../hooks/useTypesSelector";
import CommentsBlock from "../components/CommentsBlock";
import CommentService from "../services/CommentService";
import {Map, Placemark, useYMaps} from "@pbe/react-yandex-maps";
import Header from "../components/Header";

const FlatPage = () => {
    const user = useTypesSelector(state => state.auth.user)
    let [flat, setFlat] = useState<IFlat>({} as IFlat);
    let [comments, setComments] = useState<IComment[]>([])
    let {id} = useParams<string>();
    let yMapRef: any = useRef();
    const yMaps: any = useYMaps(['Placemark']);

    useEffect(() => {
        if (!yMaps) return;
        yMapRef.current = yMaps.map

    }, [yMaps])
    useEffect(() => {
        if (id) {
            FlatService.getFlatById(+id).then(f => {
                if (f) {
                    setFlat(f);
                    getComments.current(f.id)
                }
            })
        }
    }, [id])

    let getComments = useRef(async (flatid: number) => {
        await CommentService.getCommentsByFlatID(flatid).then((resp) => {
            setComments(resp as IComment[])
        });
    })

    const orderFlat = () => {
        alert("забронировано")
    }

    async function postComment() {
        if (!user) return;
        let rating: string | undefined = document.querySelector('input[name="rating"]:checked')?.id;
        if (rating === undefined) return;
        let text: any = document.querySelector('.comment_text') as HTMLTextAreaElement;
        if (!text) return;
        let date = new Date;
        let comment: IComment = {
            userid: +user.id,
            flatid: flat.id,
            text: text.value,
            date: date.toLocaleDateString(),
            rate: +rating,
            email: user.email
        }
        await CommentService.postComment(comment);
        getComments.current(flat.id)
    }

    return (
        flat ?
            <Header>
                <div className="flat-page-wrapper">
                    <div className="head-info_info-block">
                        <div className="head-info_info-block_rating">{5}</div>
                        <div className="head-info_info-block_feedbackCount">Отзывов: {comments.length}</div>
                    </div>
                    <div className="head-info">
                        <div className={"head-info_flat-description"}>
                            <CarouselFlat flat={flat} prefix={'flat-page'}></CarouselFlat>
                            <div className="flat-description">
                                <div className="flat-description_title">{flat.address}</div>
                                <div className="flat-description_body">Lorem ipsum dolor sit amet, consectetur
                                    adipisicing
                                    elit. Aspernatur deserunt et maxime molestiae numquam quis temporibus velit
                                    voluptate. A
                                    ad ducimus ex maxime minima officiis quis quod repellendus unde veritatis.
                                </div>

                            </div>
                        </div>
                        <OrderForm action={orderFlat} flat={flat}></OrderForm>
                    </div>

                    <div className="map">
                        {flat.coordinates ?
                            <Map
                                instanceRef={yMapRef}
                                defaultState={{
                                    center: flat.coordinates,
                                    margin: [0, 0, 0, 0],
                                    zoom: 15,
                                    controls: [],
                                }}>
                                <Placemark geometry={flat.coordinates}/>
                            </Map>
                            : <div>lodaing</div>
                        }
                    </div>
                    <div className="feedback">
                        <form className={'comment_form'}>
                            <Rating></Rating>
                            <textarea className={'comment_text'} placeholder={"Оставьте ваш отзыв"}></textarea>
                            <button
                                onClick={
                                    (e) => {
                                        e.preventDefault();
                                        user ?
                                            postComment()
                                            : console.log('auth');
                                    }
                                }
                                className={'comment_form-send btn btn-warning'}>Отправить
                            </button>
                        </form>
                        <CommentsBlock comments={comments} setComments={setComments}></CommentsBlock>
                    </div>
                </div>
            </Header>
            : <div>Loading</div>
    );
};

export default FlatPage;