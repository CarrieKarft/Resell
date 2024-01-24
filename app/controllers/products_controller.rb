class ProductsController < ApplicationController

    def show
        product = Product.find(params[:id])
        render json: product, status: 200
    end

    def index
        products = Product.all
        render json: products, status: 200
    end

    def create
        product = Product.create!(product_params)
        render json: product, status: :created
    end

    # /search-products/Practical Wooden Bottle is how url needs to be formatted for this to work
    def search_products
        products = Product.where("product_name LIKE ?","#{params[:product_name]}%" )
        render json: products
        # need to fine tune this so spelling doesnt need to be exact,and returns multiple options of similarly named products
    end

    private

    def product_params
        params.permit(:minimum_price, :description, :image, :product_name)
    end
end
