import React, {FC} from 'react';
import {IComment} from "../models/IComment";

interface commentProps {
    comment: IComment
}

const Comment: FC<commentProps> = ({comment}) => {
    let date = new Date(comment.date);
    return (
        <div className={'comment-item'}>
            <div className="info">
                <div className={'user-avatar'}></div>
                <div className={'user-name'}>{comment.email}</div>
                <div className={'comment-rate'}>{comment.rate}</div>
                <div className={'comment-date'}>{date.toLocaleDateString()}</div>
            </div>
            <div className="body">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consectetur delectus id illum
                maiores minima nulla quae quidem totam vero! Aliquid animi dolores neque quae ratione rerum sint
                temporibus vitae?
            </div>
        </div>
    );
};

export default Comment;