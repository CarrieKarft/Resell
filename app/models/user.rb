class User < ApplicationRecord
    has_many :bids
    has_many :comments
    has_many :products, through: :bids
end
