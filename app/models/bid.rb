class Bid < ApplicationRecord
    validates :bid_amount, presence: true
    
    belongs_to :user
    belongs_to :product
end
