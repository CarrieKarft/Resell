class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create]


    def show
        render json: find_user, status: 200
    end

    def create
        create_user = User.create!(user_params)
        session[:user_id] = create_user.id
        render json: create_user, status: :created
    end

    def index
        users = User.all
        render json: users, status: 200
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :email)
    end
end
