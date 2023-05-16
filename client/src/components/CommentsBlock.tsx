import React, {FC, Ref, useEffect, useState} from 'react';
import FilterSelector from "./FilterSelector";
import Comment from "./Comment";
import {IComment} from "../models/IComment";

interface CommentsBlockProps{
    comments: IComment[],
    setComments: Function
}

const CommentsBlock: FC<CommentsBlockProps> = ({comments, setComments}) => {
    useEffect(()=>{
    }, [comments])
    return (
        <div className="feedback_comments-block">
            <div className={"feedback-filters"}>
                Сортировать по:
                <FilterSelector
                    options={[["userid", "Дата"], ['text', 'Текст'], ['rate', 'Рейтинг']]}
                    data={comments}
                    setData={setComments}
                ></FilterSelector>

            </div>
            {(comments).map(comment => <Comment key={comment.id} comment={comment}></Comment>)}
        </div>
    );
};

export default CommentsBlock;