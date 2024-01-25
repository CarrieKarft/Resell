class BidsController < ApplicationController

    # user can place a bid on a product
    def create
        user = find_user
        product = Product.find(params[:product_id])
        if product.current_highest_bid[:bid_amount] < params[:bid_amount].to_f
            bid = user.bids.create!(bid_params)
            bid.update!(bid_accepted: false)
            render json: bid, status: :created
        else
            render json: {error: "Your bid amount needs to be higher than the current highest bid"}, status: :unprocessable_entity
        end
    end

    # user can see all bids they have placed
    def index
        user = find_user
        bids = user.bids
        render json: bids, status: 200
    end

    # user can update a bid amount to higher value
    def update
        user = find_user
        bid = user.bids.find(params[:id])
        if bid.bid_amount < params[:bid_amount].to_f
            bid.update!(bid_params)
            bid.update!(bid_accepted: false)
            render json: bid, status: 200
        else
            render json: {error: "Your bid amount needs to be higher than the current highest bid"}, status: :unprocessable_entity
        end
    end

    def accept_bid 
        bid = Bid.find(params[:id])
        bid.update!(bid_accepted: true)
        render json: bid, status: 200
    end

    private 

    def bid_params 
        params.permit(:product_id, :bid_amount)
    end
end
