class Product < ApplicationRecord
    validates :description, presence: true

    has_many :bids
    has_many :comments, dependent: :destroy
    has_many :users, through: :bids
    has_one_attached :image

    def image_url
        Rails.application.routes.url_helpers.url_for(image) if image.attached?
    end

    def current_highest_bid
        if self.bids.length > 0
            self.bids.find_by(bid_amount: self.bids.maximum(:bid_amount))
        else
            {bid_amount: 0.00}
        end
    end
end
