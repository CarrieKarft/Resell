class Product < ApplicationRecord
    has_many :bids
    has_many :comments
    has_many :users, through: :bids
end
