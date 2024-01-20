class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordInvalid, with: :invalid
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  include ActionController::Cookies

  before_action :authorize

  private

  def find_user
    User.find(session[:user_id])
  end

  def render_not_found
    render json: {error: "Item not found"}, status: :not_found
  end

  def authorize
    return render json: {error: "You need to be logged in to access this"}, status: 422 unless session.include? :user_id
  end

  def invalid(exception)
    return render json: {errors: exception.record.errors.full_messages}, status: 422
  end

end
