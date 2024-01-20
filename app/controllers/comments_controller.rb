class CommentsController < ApplicationController

    def create
        user = find_user
        comment = user.comments.create!(comment_params)
        render json: comment, status: :created
    end

    def update
        user = find_user
        comment = user.comments.find(params[:id])
        comment.update!(comment_params)
        render json: comment, status: 200
    end

    def destroy
        user = find_user
        comment = user.comments.find(params[:id])
        comment.delete
        render json: {}
    end

    private

    def comment_params
        params.permit(:product_id, :comment)
    end
end
