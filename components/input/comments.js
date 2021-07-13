import { useState, useEffect } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;

  const [eventComments, setEventComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      fetch("/api/comments/" + eventId) //We dont need to configure a get request
        .then((response) => response.json())
        .then((data) => setEventComments(data.data));
    }
  }, [eventId, showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    // send data to API
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((response) => response.json())
      .then((data) => data);
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && eventComments.length && (
        <CommentList comments={eventComments} />
      )}
    </section>
  );
}

export default Comments;
