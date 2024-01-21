class Product < ApplicationRecord
    # validates :minimum_price, comparison: { greater_than: 4.99 }
    validates :description, :product_name, presence: true

    has_many :bids
    has_many :comments
    has_many :users, through: :bids
    has_one_attached :image

    def image_url
        Rails.application.routes.url_helpers.url_for(image) if image.attached?
    end

    def highest_bid
        self.bids.maximum(:bid_amount)
    end
end
