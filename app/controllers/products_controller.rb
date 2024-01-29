class ProductsController < ApplicationController
    skip_before_action :authorize, except: [:create, :update, :user_product_delete]

    def show
        product = Product.find(params[:id])
        render json: product, status: 200
    end

    def index
        products = Product.all
        render json: products, status: 200
    end

    def create
        user = find_user
        product = user.posts.create!(product_params)
        render json: product, status: :created
    end

    def destroy
        product = Product.find(params[:id])
        product.delete
        render json: {}
    end

    # second delete method to have one that authorizes that user can delete the product
    def user_product_delete
        user = find_user
        product = user.posts.find(params[:id])
        # product = Product.find(params[:id])
        product.delete
        render json: {}
    end

    def update
        user = find_user
        product = user.posts.find(params[:id])
        product.update!(product_params)
        render json: product, status: 200
    end


    private

    def product_params
        params.permit(:minimum_price, :description, :image, :product_name)
    end
end
