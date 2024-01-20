class BidsController < ApplicationController

    # user can place a bid on a product
    def create
        user = find_user
        bid = user.bids.create!(bid_params)
        bid.update!(bid_accepted: false)
        render json: bid, status: :created
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
        bid.update!(bid_params)
        bid.update!(bid_accepted: false)
        render json: bid, status: 200
    end

    private 

    def bid_params 
        params.permit(:product_id, :bid_amount)
    end
end
