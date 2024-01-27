class User < ApplicationRecord
    has_secure_password

    validates :password, confirmation: true
    validates :password, :email, :username, presence: true
    validates :email, uniqueness: true

    has_many :posts, class_name: 'Product'
    has_many :bids
    has_many :comments
    has_many :products, through: :bids
end
