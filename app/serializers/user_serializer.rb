class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email

  # has_many :comments
  has_many :bids
  has_many :products
end
