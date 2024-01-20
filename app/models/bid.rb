class Bid < ApplicationRecord
    validates :bid_amount, presence: true
    # will this work?
    # validates :bid_amount, comparison: { greater_than: self.object.product.minimum_price }

    belongs_to :user
    belongs_to :product
end
