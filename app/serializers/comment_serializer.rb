class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :user_id, :product_id, :comment_username
  
  
  def comment_username
    self.object.user.username
  end
end
