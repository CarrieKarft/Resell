class SessionsController < ApplicationController
    skip_before_action :authorize, only: [:create]

    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id 
            render json: user
        else
            render json: {error: "Wrong username or password"}, status: 422
        end
    end

    def destroy
        session.delete :user_id
        render json: {}
    end
end
