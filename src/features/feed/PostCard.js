import React from 'react';

export default PostCard;

function PostCard({ post }) {
    // const [prevState, changeState] = useState({ username: '', password: '' })
    // const { username, password } = prevState;
    return (
        <div className='PostCard'>
            <div className='channelInfo'>
                <picture className='channelPicture'>
                    Some picture
                </picture>
                <span className='originChannel'>
                    {post.originChannel}
                </span>
            </div>
            <div className='postPreview'>
                <span className='title'>
                    {post.title}
                </span>
            </div>
            <div className='postInfo'>
                <span className='postedByUsername'>
                    {post.postedByUsername}
                </span>
                <span className='creationTime'>
                    {post.creationTime}
                </span>
            </div>
            <div className='socialButtons'>
                <button className='commentsButton'>
                    {post.commentsID.length}
                </button>
                <button className='starsButton'>
                    {post.stars.length}
                </button>
            </div>
        </div>
    );
}
/*
{
        id: 3,
        PostedByUsername: 'loveless',
        originChannel: 'chromagnum',
        title: 'its so strangeeee',
        description: 'B7 Chord, G6 Chord.',
        contentsID: [],
        stars: {},
        commentsID: [],
        creationTime: '2019-12-29T19:59:39.568527+03:00'
      }

Post struct {
		ID               uint            `json:"id"`
		PostedByUsername string          `json:"postedByUsername,omitempty"`
		OriginChannel    string          `json:"originChannel,omitempty"`
		Title            string          `json:"title"`
		Description      string          `json:"description"`
		ContentsID       []uint          `json:"contentsID"`
		Stars            map[string]uint `json:"stars"`
		CommentsID       []int           `json:"commentsID"`
		CreationTime     time.Time       `json:"creationTime"`
	}
*/