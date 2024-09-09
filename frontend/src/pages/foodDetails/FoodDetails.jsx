import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../../context/storeContext';
import axios from 'axios';
import './foodDetails.css';

function FoodDetails() {
  const { id } = useParams();
  const { food_list, url, token, addToCart, removeFromCart, cartItem, removeAllFromCart } = useContext(StoreContext);
  const [foodItem, setFoodItem] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null); // Stores ID of comment being edited
  const [editingText, setEditingText] = useState(""); // Text being edited

  useEffect(() => {
    const item = food_list.find(food => food._id === id);
    setFoodItem(item);

    const fetchComments = async () => {
      try {
        const response = await axios.get(`${url}/api/comment/get/${id}`);
        setComments(response.data);
      } catch (err) {
        console.error("Error fetching comments", err);
      }
    };

    fetchComments();
  }, [id, food_list, url]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${url}/api/comment/get/${id}`);
      setComments(response.data);
    } catch (err) {
      console.error("Error fetching comments", err);
    }
  };

  const handleCommentSubmit = async () => {
    if (token && newComment) {
      try {
        await axios.post(`${url}/api/comment/add`, {
          productId: id,
          comment: newComment,
          email: localStorage.getItem("email")
        }, {
          headers: { token }
        });
        setNewComment(""); 
        fetchComments(); 
      } catch (err) {
        console.error("Error adding comment", err);
      }
    }
  };

  const handleEditComment = async (commentId) => {
    if (editingCommentId && editingText) {
      try {
        await axios.patch(`${url}/api/comment/update`, {
          commentId: editingCommentId,  // Pass commentId
          comment: editingText,
          email: localStorage.getItem("email"),
        }, {
          headers: { token }
        });
  
        setEditingCommentId(null);
        setEditingText("");
        fetchComments();
      } catch (err) {
        console.error("Error updating comment", err);
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`${url}/api/comment/delete/${commentId}`, {
        headers: { token }
      });

      fetchComments(); // Reload comments after deletion
    } catch (err) {
      console.error("Error deleting comment", err);
    }
  };

  const startEditing = (comment) => {
    setEditingCommentId(comment._id); // Set the ID of the comment to be edited
    setEditingText(comment.comment); // Set the text to the current comment's text
  };

  if (!foodItem) return <p>Loading...</p>;

  const itemInCart = cartItem[foodItem._id] || 0;

  return (
    <div className='details'>
      <h2>{foodItem.name}</h2>
      <p>{foodItem.description}</p>
      <p style={{ color: 'green' }}>Price: ${foodItem.price}</p>
      <img src={url + "/images/" + foodItem.image} alt={foodItem.name} />

      {token && (
        <div className="cart-actions">
          <p>Amount in Cart: {itemInCart}</p>

          <button className="add-button" onClick={() => addToCart(foodItem._id)}>
            Add to Cart
          </button>

          {itemInCart > 0 && (
            <>
              <button className="remove-button" onClick={() => removeFromCart(foodItem._id)}>
                Remove One
              </button>
              <button className="clear-button" onClick={() =>  removeAllFromCart(foodItem._id)}>
                Remove All
              </button>
            </>
          )}
        </div>
      )}

      <div className="comments-section">
        <h3>Comments</h3>
        {comments.map((comment) => (
          <div key={comment._id}>
            <p>
              <strong>{comment.name}:</strong> 
              {comment._id === editingCommentId ? (
                <input 
                  type="text" 
                  value={editingText} 
                  onChange={(e) => setEditingText(e.target.value)} 
                />
              ) : (
                comment.comment
              )}
            </p>

            {token && localStorage.getItem("email") === comment.email && (
              <div className='comment-buttons'>
                {comment._id === editingCommentId ? (
                  <button className="edit-button" onClick={() => handleEditComment(comment._id)}>Save</button>
                ) : (
                  <button className="edit-button" onClick={() => startEditing(comment)}>Edit</button>
                )}
                <button className="delete-button" onClick={() => handleDeleteComment(comment._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
        {token && (
          <div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
            ></textarea>
            <button onClick={handleCommentSubmit}>Submit</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FoodDetails;
